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

// GET-ENDPOINT: 'select all books'
app.get('/api/books', async (req, res) => {

    try {

        const allBooks = await Book.findAll();

        res.status(200)
           .json(allBooks);

    } catch (error) {

        // Handle error in a general way for now
        res.status(500)
           .json({ error: error.message });
    }
});

// GET-ENDPOINT: 'select a specific book'
app.get('/api/books/:id', async (req, res) => {

    try {

        // The endpoint was defined as ':id', so the
        // req.params JSON will hold { id: '5' }
        const id = req.params.id;
        const book = await Book.findByPk(id);

        if (!book) {
            
            /*
             * Without 'return' this function will not terminate,
             * it would try to send another header response below and 
             * cause an error:
             *
             * "Error [ERR_HTTP_HEADERS_SENT]: 
             * Cannot set headers after they are sent to the client"
            */
            return res.status(404)
               .json({error: "The book doesn't exist."});
        }

        res.status(200)
           .json(book);

    } catch (error) {

        res.status(500)
           .json({ error: error.message });
    }
})

// POST-ENDPOINT: 'add book'
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
        
        res.status(500)
           .json({ error: error.message });
    }
});

// DELETE-ENDPOINT: 'delete a record'
app.delete('/api/books/:id', async (req, res) => {

    try {

        const bookId = req.params.id;
        const numOfDestroyedRecords = await Book.destroy({
            where: { id: bookId }
        });

        /*
         * .send() is an another method used to
         * send a response to the client.
         * As opposed to .json(), it doesn't send a
         * body JSON, which is not required here.
        */

        if (numOfDestroyedRecords === 0) {
            return res.status(404)
                      .send();
        } 
        
        res.status(204)
           .send();

    } catch (error) {

        res.status(500)
           .json({ error: error.message });
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
