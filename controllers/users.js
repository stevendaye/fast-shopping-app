import { validationResult } from "express-validator";
import config from "config";
import util from "util";
import DBG from "debug";
import * as UsersModel from "../models/users-sequelize"; 

const debug = DBG("fast-shopping:users-controllers-debug");
const flush = DBG("fast-shopping:users-controllers-error");
debug.useColors = true;
flush.useColors = true;

export default {
    // @access Public
    // @route /users/save
    // @desc Save|Create a user
    async save(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = req.body.user;
            
            const existing_user = await UsersModel.check(user.email);
            if (existing_user) {
                debug(`check user exists: ${util.inspect(existing_user)}`);
                return res.status(400).json({
                    errors: [{
                        message: `
                            This customer already exists. Is that you dear ${existing_user.full_name}?
                            Save time using the Existing Customer feature.
                        `
                    }]
                });
            }

            user = await UsersModel.save(
                user.user_id, user.full_name, user.address,
                user.phone_number, user.email
            );

            debug(`save user: ${util.inspect(user)}`);
            res.json(user);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.user.list")} \n
                Server Internal Error: Products Listing Failed!
            `);
        }
    },

    // @access Public
    // @route /users/check/:email
    // @desc Check user existence in the database
    async check(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        try {
            const user = await UsersModel.check(req.params.email);
            if (!user) {
                return res.status(404).json({
                    errors: [{
                        message: `No such a customer. Start registering to proceed with your order!`
                    }]
                });
            }

            debug(`check user: ${util.inspect(user)}`);
            res.json(user);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.user.check")} \n
                Server Internal Error: User Checking Failed!
            `);
        }
    },

    // @access Private
    // @route /users/list
    // @desc List all customers
    async list(req, res, next) {
        try {
            let users = await UsersModel.list();
            !users && (users = []);
            debug(`list users: ${util.inspect(users)}`);
            res.json(users);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.user.check")} \n
                Server Internal Error: User Checking Failed!
            `);
        }
    }
}
