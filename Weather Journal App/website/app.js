/* API credentials*/
const apiKey = '8fe35d267fec84174d32e7bac0493cea';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';

/* Helper Functions(Internal) */
const createApiUrl = zip => finalApiUrl = `${apiUrl}zip=${zip}&appid=${apiKey}`;
const kelvinToCelsius = kelvins => Math.round(Number(kelvins) - 273.15); 
const kelvinToFahrenheit = kelvins => Math.round((Number(kelvins) - 273.15) * 9/5 + 32);
const convertDegrees = num => document.getElementById('degree_units').checked ? kelvinToFahrenheit(num)+" &deg;F" : kelvinToCelsius(num)+" &deg;C";
const appendLeadingZeroes = (n) => n <= 9 ? "0" + n : n;
const formatDate = (date) => `${appendLeadingZeroes(date.getMonth() + 1)}-${appendLeadingZeroes(date.getDate())}-${date.getFullYear()}`;


/* Get Journal Records (Project Data) from the server*/
const getJournalRecords = async (url = '') => {
  const journalRecords = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  try {
    const records = await journalRecords.json();
    return records;
  } catch(error) {
    console.log('getJournalRecords', error);
  }
  
} // end getJournalRecords

/* GET the Weather from OpenWeatherMap API */
const getWeatherData = async (url = '') => {
  const weatherData = await fetch(url);

  try {
    if (weatherData.status !== 200) {
      throw new Error("Not 200 response")
    }
    else {
      const data = await weatherData.json();
      return data;
    }
  } catch(error){
    console.log('getWeatherData', error);
    alert('Invalid API request, check the Zip code');
    return false;
  }
} //end getWeatherData

/* POST a Record to the Journal(on local server) */
const postJournalRecord = async (url = '', data = {}) => {
  const returnedJournal = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const res = await returnedJournal.json();
    return true;
  } catch(error) {
    console.log('postJournalRecord', error);
    return false;
  }
} //end postJournalRecord

/* Add the Journal Data to the Page (Update UI) */
const updateUI = (items) => {
  let htmlData = items.map((item => {
        return `<div class="journal-record">
                  <span class="label">Date:</span>
                  <div class="jr-date">${item.date}</div>
                  
                  <span class="label">Temperature:</span>
                  <div data-kelvins='${item.temp}' class="jr-temp">${convertDegrees(item.temp)}</div>
                  
                  <span class="label">Description:</span>
                  <div class="jr-content">${item.content}</div>
                </div>`;
  })).join(" ");

  document.querySelector('.output-block').innerHTML = htmlData;

}


/* ===== Combination of above Functions using Promises===== */

/* Called by Event Listener => Creates a new Journal Record and Add to Journal */
const addRecordToJournal = () => {

  // get the User Data
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  

  // a little bit of  validation
  if(!Number.isInteger(Number(zipCode)) || zipCode.length != 5) {
    alert('The zip code is empty or incorect(5 digits).\nCheck it and try again, please!');
    return;
  }

  if(feelings.length < 5) {
    alert ('Please, add some description!');
    return;
  }

  // execute
  getWeatherData(createApiUrl(zipCode))
  .then(data => {
    //create the new record object
    if(data) {
      const newRecord  = {}
      newRecord.date = formatDate(new Date());
      newRecord.temp = data.main.temp;
      newRecord.content = feelings;
      postJournalRecord('/addRecord', newRecord)}})
  .then(addJournalRecordsToPage)
  .catch((error) => console.log(error))
}

const addJournalRecordsToPage = () => {
  getJournalRecords('/getRecords').then(data => {
    data.length >= 1 ? updateUI(data) : '';
  });
}

const updateDegreesUI = () => {

  //get the UI
  let allJrTemps = document.querySelectorAll('.jr-temp');
  
  Array.from(allJrTemps).forEach(temp => {
    let newTempFormat = convertDegrees(temp.getAttribute('data-kelvins'))
    temp.innerHTML = newTempFormat;
  })
  
}

//end functions declarations

/* ====== Start Execution Part  ====== */
document.addEventListener('DOMContentLoaded', () => {
  
  /* get the DOM */
  const generateBtn = document.getElementById('generate');
  const degreeSwitcher = document.getElementById('degree_units');
  const zipInput = document.getElementById('zip');

  /* Add the Journal Records into the page if exists*/
  addJournalRecordsToPage();
  
  /*Event Listener: Click => on generateBtn button */
  generateBtn.addEventListener('click', addRecordToJournal);

  /*Event Listener: Change => degrees switcher  */
  degreeSwitcher.addEventListener('change', () => {
    updateDegreesUI();
  });

  /*Event Listener: Keyup => when type in the zip input  */
  zipInput.addEventListener('keyup', () => {
    if(zipInput.value.length != 5) zipInput.classList.add('err');
    else zipInput.classList.remove('err');
  })
});
----------------------------------------------------------------------------------------------
/* Global Project Variables */
/*
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const appid = '8fe35d267fec84174d32e7bac0493cea'
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
