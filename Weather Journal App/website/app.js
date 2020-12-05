
/* Global Variables */
/*
const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');
const appID = '8fe35d267fec84174d32e7bac0493cea';
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
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
const getWeather = async (baseURL, zipInput , appID) => {
  const url = `http://${baseURL}zip=${zipInput}&appID=${appID}`
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
  const weatherData = await getWeather(baseURL, zipInput.value, appID)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userResponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

// Add element event listener with 'generate' id
const ele = document.getElementById('generate')
ele.addEventListener('click', handleClick)
*/
----------------------------------------------------------------------------------------------

/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '8fe35d267fec84174d32e7bac0493cea'; // Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const userInfo = document.getElementById('userInfo');

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();

    //get user input
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // add data to POST request
                postData('/add', { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: content });
            }).then(function() {
                // call updateUI to update browser content
                updateUI()
            }).catch(function(error) {
                console.log(error);
                alert('The zip code is invalid. Try again');

            });
        userInfo.reset();
    } else {
        generateBtn.classList.add('invalid');
    }


}

/* Function to GET Web API Data*/
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        // update new entry values
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.temp + ' degree C';
            document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};

// helper function to convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    if (kelvin < (0)) {
        return 'below absolute zero (0 K)';
    } else {
        return (kelvin - 273.15).toFixed(2);
    }
}
