const dotenv = require('dotenv');
dotenv.config();
const regeneratorRuntime = require("regenerator-runtime")

const express = require('express');
const bodyParser = require('body-parser');

const path = require('path')
const mockAPIResponse = require('./mockAPI.js')

const aylien = require('aylien_textapi');
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
})

let userInput = {}

// START SERVER
const app = express();

/* Start Middleware*/
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* End Middleware*/

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

app.post('/api', function (req, res) {
  textapi.language(req.body, (error, response) => {
    if (error === null) {
      res.send(response)
    }
  })
})