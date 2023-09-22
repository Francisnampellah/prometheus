const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/", shopController.getAllProduct);
router.get("/product/:prodId", shopController.getSingle);
router.get("/getcart", shopController.getUserCart);
router.get("/createcart", shopController.postCart);
router.post("/tocart", shopController.postCart);
router.post("/deleteCart", shopController.deleteCartItem);
router.post("/checkoutOrder", shopController.checkoutOrder);
router.get("/getOrder", shopController.getUserOrder);

module.exports = router;
