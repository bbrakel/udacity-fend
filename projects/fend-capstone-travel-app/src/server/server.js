// Setup empty JS object to act as endpoint for all routes
let apiData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

var path = require('path');
const https = require('https');
const http = require('http');

/* Dependencies */
const dotenv = require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Setup Server
const port = process.env.PORT


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

app.listen(port, () => {
  console.log(`running on localhost: ${port}`)
});

const options = {
  method: 'get',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}

app.post('/geoAPI', async (req, res) => {
  const response = await fetch(`${process.env.GEO_URL}placename=${req.body.input}&username=${process.env.GEO_USERNAME}`, options)
  res.send(await response.json())
})

app.post('/pixAPI', async (req, res) => {
  const response = await fetch(`${process.env.PIX_URL}key=${process.env.PIX_KEY}&q=${req.body.input}`)
  res.send(await response.json())
})

app.post('/dsAPI', async (req, res) => {
  const response = await fetch(`${process.env.DS_URL}${process.env.DS_KEY}/${req.body.lat.toFixed(4)},${req.body.long.toFixed(4)},${req.body.time}`)
  res.send(await response.json())
})