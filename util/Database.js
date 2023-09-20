const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "novus",
  "novusPrime",
  "Juan2010",
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;
