const { Sequalize, DataTypes } = require("sequelize");

const sequelize = require("../util/Database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
});

module.exports = User;
