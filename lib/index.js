const location = document.getElementById("location")
const locationButton = document.getElementById("location-button")

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
   document.getElementById("details").innerHTML = "Details";
   document.getElementById("city").innerHTML = userLocation;
 };
}

function renderForecast(data) {
 let summary = data["data"]["attributes"]["currently"].summary
 let temp = data["data"]["attributes"]["currently"].temperature
 document.getElementById("summary").innerHTML = summary;
 document.getElementById("temp").innerHTML = temp+"°";
}

function forecast(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(data => renderForecast(data))
    .catch((error) => console.error({ error }))
}

locationButton.addEventListener('click', weatherAtLocation)
