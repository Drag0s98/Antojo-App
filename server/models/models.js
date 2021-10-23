const pool = require('../utils/postgress-sql.js');

const entries = {

    get_restaurants: async () => {
        let result;
        try {
            result = await pool.query(`
            SELECT id_restaurant, name, coordinates, address, phone, url, relevance, image, image2
                FROM public.restaurants;
            `)
        } catch (error) {
            console.log('Error at get restaurant' + error);
        }
        return result.rows;
    },
    get_dishes: async () => {
        let result;
        try {
            result = await pool.query(`
            SELECT id_dish, name, category, price, rating, offer
	            FROM public.dishes;
            `)
        } catch (error) {
            console.log('Error at get dishes' + error);
        }
        return result.rows;
    },
    get_users: async () => {
        let result;
        try {
            result = await pool.query(`
            SELECT id_user
            FROM public.users;
            `)
        } catch (error) {
            console.log('Error at get users' + error);
        }
        return result.rows;
    },
    get_restaurantBy_dish: async (param) => {
        let result;
        try {
            const sql_query = (`
            SELECT menu.id_dish, menu.id_restaurant
                FROM menu
                JOIN dishes ON dishes.id_dish = menu.id_dish
                JOIN restaurants ON restaurants.id_restaurant = menu.id_restaurant
                WHERE dishes.name=$1 
            `);
            result = await pool.query(sql_query, [param]);
        } catch (error) {
            console.log('Error at get restaurants by dishes' + error);
        }
        return result.rows;
    },
    get_dishesBy_name: async (name) => {
        let result;
        try {
            const sql_query = (`
            SELECT id_dish, name, category, price
            FROM public.dishes WHERE name=$1;
            `);
            result = await pool.query(sql_query, [name]);
        } catch (error) {
            console.log('Error at get dishes by name' + error);
        }
    },
    get_restaurantsBy_id: async (id) => {
        let result;
        try {
            const sql_query = (`
        SELECT name, coordinates, address, phone, url, relevance, image, image2
        FROM public.restaurants WHERE id_restaurant=$1;    
            `);
            result = await pool.query(sql_query, [id]);
        } catch (error) {
            console.log('Error at get restaurants by id ' + error);
        }
        return result.rows;
    },
    post_card: async (id_user, titular, encrypt_card_num, encrypt_cvv, encrypt_exp_date) => {
        let result;
        try {
            const sql_query = (` 
            INSERT INTO public.credit_card(
                id_user, titular, card_num, cvv, exp_date)
                VALUES ($1, $2, $3, $4, $5);
            `)
            result = await pool.query(sql_query, [id_user, titular, encrypt_card_num, encrypt_cvv, encrypt_exp_date])
        } catch (error) {
            console.log('Error to post card ' + error);
            return 'error'
        }
        return result.rows;
    },
    get_cards: async () => {
        let result;
        try {
            result = await pool.query(`SELECT * FROM public.credit_card ORDER BY id_card ASC`);
        } catch (error) {
            console.log('Error to get card ' + error);
        }
        return result.rows;
    },
    post_user_register: async ({ img, username, uid }) => {
        let result;
        try {
            let sql_query = (`
            INSERT INTO public.users(
                img, username, uid)
                VALUES ($1, $2, $3);
            `);
            result = await pool.query(sql_query, [img, username, uid])

        } catch (error) {
            console.log('Error to post user ' + error);
        }
        return result;
    }

};

module.exports = entries;