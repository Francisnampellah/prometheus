const product = require("../models/product");

exports.getAllProduct = (req, res, next) => {
  product
    .findAll()
    .then((prod) => {
      res.status(201).json(prod);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSingle = (req, res, next) => {
  const Id = req.params.prodId;
  product
    .findByPk(Id)
    .then((prod) => {
      res.status(201).json(prod);
    })
    .catch((err) => {
      console.log(err);
    });
};
