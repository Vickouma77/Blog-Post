const axios = require('axios');
const FormData = require('form-data');

/* Function to handle registration */
async function handleRegistration() {
    try {
        
        const name = document.querySelector('.sign-up-container input[name="name"]').value;
        const email = document.querySelector('.sign-up-container input[name="email"]').value;
        const password = document.querySelector('.sign-up-container input[name="password"]').value;


        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('password', password);

        const response = await axios.post('http://localhost:5000/api/auth/register', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (response.data.status === 'success') {
            window.location.href = '/login';
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Registration Error:', error);
    }
}

/*Function to handle login */
async function handleLogin() {
    try {

        const email = document.querySelector('.login-container input[name="email"]').value;
        const password = document.querySelector('.login-container input[name="password"]').value;

        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
        });

        if (response.data.status === 'success') {
            window.location.href = '/';
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        console.error('Login Error:', error);
    }
}

/* Event Listeners */
document.querySelector('.sign-up-container button').addEventListener('click', handleRegistration);
document.querySelector('.login-container button').addEventListener('click', handleLogin);
