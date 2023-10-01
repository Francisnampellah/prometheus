const path = require("path");
const express = require("express");
const AdminRouter = require("../controllers/AdminController");
const isAuth = require("../middleware/iaAuth");
const router = express.Router();
router.get("/getproduct", AdminRouter.getProduct);
router.post("/addProduct", isAuth.whoUser, AdminRouter.addProduct);
router.post("/editProduct", isAuth.whoUser, AdminRouter.editProduct);
router.post("/deleteProduct", isAuth.whoUser, AdminRouter.deleteProduct);
router.get("/getAllusers", isAuth.whoUser, AdminRouter.getUsers);
router.get("/signUpAdmin", isAuth.whoUser, AdminRouter.signUpUser);

module.exports = router;
