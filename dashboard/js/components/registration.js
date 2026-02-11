import { icon, refreshIcons } from '../icons.js';
import { detectLocation } from '../services/locationService.js';

export function renderRegistration(container, { language, theme, user, onRegister, onLanguageChange, onThemeChange }) {
    const isNe = language === 'ne';

    const districts = [
        "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur",
        "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dolakha",
        "Dolpa", "Doti", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot",
        "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung",
        "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Nuwakot",
        "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat",
        "Rolpa", "Rukum East", "Rukum West", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi",
        "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun",
        "Taplejung", "Terhathum", "Udayapur"
    ];

    const farmTypes = isNe
        ? ['अन्न बाली', 'तरकारी खेती', 'फलफूल खेती', 'पशुपालन', 'मिश्रित खेती']
        : ['Grain Farming', 'Vegetable Farming', 'Fruit Farming', 'Livestock', 'Mixed Farming'];

    const t = {
        title: isNe ? 'उर्व संसारमा स्वागत छ!' : 'Welcome to Urva Sansar!',
        subtitle: isNe ? 'सुरु गर्न आफ्नो प्रोफाइल बनाउनुहोस्' : 'Create your profile to get started',
        name: isNe ? 'तपाईंको नाम' : 'Your Name',
        district: isNe ? 'जिल्ला' : 'District',
        farmType: isNe ? 'खेतीको प्रकार' : 'Farming Type',
        detect: isNe ? 'स्थान पत्ता लगाउनुहोस्' : 'Detect Location',
        detecting: isNe ? 'खोज्दै...' : 'Detecting...',
        submit: isNe ? 'सुरु गर्नुहोस्' : 'Get Started'
    };

    container.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-nature-50 to-earth-50 dark:from-earth-950 dark:to-earth-900 animate-fade-in">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <button id="reg-lang-btn" class="text-xs bg-earth-100 dark:bg-earth-800 px-3 py-1.5 rounded-full font-bold text-earth-600 dark:text-earth-300 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors">
            ${language === 'ne' ? 'EN' : 'नेपाली'}
          </button>
          <button id="reg-theme-btn" class="p-2 bg-earth-100 dark:bg-earth-800 rounded-full hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors">
            <i data-lucide="${theme === 'dark' ? 'sun' : theme === 'light' ? 'moon' : 'monitor'}" class="w-4 h-4 text-earth-600 dark:text-earth-300"></i>
          </button>
        </div>

        <!-- Logo -->
        <div class="text-center mb-8 flex flex-col items-center">
          <img src="../assets/logo.png" alt="Logo" class="h-16 w-auto mb-3">
          <h1 class="text-2xl font-bold text-earth-900 dark:text-earth-100">${t.title}</h1>
          <p class="text-earth-500 dark:text-earth-400 text-sm mt-1">${t.subtitle}</p>
        </div>

        <!-- Form -->
        <form id="reg-form" class="bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-5">
          <!-- Name -->
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase tracking-wider">${t.name}</label>
            <input type="text" id="reg-name" required value="${user?.name || ''}" placeholder="${isNe ? 'जस्तै: राम बहादुर' : 'e.g. Ram Bahadur'}" 
              class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none focus:ring-2 focus:ring-nature-500 text-sm" />
          </div>

          <!-- District -->
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase tracking-wider">${t.district}</label>
            <select id="reg-district" required class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none focus:ring-2 focus:ring-nature-500 text-sm">
              <option value="">${isNe ? '-- जिल्ला छान्नुहोस् --' : '-- Select District --'}</option>
              ${districts.map(d => `<option value="${d}">${d}</option>`).join('')}
            </select>
          </div>

          <!-- Farming Type -->
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase tracking-wider">${t.farmType}</label>
            <select id="reg-farmtype" required class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none focus:ring-2 focus:ring-nature-500 text-sm">
              ${farmTypes.map(f => `<option value="${f}">${f}</option>`).join('')}
            </select>
          </div>

          <!-- Location Detection -->
          <button type="button" id="reg-detect-btn" class="w-full flex items-center justify-center gap-2 bg-earth-100 dark:bg-earth-800 hover:bg-earth-200 dark:hover:bg-earth-700 text-earth-700 dark:text-earth-300 py-3 rounded-xl font-bold transition-colors text-sm">
            <i data-lucide="map-pin" class="w-4 h-4"></i>
            <span id="reg-detect-text">${t.detect}</span>
          </button>
          <div id="reg-location-info" class="hidden text-xs text-nature-600 dark:text-nature-400 text-center font-medium"></div>

          <!-- Submit -->
          <button type="submit" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-nature-600/30 transition-all flex items-center justify-center gap-2">
            <i data-lucide="sprout" class="w-5 h-5"></i> ${t.submit}
          </button>
        </form>
      </div>
    </div>
  `;

    refreshIcons(container);

    let detectedLocation = null;

    // Language toggle
    container.querySelector('#reg-lang-btn').addEventListener('click', () => {
        onLanguageChange(language === 'ne' ? 'en' : 'ne');
    });

    // Theme toggle
    container.querySelector('#reg-theme-btn').addEventListener('click', () => {
        const themes = ['light', 'dark', 'system'];
        const idx = themes.indexOf(theme);
        onThemeChange(themes[(idx + 1) % themes.length]);
    });

    // Location detection
    container.querySelector('#reg-detect-btn').addEventListener('click', async () => {
        const textEl = container.querySelector('#reg-detect-text');
        const infoEl = container.querySelector('#reg-location-info');
        textEl.textContent = t.detecting;

        try {
            detectedLocation = await detectLocation();
            textEl.textContent = `✓ ${detectedLocation.address}`;
            infoEl.classList.remove('hidden');
            infoEl.textContent = `Lat: ${detectedLocation.latitude.toFixed(4)}, Lon: ${detectedLocation.longitude.toFixed(4)}`;

            // Auto-fill district if possible
            const distSelect = container.querySelector('#reg-district');
            for (let opt of distSelect.options) {
                if (opt.value.toLowerCase() === detectedLocation.address.toLowerCase()) {
                    distSelect.value = opt.value;
                    break;
                }
            }
        } catch (err) {
            textEl.textContent = isNe ? 'स्थान पत्ता लगाउन सकेन' : 'Could not detect location';
            console.error('Location detection error:', err);
        }
    });

    // Form submit
    container.querySelector('#reg-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            name: container.querySelector('#reg-name').value,
            district: container.querySelector('#reg-district').value,
            farmingType: container.querySelector('#reg-farmtype').value,
            isRegistered: true,
            location: detectedLocation || undefined
        };
        onRegister(user);
    });
}
