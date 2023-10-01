const Sequelize = require("sequelize");

const sequelize = new Sequelize("novus", "novusPrime", "Juan2010%", {
  dialect: "mysql",
  host: "34.135.151.211",
});

module.exports = sequelize;
