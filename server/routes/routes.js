//Imports
const router = require('express').Router();
const pages = require('../controllers/api-controller')



//Api routes & respective controllers

router.get('/dishes', pages.get_dishes);
router.get('/restaurants', pages.get_restaurants );
router.get('/login', pages.get_users);
router.get('/dish/:id', pages.get_dish_restaurant);
router.get('/restaurants/:id', pages.get_restaurantsBy_id);
router.get('/payment', pages.get_cards);

router.post('/register', pages.post_users);
router.post('/payment', pages.post_payment);



module.exports = router;