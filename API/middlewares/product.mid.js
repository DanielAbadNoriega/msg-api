const createError = require('http-errors');
const Product = require('../models/product.model')

module.exports.exist = (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
        .then(product => {
            if(product) {
                req.product = product;
                next();
            } else {
                next(createError(404, 'Product not found'))
            }
        })
        .catch(error => next(error))
}