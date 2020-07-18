import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SqOrders;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqOrders) {
        return SqOrders.sync();
    }

    SqOrders = sqlize.define("Orders", {
        order_id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ship_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ship_address: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        subtotal: {
            type: Sequelize.NUMBER,
            allowNull: false
        }
    });

    // @desc Make association between Oders and Products tables
    SqOrders.associate = models => {
        SqOrders.belongsToMany(models.Products, {
            through: "ProductOrders",
            as: "products",
            foreignKey: "order_id",
            otherKey: "product_id"
        });
    };

    return SqOrders.sync();
}

// @desc Save an order
async function save(order_id, user_id, order_date, ship_date, ship_address, subtotal) {
    const SqOrders = await connectDB();
    const order = await SqOrders.create({
        order_id, user_id, order_date, ship_date, ship_address, subtotal
    });
    return order;
}

// @desc Check a specific order;
async function check(order_id) {
    const SqOrders = await connectDB();
    const order = await SqOrders.findOne({
        include: [{
            model: "Products",
            as: "products",
            required: false,
            attributes: ["product_id", "name", "state"],
            through: {
                model: "ProductOrders",
                as: "productOrders",
                attributes: ["quantity"]
            }
        }],
        where: {
            order_id: {[Op.eq]: order_id}
        }
    });
    return order;
}

// @desc List all orders
async function list() {
    const SqOrders = await connectDB();
    const orders = await SqOrders.findAll({
        include: [{
            model: "Products",
            as: "products",
            required: false,
            attributes: ["product_id", "name", "state"],
            through: {
                model: "ProductOrders",
                as: "productOrders",
                attributes: ["quantity"]
            },
            order: [["order_date", "DESC"]]
        }]
    });
    return orders;
}

export default connectDB;
export { save, check, list };
