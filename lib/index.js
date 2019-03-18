var moment = require('moment');
moment().format();
const location = document.getElementById("location")
const locationButton = document.getElementById("location-button")
const favoriteButton = document.getElementById("favorite-button")
const deleteButton = document.getElementById("change-button")

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
  let appTemp = data["data"]["attributes"]["currently"].apparentTemperature
  let humidity = data["data"]["attributes"]["currently"].humidity
  let visibility = data["data"]["attributes"]["currently"].visibility
  let uvIndex = data["data"]["attributes"]["currently"].uvIndex
  let actualTime= moment.unix(time)
  document.getElementById("summary").innerHTML = summary;
  document.getElementById("time").innerHTML = actualTime;
  document.getElementById("temp").innerHTML = temp+"°";
  document.getElementById("feels-like").innerHTML = "Feels like"+":"+appTemp+"°";
  document.getElementById("humidity").innerHTML = "Humidity"+":"+humidity+"%";
  document.getElementById("visibility").innerHTML = "Visibility"+":"+visibility+"miles";
  document.getElementById("uv-index").innerHTML = "UV Idex"+":"+uvIndex;
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
  hourly(data)
  daily(data)
}


function hourly(data) {
  let hourly = data["data"]["attributes"]["hourly"]["data"]
  for (let value of hourly) {
    var temp = document.createElement("H4")
    var t = document.createTextNode(value["temperature"])
    temp.appendChild(t)
    document.getElementById("hourly-weather").appendChild(temp);
    var time = document.createElement("H4")
    var formatTime = moment.unix(value["time"])
    var t = document.createTextNode(formatTime)
    time.appendChild(t)
    document.getElementById("hourly-weather").appendChild(time);
  }
}

function daily(data) {
  let daily = data["data"]["attributes"]["daily"]["data"]
  console.log(daily)
  for (let value of daily) {
    var summary = document.createElement("H4")
    var t = document.createTextNode(value.summary)
    summary.appendChild(t)
    document.getElementById("daily-weather").appendChild(summary);
    var lowTemp = document.createElement("H4")
    var t = document.createTextNode(value.temperatureLow)
    lowTemp.appendChild(t)
    document.getElementById("daily-weather").appendChild(lowTemp);
    var maxTemp = document.createElement("H4")
    var t = document.createTextNode(value.temperatureMax)
    maxTemp.appendChild(t)
    document.getElementById("daily-weather").appendChild(maxTemp);
    var time = document.createElement("H4")
    var formatTime = moment.unix(value["time"])
    var t = document.createTextNode(formatTime)
    time.appendChild(t)
    document.getElementById("daily-weather").appendChild(time);
  }
}

function forecast(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(data => renderForecast(data))
    .catch((error) => console.error({ error }))
}

function renderFavorites(data, userLocation) {
  let attributes = data["data"]
  for (let value of attributes) {
    var pel = document.createElement("P")
    var t = document.createTextNode(value["attributes"]["location"])
    pel.appendChild(t)
    document.getElementById("current-favorites").appendChild(pel)
    var butt = document.createElement("BUTTON")
    var x = document.createTextNode("Delete")
    butt.appendChild(x)
    butt.setAttribute("id", "");
    document.getElementById("current-favorites").appendChild(butt)
    butt.addEventListener('click', createDeleteFavoriteListener(value["attributes"]["location"]))
  }
}

function listFavorites(location) {
  var userLocation = location
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/favorites?api_key=7ca3f5426c369b8763a73fc0c4`)
    .then(response => response.json())
    .then(data => renderFavorites(data,userLocation))
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
function removeFavorite() {
  let userLocation = location.value
  listFavorites(userLocation)
  console.log("hurray")
}

function addFavorite() {
  let userLocation = location.value
  favorite(userLocation)
}

function createDeleteFavoriteListener(location) {
  console.log("Creating listener for " + location);
  return function(){
    fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/favorites?location=${location}&api_key=7ca3f5426c369b8763a73fc0c4`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

var locations = locationButton//.addEventListener('click', weatherAtLocation)

if (locations) {
  locationButton.addEventListener('click', weatherAtLocation);
}
var favorites = favoriteButton
if (favorites) {
  favoriteButton.addEventListener('click', addFavorite);
}
var deleteBut = deleteButton
if (deleteBut) {
  deleteButton.addEventListener('click', removeFavorite);
}
