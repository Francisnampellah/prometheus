const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/Database");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
