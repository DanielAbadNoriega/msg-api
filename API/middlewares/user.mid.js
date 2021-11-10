const createError = require('http-errors')
const User = require('../models/user.model')

module.exports.exist = (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                next(createError(404, 'User not found'))
            }
        })
        .catch(error => next(error))
}