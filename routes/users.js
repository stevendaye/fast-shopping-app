import express from "express";
import { check } from "express-validator";
import config from "config";
import user from "../controllers/users"

const router = express.Router();

const usersRoutes = app => {
    router.post(config.get("routes.user.save"), [
        check("name", "Full Name is Required").not().isEmpty(),
        check("id", "Id is Required").not().isEmpty(),
        check("address", "Address is Required").not().isEmpty(),
        check("email", "Email is Required").isEmail()
    ], user.save);
    router.get(config.get("routes.user.check"), user.check);

    router.use(app);
};

export default usersRoutes;
