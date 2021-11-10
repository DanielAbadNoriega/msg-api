const createError = require("http-errors");
const Profesional = require("../models/profesional.model");

module.exports.create = (req, res, next) => {
  Profesional.create(req.body)
    .then((profesional) => {
      if (!profesional) {
        createError(404, "Profesional can not create.");
      } else {
        res.status(201).json(profesional);
      }
    })
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  const { name, company } = req.query;
  let criterial = {};

  if (name) criterial.name = new RegExp(name, "i");
  if (company) criterial.company = new RegExp(company, "i");

  Profesional.find(criterial)
    .then((profesionals) => {
      if (!profesionals) {
        createError(404, "Profesionals not found");
      } else {
        res.json(profesionals);
      }
    })
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  res.json(req.profesional);
};

module.exports.edit = (req, res, next) => {
  const data = ({ name, email, phone, avatar, address, company } = req.body);
  const profesional = req.profesional;
  Object.assign(profesional, data);

  profesional
    .save()
    .then(profesional => res.json(profesional))
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
    Profesional.deleteOne({ _id: req.profesional.id })
        .then(() => res.status(204).send())
        .catch(error => next(error))
};