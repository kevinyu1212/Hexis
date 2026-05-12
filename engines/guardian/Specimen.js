
const { DataTypes } = require("sequelize");
const { sequelize } = require("./User");

const Specimen = sequelize.define("Specimen", {
    hexisTag: { type: DataTypes.STRING, unique: true },
    species: { type: DataTypes.STRING },
    morph: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATEONLY },
    gender: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "Healthy" },
    // 가계도 필드 추가
    FatherId: { type: DataTypes.INTEGER, allowNull: true },
    MotherId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Specimen;

