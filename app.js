const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const cors = require("cors");
const sequelize = require("./util/Database.js");
const isToken = require("./middleware/iaAuth.js");

const app = express();
const shopRoutes = require("./route/shop");
const adminRoutes = require("./route/admin");
const error = require("./controllers/error");
const Cart = require("./models/cart.js");
const CartItem = require("./models/cartItem.js");

const session = require("express-session");
const Product = require("./models/product.js");
const User = require("./models/User.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const Order = require("./models/order.js");
const OrderItem = require("./models/orderItem.js");

const auth = require("./route/auth.js");


const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

const sessionStore = new SequelizeStore({
  db: sequelize,
});

// const csrfProtection = csrf();

let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(isToken.whoUser);

app.use("/auth", auth);
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
// Cart.hasMany(Product);

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
      return User.create({
        name: "Novus Prime",
        email: "bnampellah1@gmail.com",
        password:
          "$2a$12$YPdgY2BHoVr.nGrHDEyEgeEYrPUku3CCsFscp6wXddSE.Lpm17RyS",
        role: 1,
      });
    }
    return user;
  })
  .then((res) => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error);
  });
