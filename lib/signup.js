
function signUp(email, password, password_confirmation) {
  fetch(`https://sweater-weather-mine.herokuapp.com/api/v1/users?email=${email}&password=${password}&password_confirmation=${[password_confirmation]}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

signUp("user1@gmail.com", "password", "password")
