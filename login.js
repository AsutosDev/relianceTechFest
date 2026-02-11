const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const overlayRight = document.getElementById('overlayRight');
const overlayLeft = document.getElementById('overlayLeft');

// Mobile toggles
const toSignupMobile = document.getElementById('toSignupMobile');
const toLoginMobile = document.getElementById('toLoginMobile');

signUpButton.addEventListener('click', () => {
    container.classList.add("active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("active");
});

// Mobile toggle logic
toSignupMobile.addEventListener('click', () => {
    container.classList.add("active");
});

toLoginMobile.addEventListener('click', () => {
    container.classList.remove("active");
});

// Form submission handling (Mock)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    alert(`Welcome back, ${email}! Redirection to dashboard...`);
    // In a real app, logic for authentication would go here
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const acres = document.getElementById('fieldAcres').value;
    alert(`Account created for ${name}! Managed ${acres} acres registered.`);
    // In a real app, logic for database entry would go here
});

// Premium micro-interactions
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});
