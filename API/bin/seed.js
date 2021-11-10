const mongoose = require("mongoose");
const User = require("../models/user.model");
const users = require("../data/users.json");
const Profesional = require("../models/profesional.model");
const profesionals = require("../data/profesionals.json");
const Restaurant = require("../models/restaurant.model");
const restaurants = require("../data/restaurants.json");
const Shop = require("../models/shop.model");
const shops = require("../data/shop.json");
const Recipe = require("../models/recipe.model");
const recipes = require("../data/recipes.json");
const Product = require("../models/product.model");
const products = require("../data/products.json")

require("../config/db.config");

mongoose.connection.once('open', () => {
    mongoose.connection.dropDatabase()
    .then(() => User.create(users))
    .then((users) => console.info(`Successfully created ${users.length} user`))
    .then(() => Profesional.create(profesionals))
    .then(() => console.info(`Successfully created ${profesionals.length} profesionals`))
    .then(() => Restaurant.create(restaurants))
    .then(() => console.info(`Successfully created ${restaurants.length} restaurants`))
    .then(() => Shop.create(shops))
    .then(() => console.info(`Successfully created ${shops.length} shops`))
    .then(() => Recipe.create(recipes))
    .then(() => console.info(`Successfully created ${recipes.length} recipes`))
    .then(() => Product.create(products))
    .then(() => console.info(`Successfully created ${products.length} products`))
    .catch((error) => console.error("An error ocurred running seeds", error))
    .then(() => mongoose.disconnect())
})