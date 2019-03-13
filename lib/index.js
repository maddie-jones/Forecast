const location = document.getElementById("location")
const locationButton = document.getElementById("location-button")

function weatherAtLocation() {
  let userlocation = location.value

  if (userlocation) {
    document.getElementById('background').style.backgroundImage = `url(${background(userlocation)})`
  }
}

function background(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/backgrounds?location=${location}`)
  .then(response => response.json())
  .then(data => {
    var background = data["data"]["attributes"].backgroud_url
  });
}

function forecast(location) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/forecast?location=${location}`)
    .then(response => response.json())
    .then(data => {
      var forecast = data["data"]["attributes"]["currently"]
  });
}

locationButton.addEventListener('click', weatherAtLocation)
