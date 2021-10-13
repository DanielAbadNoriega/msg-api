const createError = require('http-errors');
const Restaurant = require('../models/restaurant.model')

module.exports.list = (req, res, next) => {
    const { title } = req.query;
    let criterial = {}

    if(title) criterial.title = RegExp(title, 'i')

    Restaurant.find(criterial)
        .then(restaurants => {
            if(!restaurants) {
                createError(404, 'Restaurants not found')
            } else {
                res.json(restaurants)
            }
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(restaurant => {
            if(!restaurant) {
                createError(404, 'Restaurant not found')
            } else {
                res.json(restaurant)
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(restaurant => {
            if(!restaurant) {
                createError(404, 'Restaurant not found')
            } else {
                res.status(204).send()
            }
        })
        .catch(error => next(error))
}