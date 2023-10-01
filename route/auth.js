const express = require("express");
const router = express.Router();

const login = require("../controllers/authContoller");

router.post("/login", login.postLogin);
router.post("/signup", login.SignUp);

module.exports = router;
