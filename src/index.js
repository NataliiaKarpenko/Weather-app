let currentTime = new Date();

function formatDate(currentDate) {
  let date = currentDate.getDate();
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
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  return `${date} ${month}, ${year}`;
}

let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(currentTime);

function formatDayTime(currentDay) {
  let hours = currentDay.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDay.getMinutes();
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
  let day = days[currentDay.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

let dayTimeElement = document.querySelector("#current-day-time");
dayTimeElement.innerHTML = formatDayTime(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row each-day-weather-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
    <div class="col each-day-column">
      <div class="week-day">${formatDay(forecastDay.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width=42
      />
      <div class="each-day-temperature">
        <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}</span>/<span class="max-temp">${Math.round(
          forecastDay.temp.max
        )}</span>°C
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function search(city) {
  let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".input-box");
  search(city.value);
  // let units = "metric";
}

  

let searchForm = document.querySelector(".search-container");
searchForm.addEventListener("submit", handleSubmit);

search("Kyiv");

// function search(city) {
//   let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayTemperature);
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   let cityInputElement = document.querySelector("#city-input");
//   search(cityInputElement.value);
// }


// function showCurrentLocation(position) {
//   let lon = position.coords.longitude;
//   let lat = position.coords.latitude;
//   let apiKey = "8dcd9f739c97fb9e5152465931cf4ba4";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(displayWeather);
// }

// navigator.geolocation.getCurrentPosition(showCurrentLocation);

function convertToFahrenheit() {
  let degreesFahrenheit = document.querySelector("#degrees");
  degreesFahrenheit.innerHTML = Math.round((currentCelsiusTemp * 9) / 5 + 32);
  tempCelsius.classList.remove("active-units");
  tempFahrenheit.classList.add("active-units");
}

let tempFahrenheit = document.querySelector("#unit-fahrenheit");
tempFahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius() {
  let degreesCelsius = document.querySelector("#degrees");
  degreesCelsius.innerHTML = currentCelsiusTemp;
  tempFahrenheit.classList.remove("active-units");
  tempCelsius.classList.add("active-units");
}

let tempCelsius = document.querySelector("#unit-celsius");
tempCelsius.addEventListener("click", convertToCelsius);


