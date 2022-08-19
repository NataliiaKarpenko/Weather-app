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

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row each-day-weather-row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
    <div class="col each-day-column">
      <span class="week-day">${day}</span>
         <br />
       <span class="each-day-temperature">☀️ 20/30°C</span>
     </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}
let currentCelsiusTemp = null;

function getForecast(coordinates) {
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

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
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

function showCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(showCurrentLocation);

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
