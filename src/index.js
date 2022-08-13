// let weather = [
//   { name: "Paris", temp: 19.7, humidity: 80 },
//   { name: "Tokyo", temp: 17.3, humidity: 50 },
//   { name: "Lisbon", temp: 30.2, humidity: 20 },
//   { name: "San Francisco", temp: 20.9, humidity: 100 },
//   { name: "Oslo", temp: -5, humidity: 20 },
// ];

// // write your code here
// let city = prompt("Enter a city, please.");

// if (city === weather[0]["name"]) {
//   alert(
//     `It is currently ${Math.round(weather[0]["temp"])}°C (${
//       Math.round(weather[0]["temp"]) + 32
//     }°F) in ${weather[0]["name"]} with a humidity of ${
//       weather[0]["humidity"]
//     }%.`
//   );
// } else if (city === weather[1]["name"]) {
//   alert(
//     `It is currently ${Math.round(weather[1]["temp"])}°C (${
//       Math.round(weather[1]["temp"]) + 32
//     }°F) in ${weather[1]["name"]} with a humidity of ${
//       weather[1]["humidity"]
//     }%.`
//   );
// } else if (city === weather[2]["name"]) {
//   alert(
//     `It is currently ${Math.round(weather[2]["temp"])}°C (${
//       Math.round(weather[2]["temp"]) + 32
//     }°F) in ${weather[2]["name"]} with a humidity of ${
//       weather[2]["humidity"]
//     }%.`
//   );
// } else if (city === weather[3]["name"]) {
//   alert(
//     `It is currently ${Math.round(weather[3]["temp"])}°C (${
//       Math.round(weather[3]["temp"]) + 32
//     }°F) in ${weather[3]["name"]} with a humidity of ${
//       weather[3]["humidity"]
//     }%.`
//   );
// } else if (city === weather[4]["name"]) {
//   alert(
//     `It is currently ${Math.round(weather[4]["temp"])}°C (${
//       Math.round(weather[4]["temp"]) + 32
//     }°F) in ${weather[4]["name"]} with a humidity of ${
//       weather[4]["humidity"]
//     }%.`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.toLowerCase()}`
//   );
// }

// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// write your code here

// let city = prompt("Enter a city, please.");
// city = city.toLowerCase();
// if (weather[city] != undefined) {
//   let humidity = weather[city].humidity;
//   let temp = weather[city].temp;
//   let celsiusTemp = Math.round(temp);
//   let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);
//   alert(
//     `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humidity}%.`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }

let currentTime = new Date();
let date = currentTime.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currentTime.getMonth()];
let year = currentTime.getFullYear();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${date} ${month}, ${year}`;
let currentDayTime = document.querySelector("#current-day-time");
currentDayTime.innerHTML = `${day}, ${hours}:${minutes}`;

let currentCelsiusTemp = null;

function displayWeather(response) {
  currentCelsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = currentCelsiusTemp;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].main;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector(".input-box").value;
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector(".search-container");
searchForm.addEventListener("submit", showCity);

// function showCurrentPlaceWeather(response) {
//   document.querySelector("#degrees").innerHTML = Math.round(
//     response.data.main.temp
//   );
//   document.querySelector("#wind").innerHTML = Math.round(
//     response.data.wind.speed
//   );
//   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
//   document.querySelector("h1").innerHTML = response.data.name;
// }

function showCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showCurrentLocation);



// function showTemperature(response) {
//   let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
//   let searchBox = document.querySelector(".input-box");
//   let city = searchBox.value;
//   let units = "metric";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

//   let currentTemperature = document.querySelector("#degrees");
//   currentTemperature.innerHTML = Math.round(response.data.main.temp);

//   ;
// }

// searchForm.addEventListener("submit", showTemperature);

function convertToCelsius() {
  let degreesCelsius = document.querySelector("#degrees");
  degreesCelsius.innerHTML = currentCelsiusTemp;
  tempFahrenheit.classList.remove("active-units");
  tempCelsius.classList.add("active-units");
}
let tempCelsius = document.querySelector("#unit-celsius");
tempCelsius.addEventListener("click", convertToCelsius);

function convertToFahrenheit() {
  let degreesFahrenheit = document.querySelector("#degrees");
  degreesFahrenheit.innerHTML = Math.round((currentCelsiusTemp * 9) / 5 + 32);
  tempCelsius.classList.remove("active-units");
  tempFahrenheit.classList.add("active-units");
}
let tempFahrenheit = document.querySelector("#unit-fahrenheit");
tempFahrenheit.addEventListener("click", convertToFahrenheit);
