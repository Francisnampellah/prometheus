const path = require("path");
const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/iaAuth");

const shopController = require("../controllers/ShopController");

router.get("/", shopController.getAllProduct);
router.get("/user", shopController.userInfo);

router.get("/product/:prodId", shopController.getSingle);
router.get("/getcart", isAuth.whoUser, shopController.getUserCart);
router.post("/tocart", isAuth.whoUser, shopController.postCart);
router.post("/deleteCart", isAuth.whoUser, shopController.deleteCartItem);
router.post("/checkoutOrder", isAuth.whoUser, shopController.checkoutOrder);
router.get("/getOrder", isAuth.whoUser, shopController.getUserOrder);

module.exports = router;
