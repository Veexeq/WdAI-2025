const express = require('express');
const app = express();
const PORT = 3001;

// Simple test endpoint
app.get('/api/books', (req, res) => {
    res.json({message: "List of books here (microservice no. 1)."});
})

app.listen(PORT, () => {
    console.log(`Microservice Books works on port ${PORT}`);
});
