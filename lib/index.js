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
 };
}

function renderForecast(data) {
 let url = data["data"]["attributes"]
 document.getElementById('background').style.backgroundImage = "url("+ url +")"
}

locationButton.addEventListener('click', weatherAtLocation)
