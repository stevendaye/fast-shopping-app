import http from "http";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import config from "config";
import util from "util";
import DBG from "debug";
import * as handler from "./middlewares/errorHandlers";
import logStream from "./middlewares/logs";
import usersRoutes from "./routes/users";
import productsRoutes from "./routes/products";
import categoriesRoutes from "./routes/categories";
import ordersRoutes from "./routes/orders";

const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || config.get("port"));

const debug = DBG("fast-shopping:app-debug");
const flush = DBG("fast-shopping:app-error");
debug.useColors = true;
flush.useColors = true;

app.set("port", port);
app.use(logger(process.env.REQUEST_LOG_FILE || "dev", {
    stream: logStream ? logStream : process.stdout
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @desc Enables & Accept Cross Origin Requests
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", config.get("host.client"));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

process.on("uncaughtException", err => {
    flush(`Shopping Server Crashed: ${err.stack || err}`);
});
process.on("unhandledRejection", (reason, p) => {
    flush(`Unhandled Promise Rejection: ${util.inspect(p)} \n Reason: ${reason}`);
});

usersRoutes(app);
productsRoutes(app);
categoriesRoutes(app);
ordersRoutes(app);

// Prepare server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(handler._404);
app.use(handler._505);

server.listen(port);
server.on("error", onError);
server.on("listening", onListen);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "String" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACESS":
      flush(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      flush(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListen() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `${addr.port}`
  debug(`Shopping Server listening at http://localhost:${bind}`);
}
