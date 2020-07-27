import config from "config";
import util from "util";
import DBG from "debug";
import * as ProductsModel from "../models/poducts-sequelize";

const debug = DBG("fast-shopping:products-controllers-debug");
const flush = DBG("fast-shopping:products-controllers-error");
debug.useColors = true;
flush.useColors = true;

export default {
    // @access Public
    // @route /products/save
    // @desc Populate|Save products
    async save(req, res, next) {
        try {
            let products = req.body.products;

            products = products.map(async product => {
                let hasProduct = await ProductsModel.check(product.product_id);
                if (!hasProduct) {
                    return await ProductsModel.save(
                        product.product_id, product.title, product.name,
                        product.description, product.unit_price, product.in_stock,
                        product.out_of_stock, product.state, product.release_date
                    );
                } else {
                    products = [];
                }
            });
            debug(`save products: ${await Promise.all(products)}`);

            res.json(await Promise.all(products));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.product.save")} \n
                Server Internal Error: Products Saving Failed!
            `);
        }
    },

    // @access Public
    // @route /products/list
    // @desc List all paginated products and related categories
    async list(req, res, next) {
        try {
            const page = parseInt(req.query.page, 10);
            const hitsPerPage = parseInt(req.query.hitsPerPage, 10);

            if (isNaN(page) || page <= 0) {
                return res.status(400).json({
                    status: "400 Bad Request!",
                    state: "Request Failed!",
                    message: "Page number must start from 1!"
                });
            }

            let products = await ProductsModel.list(page, hitsPerPage);
            !products && (products = []);
            debug(`list products: ${util.inspect(products)}`);
            res.json(products);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.product.list")} \n
                Server Internal Error: Products Listing Failed!
            `);
        }
    }
}
