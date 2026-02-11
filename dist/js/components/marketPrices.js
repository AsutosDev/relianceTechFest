import { icon, refreshIcons } from '../icons.js';

export function renderMarketPrices(container, { language, user }) {
    const isNe = language === 'ne';
    let activeTab = 'prices';
    let activeCategory = 'all';
    let selectedCommodity = null;
    let searchQuery = '';

    const t = {
        title: isNe ? 'बजार भाउ' : 'Market Prices',
        tabs: {
            prices: isNe ? 'भाउ' : 'Prices',
            compare: isNe ? 'तुलना' : 'Compare',
            calculator: isNe ? 'क्याल्कुलेटर' : 'Calculator',
            buyers: isNe ? 'खरिदकर्ता' : 'Buyers'
        },
        search: isNe ? 'बाली खोज्नुहोस्...' : 'Search commodity...',
        perKg: isNe ? 'प्रति केजी' : 'per kg',
        trend: isNe ? 'प्रवृत्ति' : 'Trend',
        profit: isNe ? 'नाफा' : 'Profit'
    };

    const commodityCategories = [
        { id: 'all', label: isNe ? 'सबै' : 'All' },
        { id: 'vegetable', label: isNe ? 'तरकारी' : 'Vegetables' },
        { id: 'grain', label: isNe ? 'अन्न' : 'Grains' },
        { id: 'fruit', label: isNe ? 'फलफूल' : 'Fruits' },
        { id: 'spice', label: isNe ? 'मसला' : 'Spices' }
    ];

    const commodities = [
        { id: 'tomato', name: isNe ? 'गोलभेडा' : 'Tomato', category: 'vegetable', price: 80, change: 12, unit: 'kg', icon: '🍅' },
        { id: 'potato', name: isNe ? 'आलु' : 'Potato', category: 'vegetable', price: 45, change: -5, unit: 'kg', icon: '🥔' },
        { id: 'rice', name: isNe ? 'चामल' : 'Rice', category: 'grain', price: 75, change: 3, unit: 'kg', icon: '🍚' },
        { id: 'wheat', name: isNe ? 'गहुँ' : 'Wheat', category: 'grain', price: 40, change: 0, unit: 'kg', icon: '🌾' },
        { id: 'apple', name: isNe ? 'स्याउ' : 'Apple', category: 'fruit', price: 250, change: 15, unit: 'kg', icon: '🍎' },
        { id: 'banana', name: isNe ? 'केरा' : 'Banana', category: 'fruit', price: 60, change: -3, unit: 'dozen', icon: '🍌' },
        { id: 'ginger', name: isNe ? 'अदुवा' : 'Ginger', category: 'spice', price: 120, change: 8, unit: 'kg', icon: '🫚' },
        { id: 'turmeric', name: isNe ? 'बेसार' : 'Turmeric', category: 'spice', price: 200, change: 5, unit: 'kg', icon: '🟡' },
        { id: 'cauliflower', name: isNe ? 'काउली' : 'Cauliflower', category: 'vegetable', price: 55, change: -8, unit: 'kg', icon: '🥦' },
        { id: 'onion', name: isNe ? 'प्याज' : 'Onion', category: 'vegetable', price: 65, change: 10, unit: 'kg', icon: '🧅' }
    ];

    const buyers = [
        { name: isNe ? 'कालिमाटी बजार' : 'Kalimati Market', location: 'Kathmandu', phone: '01-4567890', type: isNe ? 'थोक' : 'Wholesale' },
        { name: isNe ? 'भक्तपुर कृषि बजार' : 'Bhaktapur Agri Market', location: 'Bhaktapur', phone: '01-6612345', type: isNe ? 'खुद्रा/थोक' : 'Retail/Wholesale' },
        { name: isNe ? 'पोखरा सब्जी मण्डी' : 'Pokhara Sabji Mandi', location: 'Kaski', phone: '061-523456', type: isNe ? 'थोक' : 'Wholesale' }
    ];

    function getFiltered() {
        let items = commodities;
        if (activeCategory !== 'all') items = items.filter(c => c.category === activeCategory);
        if (searchQuery) items = items.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return items;
    }

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="trending-up" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
        </div>

        <!-- Tabs -->
        <div class="flex bg-earth-100 dark:bg-earth-800 p-1 rounded-2xl mb-6">
          ${Object.entries(t.tabs).map(([key, label]) => `
            <button data-tab="${key}" class="market-tab flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === key ? 'bg-white dark:bg-earth-700 text-nature-700 dark:text-nature-300 shadow-sm' : 'text-earth-500'
            }">${label}</button>
          `).join('')}
        </div>

        <div id="market-content">
          ${activeTab === 'prices' ? renderPricesTab() : activeTab === 'compare' ? renderCompareTab() : activeTab === 'calculator' ? renderCalculatorTab() : renderBuyersTab()}
        </div>
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderPricesTab() {
        const filtered = getFiltered();
        return `
      <!-- Search -->
      <div class="relative mb-4">
        <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-earth-400"></i>
        <input type="text" id="market-search" value="${searchQuery}" placeholder="${t.search}"
          class="w-full bg-white dark:bg-earth-900 pl-10 pr-4 py-3 rounded-xl border border-earth-200 dark:border-earth-700 text-sm outline-none focus:ring-2 focus:ring-nature-500" />
      </div>

      <!-- Categories -->
      <div class="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        ${commodityCategories.map(c => `
          <button data-cat="${c.id}" class="market-cat-btn whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === c.id ? 'bg-nature-600 text-white' : 'bg-earth-100 dark:bg-earth-800 text-earth-600 dark:text-earth-400'
            }">${c.label}</button>
        `).join('')}
      </div>

      <!-- Price List -->
      <div class="space-y-2 animate-fade-in">
        ${filtered.map(c => `
          <button data-id="${c.id}" class="market-item w-full text-left bg-white dark:bg-earth-900 p-3 rounded-xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3 hover:shadow-md transition-all">
            <span class="text-2xl">${c.icon}</span>
            <div class="flex-1">
              <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${c.name}</h4>
              <p class="text-xs text-earth-500">${t.perKg}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-earth-900 dark:text-earth-100">NPR ${c.price}</p>
              <p class="text-xs font-bold ${c.change > 0 ? 'text-green-500' : c.change < 0 ? 'text-red-500' : 'text-earth-400'}">
                ${c.change > 0 ? '↑' : c.change < 0 ? '↓' : '→'} ${Math.abs(c.change)}%
              </p>
            </div>
          </button>
        `).join('')}
      </div>

      ${selectedCommodity ? renderCommodityDetail() : ''}
    `;
    }

    function renderCommodityDetail() {
        const c = selectedCommodity;
        return `
      <div class="fixed inset-0 z-50 flex items-end justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="commodity-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-lg rounded-t-3xl p-6 relative animate-slide-up">
          <button id="commodity-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">${c.icon}</span>
            <div>
              <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100">${c.name}</h3>
              <p class="text-xs text-earth-500">${c.category}</p>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl text-center">
              <p class="text-xs text-earth-500">${isNe ? 'मूल्य' : 'Price'}</p>
              <p class="text-lg font-bold text-earth-900 dark:text-earth-100">NPR ${c.price}</p>
            </div>
            <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl text-center">
              <p class="text-xs text-earth-500">${t.trend}</p>
              <p class="text-lg font-bold ${c.change > 0 ? 'text-green-500' : 'text-red-500'}">${c.change > 0 ? '+' : ''}${c.change}%</p>
            </div>
            <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl text-center">
              <p class="text-xs text-earth-500">${isNe ? 'एकाइ' : 'Unit'}</p>
              <p class="text-lg font-bold text-earth-900 dark:text-earth-100">${c.unit}</p>
            </div>
          </div>
          <!-- Simple bar chart -->
          <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl">
            <p class="text-xs text-earth-500 mb-2">${isNe ? '७ दिनको प्रवृत्ति' : '7-Day Trend'}</p>
            <div class="flex items-end gap-1 h-20">
              ${[65, 72, 68, 75, 70, 78, c.price].map((v, i) => `
                <div class="flex-1 rounded-t ${i === 6 ? 'bg-nature-500' : 'bg-earth-300 dark:bg-earth-600'}" style="height: ${(v / Math.max(c.price, 100)) * 100}%"></div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    }

    function renderCompareTab() {
        return `
      <div class="bg-white dark:bg-earth-900 rounded-2xl p-5 border border-earth-100 dark:border-earth-800 animate-slide-up">
        <h3 class="font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'बजार तुलना' : 'Market Comparison'}</h3>
        <div class="space-y-3">
          ${['Kalimati', 'Balkhu', 'Lagankhel'].map((market, idx) => `
            <div class="flex items-center gap-3 p-3 bg-earth-50 dark:bg-earth-800 rounded-xl">
              <div class="w-8 h-8 rounded-full bg-nature-100 dark:bg-nature-900/30 flex items-center justify-center text-sm font-bold text-nature-600">${idx + 1}</div>
              <div class="flex-1">
                <p class="text-sm font-bold text-earth-900 dark:text-earth-100">${market}</p>
                <p class="text-xs text-earth-500">${isNe ? 'गोलभेडा' : 'Tomato'}: NPR ${80 + idx * 5}/${isNe ? 'केजी' : 'kg'}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    function renderCalculatorTab() {
        return `
      <div class="bg-white dark:bg-earth-900 rounded-2xl p-5 border border-earth-100 dark:border-earth-800 animate-slide-up">
        <h3 class="font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'नाफा क्याल्कुलेटर' : 'Profit Calculator'}</h3>
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-xs font-bold text-earth-500 uppercase">${isNe ? 'बाली' : 'Crop'}</label>
            <select id="profit-crop" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm">
              ${commodities.map(c => `<option value="${c.id}" data-price="${c.price}">${c.name}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${isNe ? 'उत्पादन (केजी)' : 'Production (kg)'}</label>
              <input type="number" id="profit-qty" value="100" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${isNe ? 'लागत (NPR)' : 'Cost (NPR)'}</label>
              <input type="number" id="profit-cost" value="5000" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            </div>
          </div>
          <button id="profit-calc-btn" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold transition-colors">
            ${isNe ? 'गणना' : 'Calculate'}
          </button>
          <div id="profit-result" class="hidden bg-nature-50 dark:bg-nature-900/20 p-4 rounded-xl text-center">
            <p class="text-xs text-earth-500">${isNe ? 'अनुमानित नाफा' : 'Estimated Profit'}</p>
            <p class="text-2xl font-bold text-nature-600" id="profit-amount">-</p>
          </div>
        </div>
      </div>
    `;
    }

    function renderBuyersTab() {
        return `
      <div class="space-y-3 animate-slide-up">
        ${buyers.map(b => `
          <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${b.name}</h4>
                <p class="text-xs text-earth-500">${b.location}</p>
              </div>
              <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-bold">${b.type}</span>
            </div>
            <a href="tel:${b.phone}" class="flex items-center gap-2 text-sm text-nature-600 font-medium">
              <i data-lucide="phone" class="w-3 h-3"></i> ${b.phone}
            </a>
          </div>
        `).join('')}
      </div>
    `;
    }

    function attachEvents() {
        // Tabs
        container.querySelectorAll('.market-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                selectedCommodity = null;
                render();
            });
        });

        // Categories
        container.querySelectorAll('.market-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCategory = btn.dataset.cat;
                render();
            });
        });

        // Search
        const searchInput = container.querySelector('#market-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                render();
            });
        }

        // Commodity click
        container.querySelectorAll('.market-item').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedCommodity = commodities.find(c => c.id === btn.dataset.id);
                render();
            });
        });

        // Commodity detail close
        container.querySelector('#commodity-backdrop')?.addEventListener('click', () => {
            selectedCommodity = null;
            render();
        });
        container.querySelector('#commodity-close')?.addEventListener('click', () => {
            selectedCommodity = null;
            render();
        });

        // Profit calculator
        container.querySelector('#profit-calc-btn')?.addEventListener('click', () => {
            const cropId = container.querySelector('#profit-crop').value;
            const qty = parseFloat(container.querySelector('#profit-qty').value) || 0;
            const cost = parseFloat(container.querySelector('#profit-cost').value) || 0;
            const crop = commodities.find(c => c.id === cropId);
            if (crop) {
                const revenue = crop.price * qty;
                const profit = revenue - cost;
                const resultEl = container.querySelector('#profit-result');
                const amountEl = container.querySelector('#profit-amount');
                if (resultEl && amountEl) {
                    resultEl.classList.remove('hidden');
                    amountEl.textContent = `NPR ${profit.toLocaleString()}`;
                    amountEl.className = `text-2xl font-bold ${profit >= 0 ? 'text-nature-600' : 'text-red-500'}`;
                }
            }
        });
    }

    render();
}
