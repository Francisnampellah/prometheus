const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuth = (req, res, next) => {
  const extractToken = req.get("Authorization");
  let decodeToken;
  if (!extractToken) {
    res.status(401).json({ message: "Unauthorized qwe" });
  } else {
    const token = extractToken.split(" ")[1];

    try {
      decodeToken = jwt.verify(token, "siriYaMtungi");
    } catch (err) {
      console.log(err);
    }

    if (!decodeToken) {
      res.status(401).json({ message: "MTU Unauthorized" });
    } else {
      next();
    }
  }
};

exports.whoUser = (req, res, next) => {
  const extractToken = req.headers.authorization;

  // const authToken = authHeader.slice(7);

  let decodeToken;

  if (!extractToken) {
    next();
  } else {
    const token = extractToken.split(" ")[1];

    try {
      decodeToken = jwt.verify(token, "siriYaMtungi");
    } catch (err) {
      console.log(err);
    }
    if (!decodeToken) {
      res.status(401).json({ message: "Token Unauthorized" });
    } else {
      const user = decodeToken.user;
      User.findOne({ where: { id: user } }).then((user) => {
        req.user = user;
        console.log("User inserted");
        next();
      });
    }
  }
};

exports.simplerMiddleware = (req, res, next) => {
  // Simple middleware, just call next()
  next();
};
