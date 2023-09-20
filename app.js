const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const sequelize = require("./util/Database.js");

const app = express();
const shopRoutes = require("./route/shop");
const adminRoutes = require("./route/admin");
const error = require("./controllers/error");

let PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(error.get404);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
