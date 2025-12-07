const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users_db.sqlite'
});

module.exports = sequelize;
