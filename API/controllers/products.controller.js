const createError = require("http-errors");
const Product = require("../models/product.model");

function notFound (el) {
  if (!el) {
    createError(404, "Products not found");
  } else {
     return res.json(el);
  }
}

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => {
      if (!products) {
        createError(404, "Products not found");
      } else {
        res.json(products);
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        createError(404, "Product not found");
      } else {
        res.json(product);
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if(!product) {
        createError(404, 'Product not found')
      } else {
        res.status(204).send()
      }
    })
    .catch((error) => next(error));
};
