import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

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
            type: Sequelize.NUMBER,
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
        relase_date: {
            type: Sequelize.DATE,
            validate: {
                notEmpty: true
            }
        }
    });

    // @desc Make association between Products and Orders tables
    SqProducts.associate = models => {
        SqProducts.belongsToMany(models.Orders, {
            through: "ProductOrders",
            as: "orders",
            foreignKey: "product_id",
            otherKey: "order_id"
        });
    };

    // @desc Make association between Products and Categories
    SqProducts.associate = models => {
        SqProducts.belongsToMany(models.Categories, {
            through: "ProductCategories",
            as: "categories",
            foreignKey: "product_id",
            otherKey: "category_id"
        });
    };

    return SqProducts.sync();
}

// @desc Store products into the database
async function save(product_id, title, name, description, unit_price, in_stock,
    out_of_stock, state, relase_date) {
    const SqProducts = await connectDB();
    const product = await SqProducts.create({
        product_id, title, name, description, unit_price, in_stock,
        out_of_stock, state, relase_date
    });
    return product;
}

async function check(product_id) {
    const SqProducts = await connectDB();
    const product = SqProducts.findOne({
        where: {
            product_id: {[Op.eq]: product_id}
        }
    });
    if (!product) {
        return {
            found: false,
            product_id
        }
    }

    return {
        found: true,
        product
    };
}

// @desc List paginated products belonging to a specific category
async function list(page, size) {
    const SqProducts = await connectDB();
    const skip = size * (page - 1);
    const limit = size;

    const products = await SqProducts.findAll({
        include: [{
            model: models.Categories,
            as: "categories",
            required: false,
            attributes: ["category_id, category_name"],
            through: {
                attributes: []
            },
        }],
        order: [["title", "ASC"]],
        offset: skip,
        limit
    });

    const pages = Math.floor(products.length / size);

    return {
        page, size, pages, products
    };
}

export { save, check, list };
