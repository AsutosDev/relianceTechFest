const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const themeSwitch = document.getElementById('themeSwitch');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Desktop Navigation Toggle
signUpButton.addEventListener('click', () => {
    container.classList.add("active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("active");
});

// Mobile Navigation Toggle
const toSignupMobile = document.getElementById('toSignupMobile');
const toLoginMobile = document.getElementById('toLoginMobile');

if (toSignupMobile) {
    toSignupMobile.addEventListener('click', () => {
        container.classList.add("active");
    });
}

if (toLoginMobile) {
    toLoginMobile.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

// Theme Toggle Logic
themeSwitch.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    
    // Save preference (optional, but good practice)
    localStorage.setItem('agri-theme', isLight ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('agri-theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    themeIcon.textContent = '☀️';
}

// Form Submission Handling (Mock)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    alert(`Success! Logging in ${email}... Redirecting to Dashboard.`);
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const farm = document.getElementById('farmName').value;
    const acres = document.getElementById('fieldAcres').value;
    
    alert(`Welcome, ${name} of ${farm}! \nYour account for ${acres} acres has been registered. \nRedirecting to setup...`);
});

// Input focus effects
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.closest('.input-group').style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.parentElement.closest('.input-group').style.transform = 'translateY(0)';
    });
});
