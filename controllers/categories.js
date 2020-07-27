import config from "config";
import util from "util";
import DBG from "debug";
import * as CategoriesModel from "../models/categories-sequelize";
import * as ProductCategoriesModel from "../models/productCategories-sequelize";

const debug = DBG("fast-shopping:categories-controllers-debug");
const flush = DBG("fast-shopping:categories-controllers-error");
debug.useColors = true;
flush.useColors = true;

export default {
    // @access Public
    // @route /categories/save
    // @desc Populate|Save Categories
    async save(req, res, next) {
        try {
            let categories = req.body.categories;

            categories = categories.map(async category => {
                let hasCategory = await CategoriesModel.find(category.category_id);
                if (!hasCategory) {
                    return await CategoriesModel.save(
                        category.category_id, category.category_name,
                        category.description
                    );
                } else {
                    categories = [];
                }
            });
            debug(`save categroies: ${await Promise.all(categories)}`);

            res.json(await Promise.all(categories));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.category.save")} \n
                Server Internal Error: Categories Saving Failed!
            `);
        }
    },

    // @access Public
    // @route /categories/check/:id
    // @desc Check a specific category and return paginated list
    async check(req, res, next) {
        try {
            const category_id = req.params.category_id;
            const page = parseInt(req.params.page, 10);
            const size = parseInt(req.params.size, 10);

            if (isNaN(page) || page <= 0) {
                return res.status(400).json({
                    status: "404 Bad Request!",
                    state: "Request Failed!",
                    message: "Page number must start from 1!"
                });
            }

            const category = await CategoriesModel.check(category_id, page, size);
            debug(`check category: ${util.inspect(category)}`);
            res.send(category);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.category.check")} \n
                Server Internal Error: Categories Checking Failed!
            `);
        }
    },

    // @access Public
    // @route /categories/list
    // @desc List all categories
    async list(req, res, next) {
        try {
            let categories = await CategoriesModel.list();
            !categories && (categories = []);
            debug(`list categories: ${util.inspect(categories)}`);
            res.json(categories);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.category.list")} \n
                Server Internal Error: Categories Listing Failed!
            `);
        }
    },

     // @access Public
    // @route /categories/save/product-categories
    // @desc Populate|Save relations between products & categories
    async saveProductCategories(req, res, next) {
        try {
            let productCategories = req.body.productCategories;

            productCategories = productCategories.map(async productCategory => {
                let hasProductCategory = await ProductCategoriesModel.check(
                    productCategory.category_id, productCategory.product_id
                );
                if (!hasProductCategory) {
                    return await ProductCategoriesModel.save(
                        productCategory.category_id, productCategory.product_id
                    );
                } else {
                    productCategories = [];
                }
            });
            debug(`save product categories: ${await Promise.all(productCategories)}`);
            
            res.json(await Promise.all(productCategories));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`
                ${config.get("routes.category.saveProductCategory")} \n
                Server Internal Error: Product Categories Saving Failed!
            `);
        }
    }
}
