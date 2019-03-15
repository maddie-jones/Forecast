const emailElement = document.getElementById("email-button")
const passwordElement = document.getElementById("password-button")
const passwordConfirmationElement = document.getElementById("password_confirmation-button")

function signUp(email, password, password_confirmation) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/users?email=${email}&password=${password}&password_confirmation=${[password_confirmation]}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
