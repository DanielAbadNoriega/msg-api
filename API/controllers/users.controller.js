const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      if (!user) {
        createError(400, "User can not create.");
      } else {
        res.status(201).json(user);
      }
    })
    .catch((error) => next(error));
};

module.exports.get = (req, res, next) => {
  res.json(req.user);
};

module.exports.edit = (req, res, next) => {
  const data = ({ name, lastname, email, phone, avatar, address } = req.body);
  const user = req.user;
  Object.assign(user, data);

  user
    .save()
    .then((user) => res.json(user))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.user.id })
    .then(() => res.status(204).send())
    .catch((error) => next(error));
};
