const express = require('express');
const app = express();
const PORT = 3003;

const sequelize = require('./config/database');
const User = require('./models/User');

// We will need to read requests' bodies
app.use(express.json());

sequelize.sync().then(() => {
    console.log('Sequalize has been initialized.');

    app.listen(PORT, () => {
        console.log(`Microservice Users listens on port ${PORT}`);
    });
});