const Product = require("../models/product");

exports.getAllProduct = (req, res, next) => {
  Product.findAll()
    .then((prod) => {
      res.status(201).json({ prod });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSingle = (req, res, next) => {
  const Id = req.params.prodId;

  Product.findOne({ where: { id: Id } })
    .then((prod) => {
      res.status(201).json(prod);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((prod) => {
      res.status(201).json(prod);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const ProdId = req.body.id;
  const qty = parseInt(req.body.qty);

  let fetchedCart;
  let newQuantiy = qty;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: ProdId } });
    })
    .then((products) => {
      let product;
      if (products) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantiy = oldQuantity + qty;

        return product;
      }
      return Product.findByPk(ProdId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantiy,
        },
      });
    })
    .catch((err) => console.log(err))
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteCartItem = (req, res, next) => {
  const Id = req.body.id;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: Id } });
    })
    .then((prod) => {
      return prod[0].cartItem.destroy();
    })
    .then(console.log("Cart Destroyed"))
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserOrder = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((order) => {
      res.status(200).json(order);
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.checkoutOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((prod) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProduct(
            prod.map((eachProd) => {
              console.log(eachProd.cartItem.quantity);
              eachProd.orderItem = { quantity: eachProd.cartItem.quantity };
              return eachProd;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .then((ord) => {
          fetchedCart.setProducts(null);
        });
    })
    .catch((err) => console.log(err));
};

exports.userInfo = (req, res, next) => {
  res.json(req.user);
};

const ErroR = (err) => {
  console.log(err);
};
