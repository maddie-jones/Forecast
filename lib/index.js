var moment = require('moment');
moment().format();
const location = document.getElementById("location")
const locationButton = document.getElementById("location-button")
const favoriteButton = document.getElementById("favorite-button")

function background(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/backgrounds?location=${location}`)
    .then(response => response.json())
    .then(data => renderBackground(data))
    .catch((error) => console.error({ error }))
}

function renderBackground(data) {
  let url = data["data"]["attributes"].backgroud_url
  document.getElementById('background').style.backgroundImage = "url("+ url +")"
}

function weatherAtLocation() {
  let userLocation = location.value
  if (userLocation) {
   background(userLocation)
   forecast(userLocation)
   document.getElementById("change-button").style.visibility = "visible";
   document.getElementById("change-button").style.visibility = "visible";
   document.getElementById("favorite-button").style.visibility = "visible";
   document.getElementById("details").innerHTML = "Details";
   document.getElementById("city").innerHTML = userLocation;
 };
}

function renderForecast(data) {
  let summary = data["data"]["attributes"]["currently"].summary
  let temp = data["data"]["attributes"]["currently"].temperature
  let icon = data["data"]["attributes"]["currently"].icon
  let time = data["data"]["attributes"]["currently"].time
  let actualTime= moment.unix(time)
  document.getElementById("summary").innerHTML = summary;
  document.getElementById("time").innerHTML = actualTime;
  document.getElementById("temp").innerHTML = temp+"°";
  if (icon === "clear-day") {
    document.getElementById("sun").style.visibility = "visible";
  } else if (icon === "clear-night"){
    document.getElementById("moon").style.visibility = "visible";
  } else if (icon === 'rain') {
    document.getElementById("cloud-rain").style.visibility = "visible";
  } else if (icon === 'snow' || icon === 'sleet'){
    document.getElementById("snowflake").style.visibility = "visible";
  } else if (icon === 'wind') {
    document.getElementById("wind").style.visibility = "visible";
  } else if (icon === 'cloudy' || icon === 'fog'){
    document.getElementById("cloud").style.visibility = "visible";
  } else if (icon === 'partly-cloudy-day') {
    document.getElementById("cloud-sun").style.visibility = "visible";
  } else if (icon === 'partly-cloudy-night') {
    document.getElementById("cloud-moon").style.visibility = "visible";
  } else {
    console.log("no-icon")
  };
}

function forecast(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(data => renderForecast(data))
    .catch((error) => console.error({ error }))
}

function renderFavorites(data) {
  let attributes = data["data"]
  for (let value of attributes) {
    var pel = document.createElement("P")
    var t = document.createTextNode(value["attributes"]["location"])
    pel.appendChild(t)
    document.getElementById("current-favorites").appendChild(pel)
  }
}

function listFavorites(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/favorites?api_key=7ca3f5426c369b8763a73fc0c4`)
    .then(response => response.json())
    .then(data => renderFavorites(data))
    .catch((error) => console.error({ error }))
}

function favorite(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/favorites?location=${location}&api_key=7ca3f5426c369b8763a73fc0c4`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function addFavorite() {
  let userLocation = location.value
  favorite(userLocation)
  listFavorites(userLocation)
}

var locations = locationButton//.addEventListener('click', weatherAtLocation)

if (locations) {
  locationButton.addEventListener('click', weatherAtLocation);
}
var favorites = favoriteButton
if (favorites) {
  favoriteButton.addEventListener('click', addFavorite);
}
