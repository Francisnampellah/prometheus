const express = require("express");
const router = express.Router();

const login = require("../controllers/authContoller");

router.get("/login", login.postLogin);


module.exports = router;
