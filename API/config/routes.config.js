const express = require('express');
const router = express.Router();
const products = require("../controllers/products.controller")
const restaurants = require("../controllers/restaurants.controller")
const shops = require("../controllers/shops.controller")
const recipes = require("../controllers/recipes.controller")
const profesionals = require("../controllers/profesionals.controller")
const users = require("../controllers/users.controller")
const product = require("../middlewares/product.mid")
const restaurant = require("../middlewares/restaurant.mid")
const shop = require("../middlewares/shop.mid")
const recipe = require("../middlewares/recipe.mid")
const profesional = require("../middlewares/profesional.mid")
const user = require("../middlewares/user.mid")

/* Products */

router.post('/products', products.create)
router.get('/products', products.list)
router.get('/products/:id', product.exist, products.detail)
router.put('/products/:id', product.exist, products.edit)
router.delete('/products/:id', product.exist, products.delete)

/* Restaurants */

router.post('/restaurants', restaurants.create)
router.get('/restaurants', restaurants.list)
router.get('/restaurants/:id', restaurant.exist, restaurants.detail)
router.put('/restaurants/:id', restaurant.exist, restaurants.edit)
router.delete('/restaurants/:id', restaurant.exist, restaurants.delete)

/* Shops */

router.post('/shops', shops.create)
router.get('/shops', shops.list)
router.get('/shops/:id', shop.exist, shops.detail)
router.put('/shops/:id', shop.exist, shops.edit)
router.delete('/shops/:id', shop.exist, shops.delete)

/* Recipes */

router.post('/recipes', recipes.create)
router.get('/recipes', recipes.list)
router.get('/recipes/:id', recipe.exist, recipes.detail)
router.put('/recipes/:id', recipe.exist, recipes.edit)
router.delete('/recipes/:id', recipe.exist, recipes.delete)

/* Profesionals */

router.post('/profesionals', profesionals.create)
router.get('/profesionals', profesionals.list)
router.get('/profesionals/:id', profesional.exist, profesionals.detail)
router.put('/profesionals/:id', profesional.exist, profesionals.edit)
router.delete('/profesionals/:id', profesional.exist, profesionals.delete)

/* Users */

router.post('/users', users.create)
router.get('/profile', users.get)
router.put('/users/:id', user.exist, users.edit)
router.delete('/users/:id', user.exist, users.delete)

module.exports = router;