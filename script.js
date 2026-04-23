function flipCard(card) {
    card.classList.toggle('flipped');
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
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
    
    // Demo login - in real app, this would be server-side
    if (username === 'admin' && password === 'password') {
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

// Check if already logged in
if (localStorage.getItem('loggedIn') === 'true') {
    loginStatus.textContent = 'Bereits angemeldet';
    loginStatus.style.color = 'green';
}