import { icon, refreshIcons } from '../icons.js';

export function renderGovernmentSchemes(container, { language, user }) {
    const isNe = language === 'ne';
    let activeCategory = 'all';
    let selectedScheme = null;
    let showEligibility = false;

    const categories = [
        { id: 'all', label: isNe ? 'सबै' : 'All' },
        { id: 'subsidy', label: isNe ? 'अनुदान' : 'Subsidy' },
        { id: 'loan', label: isNe ? 'ऋण' : 'Loan' },
        { id: 'insurance', label: isNe ? 'बीमा' : 'Insurance' },
        { id: 'training', label: isNe ? 'तालिम' : 'Training' }
    ];

    const schemes = [
        {
            id: '1',
            title: isNe ? 'कृषक कृषि सामग्री अनुदान' : 'Agricultural Input Subsidy',
            category: 'subsidy',
            description: isNe ? 'बीउ, मल, र कीटनाशकमा ५०% सम्म अनुदान।' : 'Up to 50% subsidy on seeds, fertilizers, and pesticides.',
            eligibility: isNe ? 'नेपाली नागरिक, कम्तिमा ०.५ हेक्टर जमिन' : 'Nepali citizen, minimum 0.5 hectare land',
            benefits: isNe ? 'अनुदान रकम NPR 25,000 सम्म' : 'Subsidy amount up to NPR 25,000',
            deadline: '2082-06-30',
            ministry: isNe ? 'कृषि मन्त्रालय' : 'Ministry of Agriculture',
            icon: '🌱'
        },
        {
            id: '2',
            title: isNe ? 'कृषि ऋण (सब्सिडी दर)' : 'Agricultural Credit (Subsidized)',
            category: 'loan',
            description: isNe ? 'कृषि कार्यका लागि ५% व्याज दरमा ऋण।' : 'Loans at 5% interest rate for agricultural activities.',
            eligibility: isNe ? 'कृषि कार्ययोजना भएको कृषक' : 'Farmer with agricultural business plan',
            benefits: isNe ? 'NPR 10 लाख सम्मको ऋण' : 'Loan up to NPR 10 Lakh',
            deadline: isNe ? 'वर्षभरि खुला' : 'Open Year Round',
            ministry: isNe ? 'नेपाल राष्ट्र बैंक' : 'Nepal Rastra Bank',
            icon: '💰'
        },
        {
            id: '3',
            title: isNe ? 'बाली बीमा योजना' : 'Crop Insurance Scheme',
            category: 'insurance',
            description: isNe ? 'प्राकृतिक प्रकोपबाट हुने बाली नोक्सानी बापत बीमा।' : 'Insurance coverage for crop loss due to natural disasters.',
            eligibility: isNe ? 'कुनै पनि दर्ता भएको कृषक' : 'Any registered farmer',
            benefits: isNe ? '१००% क्षतिपूर्ति' : '100% compensation on verified loss',
            deadline: isNe ? 'रोपाइँ अघि आवेदन' : 'Apply before plantation',
            ministry: isNe ? 'बीमा समिति' : 'Insurance Board',
            icon: '🛡️'
        },
        {
            id: '4',
            title: isNe ? 'युवा कृषक तालिम कार्यक्रम' : 'Youth Farmer Training Program',
            category: 'training',
            description: isNe ? '१८-३५ वर्षका युवालाई आधुनिक कृषि तालिम।' : 'Modern farming training for youth aged 18-35.',
            eligibility: isNe ? '१८-३५ वर्ष, SLC उत्तीर्ण' : 'Age 18-35, SLC passed',
            benefits: isNe ? 'निःशुल्क तालिम + दैनिक भत्ता' : 'Free training + daily allowance',
            deadline: '2082-04-30',
            ministry: isNe ? 'कृषि विकास कार्यालय' : 'Agriculture Development Office',
            icon: '🎓'
        },
        {
            id: '5',
            title: isNe ? 'पशुपालन अनुदान' : 'Livestock Development Subsidy',
            category: 'subsidy',
            description: isNe ? 'पशुपालन सुरु गर्न वा विस्तार गर्न अनुदान।' : 'Subsidy for starting or expanding livestock farming.',
            eligibility: isNe ? 'पशुपालन व्यवसाय योजना भएको' : 'With livestock business plan',
            benefits: isNe ? 'NPR 50,000 सम्म अनुदान' : 'Up to NPR 50,000 subsidy',
            deadline: '2082-08-15',
            ministry: isNe ? 'पशुसेवा विभाग' : 'Department of Livestock',
            icon: '🐄'
        }
    ];

    function getFiltered() {
        if (activeCategory === 'all') return schemes;
        return schemes.filter(s => s.category === activeCategory);
    }

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="landmark" class="w-5 h-5 text-nature-600"></i> ${isNe ? 'सरकारी योजना' : 'Government Schemes'}
          </h2>
        </div>

        ${selectedScheme ? renderSchemeDetail() : renderSchemeList()}
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderSchemeList() {
        const filtered = getFiltered();
        return `
      <!-- Category Tabs -->
      <div class="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        ${categories.map(c => `
          <button data-cat="${c.id}" class="scheme-cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === c.id ? 'bg-nature-600 text-white shadow-lg' : 'bg-earth-100 dark:bg-earth-800 text-earth-600 dark:text-earth-400 hover:bg-earth-200'
            }">${c.label}</button>
        `).join('')}
      </div>

      <!-- Eligibility Checker Toggle -->
      <button id="scheme-eligibility-toggle" class="w-full mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
        <i data-lucide="check-circle" class="w-4 h-4"></i> ${isNe ? 'पात्रता जाँच' : 'Check Eligibility'}
      </button>

      ${showEligibility ? `
        <div class="bg-white dark:bg-earth-900 rounded-2xl p-5 mb-4 border border-earth-100 dark:border-earth-800 animate-slide-up">
          <p class="text-sm text-earth-600 dark:text-earth-400 mb-3">${isNe ? 'तपाईंको प्रोफाइल अनुसार:' : 'Based on your profile:'}</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <i data-lucide="user" class="w-4 h-4 text-nature-500"></i>
              <span class="text-earth-700 dark:text-earth-300">${user ? user.name : 'Unknown'} • ${user ? user.district : '-'}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <i data-lucide="sprout" class="w-4 h-4 text-nature-500"></i>
              <span class="text-earth-700 dark:text-earth-300">${user ? user.farmingType : '-'}</span>
            </div>
            <p class="text-xs text-nature-600 dark:text-nature-400 mt-2 bg-nature-50 dark:bg-nature-900/20 p-2 rounded-lg">
              ✅ ${isNe ? 'तपाईं माथिका सबै योजनाको लागि पात्र हुन सक्नुहुन्छ।' : 'You may be eligible for all the above schemes.'}
            </p>
          </div>
        </div>
      ` : ''}

      <!-- Scheme Cards -->
      <div class="space-y-3 animate-fade-in">
        ${filtered.map(s => `
          <button data-id="${s.id}" class="scheme-card w-full text-left bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 hover:shadow-md transition-all flex items-start gap-3">
            <span class="text-2xl">${s.icon}</span>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${s.title}</h4>
              <p class="text-xs text-earth-500 mt-1 line-clamp-2">${s.description}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="bg-earth-100 dark:bg-earth-800 text-earth-600 dark:text-earth-400 text-[10px] px-2 py-0.5 rounded-full font-bold">${s.category}</span>
                <span class="text-[10px] text-earth-400">${s.deadline}</span>
              </div>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-earth-400 mt-1 flex-shrink-0"></i>
          </button>
        `).join('')}
      </div>
    `;
    }

    function renderSchemeDetail() {
        const s = selectedScheme;
        return `
      <div class="animate-slide-up">
        <button id="scheme-back-btn" class="mb-4 text-sm text-earth-500 hover:text-earth-700 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> ${isNe ? 'फिर्ता' : 'Back'}
        </button>

        <div class="bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-5">
          <div class="flex items-start gap-3">
            <span class="text-3xl">${s.icon}</span>
            <div>
              <h3 class="text-lg font-bold text-earth-900 dark:text-earth-100">${s.title}</h3>
              <p class="text-xs text-earth-500">${s.ministry}</p>
            </div>
          </div>

          <p class="text-sm text-earth-700 dark:text-earth-300">${s.description}</p>

          <div class="space-y-3">
            <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl">
              <p class="text-xs font-bold text-earth-500 mb-1">${isNe ? 'पात्रता' : 'Eligibility'}</p>
              <p class="text-sm text-earth-700 dark:text-earth-300">${s.eligibility}</p>
            </div>
            <div class="bg-nature-50 dark:bg-nature-900/20 p-3 rounded-xl">
              <p class="text-xs font-bold text-nature-600 mb-1">${isNe ? 'फाइदा' : 'Benefits'}</p>
              <p class="text-sm text-nature-700 dark:text-nature-300 font-medium">${s.benefits}</p>
            </div>
            <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl">
              <p class="text-xs font-bold text-orange-600 mb-1">${isNe ? 'अन्तिम मिति' : 'Deadline'}</p>
              <p class="text-sm text-orange-700 dark:text-orange-300">${s.deadline}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    function attachEvents() {
        // Category filtering
        container.querySelectorAll('.scheme-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCategory = btn.dataset.cat;
                render();
            });
        });

        // Scheme detail
        container.querySelectorAll('.scheme-card').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedScheme = schemes.find(s => s.id === btn.dataset.id);
                render();
            });
        });

        // Back
        container.querySelector('#scheme-back-btn')?.addEventListener('click', () => {
            selectedScheme = null;
            render();
        });

        // Eligibility toggle
        container.querySelector('#scheme-eligibility-toggle')?.addEventListener('click', () => {
            showEligibility = !showEligibility;
            render();
        });
    }

    render();
}
