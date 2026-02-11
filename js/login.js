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
const langSwitcher = document.getElementById('langSwitcher');

// Reset view on refresh
window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    // Force remove active class so it always starts at Login
    container.classList.remove("active");
    
    // Check for saved theme immediately
    const savedTheme = localStorage.getItem('agri-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
    }
    updateThemeIcon();
});
// Translation Dictionary
const translations = {
    en: {
        signupTitle: "Future of Agriculture", signupSubtitle: "Join the future of smart farming.",
        labelFullName: "Full Name", labelFarmName: "Farm Name", labelEmail: "Email", labelPhone: "Phone Number", labelPassword: "Password",
        labelDistrict: "District", placeholderDistrict: "-- Select District --",
        labelFarmingType: "Farming Type", farmTypeGrain: "Grain Farming", farmTypeVeg: "Vegetable Farming", farmTypeFruit: "Fruit Farming", farmTypeLivestock: "Livestock", farmTypeMixed: "Mixed Farming",
        btnDetectLocation: "Detect Location", detectingLocation: "Detecting...", locationFailed: "Could not detect location",
        placeholderFullName: "Ram Prasad Ghimire", placeholderFarmName: "Ghimire Farm", placeholderEmail: "ghimire@gmail.com", placeholderPhone: "+977 9800000000", placeholderPassword: "••••••••",
        btnSignup: "Complete Sign Up", textAlreadyAccount: "Already have an account?", linkLogin: "Login",
        loginTitle: "Future of Agriculture", loginSubtitle: "Access your agriculture dashboard.",
        btnLogin: "Login", textNoAccount: "Don't have an account?", linkSignup: "Sign Up",
        overlayRightTitle: "Urva Sansar | Future of Agriculture", overlayRightDesc: "Optimize your farm with AI-driven insights and real-time monitoring.", btnGhostSignup: "Sign Up Instead",
        overlayLeftTitle: "Ready to harvest?", overlayLeftDesc: "Log in to manage your livestock and crops with our advanced tools.", btnGhostLogin: "Back to Login",
        loadingAuth: "Authenticating...", loadingSuccess: "Success! Redirecting...", loadingSignup: "Creating Account...", loadingProfile: "Setting up profile...", loadingWelcome: "Welcome aboard! Redirecting..."
    },
    ne: {
        signupTitle: "Future of Agriculture", signupSubtitle: "स्मार्ट कृषिको भविष्यमा सामेल हुनुहोस्।",
        labelFullName: "पूरा नाम", labelFarmName: "खेतको नाम", labelEmail: "इमेल", labelPhone: "फोन नम्बर", labelPassword: "पासवर्ड",
        labelDistrict: "जिल्ला", placeholderDistrict: "-- जिल्ला छान्नुहोस् --",
        labelFarmingType: "खेतीको प्रकार", farmTypeGrain: "अन्न बाली", farmTypeVeg: "तरकारी खेती", farmTypeFruit: "फलफूल खेती", farmTypeLivestock: "पशुपालन", farmTypeMixed: "मिश्रित खेती",
        btnDetectLocation: "स्थान पत्ता लगाउनुहोस्", detectingLocation: "खोज्दै...", locationFailed: "स्थान पत्ता लगाउन सकेन",
        placeholderFullName: "राम प्रसाद घिमिरे", placeholderFarmName: "घिमिरे फार्म", placeholderEmail: "ghimire@gmail.com", placeholderPhone: "+९७७ ९८००००००००", placeholderPassword: "••••••••",
        btnSignup: "साइन अप पूरा गर्नुहोस्", textAlreadyAccount: "पहिले नै खाता छ?", linkLogin: "लगइन",
        loginTitle: "Future of Agriculture", loginSubtitle: "आफ्नो कृषि ड्यासबोर्डमा पहुँच गर्नुहोस्।",
        btnLogin: "लगइन", textNoAccount: "खाता छैन?", linkSignup: "साइन अप",
        overlayRightTitle: "उर्व संसार | Future of Agriculture", overlayRightDesc: "AI-संचालित अन्तर्दृष्टि र वास्तविक समय अनुगमन संग आफ्नो खेत अनुकूलन गर्नुहोस्।", btnGhostSignup: "बरु साइन अप गर्नुहोस्",
        overlayLeftTitle: "बाली भित्र्याउन तयार हुनुहुन्छ?", overlayLeftDesc: "हाम्रा उन्नत उपकरणहरूका साथ आफ्नो पशुधन र बालीहरू व्यवस्थापन गर्न लगइन गर्नुहोस्।", btnGhostLogin: "लगइनमा फर्कनुहोस्",
        loadingAuth: "प्रमाणीकरण गर्दै...", loadingSuccess: "सफलता! रिडिरेक्ट गर्दै...", loadingSignup: "खाता बनाउँदै...", loadingProfile: "प्रोफाइल सेट अप गर्दै...", loadingWelcome: "स्वागत छ! रिडिरेक्ट गर्दै..."
    }
};

let currentLang = localStorage.getItem('agri-lang') || 'en';

function updateTranslations() {
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-t-placeholder]').forEach(el => {
        const key = el.getAttribute('data-t-placeholder');
        if (translations[currentLang][key]) {
            el.setAttribute('placeholder', translations[currentLang][key]);
        }
    });

    if (langSwitcher) {
        langSwitcher.innerText = currentLang === 'en' ? 'NE' : 'EN';
    }
}

window.toggleLang = () => {
    currentLang = currentLang === 'en' ? 'ne' : 'en';
    localStorage.setItem('agri-lang', currentLang);
    updateTranslations();
};

// Initial translation load
updateTranslations();

// Location Detection
let detectedLocation = null;
const detectLocationBtn = document.getElementById('detectLocationBtn');
if (detectLocationBtn) {
    detectLocationBtn.addEventListener('click', async () => {
        const textEl = document.getElementById('detectLocationText');
        const infoEl = document.getElementById('locationInfo');
        textEl.textContent = translations[currentLang].detectingLocation;

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true, timeout: 10000, maximumAge: 0
                });
            });

            const { latitude, longitude } = position.coords;
            detectedLocation = { latitude, longitude };

            // Reverse geocode using free API
            try {
                const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`);
                const data = await resp.json();
                const address = data.address;
                const locationName = address.county || address.city || address.state || 'Unknown';
                detectedLocation.address = locationName;
                textEl.textContent = `✓ ${locationName}`;

                // Auto-fill district if possible
                const distSelect = document.getElementById('district');
                if (distSelect) {
                    for (let opt of distSelect.options) {
                        if (opt.value.toLowerCase() === locationName.toLowerCase()) {
                            distSelect.value = opt.value;
                            break;
                        }
                    }
                }
            } catch {
                textEl.textContent = `✓ Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            }

            infoEl.textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            infoEl.style.display = 'block';
        } catch (err) {
            textEl.textContent = translations[currentLang].locationFailed;
            console.error('Location detection error:', err);
        }
    });
}

// Initialize Lucide icons
lucide.createIcons();

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
    localStorage.setItem('agri-theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isLight = body.classList.contains('light');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('agri-theme');
if (savedTheme === 'light') {
    body.classList.add('light');
    updateThemeIcon();
}

let loadingTimeout;

const showLoading = (textKey) => {
    loadingText.textContent = translations[currentLang][textKey] || textKey;
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

    showLoading("loadingAuth");

    try {
        await signInWithEmailAndPassword(auth, email, password);
        
        // Save email to localStorage for the dist app to use as a default username
        localStorage.setItem('urva_last_email', email);
        
        showLoading("loadingSuccess");
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
    const district = document.getElementById('district').value;
    const farmingType = document.getElementById('farmingType').value;

    showLoading("loadingSignup");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        showLoading("loadingProfile");
        const userData = {
            fullName: name,
            farmName: farm,
            email: email,
            phone: phone,
            district: district,
            farmingType: farmingType,
            createdAt: new Date()
        };
        if (detectedLocation) {
            userData.location = detectedLocation;
        }
        await setDoc(doc(db, "users", user.uid), userData);

        // Save to localStorage so the dist homepage app recognizes the user
        localStorage.setItem('urva_user', JSON.stringify({
            name: name,
            email: email, // Include email
            district: district,
            farmingType: farmingType,
            isRegistered: true,
            location: detectedLocation || undefined
        }));
        localStorage.setItem('urva_last_email', email);

        showLoading("loadingWelcome");
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

// Mouse Parallax and Glow Effects
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Parallax for floating icons
    document.querySelectorAll('.float-icon').forEach((icon, index) => {
        const speed = (index + 1) * 15;
        const x = (window.innerWidth - mouseX * speed) / 100;
        const y = (window.innerHeight - mouseY * speed) / 100;
        icon.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });

    // Reactive Container Glow
    const containerRect = container.getBoundingClientRect();
    if (mouseX >= containerRect.left && mouseX <= containerRect.right &&
        mouseY >= containerRect.top && mouseY <= containerRect.bottom) {
        const x = ((mouseX - containerRect.left) / containerRect.width) * 100;
        const y = ((mouseY - containerRect.top) / containerRect.height) * 100;
        container.style.setProperty('--mouse-x', `${x}%`);
        container.style.setProperty('--mouse-y', `${y}%`);
    }
});

// Magnetic Buttons
document.querySelectorAll('button:not(.ghost)').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
        btn.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0, 0) scale(1)`;
    });
});

