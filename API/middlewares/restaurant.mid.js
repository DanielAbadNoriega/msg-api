const createError = require('http-errors');
const Restaurant = require('../models/restaurant.model')

module.exports.exist = (req, res, next) => {
    const id = req.params.id
    Restaurant.findById(id)
        .then(restaurant => {
            if(restaurant) {
                req.restaurant = restaurant;
                next();
            } else {
                next(createError(404, "Restaurant not found"));
            }
        })
        .catch(error => next(error))
}