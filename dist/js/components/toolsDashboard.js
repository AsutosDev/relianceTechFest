import { icon, refreshIcons } from '../icons.js';

export function renderToolsDashboard(container, { language, onViewChange }) {
    const isNe = language === 'ne';

    const tools = [
        { id: 'FERTILIZER', icon: 'calculator', label: isNe ? 'मल क्याल्कुलेटर' : 'Fertilizer Calculator', desc: isNe ? 'सही मात्रा गणना गर्नुहोस्' : 'Calculate the right dosage', color: 'green' },
        { id: 'CALENDAR', icon: 'calendar', label: isNe ? 'कृषि पात्रो' : "Farmer's Calendar", desc: isNe ? 'नेपाली पात्रो र कृषि कार्यक्रम' : 'Nepali calendar & farm events', color: 'blue' },
        { id: 'SCHEMES', icon: 'landmark', label: isNe ? 'सरकारी योजना' : 'Govt Schemes', desc: isNe ? 'अनुदान र योजना खोज्नुहोस्' : 'Find subsidies & programs', color: 'purple' },
        { id: 'MARKET', icon: 'trending-up', label: isNe ? 'बजार भाउ' : 'Market Prices', desc: isNe ? 'ताजा बजार मूल्य' : 'Latest market rates', color: 'orange' },
        { id: 'REMITTANCE', icon: 'wallet', label: isNe ? 'रेमिट्यान्स' : 'Remittance', desc: isNe ? 'पैसा पठाउनुहोस् / प्राप्त गर्नुहोस्' : 'Send & receive money', color: 'cyan' },
        { id: 'MICROFINANCE', icon: 'building-2', label: isNe ? 'माइक्रोफाइनान्स' : 'Micro Finance', desc: isNe ? 'सहकारी र ऋण' : 'Cooperatives & loans', color: 'pink' }
    ];

    const tips = [
        isNe ? '💡 बाली चक्र (Crop Rotation) ले माटोको स्वास्थ्य सुधार गर्छ।' : '💡 Crop rotation improves soil health significantly.',
        isNe ? '💡 बिहान सिँचाइ गर्दा पानीको बचत हुन्छ।' : '💡 Early morning irrigation saves water due to less evaporation.',
        isNe ? '💡 जैविक मल प्रयोगले दीर्घकालीन उत्पादकता बढाउँछ।' : '💡 Organic manure increases long-term soil productivity.'
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    container.innerHTML = `
    <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
      <div class="text-center mb-6">
        <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
          <i data-lucide="layout-grid" class="w-5 h-5 text-nature-600"></i> ${isNe ? 'कृषि औजारहरू' : 'Farm Tools'}
        </h2>
      </div>

      <!-- Tip of the Day -->
      <div class="bg-gradient-to-r from-nature-500 to-nature-600 rounded-2xl p-4 mb-6 text-white shadow-lg">
        <p class="text-xs font-bold opacity-80 mb-1">${isNe ? 'आजको सुझाव' : 'Tip of the Day'}</p>
        <p class="text-sm">${randomTip}</p>
      </div>

      <!-- Tool Cards -->
      <div class="grid grid-cols-2 gap-3">
        ${tools.map(tool => `
          <button data-view="${tool.id}" class="tool-card bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-lg hover:-translate-y-1 transition-all text-left">
            <div class="bg-${tool.color}-100 dark:bg-${tool.color}-900/30 p-3 rounded-xl inline-block mb-3 text-${tool.color}-600 dark:text-${tool.color}-400">
              <i data-lucide="${tool.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="font-bold text-sm text-earth-900 dark:text-earth-100 mb-1">${tool.label}</h3>
            <p class="text-[10px] text-earth-500 dark:text-earth-400 leading-tight">${tool.desc}</p>
          </button>
        `).join('')}
      </div>
    </div>
  `;

    refreshIcons(container);

    container.querySelectorAll('.tool-card').forEach(btn => {
        btn.addEventListener('click', () => {
            onViewChange(btn.dataset.view);
        });
    });
}
