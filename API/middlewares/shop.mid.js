const createError = require('http-errors')
const Shop = require('../models/shop.model')

module.exports.exist = (req, res, next) => {
    const id = req.params.id;
    Shop.findById(id)
        .then(shop => {
            if(shop) {
                req.shop = shop;
                next();
            } else {
                next(createError(404, 'Shop not found'))
            }
        })
        .catch(error => next(error))
}