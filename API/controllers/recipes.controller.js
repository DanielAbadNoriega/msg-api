const createError = require("http-errors");
const Recipe = require("../models/recipe.model");

module.exports.create = (req, res, next) => {
  Recipe.create(req.body)
    .then((recipe) => {
      if (!recipe) {
        createError(404, "Recipe can not create.");
      } else {
        res.status(201).json(recipe);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { name } = req.query;
  let criterial = {};
  if (name) criterial.name = RegExp(name, "i");

  Recipe.find(criterial)
    .then((recipes) => {
      if (!recipes) {
        createError(404, "Recipes not found");
      } else {
        res.json(recipes);
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.recipe);
};

module.exports.edit = (req, res, next) => {
  const data = ({ name, description, ingredients, steps, image } = req.body);
  const recipe = req.recipe;
  Object.assign(recipe, data);

  recipe
    .save()
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Recipe.deleteOne({ _id: req.recipe.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};