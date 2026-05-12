
require("dotenv").config(); // 환경 변수 로드
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME || "hexis",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false
    }
);

const User = sequelize.define("User", {
    username: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false }
});

module.exports = { sequelize, User };

