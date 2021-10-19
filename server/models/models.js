const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/postgress-sql');

class restaurants extends Model { };
class dishes extends Model { };
class menu extends Model { };
class users extends Model { };

restaurants.init({
    id_restaurant: DataTypes.INTEGER,
    name: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    relevance: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    image2: DataTypes.TEXT,

}, {
    sequelize,
    modelName: 'restaurants',
    timestamps: false,
});
restaurants.removeAttribute('id');

dishes.init({
    id_dish: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'dishes',
    timestamps: false,
});
dishes.removeAttribute('id');

menu.init({
    id_restaurant: DataTypes.INTEGER,
    id_dish: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'menu',
    timestamps: false,
});
menu.removeAttribute('id');

users.init({
    id_user: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'users',
    timestamps: false,
});
users.removeAttribute('id');

module.exports = { restaurants, dishes, menu , users };