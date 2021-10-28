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
            SELECT id_dish, name, category, price, rating, offer, image_web_dish
	            FROM public.dishes;
            `)
        } catch (error) {
            console.log('Error at get dishes' + error);
        }
        return result.rows;
    },
    get_users: async (email) => {
        let result;
        try {
            const sql_query = (`
            SELECT id_user
            FROM public.users WHERE email=$1;
            `)
            result = await pool.query(sql_query, [email])
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
    post_card: async (uid, titular, encrypt_card_num, encrypt_cvv, encrypt_exp_date, card_name) => {
        let result;
        try {
            const sql_query = (` 
            INSERT INTO public.credit_card(
                id_user, titular, card_num, cvv, exp_date, card_name)
                VALUES ($1, $2, $3, $4, $5, $6);
            `)
            result = await pool.query(sql_query, [uid, titular, encrypt_card_num, encrypt_cvv, encrypt_exp_date, card_name])
        } catch (error) {
            console.log('Error to post card ' + error);
            return 'error'
        }
        return result.rows;
    },
    get_cards: async (id) => {
        let result;
        try {
            const sql_query = (` 
            SELECT * FROM public.credit_card WHERE id_user= $1;
            `)
            result = await pool.query(sql_query, [id])
        } catch (error) {
            console.log('Error to get card ' + error);
        }
        return result.rows;
    },
    post_user_register: async ({ uidForm, emailForm }) => {
        let result;
        try {
            let sql_query = (`
            INSERT INTO public.users(
                uid, email)
                VALUES ($1, $2);
            `);
            result = await pool.query(sql_query, [uidForm, emailForm])
        } catch (error) {
            console.log('Error to post user ' + error);
        }
        return result;
    },
    get_dishesBy_category: async (category) => {
        let result;
        try {
            let sql_query = (`
            SELECT id_dish, name, category, price, rating, offer, image_web_dish
            FROM public.dishes WHERE category=$1
            `)
            result = await pool.query(sql_query, [category]);
        } catch (error) {
            console.log('Error to get dishes by category ' + error);
        }
        return result.rows;
    },
    get_addressBy_user: async (id) => {
        let result;
        try {
            let sql_query = (`
            SELECT name, domicile, domicile_num, domicile_piso
            FROM public.users WHERE id_user=$1
            `)
            result = await pool.query(sql_query, [id])
        } catch (error) {
            console.log('Error to get address by user ' + error);
        }
        return result.rows;
    },
    post_addressBy_user: async ({ id_user, domicile, domicile_num, domicile_piso }) => {
        let result;
        try {
            let sql_query = (` 
            UPDATE public.users
	            SET domicile=$2, domicile_num=$3, domicile_piso=$4
	            WHERE id_user=$1;
            `)
            result = await pool.query(sql_query, [id_user, domicile, domicile_num, domicile_piso]);
        } catch (error) {
            console.log('Error to post addres by user ' + error);
        }
        return result;
    },
    get_restaurantsBy_name: async (name) => {
        let result;
        try {
            const sql_query = (`
        SELECT name, coordinates, address, phone, url, relevance, image, image2
        FROM public.restaurants WHERE name=$1;    
            `);
            result = await pool.query(sql_query, [name]);
        } catch (error) {
            console.log('Error at get restaurants by name' + error);
        }
        return result.rows;
    },
    post_order: async ({ id_user, dish_name, price, cantidad, image }) => {
        let result;
        try {
            const sql_query = (`
            INSERT INTO public.orders(
                id_user, dish_name, price, cantidad, image)
                VALUES ($1, $2, $3, $4, $5);
            `);
            result = await pool.query(sql_query, [id_user, dish_name, price, cantidad, image]);
        } catch (error) {
            console.log('Error to post order ' + error);
        }
    },
    get_orders: async (id) => {
        let result;
        try {
            const sql_query = (`
            SELECT id_order, id_user, dish_name, created_at, cantidad, price, image
	            FROM public.orders WHERE id_user=$1;
            `)
            result = await pool.query(sql_query, [id])
        } catch (error) {
            console.log('Error to get orders ' + error);
        }
        return result.rows;
    }
};

module.exports = entries;