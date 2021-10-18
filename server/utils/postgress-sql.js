const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.SQL_URI,
    {
        dialectOptions: {
            ssl:{
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize;