const createError = require('http-errors')
const Profesional = require('../models/profesional.model')

module.exports.exist = (req, res, next) => {
    const id = req.params.id;
    Profesional.findById(id)
        .then(profesional => {
            if(profesional) {
                req.profesional = profesional;
                next();
            } else {
                next(createError(404, 'Profesional not found'))
            }
        })
        .catch(error => next(error))
}