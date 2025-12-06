const express = require('express');
const app = express();
const PORT = 3002;

const sequelize = require('./config/database');
const Order = require('./models/Order');

app.use(express.json());

sequelize.sync().then(() => {
    console.log('Sequelize has been initialized.');

    app.listen(PORT, () => {
        console.log(`Microservice Orders is listening on port ${PORT}`);
    });
});