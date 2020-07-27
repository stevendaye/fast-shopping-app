import express from "express";
import config from "config";
import categories from "../controllers/categories";

const router = express.Router();

const categoriesRoutes = app => {
    router.post(config.get("routes.category.save"), categories.save);
    router.get(config.get("routes.category.check"), categories.check);
    router.get(config.get("routes.category.list"), categories.list);
    router.post(config.get("routes.category.saveProductCategory"), categories.saveProductCategories);

    app.use(router);
};

export default categoriesRoutes;
