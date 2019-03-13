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

background('denver,co')
forecast('denver,co')
