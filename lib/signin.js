const emailElement = document.getElementById("email-button")
const passwordElement = document.getElementById("password-button")

function signIn(email, password) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/sessions?email=${email}&password=${password}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

signIn("user1@gmail.com", "password")
