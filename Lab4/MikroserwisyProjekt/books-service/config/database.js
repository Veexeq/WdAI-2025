// Import 'Sequelize' class from the Sequelize library
const { Sequelize } = require('sequelize');

// Create a sequelize object (instance)
const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: './books_db.sqlite'
    }
);

// Export this object for outside use
module.exports = sequelize;
