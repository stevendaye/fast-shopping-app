import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";
import Orders from "./orders-sequelize";
import Categories from "./categories-sequelize";
import ProductOrders from "./productOrders-sequelize";
import ProductCategories from "./productCategories-sequelize";

let sqlize;
let SqProducts;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqProducts) {
        return SqProducts.sync();
    }

    SqProducts = sqlize.define("Products", {
        product_id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            validate: {
                notEmpty: true
            }
        },
        unit_price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        in_stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        out_of_stock: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        release_date: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true
            }
        }
    });

    // @desc Make association between Products and Orders tables
    SqProducts.belongsToMany(await Orders(), {
        through: await ProductOrders(),
        as: "orders",
        foreignKey: "product_id",
        otherKey: "order_id"
    });

    // @desc Make association between Products and Categories
    SqProducts.belongsToMany(await Categories(), {
        through: await ProductCategories(),
        as: "categories",
        foreignKey: "product_id",
        otherKey: "category_id"
    });

    return SqProducts.sync();
}

// @desc Store products into the database
async function save(product_id, title, name, description, unit_price, in_stock,
    out_of_stock, state, release_date) {
    const SqProducts = await connectDB();
    const product = await SqProducts.create({
        product_id, title, name, description, unit_price, in_stock,
        out_of_stock, state, release_date
    });
    return product;
}

// @desc Check a specific product
async function check(product_id) {
    const SqProducts = await connectDB();
    const product = await SqProducts.findOne({
        where: {
            product_id: {[Op.eq]: product_id}
        }
    });
    return product;
}

// @desc List paginated products belonging to a specific category
async function list(page, hitsPerPage) {
    const SqProducts = await connectDB();
    const skip = hitsPerPage * (page - 1);
    const limit = hitsPerPage;

    const products = await SqProducts.findAll({
        include: [{
            model: await Categories(),
            as: "categories",
            required: false,
            attributes: ["category_id", "category_name"],
            through: {
                model: await ProductCategories(),
                attributes: []
            },
        }],
        order: [["name", "ASC"]],
        offset: skip,
        limit
    });

    const pages = Math.ceil((await SqProducts.findAll({})).length/hitsPerPage);

    return {
        page, hitsPerPage, pages, products
    };
}

export default connectDB;
export { save, check, list };
