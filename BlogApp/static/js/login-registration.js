import axios from 'axios';

async function handleRegistration() {
    try {
        const name = document.querySelector('.sign-up-container input[name="signup-name"]').value;
        const email = document.querySelector('.sign-up-container input[name="signup-email"]').value;
        const password = document.querySelector('.sign-up-container input[name="signup-password"]').value;

        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name,
            email,
            password,
        });

        if (response.status === 200) {
            window.location.href = '/login';
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration Error:', error);
        alert('Registration failed. Please try again.');
    }
}

async function handleLogin() {
    try {
        const username = document.querySelector('.login-container input[name="signin-name"]').value;
        const password = document.querySelector('.login-container input[name="signin-password"]').value;

        const response = await axios.post('http://localhost:5000/api/auth/login', {
            username,
            password,
        });

        if (response.status === 200) {
            window.location.href = '/';
        } else {
            alert('Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Login Error:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}

// Event Listeners
document.querySelector('.sign-up-container button').addEventListener('click', function (event) {
    event.preventDefault();
    handleRegistration();
});

document.querySelector('.login-container button').addEventListener('click', function (event) {
    event.preventDefault();
    handleLogin();
});
