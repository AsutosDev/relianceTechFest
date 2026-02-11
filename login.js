// Firebase Imports from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmspdgMbPSSx_zmqmt2vCSuwWzmpYC3w",
  authDomain: "reliancetechfest.firebaseapp.com",
  projectId: "reliancetechfest",
  storageBucket: "reliancetechfest.firebasestorage.app",
  messagingSenderId: "608422941948",
  appId: "1:608422941948:web:4d6095dec6204c92a3b379",
  measurementId: "G-3C5T456R33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const themeSwitch = document.getElementById('themeSwitch');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');

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
    localStorage.setItem('agri-theme', isLight ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('agri-theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    themeIcon.textContent = '☀️';
}

let loadingTimeout;

const showLoading = (text) => {
    loadingText.textContent = text;
    loadingOverlay.classList.add('active');
    
    // Safety timeout to prevent "infinite" loading if something fails silently
    clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
        if (loadingOverlay.classList.contains('active')) {
            hideLoading();
            alert("The request is taking longer than expected. Please check your connection and try again.");
        }
    }, 15000); // 15 seconds safety
};

const hideLoading = () => {
    loadingOverlay.classList.remove('active');
    clearTimeout(loadingTimeout);
};

// Firebase Authentication Logic

// Login Handling
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    showLoading("Authenticating...");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showLoading("Success! Redirecting...");
        setTimeout(() => {
            window.location.href = "homepage.html";
        }, 1500);
    } catch (error) {
        hideLoading();
        console.error("Login error:", error.code, error.message);
        alert(`Login failed: ${error.message}`);
    }
});

// Signup Handling
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const farm = document.getElementById('farmName').value;
    const email = document.getElementById('emailSignup').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('passwordSignup').value;

    showLoading("Creating Account...");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        showLoading("Setting up profile...");
        await setDoc(doc(db, "users", user.uid), {
            fullName: name,
            farmName: farm,
            email: email,
            phone: phone,
            createdAt: new Date()
        });

        showLoading("Welcome aboard! Redirecting...");
        setTimeout(() => {
            window.location.href = "homepage.html";
        }, 1500);
    } catch (error) {
        hideLoading();
        console.error("Signup error:", error.code, error.message);
        alert(`Signup failed: ${error.message}`);
    }
});

// Input focus effects
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const group = input.parentElement.closest('.input-group');
        if (group) group.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        const group = input.parentElement.closest('.input-group');
        if (group) group.style.transform = 'translateY(0)';
    });
});
