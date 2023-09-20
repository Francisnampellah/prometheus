const path = require("path");
const express = require("express");

const AdminRouter = require("../controllers/AdminController");
const router = express.Router();
router.get("/getproduct", AdminRouter.getProduct);
router.post("/postProduct", AdminRouter.postAddProduct);
// router.post("/editProduct", AdminRouter.postEditProduct);
router.post("/deleteProduct", AdminRouter.postDeleteProduct);

module.exports = router;
