//Imports 
const db = require('../models/models');


const pages = {
    get_restaurants: async (req, res) => {
        try {
            const data = await db.get_restaurants();
            res.status(200).json(data);
        } catch (error) {
            console.log('Error at the get restaurants' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dishes: async (req, res) => {
        try {
            const data = await db.get_dishes();
            res.status(200).json(data);
        } catch (error) {
            console.log('Error at the get dishes' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_users: async (req, res) => {
        try {

        } catch (error) {
            console.log('Error at the get users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    post_users: async (req, res) => {
        try {
            const data = await db.get_users();
            res.status(200).json(data);
        } catch (error) {
            console.log('Error at the post users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dish_restaurant: async (req, res) => {
        try {
            let param = req.params.id;
            const data = await db.get_restaurantBy_dish(param)
            res.status(200).json(data);
        } catch (error) {
            console.log('Error at the get dish by restaurant' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_restaurantsBy_id: async (req, res) => {
        try {
            let param = req.params.id;
            const data = await db.get_restaurantsBy_id(param)
            res.status(200).json(data)
        } catch (error) {
            console.log('Error at the get restaurant by id' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    }
}


module.exports = pages;