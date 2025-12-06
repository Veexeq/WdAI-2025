const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './orders_db.sqlite'
});

module.exports = sequelize;
