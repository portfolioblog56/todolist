const API_URL = 'http://localhost:5000/api';

const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');

const authContainer = document.getElementById('auth-container');
const todoContainer = document.getElementById('todo-container');

async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            showTodoContainer();
        } else {
            alert(data.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

async function register(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login.');
        } else {
            alert(data.msg || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
}

function logout() {
    localStorage.removeItem('token');
    showAuthContainer();
}

function showAuthContainer() {
    authContainer.style.display = 'block';
    todoContainer.style.display = 'none';
}

function showTodoContainer() {
    authContainer.style.display = 'none';
    todoContainer.style.display = 'block';
    loadTodos();
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(usernameInput.value, passwordInput.value);
});

registerBtn.addEventListener('click', () => {
    register(usernameInput.value, passwordInput.value);
});

logoutBtn.addEventListener('click', logout);

// Check if user is already logged in
if (localStorage.getItem('token')) {
    showTodoContainer();
} else {
    showAuthContainer();
}