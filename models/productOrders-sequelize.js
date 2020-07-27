import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SqProductOrders;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqProductOrders) {
        return SqProductOrders.sync();
    }

    SqProductOrders = sqlize.define("ProductOrders", {
        order_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return SqProductOrders.sync();
}

// @desc Save|Creat Orders
async function save (order_id, product_id, quantity) {
    const SqProductOrders = await connectDB();
    const productOrder = await SqProductOrders.create({
        order_id, product_id, quantity
    });
    return productOrder;
}

export default connectDB;
export { save };
