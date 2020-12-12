// Initialize global variables
const projectData = []; // Empty array used as endpoint for all routes initiated in server.js
const port = 8000;

// Include Node.js modules
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

// Initialize instance of the server using Express
const app = express();

// Setup server
app.use( express.static('website') ); // Specify app directory pointing to the project folder 
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( cors() ); // Allow cross origin functionality
app.listen( port, portInfo );

// Port info callback
function portInfo(){
	console.log(`Server Running`);
	console.log(`Server Running on localhost: ${port}` );
}

// Add POST route
app.post( '/upload', postData );

// Function that handles POST requests
function postData( request, response ){

	projectData.push( request.body );
	console.log( 'postData()' );
	console.log( request.body );
	response.send( request.body );

}

// Add GET route
app.get( '/all', getData );

// Function that handles GET requests
function getData( request, response ){

	console.log( 'getData()' );
	console.log( projectData );
	response.send( projectData );

}
