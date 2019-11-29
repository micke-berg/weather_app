// Selected elements
const notificationElement = document.querySelector('.notification'),
  iconElement = document.querySelector('.weather-icon'),
  tempElement = document.querySelector('.temperature p'),
  descElement = document.querySelector('.weather-description p'),
  locationElement = document.querySelector('.location p'),
  timeElement = document.querySelector('.time p'),
  dateElement = document.querySelector('.date p'),
  dotsElement = document.getElementById('dots');

// Global variables
// let latitude = position.coords.latitude;
// let longitude = position.coords.longitude;

// App data object
const weather = {
  temperature: {
    value: 18,
    unit: 'celsius',
  },
  description: 'few clouds',
  iconId: '01d',
  city: 'London',
  country: 'GB',
};

// To be used for conversion to celsius and fahrenheit later on
const KELVIN = 273;
// API Key
const apiKey = '39cffa7b6fb3246900f0a76312707001';
// weather.temperature.value = 300 - 273;

// Check if geolocation is possible on user devise
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = '<p>Browser does not support geolocation</p>';
}

// Set user position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
  setInterval(() => {
    console.log(latitude);
    getWeather(latitude, longitude);
  }, 60000);
}

// Show error if problem with getting geolocation
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = '<p>${error.message}</p>';
}

// Get weather info from api provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(api)
    .then(function(response) {
      let data = response.json();
      return data;
    })
    .then(function(data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function() {
      displayWeather();
    });
}

// Display weather info to UI
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
  tempElement.innerHTML = `${weather.temperature.value} ˚ <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city} ${weather.country}`;
  console.log(weather.country);
}

// Convert Celsius to Fahrenheit
// function celsiusToFahrenheit(temperature) {
//   return (temperature * 9) / 5 + 32;
// }

// User click changes from Celsius to Fahrenheit or vice versa
// tempElement.addEventListener('click', () => {
//   if (weather.temperature.value === undefined) return;

//   if (weather.temperature.unit === 'celsius') {
//     let fahrenheit = celsiusToFahrenheit(weather.temperature.value);

//     fahrenheit = Math.floor(fahrenheit);

//     tempElement.innerHTML = `${fahrenheit}˚ <span>F</span>`;

//     weather.temperature.unit = 'fahrenheit';
//   } else {
//     tempElement.innerHTML = `${weather.temperature.value}˚ <span>C</span>`;

//     weather.temperature.unit = 'celsius';
//   }
// });

//Add Zeros to day and date if needed
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Show time
function showTime() {
  let today = new Date(),
    date = today.getDate(),
    month = today.getMonth() + 1,
    hour = today.getHours(),
    min = today.getMinutes() + 1;

  setTimeout(showTime, 1000);

  // Blinking colon in time
  function blink() {
    if (dotsElement.style.opacity == '1') {
      dotsElement.style.opacity = '0';
    } else {
      dotsElement.style.opacity = '1';
    }
  }

  let day;

  switch (new Date().getDay()) {
    case 0:
      day = 'Sun';
      break;
    case 1:
      day = 'Mon';
      break;
    case 2:
      day = 'Tue';
      break;
    case 3:
      day = 'Wen';
      break;
    case 4:
      day = 'Thu';
      break;
    case 5:
      day = 'Fri';
      break;
    case 6:
      day = 'Sat';
      break;
    default:
      return;
  }

  blink();
  //Output time
  timeElement.innerHTML = `${addZero(hour)} ${addZero(min)}`;
  //Output day and date
  dateElement.innerHTML = `${day} ${addZero(month)} - ${addZero(date)}`;
}

// Run functions
showTime();
