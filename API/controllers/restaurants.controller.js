const createError = require("http-errors");
const Restaurant = require("../models/restaurant.model");

module.exports.create = (req, res, next) => {
  Restaurant.create(req.body)
    .then((restaurant) => {
      if (!restaurant) {
        createError(404, "Restaurant can not create.");
      } else {
        res.status(201).json(restaurant);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { title } = req.query;
  let criterial = {};

  if (title) criterial.title = RegExp(title, "i");

  Restaurant.find(criterial)
    .then((restaurants) => {
      if (!restaurants) {
        createError(404, "Restaurants not found");
      } else {
        res.json(restaurants);
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.restaurant);
};

module.exports.edit = (req, res, next) => {
  const data = ({ title, description, image } = req.body);
  const restaurant = req.restaurant;
  Object.assign(restaurant, data)

  restaurant.save()
    .then(restaurant => res.json(restaurant))
    .catch(error => next(error))
};

module.exports.delete = (req, res, next) => {
  Restaurant.deleteOne({ _id: req.restaurant.id })
    .then(() => res.status(204).send())
    .catch(error => next(error))
};