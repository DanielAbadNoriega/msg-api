const createError = require('http-errors');
const Shop = require('../models/shop.model');

module.exports.create = (req, res, next) => {
    Shop.create(req.body)
        .then(shop => {
            if(!shop) {
                createError(404, 'Shop can not create.')
            } else {
                res.status(201).json(shop)
            }
        })
        .catch(error => next(error))
}

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
    res.json(req.shop)
}

module.exports.edit = (req, res, next) => {
    const data = ({ title, description, image } = req.body);
    const shop = req.shop;
    Object.assign(shop, data);

    shop.save()
        .then(shop => res.json(shop))
        .catch(error => next(error))
  };

module.exports.delete = (req, res, next) => {
    Shop.deleteOne({ _id: req.shop.id })
        .then(() => res.status(204).send())
        .catch(error => next(error))
}