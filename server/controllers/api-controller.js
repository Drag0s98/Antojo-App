//Imports 
const db = require('../models/models');
const bcrypt = require('bcryptjs');


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
            let response = await db.get_users(req.params.id);
            res.status(200).json(response)
        } catch (error) {
            console.log('Error at the get users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    post_users_register: async (req, res) => {
        try {
            console.log(req.body);
            db.post_user_register(req.body)
            res.status(200).json({ message: 'register complete' });
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
    },
    post_payment: async (req, res) => {
        try {
            //Recojo las variables
            const uid = req.body.uid
            const titular = req.body.titular
            const card_num = req.body.card_num
            const cvv = req.body.cvv
            const exp_date = req.body.exp_date
            const card_name = req.body.card_name
            // Comienzo el proceso de encriptacion
            let salt = await bcrypt.genSalt(10);
            let encrypt_card_num = await bcrypt.hash(card_num, salt);
            let encrypt_cvv = await bcrypt.hash(cvv, salt);
            let encrypt_exp_date = await bcrypt.hash(exp_date, salt);
            let response = await db.post_card(titular, encrypt_card_num, encrypt_cvv, encrypt_exp_date, card_name, uid)
            response === 'error' ? res.status(401).json({ message: 'Some error has ocurred ' }) : res.status(201).json({ message: "post succes" })
        } catch (error) {
            console.log('Error at the post card' + error);
            res.status(401).json({ message: 'Some error has ocurred' });
        }
    },
    get_cards: async (req, res) => {
        try {
            let response = await db.get_cards();
            console.log(response);
            res.status(200).json(response);
        } catch (error) {
            console.log('Error at the get cards' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dishesBy_category: async (req, res) => {
        try {
            let response = await db.get_dishesBy_category(req.params.category);
            res.status(200).json(response);

        } catch (error) {
            console.log('Error at the get dishes by category' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_addressBy_id: async (req, res) => {
        try {
            let response = await db.get_addressBy_user(req.params.id);
            res.status(200).json(response)
        } catch (error) {
            console.log('Error at get addres by user ' + error);
            res.status(400).json({ message: 'Some error has ocurred' })
        }
    },
    post_addressBy_user: async (req, res) => {
        try {
            await db.post_addressBy_user(req.body);
            res.status(200).json({ message: 'Success Post' })
        } catch (error) {
            console.log('Error at post addres by user ' + error);
            res.status(400).json({ message: 'Some error has ocurred' })
        }
    }
}


module.exports = pages;