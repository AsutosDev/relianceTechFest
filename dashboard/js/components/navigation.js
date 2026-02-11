import { icon, refreshIcons } from '../icons.js';

export function renderHeader(container, { language, theme, user, onLanguageChange, onThemeChange, onSettingsOpen }) {
    const isNe = language === 'ne';
    const themeIcon = theme === 'dark' ? 'sun' : theme === 'light' ? 'moon' : 'monitor';

    container.innerHTML = `
    <header class="sticky top-0 z-40 glass border-b border-earth-100/20 dark:border-earth-800/20">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
          <div class="relative">
            <div class="absolute inset-0 bg-nature-500/20 blur-lg rounded-full animate-pulse-slow"></div>
            <img src="../assets/logo.png" alt="Logo" class="h-8 w-auto relative z-10">
          </div>
          <div>
            <h1 class="text-lg font-extrabold text-earth-950 dark:text-white leading-tight tracking-tight">उर्व संसार</h1>
            <p class="text-[9px] font-bold text-nature-600 dark:text-nature-400 uppercase tracking-widest">Smart Farming Nepal</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button id="header-lang-btn" class="text-[10px] bg-white/50 dark:bg-earth-800/50 backdrop-blur px-3 py-1.5 rounded-full font-bold text-earth-600 dark:text-earth-300 hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 transition-all active:scale-90 border border-earth-100 dark:border-earth-700">
            ${language === 'ne' ? 'EN' : 'नेपाली'}
          </button>
          <button id="header-theme-btn" class="p-2 bg-white/50 dark:bg-earth-800/50 backdrop-blur rounded-full hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 transition-all active:scale-90 border border-earth-100 dark:border-earth-700">
            <i data-lucide="${themeIcon}" class="w-4 h-4"></i>
          </button>
          <button id="header-settings-btn" class="p-2 bg-white/50 dark:bg-earth-800/50 backdrop-blur rounded-full hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 transition-all active:scale-90 border border-earth-100 dark:border-earth-700">
            <i data-lucide="settings" class="w-4 h-4"></i>
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
    <nav class="fixed bottom-6 left-4 right-4 z-40 glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 md:hidden animate-slide-up">
      <div class="flex justify-around items-center py-2">
        ${navItems.map(item => {
            const isActive = currentView === item.id;
            return `
          <button data-view="${item.id}" class="bottom-nav-btn flex flex-col items-center justify-center p-2 rounded-2xl transition-all relative ${isActive
                ? 'text-nature-600 dark:text-nature-400 -translate-y-1'
                : 'text-earth-400 dark:text-earth-500 hover:text-nature-500'
            }">
            ${isActive ? `<div class="absolute inset-x-0 -bottom-1 h-1 w-4 bg-nature-500 rounded-full mx-auto"></div>` : ''}
            <i data-lucide="${item.icon}" class="w-6 h-6 transition-all ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]' : ''}"></i>
            <span class="text-[9px] font-extrabold mt-0.5 uppercase tracking-tighter">${item.label}</span>
          </button>
        `}).join('')}
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
    <aside class="hidden md:flex flex-col w-64 glass border-r border-earth-100/20 dark:border-earth-800/20 h-[calc(100vh-2rem)] fixed left-4 top-4 rounded-3xl z-30 shadow-2xl overflow-hidden mt-16">
      <!-- User Profile -->
      <div class="m-4 p-4 bg-nature-600 rounded-2xl shadow-lg shadow-nature-600/30 text-white relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
        <div class="flex items-center gap-3 relative z-10">
          <div class="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-black text-xl shadow-inner">
            ${user && user.name ? user.name.charAt(0) : '?'}
          </div>
          <div class="overflow-hidden">
            <p class="font-black text-sm truncate">${user ? user.name : 'User'}</p>
            <p class="text-[10px] font-medium opacity-80 flex items-center gap-1">
               <i data-lucide="map-pin" class="w-3 h-3"></i> ${user ? user.district : ''}
            </p>
          </div>
        </div>
      </div>

      <!-- Nav Items -->
      <nav class="space-y-1.5 flex-1 px-4 overflow-y-auto no-scrollbar pb-6">
        ${navItems.map(item => {
            const isActive = currentView === item.id;
            return `
          <button data-view="${item.id}" class="side-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left relative group ${isActive
                ? 'bg-nature-600 text-white shadow-xl shadow-nature-600/30'
                : 'text-earth-600 dark:text-earth-400 hover:bg-nature-50 dark:hover:bg-nature-900/40 hover:text-nature-600 dark:hover:text-nature-400'
            }">
            <i data-lucide="${item.icon}" class="w-5 h-5 transition-transform group-hover:scale-110"></i>
            <span class="text-sm font-bold tracking-tight">${item.label}</span>
            ${isActive ? `<div class="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>` : ''}
          </button>
        `}).join('')}
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
