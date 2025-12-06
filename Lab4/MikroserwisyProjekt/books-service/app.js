const express = require('express');
const app = express();
const PORT = 3001;

// Import a Book model which will is the basis for the
// DB Schema of this microserver
const Book = require('./models/Book');

// This is the 'connection' with the DB. Sequelize will
// handle creating the DB Schema as well as adding records,
// modifying them etc.
const sequelize = require('./config/database');

// Synchronize the backend with the DB, and only then start
// listening on port 'PORT'
sequelize.sync().then(() => {
    
    console.log('DB and DB Schema for Books has been created.');

    // Start listening
    app.listen(PORT, () => {
        console.log(`Microservice Books works on port ${PORT}`);
    });
});
