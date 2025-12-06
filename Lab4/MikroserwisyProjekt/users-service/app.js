const express = require('express');
const app = express();
const PORT = 3003;

const sequelize = require('./config/database');
const User = require('./models/User');

// We will need to read requests' bodies
app.use(express.json());

app.post('/api/register', async (req, res) => {

    try {

        // Deconstruct the request's body JSON
        const { email, password } = req.body;

        /**
         * For future reference, as I had some issues with wrapping my
         * head around this: newAccount is an object holding a newly
         * created record in the User table.
         * 
         * This is crutial when sending the response (read the comment
         * regarding res.(...).json(...) below!)
         */
        const newAccount = await User.create({
            email: email,
            password: password
        });

        /**
         * In response's body we should return the least amount of info
         * necessary for the reciever. For example, front-end doesn't need
         * password-hash-related info.
         * 
         * In regard to the comment above: newAccount is a record in the
         * DB (as a result it has an id, even though 'req.body' only
         * had 'email' and 'password' attributes).
         */
        res.status(201).json({
            id: newAccount.id,
            email: newAccount.email
        });

    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: "An account with this e-mail address already exists"
            });
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: "Invalid data",

                // Return a list of error messages
                details: error.errors.map(e => e.message)
            });
        }

        // Handle all other exceptions
        console.error(error);
        return res.status(500).json({ 
            error: "Unhandled exception" 
        });
    }
});

sequelize.sync().then(() => {
    console.log('Sequalize has been initialized.');

    app.listen(PORT, () => {
        console.log(`Microservice Users listens on port ${PORT}`);
    });
});
