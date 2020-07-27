import Sequelize from "sequelize";
import fs from "fs-extra";
import jsyaml from "js-yaml";

let sqlize;
let SqUser;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SqUser) {
        return SqUser.sync();
    }

    SqUser = sqlize.define("Users", {
        user_id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.TEXT,
            notEmpty: true
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                not: ['[a-z]', 'i']
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    });

    return SqUser.sync();
}

// @desc Save users after a purchase
async function save(user_id, full_name, address, phone_number, email) {
    const SqUser = await connectDB();
    const user = await SqUser.create({
        user_id, full_name, address, phone_number, email
    });
    return user;
}

// @desc Check an existing user
async function check (email) {
    const SqUser = await connectDB();
    const user = await SqUser.findOne({
        where: {
            email: {[Op.eq]: email}
        }
    });
    return user;
}

// @desc List all users on the platform
async function list() {
    const SqUser = await connectDB();
    const users = await SqUser.findAll({});
    return users;
}

export { save, check, list };
