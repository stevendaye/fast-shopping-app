import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";
import Products from "./poducts-sequelize";
import ProductCategories from "./productCategories-sequelize";

let sqlize;
let SqCategories;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqCategories) {
        return SqCategories.sync();
    }

    SqCategories = sqlize.define("Categories", {
       category_id: {
           type: Sequelize.INTEGER,
           unique: true,
           primaryKey: true
       },
       category_name: {
           type: Sequelize.STRING,
           allowNull: false
       },
       description: {
           type: Sequelize.TEXT,
           validate: {
            notEmpty: true
        }
       }
    });

    // @desc Make association between Categories and Products tables
    SqCategories.belongsToMany(await Products(), {
        through: await ProductCategories(),
        as: "products",
        foreignKey: "category_id",
        otherKey: "product_id"
    });

    return SqCategories.sync();
}

// @desc Save Categories
async function save(category_id, category_name, description) {
    const SqCategories = await connectDB();
    const category = await SqCategories.create({
        category_id, category_name, description
    });
    return category;
}

// @desc Find a specific category before storing
async function find(category_id) {
    const SqCategories = await connectDB();
    const category = await SqCategories.findOne({
        where: {
            category_id: {[Op.eq]: category_id}
        }
    });
    return category;
}

// @desc Check a specific category and return paginated list
async function check(category_id, page, hitsPerPage) {
    const SqCategories = await connectDB();
    const skip = hitsPerPage * (page - 1);
    const limit = hitsPerPage;

    const category = await SqCategories.findOne({
        include: [{
            model: await Products(),
            as: "products",
            required: false,
            attributes: [
                "title", "name",
                "desciption", "unit_price",
                "in_stock", "state"
            ],
            through: {
                model: await ProductCategories(),
                as: "productCategories",
                attributes: []
            },
            order: [["title", "ASC"]]
        }],
        where: {
            category_id: {[Op.eq]: category_id}
        },
        offset: skip,
        limit
    });

    const pages = Math.floor(category.products.length / hitsPerPage);
    return {
        page,
        hitsPerPage,
        pages,
        category
    };
}

// @desc List all categories
async function list() {
    const SqCategories = await connectDB();
    const categories = await SqCategories.findAll({});
    return categories;
}

export default connectDB;
export { save, find, check, list };
