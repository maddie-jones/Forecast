const emailElement = document.getElementById("email2")
const passwordElement = document.getElementById("password2")
const signinButton = document.getElementById("signin-button")

function renderApiKey(data) {
  let apiKey = data['api_key']
  document.getElementById("api-key2").innerHTML = `api key: ${apiKey}`;
}

function singInRequest(email, password) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/sessions?email=${email}&password=${password}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => renderApiKey(data))
  .catch((error) => console.error({ error }))
};

function signIn() {
  let email = emailElement.value
  let password = passwordElement.value
  singInRequest(email, password)
}

signinButton.addEventListener('click', signIn)
