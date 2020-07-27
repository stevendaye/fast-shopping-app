import express from "express";
import { check } from "express-validator";
import config from "config";
import user from "../controllers/users"

const router = express.Router();

const usersRoutes = app => {
    router.post(config.get("routes.user.save"), [
        check("user.full_name", "Your name is required to proceed with your order").not().isEmpty(),
        check("user.user_id", "A unique id is required to identify you later").not().isEmpty(),
        check("user.address", "Your address is required to deliver your order").not().isEmpty(),
        check("user.email", "A valid email is required to finish your order").isEmail()
    ], user.save);
    router.get(config.get("routes.user.check"), user.check);

    app.use(router);
};

export default usersRoutes;
