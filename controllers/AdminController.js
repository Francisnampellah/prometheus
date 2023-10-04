const product = require("../models/product");
const User = require("../models/User");

exports.getProduct = (req, res, next) => {
  res.status(201).json({ message: "Admin more created successfully" });
};

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;

//   product
//     .create({
//       title: title,
//       imageUrl: imageUrl,
//       price: price,
//       description: description,
//     })image
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.addProduct = (req, res, next) => {
  console.log("Myrequest" + req);
  console.log(req);

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
    .then((result) => {
      return product.findAll();
    })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  const Id = req.body.Id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const UserRole = req?.user?.id;

  if (UserRole == 1) {
    product
      .findByPk(Id)
      .then((prod) => {
        prod.title = title;
        prod.price = price;
        prod.description = description;
        prod.imageUrl = imageUrl;
        return prod.save();
      })
      .then((result) => {
        return product.findAll();
      })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(401).json({ Message: "Nice try" });
  }
};

exports.deleteProduct = (req, res, next) => {
  const Id = req.body.Id;

  const UserRole = req?.user?.id;

  console.log(Id);

  if (UserRole == 1) {
    product
      .findByPk(Id)
      .then((prod) => {
        return prod.destroy();
      })
      .then((result) => {
        return product.findAll();
      })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(401).json({ Message: "Nice try" });
  }
};

exports.getUsers = (req, res, next) => {
  const UserRole = req?.user?.role;

  if (UserRole == 1) {
    User.findAll()
      .then((users) => {
        return res.status(201).json(users);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(401).json({ Message: "Error has occured" });
  }
};

exports.signUpUser = (req, res, next) => {
  const Username = req.body.name;
  const userEmail = req.body.email;
  const password = req.body.password;

  console.log("reached here");

  const UserRole = req?.user?.role;

  if (UserRole == 1) {
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
          role: 1,
        }).then((user) => {
          user.createCart();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(401).json({ Message: "You not Authorized" });
  }
};
