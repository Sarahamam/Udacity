# Weather Journal App Project by Udacity

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Initial Project Files Setup
This Project will require writing most of the code in two files:
---->`server.js` file and 
---->`website/app.js` file 
For element references, we will use ----> `index.html` 
For styling the application, i will use ----> `style.css`.

## Testing 
Inorder to test the code as we go, we will use ----> `tests.js`.

## Development Strategy
1. Start by setting up the project environment 
   *Install Node, packages Express, Body-Parser, and Cors from the terminal 
   *Include them in 'server.js'
   *Create a server running on the port " ....."
   *Add a console.log() to the server callback function, and test that the server is running using Node in the terminal to run the file server.js
2. Add a GET route that returns the projectData object in your server code. Then, add a POST route that adds incoming data to projectData.
3. Acquire API credentials from OpenWeatherMap website
4. Chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app
5. Finally, chain another Promise that updates the UI dynamically

## Getting Started 
