const createError = require("http-errors");
const Recipe = require("../models/recipe.model");

module.exports.exist = (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((recipe) => {
      if (recipe) {
        req.recipe = recipe;
        next();
      } else {
        next(createError(404, "Recipe not found."));
      }
    })
    .catch((error) => next(error));
};
