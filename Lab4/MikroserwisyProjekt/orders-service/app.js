const express = require('express');
const app = express();
const PORT = 3002;

const sequelize = require('./config/database');
const Order = require('./models/Order');
const jwt = require('jsonwebtoken');

app.use(express.json());

/**
 * Custom-made, simple middleware for the authentication. 
 * 
 * It parses relevant header from req (req.headers['authorization']), then
 * it extracts the token from there, and verify whether it's valid.
 * 
 * next() method is used to restore flow in the backend. If omitted, we'd
 * never leave this function (as we don't use .json() or .send() here).  
 * 
 * If in doubt about how this middleware is used, refer to the comment 
 * above the POST request for endpoint '/api/orders', it will make more sense. 
 */
function authenticateToken(req, res, next) {

    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            error: 'Unauthorized: Missing token'
        });
    }

    // tokenHeader has a format "Bearer <TOKEN>"
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, 'mock_secret_key', (err, user) => {

        if (err) {
            return res.status(403).json({
                error: 'Forbidden: Invalid token'
            });
        }

        /**
         * Passing Context mechanism:
         * 
         * Whatever 'req' was (it depends on the request this middleware
         * was invoked from), we add an 'user' field to it. At this point no errors
         * were encountered, and the endpoint we were processing will continue its logic
         * having a request with an additional 'user' field with a correct client info
         * (client being the token bearer).
         */
        req.user = user;

        /**
         * This method refers to a 'to-do list' defined in an endpoint (see
         * documentation regarding POST of '/api/orders'). We check this middleware in the
         * first place, then proceed with "next()" method on the list, being the actual logic.
         */
        next();
    });
}

sequelize.sync().then(() => {
    console.log('Sequelize has been initialized.');

    app.listen(PORT, () => {
        console.log(`Microservice Orders is listening on port ${PORT}`);
    });
});
