import axios from 'axios';

// Function to handle registration
function handleRegistration() {
  const name = document.querySelector('.sign-up-container input[name="name"]').value;
  const email = document.querySelector('.sign-up-container input[name="email"]').value;
  const password = document.querySelector('.sign-up-container input[name="password"]').value;

  axios.post('http://localhost:5000/api/auth/register', {
    name,
    email,
    password,
  })
    .then(response => {
      console.log('Registration Successful:', response.data);
    })
    .catch(error => {
      console.error('Registration Error:', error);
    });
}

// Function to handle login
function handleLogin() {
  const loginEmail = document.querySelector('.sign-in-container input[name="email"]').value;
  const loginPassword = document.querySelector('.sign-in-container input[name="password"]').value;

  axios.post('http://localhost:5000/api/auth/login', {
    email: loginEmail,
    password: loginPassword,
  })
    .then(response => {
        alert('Login Successful');
        console.log('Login Successful:', response.data);
    })
    .catch(error => {
        alert('Login Failed');
        console.error('Login Error:', error);
    });
}

document.querySelector('.sign-up-container button').addEventListener('click', function(event) {
    event.preventDefault();
    handleRegistration();
});

document.querySelector('.sign-in-container button').addEventListener('click', function(event) {
    event.preventDefault();
    handleLogin();
});
