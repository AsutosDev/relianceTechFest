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
      <div class="bg-gradient-to-br from-nature-600 to-nature-800 rounded-3xl p-5 mb-8 text-white shadow-xl shadow-nature-600/20 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
        <div class="relative z-10">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">${isNe ? 'आजको सुझाव' : 'Tip of the Day'}</p>
          <p class="text-base font-bold leading-tight">${randomTip}</p>
        </div>
      </div>

      <!-- Tool Cards -->
      <div class="grid grid-cols-2 gap-4">
        ${tools.map(tool => `
          <button data-view="${tool.id}" class="tool-card glass-card p-5 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left group">
            <div class="w-14 h-14 bg-white/50 dark:bg-earth-800/50 backdrop-blur rounded-2xl flex items-center justify-center mb-4 text-${tool.color}-600 dark:text-${tool.color}-400 shadow-inner group-hover:scale-110 transition-transform">
              <i data-lucide="${tool.icon}" class="w-7 h-7"></i>
            </div>
            <h3 class="font-extrabold text-sm text-earth-950 dark:text-white mb-1 group-hover:text-nature-600 transition-colors">${tool.label}</h3>
            <p class="text-[10px] font-bold text-earth-500 dark:text-earth-400 leading-tight opacity-80">${tool.desc}</p>
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
