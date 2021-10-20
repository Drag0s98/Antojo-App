//Imports 

const pages = {
    get_restaurants: async (req, res) => {
        try {

        } catch (error) {
            console.log('Error at the get restaurants' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dishes: async (req, res) => {
        try {

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
            
        } catch (error) {
            console.log('Error at the post users' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    },
    get_dish_restaurant: async (req, res) => {
        try {
            console.log(req.params.id);
           
            res.status(200).json({ message: 'dish ' });
        } catch (error) {
            console.log('Error at the get dish by restaurant' + error);
            res.status(400).json({ message: 'Some error has ocurred' });
        }
    }
}


module.exports = pages;