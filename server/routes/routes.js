//Imports
const router = require('express').Router();
const pages = require('../controllers/api-controller')



//Api routes & respective controllers

router.get('/dishes')
router.get('/restaurants')
router.get('/login')

router.post('/register')




module.exports = router;