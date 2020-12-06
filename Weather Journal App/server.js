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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post Route
// Add POST route
app.post( '/upload', postData );

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Function that handles POST requests
function postData( request, response ){

	projectData.push( request.body );
	console.log( 'postData()' );
	console.log( request.body );
	response.send( request.body );

// Add GET route
app.get( '/all', getData );

// Function that handles GET requests
function getData( request, response ){

	console.log( 'getData()' );
	console.log( projectData );
	response.send( projectData );

}
// Setup Server
/*
const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
*/
// Setup server
const port = 8000;
app.use( express.static('www') ); // Specify app directory
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() ); // Allow cross origin functionality
app.listen( port, portInfo );

// Port info callback
function portInfo(){
	console.log( `Server Running on Port: ${port}` );
}
