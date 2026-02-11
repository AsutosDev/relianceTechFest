// Urva Sansar — Main Application Module
// Manages global state, routing, theme, language, and renders the component tree.

import { renderSplashScreen } from './components/splashScreen.js';
import { renderRegistration } from './components/registration.js';
import { renderHeader, renderBottomNav, renderSideNav } from './components/navigation.js';
import { renderSettingsModal } from './components/settingsModal.js';
import { renderSocialFeed } from './components/socialFeed.js';
import { renderDiseaseDetector } from './components/diseaseDetector.js';
import { renderKrishiChat } from './components/krishiChat.js';
import { renderCropAdvisor } from './components/cropAdvisor.js';
import { renderFertilizerCalculator } from './components/fertilizerCalculator.js';
import { renderFarmersCalendar } from './components/farmersCalendar.js';
import { renderGovernmentSchemes } from './components/governmentSchemes.js';
import { renderMarketPrices } from './components/marketPrices.js';
import { renderToolsDashboard } from './components/toolsDashboard.js';
import { renderRemittance } from './components/remittance.js';
import { renderMicroFinance } from './components/microFinance.js';
import { refreshIcons } from './icons.js';

// ============================================
// STATE
// ============================================
let state = {
    showSplash: true,
    user: null,
    currentView: 'FEED',
    language: 'en',
    theme: 'system',
    isOnline: navigator.onLine,
    showSettings: false
};

// ============================================
// STATE PERSISTENCE (localStorage)
// ============================================
function loadState() {
    try {
        const savedUser = localStorage.getItem('urva_user');
        if (savedUser) state.user = JSON.parse(savedUser);

        const savedLang = localStorage.getItem('urva_language');
        if (savedLang) state.language = savedLang;

        const savedTheme = localStorage.getItem('urva_theme');
        if (savedTheme) state.theme = savedTheme;

        // Fallback: If no user object but we have a last logged in email, set a skeletal user
        if (!state.user) {
            const lastEmail = localStorage.getItem('urva_last_email');
            if (lastEmail) {
                state.user = {
                    name: lastEmail, // Use email as default name
                    email: lastEmail,
                    isRegistered: false
                };
            }
        }

        // If user exists, skip splash and registration
        if (state.user && state.user.isRegistered) {
            state.showSplash = false;
        }
    } catch (e) {
        console.error('Error loading state:', e);
    }
}

function saveUser(user) {
    state.user = user;
    localStorage.setItem('urva_user', JSON.stringify(user));
}

// ============================================
// THEME MANAGEMENT
// ============================================
function applyTheme() {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (state.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
    } else {
        root.classList.add(state.theme);
    }
    localStorage.setItem('urva_theme', state.theme);
}

function setTheme(theme) {
    state.theme = theme;
    applyTheme();
    renderApp();
}

// ============================================
// LANGUAGE MANAGEMENT
// ============================================
function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem('urva_language', lang);
    renderApp();
}

// ============================================
// VIEW / ROUTING
// ============================================
function setCurrentView(view) {
    state.currentView = view;
    renderApp();
}

// ============================================
// NETWORK STATUS
// ============================================
function setupNetworkListeners() {
    window.addEventListener('online', () => { state.isOnline = true; });
    window.addEventListener('offline', () => { state.isOnline = false; });
}

// ============================================
// MAIN RENDER
// ============================================
function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    applyTheme();

    // --- SPLASH SCREEN ---
    if (state.showSplash) {
        renderSplashScreen(root, () => {
            state.showSplash = false;
            renderApp();
        });
        return;
    }

    // --- REGISTRATION ---
    if (!state.user || !state.user.isRegistered) {
        renderRegistration(root, {
            language: state.language,
            theme: state.theme,
            user: state.user, // Pass user object
            onRegister: (user) => {
                saveUser(user);
                renderApp();
            },
            onLanguageChange: setLanguage,
            onThemeChange: setTheme
        });
        return;
    }

    // --- MAIN APP LAYOUT ---
    root.innerHTML = `
    <div class="min-h-screen flex flex-col">
      <div id="app-header"></div>
      <div class="flex flex-1">
        <div id="app-sidenav"></div>
        <main id="app-main" class="flex-1 md:ml-64 pb-16 md:pb-0 transition-all"></main>
      </div>
      <div id="app-bottomnav"></div>
      <div id="app-settings"></div>
    </div>
    ${!state.isOnline ? `
      <div class="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-slide-up">
        ${state.language === 'ne' ? '📡 अफलाइन मोड' : '📡 Offline Mode'}
      </div>
    ` : ''}
  `;

    // Render Navigation
    const headerEl = root.querySelector('#app-header');
    renderHeader(headerEl, {
        language: state.language,
        theme: state.theme,
        user: state.user,
        onLanguageChange: setLanguage,
        onThemeChange: setTheme,
        onSettingsOpen: () => {
            state.showSettings = true;
            renderSettings();
        }
    });

    const sidenavEl = root.querySelector('#app-sidenav');
    renderSideNav(sidenavEl, {
        currentView: state.currentView,
        language: state.language,
        user: state.user,
        onViewChange: setCurrentView
    });

    const bottomnavEl = root.querySelector('#app-bottomnav');
    renderBottomNav(bottomnavEl, {
        currentView: state.currentView,
        language: state.language,
        onViewChange: setCurrentView
    });

    // Render Main Content
    const mainEl = root.querySelector('#app-main');
    renderCurrentView(mainEl);

    // Render Settings if open
    if (state.showSettings) {
        renderSettings();
    }

    refreshIcons(root);
}

function renderCurrentView(mainEl) {
    if (!mainEl) return;

    const props = {
        language: state.language,
        user: state.user,
        isOnline: state.isOnline,
        onViewChange: setCurrentView
    };

    switch (state.currentView) {
        case 'FEED':
            renderSocialFeed(mainEl, props);
            break;
        case 'DETECT':
            renderDiseaseDetector(mainEl, props);
            break;
        case 'CHAT':
            renderKrishiChat(mainEl, props);
            break;
        case 'ADVISOR':
            renderCropAdvisor(mainEl, props);
            break;
        case 'TOOLS':
            renderToolsDashboard(mainEl, props);
            break;
        case 'FERTILIZER':
            renderFertilizerCalculator(mainEl, props);
            break;
        case 'CALENDAR':
            renderFarmersCalendar(mainEl, props);
            break;
        case 'SCHEMES':
            renderGovernmentSchemes(mainEl, props);
            break;
        case 'MARKET':
            renderMarketPrices(mainEl, props);
            break;
        case 'REMITTANCE':
            renderRemittance(mainEl, props);
            break;
        case 'MICROFINANCE':
            renderMicroFinance(mainEl, props);
            break;
        default:
            renderSocialFeed(mainEl, props);
    }
}

function renderSettings() {
    const settingsEl = document.querySelector('#app-settings');
    if (!settingsEl) return;

    if (state.showSettings) {
        renderSettingsModal(settingsEl, {
            language: state.language,
            onClose: () => {
                state.showSettings = false;
                settingsEl.innerHTML = '';
            }
        });
    }
}

// ============================================
// BOOTSTRAP
// ============================================
loadState();
setupNetworkListeners();
renderApp();
