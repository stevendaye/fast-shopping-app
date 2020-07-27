import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SqProductCategories;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqProductCategories) {
        return SqProductCategories.sync();
    }

    SqProductCategories = sqlize.define("ProductCategories", {
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    
    return SqProductCategories.sync();
}

// Save data relationship between products and categories
async function save(category_id, product_id) {
    const SqProductCategories = await connectDB();
    const productCategory = await SqProductCategories.create({
        category_id, product_id
    });
    return productCategory;
}

// Check existence of relationship between products and categories
async function check(category_id, product_id) {
    const SqProductCategories = await connectDB();
    const productCategory = await SqProductCategories.findOne({
        where: {
            category_id: { [Op.eq]: category_id },
            product_id: { [Op.eq]: product_id }
        }
    });
    return productCategory;
}

export default connectDB;
export { save, check };
