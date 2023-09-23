const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const sequelize = require("./util/Database.js");

const app = express();
const shopRoutes = require("./route/shop");
const adminRoutes = require("./route/admin");
const error = require("./controllers/error");
const Cart = require("./models/cart.js");
const CartItem = require("./models/cartItem.js");

const Product = require("./models/product.js");
const User = require("./models/User.js");

// const order = require("./models/order.js");
// const orderItem = require("./models/orderItem.js");
const Order = require("./models/order.js");
const OrderItem = require("./models/orderItem.js");

const auth = require("./route/auth.js");

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

app.use("/auth",auth);
app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.use(error.get404);

// User - Product relation

Product.belongsTo(User, { constrants: true, onDelete: "CASCADE" });
User.hasMany(Product);

// User - Cart relation

User.hasOne(Cart);
Cart.belongsTo(User);

// Product - Cart relation

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//Order - User
Order.belongsTo(User);
User.hasMany(Order);

//order - Product

Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

// Product.hasMany(Order,{ through: OrderItem })

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Jovan", email: "jovan267@namps.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
