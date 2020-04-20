// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Dependencies
const bodyParser = require('body-parser');

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
app.use(express.static('website'));

const port = 3000;

// Setup Server
const server = app.listen(port, () => {
    // Callback to debug
    console.log(`running on localhost: ${port}`)
});

// GET method route
const getRoute = app.get('/all', (req, res) => {
    // Callback function to complete GET '/all'
    res.send(projectData);
})

// POST method route
app.post('/api', (req, res) => {
    // Initialize all route with a callback function
    projectData.temp = req.body.main.temp;
    //console.log(req.body);
    res.send({
        message: "POST Received"
    });
})

app.post('/input', (req, res) => {
    projectData.date = req.body.date;
    projectData.userR = req.body.userR;
    console.log(projectData);
    res.send(projectData);
})