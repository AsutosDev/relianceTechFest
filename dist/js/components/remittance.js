import { icon, refreshIcons } from '../icons.js';

export function renderRemittance(container, { language, user }) {
    const isNe = language === 'ne';
    let activeTab = 'wallet';
    let walletBalance = 25000;
    let showLoadModal = false;
    let showSendModal = false;
    let showGoalModal = false;

    const t = {
        title: isNe ? 'डिजिटल वालेट' : 'Digital Wallet',
        tabs: {
            wallet: isNe ? 'वालेट' : 'Wallet',
            remit: isNe ? 'रेमिट' : 'Remit',
            bills: isNe ? 'बिल' : 'Bills',
            savings: isNe ? 'बचत' : 'Savings',
            qr: 'QR'
        },
        balance: isNe ? 'उपलब्ध ब्यालेन्स' : 'Available Balance',
        load: isNe ? 'लोड' : 'Load',
        send: isNe ? 'पठाउनुहोस्' : 'Send',
        recent: isNe ? 'हालको कारोबार' : 'Recent Transactions'
    };

    const transactions = [
        { type: 'credit', desc: isNe ? 'रेमिट्यान्स प्राप्त' : 'Remittance Received', amount: 15000, date: '2082-09-25', from: 'Ram (Qatar)' },
        { type: 'debit', desc: isNe ? 'बिजुली बिल' : 'Electricity Bill', amount: -1200, date: '2082-09-23' },
        { type: 'debit', desc: isNe ? 'मल खरिद' : 'Fertilizer Purchase', amount: -3500, date: '2082-09-20' },
        { type: 'credit', desc: isNe ? 'बाली बिक्री' : 'Crop Sale', amount: 8500, date: '2082-09-18' }
    ];

    let savingsGoals = [
        { name: isNe ? 'ट्र्याक्टर कोष' : 'Tractor Fund', target: 500000, saved: 125000, icon: '🚜' },
        { name: isNe ? 'सिँचाइ पम्प' : 'Irrigation Pump', target: 50000, saved: 35000, icon: '💧' }
    ];

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="wallet" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
        </div>

        <!-- Tabs -->
        <div class="flex bg-earth-100 dark:bg-earth-800 p-1 rounded-2xl mb-6 overflow-x-auto no-scrollbar">
          ${Object.entries(t.tabs).map(([key, label]) => `
            <button data-tab="${key}" class="remit-tab flex-1 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap px-2 ${activeTab === key ? 'bg-white dark:bg-earth-700 text-nature-700 dark:text-nature-300 shadow-sm' : 'text-earth-500'
            }">${label}</button>
          `).join('')}
        </div>

        <div id="remit-content">
          ${activeTab === 'wallet' ? renderWalletTab() : activeTab === 'remit' ? renderRemitTab() : activeTab === 'bills' ? renderBillsTab() : activeTab === 'savings' ? renderSavingsTab() : renderQRTab()}
        </div>

        ${showLoadModal ? renderLoadModal() : ''}
        ${showSendModal ? renderSendModal() : ''}
        ${showGoalModal ? renderGoalModal() : ''}
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderWalletTab() {
        return `
      <div class="animate-slide-up">
        <!-- Balance Card -->
        <div class="bg-gradient-to-br from-nature-600 to-nature-800 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <p class="text-nature-200 text-xs mb-1">${t.balance}</p>
          <h3 class="text-3xl font-bold mb-4">NPR ${walletBalance.toLocaleString()}</h3>
          <div class="flex gap-3">
            <button id="wallet-load-btn" class="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i> ${t.load}
            </button>
            <button id="wallet-send-btn" class="flex-1 bg-white/20 hover:bg-white/30 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <i data-lucide="send" class="w-4 h-4"></i> ${t.send}
            </button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <h3 class="font-bold text-earth-900 dark:text-earth-100 mb-3">${t.recent}</h3>
        <div class="space-y-2">
          ${transactions.map(tx => `
            <div class="bg-white dark:bg-earth-900 p-3 rounded-xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full ${tx.amount > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} flex items-center justify-center">
                <i data-lucide="${tx.amount > 0 ? 'arrow-down-left' : 'arrow-up-right'}" class="w-5 h-5"></i>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-earth-900 dark:text-earth-100">${tx.desc}</p>
                <p class="text-xs text-earth-500">${tx.date}${tx.from ? ' • ' + tx.from : ''}</p>
              </div>
              <span class="font-bold text-sm ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}">
                ${tx.amount > 0 ? '+' : ''}NPR ${Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    function renderRemitTab() {
        return `
      <div class="animate-slide-up">
        <div class="bg-white dark:bg-earth-900 rounded-2xl p-5 border border-earth-100 dark:border-earth-800">
          <h3 class="font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'पैसा पठाउनुहोस्' : 'Send Money'}</h3>
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${isNe ? 'प्राप्तकर्ता' : 'Recipient'}</label>
              <input type="text" placeholder="${isNe ? 'नाम वा फोन नम्बर' : 'Name or phone number'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-earth-500 uppercase">${isNe ? 'रकम' : 'Amount'}</label>
              <input type="number" placeholder="NPR" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            </div>
            <button class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold transition-colors">
              ${isNe ? 'पठाउनुहोस्' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    `;
    }

    function renderBillsTab() {
        const bills = [
            { name: isNe ? 'बिजुली' : 'Electricity', icon: '⚡', provider: 'NEA' },
            { name: isNe ? 'पानी' : 'Water', icon: '💧', provider: 'KUKL' },
            { name: isNe ? 'इन्टरनेट' : 'Internet', icon: '🌐', provider: 'ISP' },
            { name: isNe ? 'टेलिफोन' : 'Telephone', icon: '📞', provider: 'NTC' }
        ];

        return `
      <div class="grid grid-cols-2 gap-3 animate-slide-up">
        ${bills.map(b => `
          <button class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 text-center hover:shadow-md transition-all">
            <span class="text-2xl block mb-2">${b.icon}</span>
            <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${b.name}</h4>
            <p class="text-xs text-earth-500">${b.provider}</p>
          </button>
        `).join('')}
      </div>
    `;
    }

    function renderSavingsTab() {
        return `
      <div class="animate-slide-up">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-earth-900 dark:text-earth-100">${isNe ? 'बचत लक्ष्य' : 'Savings Goals'}</h3>
          <button id="savings-add-btn" class="bg-nature-600 hover:bg-nature-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
            <i data-lucide="plus" class="w-3 h-3"></i> ${isNe ? 'नयाँ' : 'New'}
          </button>
        </div>

        <div class="space-y-3">
          ${savingsGoals.map(g => {
            const pct = Math.round((g.saved / g.target) * 100);
            return `
              <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">${g.icon}</span>
                  <div class="flex-1">
                    <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${g.name}</h4>
                    <p class="text-xs text-earth-500">NPR ${g.saved.toLocaleString()} / ${g.target.toLocaleString()}</p>
                  </div>
                  <span class="text-sm font-bold text-nature-600">${pct}%</span>
                </div>
                <div class="w-full bg-earth-200 dark:bg-earth-700 h-2 rounded-full">
                  <div class="bg-nature-500 h-2 rounded-full transition-all" style="width: ${pct}%"></div>
                </div>
              </div>
            `;
        }).join('')}
        </div>
      </div>
    `;
    }

    function renderQRTab() {
        return `
      <div class="text-center animate-slide-up">
        <div class="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
          <div class="w-48 h-48 mx-auto bg-earth-100 dark:bg-earth-800 rounded-2xl flex items-center justify-center mb-4">
            <div class="text-center">
              <i data-lucide="qr-code" class="w-20 h-20 text-earth-400 mx-auto"></i>
              <p class="text-xs text-earth-500 mt-2">${isNe ? 'तपाईंको QR कोड' : 'Your QR Code'}</p>
            </div>
          </div>
          <p class="text-sm text-earth-600 dark:text-earth-400">${user ? user.name : 'User'}</p>
          <p class="text-xs text-earth-400">${isNe ? 'भुक्तानी लिन स्क्यान गर्नुहोस्' : 'Scan to receive payment'}</p>
        </div>
      </div>
    `;
    }

    function renderLoadModal() {
        return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="load-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
          <button id="load-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'वालेट लोड' : 'Load Wallet'}</h3>
          <div class="space-y-3">
            <input type="number" id="load-amount" placeholder="${isNe ? 'रकम' : 'Amount'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <button id="load-confirm" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold">${isNe ? 'लोड गर्नुहोस्' : 'Load'}</button>
          </div>
        </div>
      </div>
    `;
    }

    function renderSendModal() {
        return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="send-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
          <button id="send-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'पैसा पठाउनुहोस्' : 'Send Money'}</h3>
          <div class="space-y-3">
            <input type="text" placeholder="${isNe ? 'प्राप्तकर्ता' : 'Recipient'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <input type="number" id="send-amount" placeholder="${isNe ? 'रकम' : 'Amount'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <button id="send-confirm" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold">${isNe ? 'पठाउनुहोस्' : 'Send'}</button>
          </div>
        </div>
      </div>
    `;
    }

    function renderGoalModal() {
        return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" id="goal-backdrop"></div>
        <div class="bg-white dark:bg-earth-900 w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
          <button id="goal-close" class="absolute top-4 right-4 p-2 rounded-full hover:bg-earth-100 dark:hover:bg-earth-800">
            <i data-lucide="x" class="w-5 h-5 text-earth-500"></i>
          </button>
          <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100 mb-4">${isNe ? 'नयाँ बचत लक्ष्य' : 'New Savings Goal'}</h3>
          <div class="space-y-3">
            <input type="text" id="goal-name" placeholder="${isNe ? 'लक्ष्यको नाम' : 'Goal name'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <input type="number" id="goal-target" placeholder="${isNe ? 'लक्ष्य रकम' : 'Target amount'}" class="w-full bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-3 border border-earth-200 dark:border-earth-700 text-sm" />
            <button id="goal-confirm" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3 rounded-xl font-bold">${isNe ? 'सिर्जना' : 'Create'}</button>
          </div>
        </div>
      </div>
    `;
    }

    function attachEvents() {
        // Tabs
        container.querySelectorAll('.remit-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                render();
            });
        });

        // Wallet load/send buttons
        container.querySelector('#wallet-load-btn')?.addEventListener('click', () => { showLoadModal = true; render(); });
        container.querySelector('#wallet-send-btn')?.addEventListener('click', () => { showSendModal = true; render(); });
        container.querySelector('#savings-add-btn')?.addEventListener('click', () => { showGoalModal = true; render(); });

        // Modal closes
        const closeModal = (id, flag) => {
            container.querySelector(id)?.addEventListener('click', () => { if (flag === 'load') showLoadModal = false; else if (flag === 'send') showSendModal = false; else showGoalModal = false; render(); });
        };
        closeModal('#load-backdrop', 'load'); closeModal('#load-close', 'load');
        closeModal('#send-backdrop', 'send'); closeModal('#send-close', 'send');
        closeModal('#goal-backdrop', 'goal'); closeModal('#goal-close', 'goal');

        // Load confirm
        container.querySelector('#load-confirm')?.addEventListener('click', () => {
            const amt = parseFloat(container.querySelector('#load-amount')?.value || 0);
            if (amt > 0) { walletBalance += amt; showLoadModal = false; render(); }
        });

        // Send confirm
        container.querySelector('#send-confirm')?.addEventListener('click', () => {
            const amt = parseFloat(container.querySelector('#send-amount')?.value || 0);
            if (amt > 0 && amt <= walletBalance) { walletBalance -= amt; showSendModal = false; render(); }
        });

        // Goal confirm
        container.querySelector('#goal-confirm')?.addEventListener('click', () => {
            const name = container.querySelector('#goal-name')?.value;
            const target = parseFloat(container.querySelector('#goal-target')?.value || 0);
            if (name && target > 0) {
                savingsGoals.push({ name, target, saved: 0, icon: '🎯' });
                showGoalModal = false;
                render();
            }
        });
    }

    render();
}
