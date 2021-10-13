const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        createError(404, "User not found");
      } else {
        res.status(204).send("User is succesfully deleted.");
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = (req, res, next) => {
    const data = { name, lastname, email, phone, avatar, address } = req.body
  User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        createError(404, "User not found");
      } else {
        res.json(user);
      }
    })
    .catch((error) => next(error));
};
