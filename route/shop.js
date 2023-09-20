const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/ShopController");

router.get("/", shopController.getAllProduct);
router.get("/product/:prodId", shopController.getSingle);

module.exports = router;
