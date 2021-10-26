//Imports
const router = require('express').Router();
const pages = require('../controllers/api-controller')



//Api routes & respective controllers

router.get('/dishes', pages.get_dishes);
router.get('/restaurants', pages.get_restaurants );
router.get('/login/:id', pages.get_users);
router.get('/dish/:id', pages.get_dish_restaurant);
router.get('/restaurants/:id', pages.get_restaurantsBy_id);
router.get('/payment/:id', pages.get_cards);
router.get('/category/:category', pages.get_dishesBy_category);
router.get('/address/:id', pages.get_addressBy_id);
router.get('/more/:id', pages.get_restaurantBy_name)

router.post('/register', pages.post_users_register);
router.post('/payment', pages.post_payment);
router.post('/address', pages.post_addressBy_user);



module.exports = router;