import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SqProductcategories;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqProductcategories) {
        return SqProductcategories.sync();
    }

    SqProductcategories = sqlize.define("ProductCategories", {
        category_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER
    });
    
    SqProductcategories.sync();
}

// Save data relations between products and categories
async function save(category_id, product_id) {
    const SqProductcategories = await connectDB();
    const productCategory = await SqProductcategories.create({
        category_id, product_id
    });
    return productCategory;
}

export { save };
