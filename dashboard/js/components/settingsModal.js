import { icon, refreshIcons } from '../icons.js';
import { loadPreferences, savePreferences, requestPermission } from '../services/notificationService.js';

export function renderSettingsModal(container, { language, onClose }) {
    const isNe = language === 'ne';
    const prefs = loadPreferences();

    const t = {
        title: isNe ? 'सेटिङ्स' : 'Settings',
        subtitle: isNe ? 'सूचना प्राथमिकता' : 'Notification Preferences',
        weather: isNe ? 'मौसम अलर्ट' : 'Weather Alerts',
        market: isNe ? 'बजार मूल्य अपडेट' : 'Market Price Updates',
        disease: isNe ? 'रोग अलर्ट' : 'Disease Alerts',
        schemes: isNe ? 'सरकारी योजना सूचना' : 'Government Scheme Alerts',
        close: isNe ? 'बन्द गर्नुहोस्' : 'Close'
    };

    container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="settings-backdrop"></div>
      <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl shadow-2xl relative p-6 animate-slide-up">
        <button id="settings-close-btn" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800 transition-colors">
          <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
        </button>

        <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 mb-1">${t.title}</h2>
        <p class="text-sm text-earth-500 dark:text-earth-400 mb-6">${t.subtitle}</p>

        <div class="space-y-4">
          ${[
            { key: 'weatherAlerts', label: t.weather, icon: 'cloud-rain', color: 'blue' },
            { key: 'marketPrices', label: t.market, icon: 'trending-up', color: 'green' },
            { key: 'diseaseAlerts', label: t.disease, icon: 'bug', color: 'red' },
            { key: 'schemes', label: t.schemes, icon: 'landmark', color: 'purple' }
        ].map(item => `
            <div class="flex items-center justify-between p-3 bg-earth-50 dark:bg-earth-800 rounded-xl">
              <div class="flex items-center gap-3">
                <div class="bg-${item.color}-100 dark:bg-${item.color}-900/30 p-2 rounded-lg text-${item.color}-600 dark:text-${item.color}-400">
                  <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                </div>
                <span class="text-sm font-medium text-earth-900 dark:text-earth-100">${item.label}</span>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer settings-toggle" data-key="${item.key}" ${prefs[item.key] ? 'checked' : ''}>
                <div class="w-11 h-6 bg-earth-200 dark:bg-earth-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nature-600"></div>
              </label>
            </div>
          `).join('')}
        </div>

        <button id="settings-save-btn" class="w-full mt-6 bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold transition-colors">
          ${t.close}
        </button>
      </div>
    </div>
  `;

    refreshIcons(container);

    const close = () => {
        // Save current toggle states
        const toggles = container.querySelectorAll('.settings-toggle');
        const newPrefs = {};
        toggles.forEach(t => {
            newPrefs[t.dataset.key] = t.checked;
        });
        savePreferences(newPrefs);

        // Request permission if any enabled
        if (Object.values(newPrefs).some(v => v)) {
            requestPermission();
        }

        onClose();
    };

    container.querySelector('#settings-backdrop').addEventListener('click', close);
    container.querySelector('#settings-close-btn').addEventListener('click', close);
    container.querySelector('#settings-save-btn').addEventListener('click', close);
}
