const createError = require('http-errors');
const Recipe = require('../models/recipe.model');

module.exports.list = (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            if(!recipes) {
                createError(404, 'Recipes not found')
            } else {
                res.json(recipes)
            }
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            if(!recipe) {
                createError(404, 'Recipe not found')
            } else {
                res.json(recipe)
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(recipe => {
            if(!recipe) {
                createError(404, 'Recipe to delete not found')
            } else {
                res.status(204).send()
            }
        })
        .catch(error => next(error))
}