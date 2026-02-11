import { icon, refreshIcons } from '../icons.js';

export function renderMicroFinance(container, { language, user }) {
    const isNe = language === 'ne';
    let activeTab = 'coops';
    let showGroupModal = false;
    let showStoryModal = null;

    const t = {
        title: isNe ? 'माइक्रोफाइनान्स' : 'Micro Finance',
        tabs: {
            coops: isNe ? 'सहकारी' : 'Co-ops',
            loans: isNe ? 'ऋण' : 'Loans',
            groups: isNe ? 'समूह' : 'Groups',
            stories: isNe ? 'सफलता' : 'Stories'
        }
    };

    const cooperatives = [
        { name: isNe ? 'नमूना कृषि सहकारी' : 'Namuna Agri Cooperative', location: 'Chitwan', members: 450, rate: '8%', icon: '🏛️' },
        { name: isNe ? 'हरियाली बचत सहकारी' : 'Hariyali Savings Cooperative', location: 'Kaski', members: 320, rate: '7.5%', icon: '🌿' },
        { name: isNe ? 'उन्नति लघुवित्त' : 'Unnati Microfinance', location: 'Kathmandu', members: 1200, rate: '9%', icon: '📈' }
    ];

    const loanProducts = [
        { name: isNe ? 'कृषि ऋण' : 'Agriculture Loan', rate: '5-8%', maxAmount: 'NPR 10 Lakh', duration: '1-5 years', icon: '<img src="assets/logo.png" class="w-8 h-8">' },
        { name: isNe ? 'पशुपालन ऋण' : 'Livestock Loan', rate: '6-9%', maxAmount: 'NPR 5 Lakh', duration: '1-3 years', icon: '🐄' },
        { name: isNe ? 'सिँचाइ ऋण' : 'Irrigation Loan', rate: '4-7%', maxAmount: 'NPR 3 Lakh', duration: '1-3 years', icon: '💧' },
        { name: isNe ? 'यन्त्र ऋण' : 'Equipment Loan', rate: '7-10%', maxAmount: 'NPR 15 Lakh', duration: '2-7 years', icon: '🚜' }
    ];

    let groups = [
        { name: isNe ? 'चितवन धान समूह' : 'Chitwan Rice Group', members: 12, crop: isNe ? 'धान' : 'Rice', icon: '🍚' },
        { name: isNe ? 'काठमाडौं तरकारी समूह' : 'KTM Vegetable Group', members: 8, crop: isNe ? 'तरकारी' : 'Vegetables', icon: '🥬' }
    ];

    const stories = [
        {
            name: isNe ? 'सुनिता तामाङ' : 'Sunita Tamang',
            location: 'Nuwakot',
            story: isNe ? 'सहकारीबाट ऋण लिएर ५ रोपनीमा स्ट्रबेरी खेती गरेँ। ३ वर्षमा ऋण तिरेँ र अब वार्षिक ३ लाख आम्दानी हुन्छ।' : 'Took a loan from cooperative and started strawberry farming on 5 Ropani. Repaid the loan in 3 years and now earn NPR 3 Lakh annually.',
            avatar: '👩‍🌾',
            loan: 'NPR 2,00,000'
        },
        {
            name: isNe ? 'भीम गुरुङ' : 'Bhim Gurung',
            location: 'Lamjung',
            story: isNe ? 'कृषि समूह बनाएर सामूहिक रूपमा अदुवा बेच्न थालेपछि मूल्य २०% बढी पाइयो।' : 'After forming a farming group and selling ginger collectively, we received 20% higher prices.',
            avatar: '👨‍🌾',
            loan: 'Group Fund'
        }
    ];

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="building-2" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
        </div>

        <!-- Tabs -->
        <div class="flex bg-earth-100 dark:bg-earth-800 p-1 rounded-2xl mb-6">
          ${Object.entries(t.tabs).map(([key, label]) => `
            <button data-tab="${key}" class="micro-tab flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === key ? 'bg-white dark:bg-earth-700 text-nature-700 dark:text-nature-300 shadow-sm' : 'text-earth-500'
            }">${label}</button>
          `).join('')}
        </div>

        <div id="micro-content">
          ${activeTab === 'coops' ? renderCoopsTab() : activeTab === 'loans' ? renderLoansTab() : activeTab === 'groups' ? renderGroupsTab() : renderStoriesTab()}
        </div>

        ${showGroupModal ? renderGroupModal() : ''}
        ${showStoryModal !== null ? renderStoryDetail() : ''}
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderCoopsTab() {
        return `
      <div class="space-y-3 animate-slide-up">
        ${cooperatives.map(c => `
          <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800">
            <div class="flex items-start gap-3">
              <span class="text-2xl">${c.icon}</span>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${c.name}</h4>
                <p class="text-xs text-earth-500 mt-0.5">${c.location} • ${c.members} ${isNe ? 'सदस्य' : 'members'}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-nature-600">${c.rate}</p>
                <p class="text-[10px] text-earth-400">${isNe ? 'व्याज दर' : 'Interest'}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    }

    function renderLoansTab() {
        return `
      <div class="animate-slide-up">
        <!-- EMI Calculator -->
        <div class="bg-white dark:bg-earth-900 rounded-2xl p-5 border border-earth-100 dark:border-earth-800 mb-4">
          <h3 class="font-bold text-earth-900 dark:text-earth-100 mb-3 flex items-center gap-2">
            <i data-lucide="calculator" class="w-4 h-4 text-nature-600"></i> ${isNe ? 'EMI क्याल्कुलेटर' : 'EMI Calculator'}
          </h3>
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-earth-500 uppercase">${isNe ? 'रकम' : 'Amount'}</label>
              <input type="number" id="emi-amount" value="100000" class="w-full bg-earth-50 dark:bg-earth-800 rounded-lg px-2 py-2 border border-earth-200 dark:border-earth-700 text-xs" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-earth-500 uppercase">${isNe ? 'दर %' : 'Rate %'}</label>
              <input type="number" id="emi-rate" value="8" class="w-full bg-earth-50 dark:bg-earth-800 rounded-lg px-2 py-2 border border-earth-200 dark:border-earth-700 text-xs" />
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-earth-500 uppercase">${isNe ? 'वर्ष' : 'Years'}</label>
              <input type="number" id="emi-years" value="3" class="w-full bg-earth-50 dark:bg-earth-800 rounded-lg px-2 py-2 border border-earth-200 dark:border-earth-700 text-xs" />
            </div>
          </div>
          <button id="emi-calc-btn" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">${isNe ? 'गणना' : 'Calculate'}</button>
          <div id="emi-result" class="hidden mt-3 bg-nature-50 dark:bg-nature-900/20 p-3 rounded-xl text-center">
            <p class="text-xs text-earth-500">${isNe ? 'मासिक EMI' : 'Monthly EMI'}</p>
            <p class="text-xl font-bold text-nature-600" id="emi-amount-result">-</p>
          </div>
        </div>

        <!-- Loan Products -->
        <div class="space-y-3">
          ${loanProducts.map(l => `
            <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
              <span class="text-2xl">${l.icon}</span>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${l.name}</h4>
                <p class="text-xs text-earth-500">${isNe ? 'अधिकतम' : 'Max'}: ${l.maxAmount} • ${l.duration}</p>
              </div>
              <span class="text-sm font-bold text-nature-600">${l.rate}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    function renderGroupsTab() {
        return `
      <div class="animate-slide-up">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-earth-900 dark:text-earth-100">${isNe ? 'कृषि समूह' : 'Farming Groups'}</h3>
          <button id="group-add-btn" class="bg-nature-600 hover:bg-nature-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
            <i data-lucide="plus" class="w-3 h-3"></i> ${isNe ? 'नयाँ' : 'New'}
          </button>
        </div>

        <div class="space-y-3">
          ${groups.map(g => `
            <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
              <span class="text-2xl">${g.icon}</span>
              <div class="flex-1">
                <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${g.name}</h4>
                <p class="text-xs text-earth-500">${g.members} ${isNe ? 'सदस्य' : 'members'} • ${g.crop}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    function renderStoriesTab() {
        return `
      <div class="space-y-3 animate-slide-up">
        ${stories.map((s, idx) => `
          <button data-idx="${idx}" class="story-card w-full text-left bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-md transition-all">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-2xl">${s.avatar}</span>
              <div>
                <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${s.name}</h4>
                <p class="text-xs text-earth-500">${s.location}</p>
              </div>
            </div>
            <p class="text-xs text-earth-600 dark:text-earth-400 line-clamp-2">${s.story}</p>
          </button>
        `).join('')}
      </div>
    `;
    }

    function renderGroupModal() {
        return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="group-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
          <button id="group-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'नयाँ समूह सिर्जना' : 'Create New Group'}</h3>
          <div class="space-y-3">
            <input type="text" id="group-name" placeholder="${isNe ? 'समूहको नाम' : 'Group name'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <input type="text" id="group-crop" placeholder="${isNe ? 'मुख्य बाली' : 'Main crop'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <button id="group-confirm" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold">${isNe ? 'सिर्जना' : 'Create'}</button>
          </div>
        </div>
      </div>
    `;
    }

    function renderStoryDetail() {
        const s = stories[showStoryModal];
        if (!s) return '';
        return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="story-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
          <button id="story-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <div class="text-center mb-4">
            <span class="text-4xl block mb-2">${s.avatar}</span>
            <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100">${s.name}</h3>
            <p class="text-xs text-earth-500">${s.location}</p>
          </div>
          <p class="text-sm text-earth-700 dark:text-earth-300 leading-relaxed mb-3">${s.story}</p>
          <div class="bg-nature-50 dark:bg-nature-900/20 p-3 rounded-xl text-center">
            <p class="text-xs text-earth-500">${isNe ? 'ऋण' : 'Loan'}</p>
            <p class="font-bold text-nature-600">${s.loan}</p>
          </div>
        </div>
      </div>
    `;
    }

    function attachEvents() {
        // Tabs
        container.querySelectorAll('.micro-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                render();
            });
        });

        // EMI Calculator
        container.querySelector('#emi-calc-btn')?.addEventListener('click', () => {
            const amount = parseFloat(container.querySelector('#emi-amount')?.value || 0);
            const rate = parseFloat(container.querySelector('#emi-rate')?.value || 0) / 100 / 12;
            const years = parseFloat(container.querySelector('#emi-years')?.value || 1);
            const months = years * 12;

            if (amount > 0 && rate > 0 && months > 0) {
                const emi = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
                const resultEl = container.querySelector('#emi-result');
                const amountEl = container.querySelector('#emi-amount-result');
                if (resultEl && amountEl) {
                    resultEl.classList.remove('hidden');
                    amountEl.textContent = `NPR ${Math.round(emi).toLocaleString()}`;
                }
            }
        });

        // Group add
        container.querySelector('#group-add-btn')?.addEventListener('click', () => { showGroupModal = true; render(); });
        container.querySelector('#group-backdrop')?.addEventListener('click', () => { showGroupModal = false; render(); });
        container.querySelector('#group-close')?.addEventListener('click', () => { showGroupModal = false; render(); });
        container.querySelector('#group-confirm')?.addEventListener('click', () => {
            const name = container.querySelector('#group-name')?.value;
            const crop = container.querySelector('#group-crop')?.value;
            if (name && crop) {
                groups.push({ name, members: 1, crop, icon: '🌱' });
                showGroupModal = false;
                render();
            }
        });

        // Story cards
        container.querySelectorAll('.story-card').forEach(btn => {
            btn.addEventListener('click', () => {
                showStoryModal = parseInt(btn.dataset.idx);
                render();
            });
        });
        container.querySelector('#story-backdrop')?.addEventListener('click', () => { showStoryModal = null; render(); });
        container.querySelector('#story-close')?.addEventListener('click', () => { showStoryModal = null; render(); });
    }

    render();
}
