import config from "config";
import uuid from "uuid/dist/v4";
import util from "util";
import DBG from "debug";
import * as ProductsModel from "../models/poducts-sequelize";
import * as OrdersModel from "../models/orders-sequelize";
import * as ProductOrdersModel from "../models/productOrders-sequelize";

const debug = DBG("fast-shopping:orders-controllers-debug");
const flush = DBG("fast-shopping:orders-controllers-error");
debug.useColors = true;
flush.useColors = true;

export default {
    // @access Public
    // @route /orders/save
    // @desc Save|Create orders
    async save(req, res, next) {
        try {
            let order_id = uuid();
            let order = req.body.order;
            let products = req.body.products;
            let user = req.body.user_id;

            products = products.map(async product => {
                const item = await ProductsModel.check(product.product_id);
                if (item.found) {
                    await ProductOrdersModel.save(
                        order_id, product.product_id, product.quantity
                    );
                }
            });

            order = await OrdersModel.save(order.order_id, user, order.order_date,
                order.ship_date, order.ship_address, order.subtotal
            );
            debug(`save order: ${util.inspect(order)}`);
            res.json(order_id);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.order.save")} \n
                Server Internal Error: Oders Saving Failed!
            `);
        }
    },

    // @access Private
    // @route /orders/check/:id
    // @desc Check a specific order
    async check(req, res, next) {
        try {
            const order = await OrdersModel.check(req.params.order_id);
            debug(`check order: ${util.inspect(order)}`);
            res.json(order);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.orders.check")} \n
                Server Internal Error: Oder Checking Failed!
            `);
        }
    },

    // @access Private
    // @route /orders/list
    // @desc List all orders
    async list(req, res, next) {
        try {
            let orders = await OrdersModel.list();
            !orders && (orders = []);
            debug(`list orders: ${util.inspect(orders)}`);
            res.json(orders);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.order.list")} \n
                Server Internal Error: Orders Listing Failed!
            `);
        }
    }
}
