const path = require("path");
const express = require("express");
const AdminRouter = require("../controllers/AdminController");
const router = express.Router();
router.get("/getproduct", AdminRouter.getProduct);
router.post("/addProduct", AdminRouter.addProduct);
router.post("/editProduct", AdminRouter.editProduct);
router.post("/deleteProduct", AdminRouter.deleteProduct);

module.exports = router;
