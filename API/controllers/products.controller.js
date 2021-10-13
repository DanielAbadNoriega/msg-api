const createError = require("http-errors");
const Product = require("../models/product.model");

module.exports.list = (req, res, next) => {
  const { name, tags } = req.query;
  let criterial = {};

  if(name) criterial.name = new RegExp(name, 'i')
  if(tags) criterial.tag = new RegExp(tags, 'i')

  Product.find(criterial)
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
