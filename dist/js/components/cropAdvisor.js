import { icon, refreshIcons } from '../icons.js';
import { getCropRecommendation } from '../services/geminiService.js';
import { determineAltitudeZone } from '../services/locationService.js';

export function renderCropAdvisor(container, { language, user }) {
    const isNe = language === 'ne';
    let recommendations = [];
    let isLoading = false;
    let expandedIndex = -1;

    const t = {
        title: isNe ? 'बाली सल्लाहकार' : 'Crop Advisor',
        subtitle: isNe ? 'AI बाट सर्वश्रेष्ठ बाली सिफारिस पाउनुहोस्' : 'Get AI-powered crop recommendations',
        location: isNe ? 'स्थान / जिल्ला' : 'Location / District',
        altitude: isNe ? 'उचाइ क्षेत्र' : 'Altitude Zone',
        soil: isNe ? 'माटोको प्रकार' : 'Soil Type',
        season: isNe ? 'मौसम' : 'Season',
        irrigation: isNe ? 'सिँचाइ' : 'Irrigation',
        landArea: isNe ? 'जग्गाको क्षेत्रफल' : 'Land Area',
        submit: isNe ? 'सिफारिस पाउनुहोस्' : 'Get Recommendations',
        loading: isNe ? 'विश्लेषण गर्दै...' : 'Analyzing...',
        results: isNe ? 'सिफारिस गरिएका बालीहरू' : 'Recommended Crops',
        matchScore: isNe ? 'मिल्ने स्कोर' : 'Match Score',
        economics: isNe ? 'आर्थिक विवरण' : 'Economics',
        requirements: isNe ? 'आवश्यकता' : 'Requirements',
        risks: isNe ? 'जोखिम' : 'Risks',
        tips: isNe ? 'खेती सुझाव' : 'Farming Tips'
    };

    const soilTypes = isNe
        ? ['बलौटे (Sandy)', 'दोमट (Loamy)', 'चिल्लो (Clay)', 'पिट (Peaty)', 'सिल्ट (Silty)']
        : ['Sandy', 'Loamy', 'Clay', 'Peaty', 'Silty'];

    const seasons = isNe
        ? ['वसन्त (Spring)', 'ग्रीष्म/मनसुन (Summer)', 'शरद (Autumn)', 'हिउँद (Winter)']
        : ['Spring', 'Summer/Monsoon', 'Autumn', 'Winter'];

    const irrigationOptions = isNe
        ? ['सिँचाइ छ', 'वर्षामा आधारित', 'ड्रिप सिँचाइ']
        : ['Irrigated', 'Rain-fed', 'Drip Irrigation'];

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="sprout" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
          <p class="text-xs text-earth-500 dark:text-earth-400 mt-1">${t.subtitle}</p>
        </div>

        ${recommendations.length === 0 ? renderForm() : renderResults()}
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderForm() {
        return `
      <form id="crop-form" class="bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-4 animate-slide-up">
        <div class="space-y-1">
          <label class="text-xs font-bold text-earth-500 uppercase">${t.location}</label>
          <input type="text" id="crop-location" value="${user ? user.district : ''}" required
            class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none focus:ring-2 focus:ring-nature-500 text-sm" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${t.altitude}</label>
            <select id="crop-altitude" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-3 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
              <option>Terai (<600m)</option>
              <option selected>Hills (600-2000m)</option>
              <option>Mountain (>2000m)</option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${t.soil}</label>
            <select id="crop-soil" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-3 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
              ${soilTypes.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${t.season}</label>
            <select id="crop-season" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-3 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
              ${seasons.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${t.irrigation}</label>
            <select id="crop-irrigation" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-3 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
              ${irrigationOptions.map(o => `<option value="${o}">${o}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-earth-500 uppercase">${t.landArea}</label>
          <input type="text" id="crop-land" placeholder="${isNe ? 'जस्तै: ५ रोपनी' : 'e.g. 5 Ropani'}" required
            class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none focus:ring-2 focus:ring-nature-500 text-sm" />
        </div>

        <button type="submit" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-nature-600/30 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50' : ''}">
          ${isLoading
                ? `<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> ${t.loading}`
                : `<i data-lucide="sparkles" class="w-5 h-5"></i> ${t.submit}`}
        </button>
      </form>
    `;
    }

    function renderResults() {
        return `
      <div class="space-y-4 animate-slide-up">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg text-earth-900 dark:text-earth-100">${t.results}</h3>
          <button id="crop-back-btn" class="text-xs bg-earth-100 dark:bg-earth-800 px-3 py-1.5 rounded-full font-bold text-earth-600 dark:text-earth-300 hover:bg-earth-200 transition-colors">
            ← ${isNe ? 'फिर्ता' : 'Back'}
          </button>
        </div>

        ${recommendations.map((crop, idx) => `
          <div class="bg-white dark:bg-earth-900 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden">
            <!-- Header -->
            <button data-idx="${idx}" class="crop-accordion w-full p-5 text-left flex justify-between items-center hover:bg-earth-50 dark:hover:bg-earth-800 transition-colors">
              <div class="flex items-center gap-3">
                <div class="bg-nature-100 dark:bg-nature-900 p-3 rounded-xl text-nature-600">
                  <i data-lucide="sprout" class="w-6 h-6"></i>
                </div>
                <div>
                  <h4 class="font-bold text-earth-900 dark:text-earth-100">${crop.cropName || 'Crop'}</h4>
                  <p class="text-xs text-earth-500">${crop.localName || ''} • ${crop.duration || ''}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-nature-100 dark:bg-nature-900/30 text-nature-700 dark:text-nature-300 px-2 py-1 rounded-lg text-xs font-bold">${crop.matchScore || 0}%</span>
                <i data-lucide="${expandedIndex === idx ? 'chevron-up' : 'chevron-down'}" class="w-4 h-4 text-earth-400"></i>
              </div>
            </button>

            ${expandedIndex === idx ? `
              <div class="px-5 pb-5 space-y-4 border-t border-earth-100 dark:border-earth-800 pt-4 animate-fade-in">
                ${crop.economics ? `
                  <div>
                    <h5 class="text-xs font-bold text-earth-500 uppercase mb-2">${t.economics}</h5>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                      <div class="bg-earth-50 dark:bg-earth-800 p-2 rounded-lg">
                        <p class="text-earth-500 text-xs">Yield</p>
                        <p class="font-bold text-earth-900 dark:text-earth-100">${crop.economics.estimatedYield || '-'}</p>
                      </div>
                      <div class="bg-earth-50 dark:bg-earth-800 p-2 rounded-lg">
                        <p class="text-earth-500 text-xs">Profit</p>
                        <p class="font-bold text-nature-600">${crop.economics.estimatedProfit || '-'}</p>
                      </div>
                      <div class="bg-earth-50 dark:bg-earth-800 p-2 rounded-lg">
                        <p class="text-earth-500 text-xs">Demand</p>
                        <p class="font-bold text-earth-900 dark:text-earth-100">${crop.economics.marketDemand || '-'}</p>
                      </div>
                      <div class="bg-earth-50 dark:bg-earth-800 p-2 rounded-lg">
                        <p class="text-earth-500 text-xs">Cost</p>
                        <p class="font-bold text-earth-900 dark:text-earth-100">${crop.economics.investmentCost || '-'}</p>
                      </div>
                    </div>
                  </div>
                ` : ''}
                ${crop.farmingTips ? `
                  <div>
                    <h5 class="text-xs font-bold text-earth-500 uppercase mb-2">${t.tips}</h5>
                    <div class="space-y-2 text-sm text-earth-600 dark:text-earth-400">
                      ${crop.farmingTips.sowingWindow ? `<p>📅 ${crop.farmingTips.sowingWindow}</p>` : ''}
                      ${crop.farmingTips.rotationCrop ? `<p>🔄 ${crop.farmingTips.rotationCrop}</p>` : ''}
                      ${crop.farmingTips.soilHealth ? `<p>🌱 ${crop.farmingTips.soilHealth}</p>` : ''}
                    </div>
                  </div>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
    }

    function attachEvents() {
        // Form
        const form = container.querySelector('#crop-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isLoading) return;
                isLoading = true;
                render();

                try {
                    const data = {
                        location: container.querySelector('#crop-location').value,
                        altitude: container.querySelector('#crop-altitude').value,
                        soil: container.querySelector('#crop-soil').value,
                        season: container.querySelector('#crop-season').value,
                        irrigation: container.querySelector('#crop-irrigation').value,
                        landArea: container.querySelector('#crop-land').value
                    };
                    recommendations = await getCropRecommendation(data, language);
                } catch (err) {
                    console.error(err);
                    alert(isNe ? 'सिफारिस प्राप्त गर्न सकिएन' : 'Failed to get recommendations');
                }
                isLoading = false;
                expandedIndex = recommendations.length > 0 ? 0 : -1;
                render();
            });
        }

        // Back button
        const backBtn = container.querySelector('#crop-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                recommendations = [];
                render();
            });
        }

        // Accordion
        container.querySelectorAll('.crop-accordion').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                expandedIndex = expandedIndex === idx ? -1 : idx;
                render();
            });
        });
    }

    render();
}
