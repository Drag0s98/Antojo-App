//Imports 
const { restaurants, dishes, menu, users } = require('../models/models');

const pages = {
    get_restaurants: async (req, res) => {
        try {
            const res = await restaurants.findAll();
            res.status(200).json({ message: 'restaurants' });
        } catch (error) {
            console.log('Error at the get restaurants' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dishes: async (req, res) => {
        try {
            const res = dishes.findAll();
            res.status(200).json({ message: 'dishes' });
        } catch (error) {
            console.log('Error at the get dishes' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_users: async (req, res) => {
        try {
            const res = await users.findAll();
            res.status(200).json({ message: 'users' });
        } catch (error) {
            console.log('Error at the get users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    post_users: async(req, res) => {
        try {
            let data = req.body;
            res.status(201).json({ message: 'users' });
        } catch (error) {
            console.log('Error at the post users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    }
}


module.exports = pages;