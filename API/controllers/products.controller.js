const createError = require("http-errors");
const Product = require("../models/product.model");

module.exports.create = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      if (!product) {
        createError(400, "Product can not create.");
      } else {
        res.status(201).json(product);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { name, tags } = req.query;
  let criterial = {};

  if (name) criterial.name = new RegExp(name, "i");
  if (tags) criterial.tag = new RegExp(tags, "i");

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
  res.json(req.product);
};

module.exports.edit = (req, res, next) => {
  const data = ({ name, nutritionPerHundred, tags } = req.body);
  const product = req.product;
  Object.assign(product, data);

  product
    .save()
    .then((product) => res.json(product))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Product.deleteOne({ _id: req.product.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};
