import express from "express";
import config from "config";
import product from "../controllers/products";

const router = express.Router();

const productsRoutes = app => {
    router.post(config.get("routes.product.save"), product.save);
    router.get(config.get("routes.product.list"), product.list);

    app.use(router);
};

export default productsRoutes;
