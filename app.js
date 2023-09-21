const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const sequelize = require("./util/Database.js");

const app = express();
const shopRoutes = require("./route/shop");
const adminRoutes = require("./route/admin");
const error = require("./controllers/error");

const Product = require("./models/product.js");
const User = require("./models/User.js");

let PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(error.get404);

Product.belongsTo(User, { constrants: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Jovan", email: "jovan267@namps.com" });
    }
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
