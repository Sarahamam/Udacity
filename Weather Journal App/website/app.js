// OpenWeatherMap API Credentials
//const personalKey = '8fe35d267fec84174d32e7bac0493cea';
//const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
/* Global Variables */
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function event listener 
generate.addEventListener('click', function () {   
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&APPID=8fe35d267fec84174d32e7bac0493cea&units=imperial';
    const newZip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    if (newZip== "") {alert('Enter your Zip code');return false}
    getWeather(baseUrl,newZip,apiKey)
    .then(function (data) {
        postData('/add', { date: newDate, temp: data.main.temp, content })
    }).then(function (newData) {
        updateUI()
    })
})

// Function to GET data from API
const getWeather = async (baseUrl,newZip,apiKey) => {    
   
    const res = await fetch(baseUrl+newZip+apiKey);    
    try {
        const data = await res.json(); 
        console.log(data);
        if (data.message){
            alert(data.message);
            return false
        }  
        return data;
    } catch (error) {
            console.log("error",error);
            return false;
    }
    
}
// Function to POST data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch (error) {
        console.log("Error in PostData", error);
    }
}
// Function to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = `Today's date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temp} ° Fahrenheit`;
    document.getElementById('content').innerHTML = `You're feeling: ${allData.content} today`;
    }
    catch (error) {
        console.log("error", error);
    }
}; 
/* Global Project Variables */
/*
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const appid = '8fe35d267fec84174d32e7bac0493cea';
const zipInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')
const postURL = 'http://localhost:8000'
const getURL = 'http://localhost:8000/all'

// Dynamically create a new JS date instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Call function to fetch via OpenWeatherMap
const getWeather = async (baseURL, zip = '94712,us', api) => {
  const url = `http://${baseURL}zip=${zip}&appid=${api}`
  const response = await fetch(url)
  let jsonResponse = await response.json()
  return jsonResponse
}

// User-input post data function
const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}

// Update UI function 
const updateUI = async () => {
  const response = await fetch(getURL)
  const jsonResponse = await response.json()
  dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`
  contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.userResponse}`
  tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonResponse.temperature}`
}

// Event handler handleClick
const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zipInput.value, appid)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

// Add element event listener with 'generate' id
const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)
*/

 
