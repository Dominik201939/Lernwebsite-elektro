function flipCard(card) {
    card.classList.toggle('flipped');
}

// Navigation functions
function selectLehrjahr(lehrjahr) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('formulas-page').style.display = 'block';
    document.getElementById('lehrjahr-title').textContent = `Formeln - ${lehrjahr}. Lehrjahr`;
    localStorage.setItem('selectedLehrjahr', lehrjahr);
}

function goHome() {
    document.getElementById('formulas-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
    // Check if logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('account-management').style.display = 'block';
    } else {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('register-section').style.display = 'none';
        document.getElementById('account-management').style.display = 'none';
    }
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('settings-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Simple login form (demo only)
const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Demo login - check against registered users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find(user => user.username === username && user.password === password);
    
    if (user || (username === 'admin' && password === 'password')) {
        loginStatus.textContent = 'Erfolgreich angemeldet!';
        loginStatus.style.color = 'green';
        // In real app, set session/cookie
        localStorage.setItem('loggedIn', 'true');
        setTimeout(() => {
            closeSettings();
        }, 1000);
    } else {
        loginStatus.textContent = 'Falscher Benutzername oder Passwort!';
        loginStatus.style.color = 'red';
    }
});

// Simple register form (demo only)
const registerForm = document.getElementById('register-form');
const registerStatus = document.getElementById('register-status');

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    // Demo register - store in localStorage
    if (username && password) {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.some(user => user.username === username);
        
        if (userExists) {
            registerStatus.textContent = 'Benutzername bereits vergeben!';
            registerStatus.style.color = 'red';
        } else {
            existingUsers.push({ username, password });
            localStorage.setItem('users', JSON.stringify(existingUsers));
            registerStatus.textContent = 'Konto erfolgreich erstellt! Du kannst dich jetzt anmelden.';
            registerStatus.style.color = 'green';
            setTimeout(() => {
                showLogin();
            }, 2000);
        }
    } else {
        registerStatus.textContent = 'Bitte fülle alle Felder aus!';
        registerStatus.style.color = 'red';
    }
});

// Toggle functions
function showRegister() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
    loginStatus.textContent = '';
}

function showLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    registerStatus.textContent = '';
}

// Check if already logged in
if (localStorage.getItem('loggedIn') === 'true') {
    loginStatus.textContent = 'Bereits angemeldet';
    loginStatus.style.color = 'green';
}

// Account management functions
function changePassword() {
    const newPassword = prompt('Gib dein neues Passwort ein:');
    if (newPassword) {
        // In demo, just update localStorage (in real app, server call)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        // Assuming current user is stored, but for demo, update all or something
        // For simplicity, just set a new password for the first user or something
        alert('Passwort geändert! (Demo - nicht wirklich gespeichert)');
        document.getElementById('account-status').textContent = 'Passwort geändert!';
        document.getElementById('account-status').style.color = 'green';
    }
}

function deleteAccount() {
    if (confirm('Bist du sicher, dass du dein Konto löschen möchtest?')) {
        // In demo, remove from localStorage
        localStorage.removeItem('users');
        localStorage.removeItem('loggedIn');
        alert('Konto gelöscht!');
        closeSettings();
        // Reload or something
        location.reload();
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    document.getElementById('account-status').textContent = 'Abgemeldet!';
    document.getElementById('account-status').style.color = 'orange';
    setTimeout(() => {
        closeSettings();
        location.reload();
    }, 1000);
}