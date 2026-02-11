import { icon, refreshIcons } from '../icons.js';

export function renderFertilizerCalculator(container, { language }) {
    const isNe = language === 'ne';
    let result = null;

    const t = {
        title: isNe ? 'मल क्याल्कुलेटर' : 'Fertilizer Calculator',
        subtitle: isNe ? 'सही मात्रामा मल लगाउनुहोस्' : 'Apply the right amount of fertilizer',
        crop: isNe ? 'बालीको प्रकार' : 'Crop Type',
        area: isNe ? 'जग्गाको क्षेत्रफल' : 'Land Area',
        unit: isNe ? 'एकाइ' : 'Unit',
        calculate: isNe ? 'गणना गर्नुहोस्' : 'Calculate',
        results: isNe ? 'सिफारिस गरिएको मल' : 'Recommended Fertilizer',
        totalCost: isNe ? 'अनुमानित खर्च' : 'Estimated Cost'
    };

    const crops = {
        'Rice/धान': { N: 60, P: 30, K: 30 },
        'Maize/मकै': { N: 80, P: 40, K: 20 },
        'Wheat/गहुँ': { N: 50, P: 30, K: 25 },
        'Potato/आलु': { N: 100, P: 60, K: 80 },
        'Tomato/गोलभेडा': { N: 120, P: 60, K: 60 },
        'Cauliflower/काउली': { N: 100, P: 50, K: 50 },
        'Mustard/तोरी': { N: 40, P: 20, K: 20 }
    };

    const units = {
        'Ropani': 508.72,
        'Kattha': 338.63,
        'Bigha': 6772.63,
        'Hectare': 10000
    };

    const prices = { Urea: 30, DAP: 55, MOP: 35 };

    function calculate(crop, area, unit) {
        const npk = crops[crop];
        if (!npk) return null;
        const sqm = area * units[unit];
        const factor = sqm / 10000;

        const urea = ((npk.N / 0.46) * factor).toFixed(1);
        const dap = ((npk.P / 0.46) * factor).toFixed(1);
        const mop = ((npk.K / 0.60) * factor).toFixed(1);

        const cost = (urea * prices.Urea + dap * prices.DAP + mop * prices.MOP).toFixed(0);

        return { urea, dap, mop, cost };
    }

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="calculator" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
          <p class="text-xs text-earth-500 dark:text-earth-400 mt-1">${t.subtitle}</p>
        </div>

        <form id="fert-form" class="bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-4 animate-slide-up">
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${t.crop}</label>
            <select id="fert-crop" required class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
              ${Object.keys(crops).map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${t.area}</label>
              <input type="number" id="fert-area" required min="0.1" step="0.1" value="1"
                class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${t.unit}</label>
              <select id="fert-unit" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 outline-none text-sm">
                ${Object.keys(units).map(u => `<option value="${u}">${u}</option>`).join('')}
              </select>
            </div>
          </div>

          <button type="submit" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-nature-600/30 transition-all flex items-center justify-center gap-2">
            <i data-lucide="calculator" class="w-5 h-5"></i> ${t.calculate}
          </button>
        </form>

        ${result ? `
          <div class="mt-6 bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-4 animate-slide-up">
            <h3 class="font-bold text-lg text-earth-900 dark:text-earth-100">${t.results}</h3>
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-center">
                <p class="text-2xl font-bold text-green-700 dark:text-green-300">${result.urea}</p>
                <p class="text-xs text-green-600">kg Urea</p>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-center">
                <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">${result.dap}</p>
                <p class="text-xs text-blue-600">kg DAP</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl text-center">
                <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">${result.mop}</p>
                <p class="text-xs text-purple-600">kg MOP</p>
              </div>
            </div>
            <div class="bg-nature-50 dark:bg-nature-900/20 p-4 rounded-2xl flex items-center justify-between">
              <span class="font-medium text-earth-700 dark:text-earth-300">${t.totalCost}</span>
              <span class="text-xl font-bold text-nature-700 dark:text-nature-300">NPR ${result.cost}</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;

        refreshIcons(container);

        container.querySelector('#fert-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const crop = container.querySelector('#fert-crop').value;
            const area = parseFloat(container.querySelector('#fert-area').value);
            const unit = container.querySelector('#fert-unit').value;
            result = calculate(crop, area, unit);
            render();
        });
    }

    render();
}
