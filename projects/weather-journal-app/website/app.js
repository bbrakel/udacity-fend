/* Global Variables */
// Personal API Key for OpenWeatherMap API
let apiKey = '56d73533e302ebbdd668ab635bed0a66';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

// \/ ENTER OWN CREDENTIALS FOR TESTING HERE \/
// Input will no longer work, default country = US
// const country = 'nl';
// let zipcode = '2025'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', async () => {
    /* Function called by event listener */
    let newData = await postData('/api', await getAPI(baseURL, zipcode = `${document.getElementById('zip').value}`, apiKey, country = 'us'));
    // console.log(newData);
    document.getElementById('temp').innerHTML = newData.temp;
    document.getElementById('date').innerHTML = newData.date;
    document.getElementById('content').innerHTML = newData.userR;
})

/* Function to GET Web API Data*/
const getAPI = async (url, zip, key, location) => {
    const res = await fetch(`${url}${zip},${location}&appid=${key}`);
    try {
        return await res.json();
    } catch (err) {
        alert("Error(getAPI): Unable to retrieve API", err);
        console.log(res.json())
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const postResponse = await fetch(url, {
        method: 'POST',
        credentails: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        console.log(await postResponse.json());
        return await postInput();
    } catch (err) {
        alert("Error(postData): Not a valid zipcode", err);
        console.log(postResponse.json());
    }
}

/* Function to POST temp, date and user response */
const postInput = async (url = '/input', data = {
    userR: document.getElementById('feelings').value,
    date: newDate,
}) => {
    const inputResponse = await fetch(url, {
        method: 'POST',
        credentails: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    try {
        return await inputResponse.json();
    } catch (err) {
        alert("Error(postInput): Not a valid input", err);
        console.log(inputResponse.json());
    }
}

/* Function to GET Project Data */
const getData = async (url = '/all') => {
    const getResponse = await fetch(url, {
        method: 'GET',
        credentails: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    try {
        return await getResponse.json();
    } catch (err) {
        alert("Error(getData): Unable to retrieve data", err);
        console.log(getResponse.json())
    }
}