const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },

    // Individual elements' prices may change in the future,
    // thus it is imperative that DB preserves the order's value at checkout
    totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = Order;
