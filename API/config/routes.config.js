const express = require('express');
const router = express.Router();
const products = require("../controllers/products.controller")
const restaurants = require("../controllers/restaurants.controller")
const shops = require("../controllers/shops.controller")
const recipes = require("../controllers/recipes.controller")

/* Products */

router.get('/products', products.list)
router.get('/products/:id', products.detail)

/* Restaurants */

router.get('/restaurants', restaurants.list)
router.get('/restaurants/:id', restaurants.detail)

/* Shops */

router.get('/shops', shops.list)
router.get('/shops/:id', shops.detail)

/* Recipes */

router.get('/recipes', recipes.list)
router.get('/recipes/:id', recipes.detail)

/* Profesionals */

router.get('/profesionals', profesionals.list)
router.get('/profesionals/:id', profesionals.detail)

module.exports = router;