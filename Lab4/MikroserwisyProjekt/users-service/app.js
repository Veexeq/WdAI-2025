const express = require('express');
const app = express();
const PORT = 3003;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        return res.status(201).json({
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

app.post('/api/login', async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        /**
         * If the credentials match, we generate a JWT to authorize
         * further operations (remember that HTTP is stateless).
         * 
         * JSON Web Token (JWT) matches the following pattern: A.B.C, where:
         * 1. 'A' is the header section, it consists of technical info about the
         * algorithm used in signing the token etc.
         * 2. 'B' is the payload, i.e. a JSON object that stores information 
         * necessaary to identify the user associated with this specific JWT
         * alongside other things (see note below).
         * 3. 'C' is the signature, which plays the role of a private key.
         * 
         * JWT is used in authentication in following manner:
         * 1. Parse the technical info in headers
         * 2. Identify the target via the payload
         * 3. See whether the signature of this token matches the 
         * signature of the target stored on the server's DB
         * 
         * IMPORTANT: header and payload is encoded, not hashed. Everyone can
         * decode it and retrieve the data inside. Therefore, only public information
         * (like ids) necessary for user recognition should be stored in the paylod!
         * 
         * Note: payload does not only consist of the info necessary for 
         * recognizing the user. Its attributes are called 'claims' and the standard
         * payload looks something like this:
         * {
         *  sub: subjectID,
         *  iat: issuedAt, (when was the token created)
         *  exp: expirationDate
         * }
         * 
         * Method info:
         * jwt.sign(...) is most commonly used with three args: 
         * payload, secretKey, options
         */
        const token = jwt.sign(
            { sub: user.id },
            'mock_secret_key',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Logged in succesfully',
            token: token
        });

    } catch (error) {

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
