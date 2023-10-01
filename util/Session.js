const sequelize = require("../util/Database");
const Sequelize = require("sequelize");

const SessionModel = sequelize.define("Session", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  expires: Sequelize.DATE,
  data: Sequelize.TEXT,
});

exports.module = SessionModel;
