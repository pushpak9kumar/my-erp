const express = require('express');
const cors = require('cors');
const app = express();

//Middle-rus on every request before ypur routes
app.use(cors());// allow React app to connect
app.use(express.json());//understand JSON in request body

//Your first route-test it works
app.get('/api/hello', (req,res) => {
    res.json({message: 'ERP backend is running!'});
});

//Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
