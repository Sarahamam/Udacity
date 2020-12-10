// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Express Environment
// Require Express to run server and routes
const express = require('express');
//Project Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
//Project Dependencies
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route
app.get('/data', (req, res) => {
  console.log('GET request received');
  res.send(projectData);
});

// POST route
app.post('/', (req, res) => {
  projectData.date = req.body.date;
  projectData.temperature = req.body.main.temp;
  projectData.feelings = req.body.feelings;
  console.log('POST request received');
  res.end();
});

// Setup Server
const server = app.listen(process.env.PORT || 8000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
