import express from "express";
import config from "config";
import order from "../controllers/orders";

const router = express.Router();

const ordersRoutes = app => {
    router.post(config.get("routes.order.save"), order.save);
    router.get(config.get("routes.order.check"), order.check);

    router.use(app);
};

export default ordersRoutes;
