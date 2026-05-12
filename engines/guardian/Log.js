
const { DataTypes } = require("sequelize");
const { sequelize } = require("./User");
const Specimen = require("./Specimen");

const Log = sequelize.define("Log", {
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    type: { type: DataTypes.ENUM("Feeding", "Weight", "Molt", "Note"), allowNull: false },
    value: { type: DataTypes.STRING }, // "25g", "Cricket x 3" 등
    note: { type: DataTypes.TEXT }
});

Specimen.hasMany(Log);
Log.belongsTo(Specimen);

module.exports = Log;

