const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postLogin = (req, res, next) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  User.findOne({ where: { email: userEmail } })
    .then((existUser) => {
      if (existUser == null) {
        res.status(403).json({ mesage: "No User Exist" });
      } else {
        bcrypt
          .compare(password, existUser.password)
          .then((result) => {
            if (result) {
              const token = jwt.sign(
                {
                  email: userEmail,
                  user: existUser.id,
                },
                "siriYaMtungi",
                { expiresIn: "1h" }
              );

              res
                .status(201)
                .json({ token: token, user: existUser, role: existUser.role });
            } else {
              res.status(403).json({ mesage: "Wrong Password" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.SignUp = (req, res, next) => {
  const Username = req.body.name;
  const userEmail = req.body.email;
  const password = req.body.password;

  User.findAll({ where: { email: userEmail } })
    .then((Existemail) => {
      console.log(Existemail);
      if (Existemail.length > 0) {
        res.status(201).json({ message: "User Exist" });
      }
      return bcrypt.hash(password, 12);
    })
    .then((passcode) => {
      User.create({
        name: Username,
        email: userEmail,
        password: passcode,
        role: 2,
      }).then((user) => {
        user.createCart();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
