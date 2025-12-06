const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// For storing hashes in the DB, not passowrds in plaintext
const bcrypt = require('bcrypt');

/* 
 * This User model (representing a table in the DB) has three
 * arguments in .define():
 * 1. Name of the table
 * 2. Description of the table (schema)
 * 3. Properties (options) of the model.
 * 
 * In the third argument we can define 'hooks', which are
 * used to alter the logic of some method, if a specific
 * scenario applies.
*/
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,

        // Prevent duplicate accounts
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        // This hook is a built-in method that will be
        // invoked after we call 'User.create(...)'
        beforeCreate: async (user) => {

            /**
             * Hashing works (in general) based on these principles:
             * 1. Add randomly generated 'salt' to a plaintext (so that 
             * same passwords don't generate same hashes)
             * 2. Hash the plaintext 2^{saltRounds} times
             */
            const saltRounds = 10;

            /**
             * 'user' holds all data to be inserted into the DB (all columns)
             * 
             * Substitue user.password's plaintext with a hash in a specific form
             * that preserves the salt used in hashing
             * (so that we can hash the password inputed in the login page and
             * compare the result with the hash existing in the DB).
             */
            user.password = await bcrypt.hash(user.password, saltRounds);
        } 
    }
});

module.exports = User
