const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/Database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
