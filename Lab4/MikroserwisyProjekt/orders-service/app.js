const express = require('express');
const app = express();
const PORT = 3002;

const sequelize = require('./config/database');
const Order = require('./models/Order');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
         * 
         * 'user' on the right is read from the payload of the token (remember, sufficient
         * data has been encoded there for the sake of this scenario, we can now retrieve all
         * of the necessary info about the token bearer).
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

/**
 * This comment is supplemenets the logic of authenicateToken middleware.
 * 
 * This endpoint takes two methods, they define a 'to-do list' of logic that handle the request. 
 * First of all, 'req' goes to authenticateToken(). This function can either:
 * 1. return res.(...).json(...), which interrupts the 'function queue' (as a result we never go into
 * the async arrow-function that follows the middleware). We handle incorrect JWT there.
 * 2. authenticate the client via validating the token
 * 
 * The result of the latter is that an extended 'req' object (it's now got the 'user' attribute)
 * goes into the arrow function, because at the end of 'authenticateToken' we call next(), which is
 * a pointer to the another method on the 'to-do list' below.
 * 
 * Having sufficient info about the user from the token, we can perform the actual logic, that is 
 * place a new order.
 */
app.post('/api/orders', authenticateToken, async (req, res) => {

    try {

        // 'user' field is located in the request's headers
        const userId = req.user.sub;
        const { bookId, quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                error: "Quantity must be a positive integer"
            });
        }

        /**
         * Send a HTTP request to 'books-service' via Axios. There is no need
         * to store it, as the response doesn't contain any relevant information.
         * 
         * What is important, is whether this will resolve in a 200: OK status code,
         * or 404: Not Found status code. If the latter happens, Axios will automatically
         * throw an error (it happens when the status code is 4xx, 5xx).
         */
        await axios.get(`http://localhost:3001/api/books/${bookId}`);
        

        // For the purpose of this mock, we assume all books cost 1. 
        // In Book.js a 'value' field is not defined.
        const totalPrice = quantity;

        const newOrder = await Order.create({
            userId: userId,
            bookId: bookId,
            quantity: quantity,
            totalPrice: totalPrice
        });

        return res.status(201).json(newOrder);

    } catch (error) {

        if (axios.isAxiosError(error)) {

            // We have gotten a response from the books-service
            if (error.response && error.response.status === 404) {
                return res.status(404).json({
                    error: 'Book not found in books-service'
                });
            } 
        }

        // If some kind of other error happend, handle it as well
        return res.status(500).json({
            error: error.message
        });
    }
});

/**
 * GET endpoint: respond with all orders of user whose id matches with userId
 * 1. Authenticate: verify the token using authenticateToken. If it's not expired
 * or forged, we have 'req.user.sub' storing user's ID in the DB.
 * 2. Authorization: check if the 'userId' matches the ID of the user sending
 * the request.
 */
app.get('/api/orders/:userId', authenticateToken, async (req, res) => {

    try {

        const userId = req.params.userId.toString();
        const tokenId = req.user.sub.toString();
        
        if (userId !== tokenId) {
            return res.status(403).json({
                error: "Forbidden",
                debug: `userId: ${userId} !== tokenId ${tokenId}`
            });
        }

        const orders = await Order.findAll({
            where: {
                userId: userId
            }
        });

        return res.status(200).json(orders);
    
    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
});

app.delete('/api/orders/:orderId', authenticateToken, async (req, res) => {

    try {

        const orderId = req.params.orderId;
        const orderRecord = await Order.findByPk(orderId);

        if (!orderRecord) {
            return res.status(404).json({
                error: "Record of this ID not found in the DB"
            });
        }

        const recordUserId = orderRecord.userId.toString();
        const tokenId = req.user.sub.toString();
        
        // Allow deleting only if a valid user is logged in (the token
        // of the user whose order will be deleted should be passed)
        if (recordUserId !== tokenId) {
            return res.status(403).json({
                error: 'Forbidden'
            });
        }

        const numOfDeletedRecords = await Order.destroy({
            where: { id: orderId }
        });

        if (numOfDeletedRecords === 0) {
            return res.status(404).send();
        }

        return res.status(204).send();

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }

});

sequelize.sync().then(() => {
    console.log('Sequelize has been initialized.');

    app.listen(PORT, () => {
        console.log(`Microservice Orders is listening on port ${PORT}`);
    });
});
