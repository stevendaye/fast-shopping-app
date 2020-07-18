import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

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
        return SQOrders.sync();
    }

    SqCategories = Sequelize.define("Categories", {
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
           notEmpty: true
       }
    });

    // @desc Make association between Categories and Products tables
    SqCategories.associate = models => {
        SqCategories.belongsToMany(models.Products, {
            through: "ProductCategories",
            as: "products",
            foreignKey: "category_id",
            otherKey: "product_id"
        });
    }

    return SqCategories.sync();
}

// @desc Save Categories
async function save(category_id, category_name, description) {
    const SqCategories = await connectDB();
    const category = await SqCategories.create(category_id, category_name, description);
    return category;
}

// @desc Find a specific category and return paginated list
async function check(category_id, page, size) {
    const SqCategories = await connectDB();
    const skip = size * (page - 1);
    const limit = size;

    const category = await SqCategories.find({
        include: [{
            model: models.Products,
            as: "products",
            required: false,
            attributes: [
                "title", "name",
                "desciption", "unit_price",
                "in_stock", "state"
            ],
            through: {
                model: "ProductCategories",
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

    const pages = Math.floor(category.products.length / size);
    return {
        page,
        size,
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

export { save, check, list, connectDB };
