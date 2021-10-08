const createError = require('http-errors');
const Profesional = require('../models/profesional.model');

module.exports.list = (req, res, next) => {
    Profesional.find()
        .then(profesionals => {
            if(!profesionals) {
                createError(404, 'Profesionals not found')
            } else {
                res.json(profesionals)
            }
        })
        .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
    Profesional.findById(req.params.id)
        .then(profesional => {
            if(!profesional) {
                createError(404, 'Profesional not found')
            } else {
                res.json(profesional)
            }
        })
        .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
    Profesional.findByIdAndDelete(req.params.id)
        .then(profesional => {
            if(!profesional) {
                createError(404, 'Profesional to delete not found')
            } else {
                res.status(204).send()
            }
        })
        .catch(error => next(error))
}