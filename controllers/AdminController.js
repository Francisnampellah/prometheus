const product = require("../models/product");

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
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.addProduct = (req, res, next) => {
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
      console.log(result);
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

  product
    .findByPk(Id)
    .then((prod) => {
      prod.title = title;
      prod.price = price;
      prod.description = description;
      prod.imageUrl = imageUrl;
      return prod.save();
    })
    .then(console.log("Updates"))
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const Id = req.body.Id;
  product
    .findByPk(Id)
    .then((prod) => {
      return prod.destroy();
    })
    .then(console.log("Destroyed"))
    .catch((err) => {
      console.log(err);
    });
};
