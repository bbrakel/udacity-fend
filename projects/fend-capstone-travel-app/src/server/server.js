// Setup empty JS object to act as endpoint for all routes
let apiData = {};

// Require Express to run server and routes
const express = require('express');
const https = require('https');
const http = require('http');

/* Dependencies */
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
var apiAuth = process.env.API_KEY

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('../dist'));


// Setup Server
const port = 8080;

const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
})

// POST method route
app.post('/', function (req, res) {
    res.send({
        "message": "POST request to the homepage"
    })
})

app.post('/apidata', function (req, res) {
    let apiData = req.body.postalCodes[0];
    res.send({
        "message": "SERVER(localhost:8080), DATA STORED",
        "data": apiData
    });
})