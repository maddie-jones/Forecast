const registerButton = document.getElementById("register-button")
const emailElement = document.getElementById("email")
const passwordElement = document.getElementById("password")
const passwordConfirmationElement = document.getElementById("password_confirmation")

function renderApiKey(data) {
  let apiKey = data['api_key']
  document.getElementById("api-key").innerHTML = `api key: ${apiKey}`;
}

function signUp(email, password, password_confirmation) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/users?email=${email}&password=${password}&password_confirmation=${[password_confirmation]}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => renderApiKey(data))
  .catch((error) => console.error({ error }))
};

function register() {
  let email = emailElement.value
  let password = passwordElement.value
  let password_confirmation = passwordConfirmationElement.value
  signUp(email, password, password_confirmation)
}

registerButton.addEventListener('click', register)
