const express = require('express');
const app = express();
const PORT = 3001;

// Simple test endpoint
app.get('/api/books', (req, res) => {
    console.log("Sent books request.");
    // 'req' is the variable holdinig info regarding request, while
    // 'res' is the pre-filled object with response. We modify the response
    // to our liking, rather than create it from scratch. 
    //
    // Example of modifying the default behavior. Normally if the handler (app.get in this case)
    // executes all of its logic and doesn't throw an exception, status code is 200.
    // res.status(201);
    //
    // We modify the json of the response (there is no default json in contrast to above text).
    // VERY IMPORTANT: res.json(...) is A TERMINAL METHOD. It 'seals' the response and sends it,
    // we can't do anything below this.
    // An alternative method for sending a response is res.send(...) which doesn't force
    // a JSON format (we can send a HTML tag for example).
    res.json({message: "List of books here (microservice no. 1)."});
})

app.listen(PORT, () => {
    console.log(`Microservice Books works on port ${PORT}`);
});
