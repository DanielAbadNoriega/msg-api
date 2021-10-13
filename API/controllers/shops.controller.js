const createError = require('http-errors');
const Shop = require('../models/shop.model');

module.exports.list = (req, res, next) => {
    const { title } = req.query;
    let criterial = {}

    if(title) criterial.title = RegExp(title, 'i')

    Shop.find(criterial)
        .then(shops => {
            if(!shops) {
                createError(404, 'Shops not found')
            } else {
                res.json(shops)
            }
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    Shop.findById(req.params.id)
        .then(shop => {
            if(!shop) {
                createError(404, 'Shop not found')
            } else {
                res.json(shop)
            }
        })
}

module.exports.delete = (req, res, next) => {
    Shop.findByIdAndDelete(req.params.id)
        .then(shop => {
            if(!shop) {
                createError(404, 'Shop not found')
            } else {
                res.status(204).send()
            }
        })
}