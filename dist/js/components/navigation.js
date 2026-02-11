import { icon, refreshIcons } from '../icons.js';

export function renderHeader(container, { language, theme, user, onLanguageChange, onThemeChange, onSettingsOpen }) {
    const isNe = language === 'ne';
    const themeIcon = theme === 'dark' ? 'sun' : theme === 'light' ? 'moon' : 'monitor';

    container.innerHTML = `
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-earth-950/80 backdrop-blur-lg border-b border-earth-100 dark:border-earth-800">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <img src="assets/logo.png" alt="Logo" class="h-8 w-auto">
          <div>
            <h1 class="text-lg font-bold text-earth-900 dark:text-earth-100 leading-tight">उर्व संसार</h1>
            <p class="text-[10px] text-earth-500 dark:text-earth-400">Smart Farming Nepal</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="header-lang-btn" class="text-xs bg-earth-100 dark:bg-earth-800 px-3 py-1.5 rounded-full font-bold text-earth-600 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors">
            ${language === 'ne' ? 'EN' : 'नेपाली'}
          </button>
          <button id="header-theme-btn" class="p-2 bg-earth-100 dark:bg-earth-800 rounded-full hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors">
            <i data-lucide="${themeIcon}" class="w-4 h-4 text-earth-600 dark:text-earth-300"></i>
          </button>
          <button id="header-settings-btn" class="p-2 bg-earth-100 dark:bg-earth-800 rounded-full hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors">
            <i data-lucide="settings" class="w-4 h-4 text-earth-600 dark:text-earth-300"></i>
          </button>
        </div>
      </div>
    </header>
  `;

    refreshIcons(container);

    container.querySelector('#header-lang-btn').addEventListener('click', () => {
        onLanguageChange(language === 'ne' ? 'en' : 'ne');
    });

    container.querySelector('#header-theme-btn').addEventListener('click', () => {
        const themes = ['light', 'dark', 'system'];
        const idx = themes.indexOf(theme);
        onThemeChange(themes[(idx + 1) % themes.length]);
    });

    container.querySelector('#header-settings-btn').addEventListener('click', onSettingsOpen);
}

export function renderBottomNav(container, { currentView, language, onViewChange }) {
    const isNe = language === 'ne';

    const navItems = [
        { id: 'FEED', icon: 'leaf', label: isNe ? 'फिड' : 'Feed' },
        { id: 'DETECT', icon: 'scan-line', label: isNe ? 'स्क्यान' : 'Scan' },
        { id: 'CHAT', icon: 'message-circle', label: isNe ? 'सोध्नुहोस्' : 'Ask AI' },
        { id: 'ADVISOR', icon: 'sprout', label: isNe ? 'सल्लाह' : 'Advise' },
        { id: 'TOOLS', icon: 'layout-grid', label: isNe ? 'औजार' : 'Tools' },
    ];

    container.innerHTML = `
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-earth-950/90 backdrop-blur-lg border-t border-earth-100 dark:border-earth-800 md:hidden">
      <div class="max-w-lg mx-auto flex justify-around py-2 px-2">
        ${navItems.map(item => `
          <button data-view="${item.id}" class="bottom-nav-btn flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all ${currentView === item.id
            ? 'text-nature-600 dark:text-nature-400 bg-nature-50 dark:bg-nature-900/30 scale-105'
            : 'text-earth-400 dark:text-earth-500 hover:text-earth-600'
        }">
            <i data-lucide="${item.icon}" class="w-5 h-5 mb-0.5"></i>
            <span class="text-[10px] font-bold">${item.label}</span>
          </button>
        `).join('')}
      </div>
    </nav>
  `;

    refreshIcons(container);

    container.querySelectorAll('.bottom-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            onViewChange(btn.dataset.view);
        });
    });
}

export function renderSideNav(container, { currentView, language, user, onViewChange }) {
    const isNe = language === 'ne';

    const navItems = [
        { id: 'FEED', icon: 'leaf', label: isNe ? 'फिड' : 'Feed' },
        { id: 'DETECT', icon: 'scan-line', label: isNe ? 'रोग पहिचान' : 'Disease Scan' },
        { id: 'CHAT', icon: 'message-circle', label: isNe ? 'कृषि सहायक' : 'Krishi Chat' },
        { id: 'ADVISOR', icon: 'sprout', label: isNe ? 'बाली सल्लाह' : 'Crop Advisor' },
        { id: 'TOOLS', icon: 'layout-grid', label: isNe ? 'औजारहरू' : 'Tools' },
        { id: 'MARKET', icon: 'trending-up', label: isNe ? 'बजार भाउ' : 'Market Prices' },
        { id: 'SCHEMES', icon: 'landmark', label: isNe ? 'सरकारी योजना' : 'Govt Schemes' },
    ];

    container.innerHTML = `
    <aside class="hidden md:flex flex-col w-64 bg-white dark:bg-earth-900 border-r border-earth-100 dark:border-earth-800 h-full fixed left-0 top-0 pt-20 px-4 z-30">
      <!-- User Profile -->
      <div class="mb-6 p-4 bg-nature-50 dark:bg-nature-900/20 rounded-2xl">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-nature-600 text-white flex items-center justify-center font-bold text-lg">
            ${user && user.name ? user.name.charAt(0) : '?'}
          </div>
          <div>
            <p class="font-bold text-earth-900 dark:text-earth-100 text-sm">${user ? user.name : 'User'}</p>
            <p class="text-[10px] text-earth-500">${user ? user.district : ''}</p>
          </div>
        </div>
      </div>

      <!-- Nav Items -->
      <nav class="space-y-1 flex-1">
        ${navItems.map(item => `
          <button data-view="${item.id}" class="side-nav-btn w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left ${currentView === item.id
            ? 'bg-nature-600 text-white shadow-lg shadow-nature-600/20'
            : 'text-earth-600 dark:text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'
        }">
            <i data-lucide="${item.icon}" class="w-5 h-5"></i>
            <span class="text-sm font-medium">${item.label}</span>
          </button>
        `).join('')}
      </nav>
    </aside>
  `;

    refreshIcons(container);

    container.querySelectorAll('.side-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            onViewChange(btn.dataset.view);
        });
    });
}
