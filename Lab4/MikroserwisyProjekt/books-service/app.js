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

// First middleware, parse JSONs in POST reqs
app.use(express.json());

// ENDPOINT: 'add book'
app.post('/api/books', async (req, res) => {

    try {

        // Deconstruct the body
        const { title, author, year } = req.body;

        // Create the book asynchronously to prevent
        // server from freezing (newBook is initially a Promise)
        const newBook = await Book.create({
            title: title,
            author: author,
            year: year
        });

        // Send the response with an adequate HTTP code
        // and a newBook body in JSON
        res.status(201)
           .json(newBook);

    } catch (error) {
        
        // Handle error in a general way for now
        res.status(500)
           .json({
                error: error.message
            });
    }
});

// Synchronize the backend with the DB, and only then start
// listening on port 'PORT'
sequelize.sync().then(() => {
    
    console.log('DB and DB Schema for Books has been created.');

    // Start listening
    app.listen(PORT, () => {
        console.log(`Microservice Books works on port ${PORT}`);
    });
});
