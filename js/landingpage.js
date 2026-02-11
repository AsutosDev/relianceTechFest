// Data Arrays
const statsData = [
    { value: "10K+", labelKey: "statFarmers" },
    { value: "75", labelKey: "statDistricts" },
    { value: "50+", labelKey: "statCrops" },
    { value: "24/7", labelKey: "statSupport" },
];

const featuresData = [
    { icon: 'leaf', titleKey: "featGovTitle", descKey: "featGovDesc" },
    { icon: 'bug', titleKey: "featPlantAITitle", descKey: "featPlantAIDesc" },
    { icon: 'sprout', titleKey: "featAnimalAITitle", descKey: "featAnimalAIDesc" },
    { icon: 'recycle', titleKey: "featWasteTitle", descKey: "featWasteDesc" },
    { icon: 'bar-chart-3', titleKey: "featCropTitle", descKey: "featCropDesc" },
    { icon: 'message-square-warning', titleKey: "featComplaintTitle", descKey: "featComplaintDesc" },
];

const stepsData = [
    { icon: 'smartphone', titleKey: "step1Title", descKey: "step1Desc", num: "01" },
    { icon: 'target', titleKey: "step2Title", descKey: "step2Desc", num: "02" },
    { icon: 'zap', titleKey: "step3Title", descKey: "step3Desc", num: "03" },
    { icon: 'trending-up', titleKey: "step4Title", descKey: "step4Desc", num: "04" },
];

const extrasData = [
    { icon: 'cloud-sun', titleKey: "extraWeatherTitle", descKey: "extraWeatherDesc" },
    { icon: 'shield-check', titleKey: "extraInsuranceTitle", descKey: "extraInsuranceDesc" },
    { icon: 'users', titleKey: "extraCommunityTitle", descKey: "extraCommunityDesc" },
    { icon: 'map-pin', titleKey: "extraMarketTitle", descKey: "extraMarketDesc" },
];

const testimonialsData = [
    { nameKey: "test1Name", quoteKey: "test1Quote", locationKey: "test1Loc" },
    { nameKey: "test2Name", quoteKey: "test2Quote", locationKey: "test2Loc" },
    { nameKey: "test3Name", quoteKey: "test3Quote", locationKey: "test3Loc" },
];

const creatorsData = [
    { initials: "AK", name: "Aashutosh Kafle", role: "Developer" },
    { initials: "ST", name: "Shreedesh Tiwari", role: "Designer" },
    { initials: "PP", name: "Pallav Pandey", role: "Secondary Developer" },
    { initials: "US", name: "Utkrista Shrestha", role: "Researcher" },
];

// Translation Dictionary
const translations = {
    en: {
        navLogin: "Login", heroBadge: "Built for Reliance TechFest", heroTitle1: "Future of", heroTitle2: "Agriculture", heroDesc: "Experience the next generation of farming. Manage crops, analyze soil data, access government subsidies, and maximize your yield with AI-powered technology.", heroCTA: "Get Started", heroLearn: "Learn More",
        statFarmers: "Farmers Empowered", statDistricts: "Districts Covered", statCrops: "Crop Varieties", statSupport: "AI Support",
        aboutTitle: "About the", aboutTitleHL: "Project", aboutDesc: "Urva Sansar is designed to revolutionize agriculture in Nepal. Combining AI-powered analysis with government subsidy tracking, crop rotation recommendations, and animal waste management — our platform empowers farmers with the tools they need to maximize productivity while practicing sustainable farming. Built for Reliance TechFest, this project showcases the harmony between technology and nature.",
        featTitle: "Our", featTitleHL: "Features", featSubtitle: "Everything a modern farmer needs, powered by cutting-edge AI technology", featGovTitle: "Government Subsidies", featGovDesc: "Stay updated with the latest government agricultural subsidies, grants, and support programs. Never miss an opportunity to get financial assistance for your farm.", featPlantAITitle: "AI Plant Analyzer", featPlantAIDesc: "Upload photos of your plants and our AI instantly identifies diseases, nutrient deficiencies, and provides treatment recommendations to save your crops.", featAnimalAITitle: "AI Animal Analyzer", featAnimalAIDesc: "Monitor livestock health with AI-powered analysis. Detect early signs of disease, get feeding suggestions, and optimize animal welfare on your farm.", featWasteTitle: "Waste Management", featWasteDesc: "Turn animal waste into valuable resources. Get personalized composting strategies, biogas recommendations, and sustainable waste disposal methods.", featCropTitle: "Crop Rotation Planner", featCropDesc: "Receive AI-generated crop rotation plans based on your soil type, climate zone, and previous harvests. Maximize yield while maintaining soil health.", featComplaintTitle: "My Complaints", featComplaintDesc: "Submit and track complaints about agricultural issues. Get connected with local authorities and experts for quick resolution of farming problems.",
        howTitle: "How It", howTitleHL: "Works", howSubtitle: "Get started in four simple steps", step1Title: "Create Account", step1Desc: "Sign up with your farm details and personal information to get started", step2Title: "Set Your Goals", step2Desc: "Tell us about your crops, livestock, and what you want to achieve", step3Title: "Get AI Insights", step3Desc: "Receive personalized recommendations powered by advanced AI analysis", step4Title: "Grow & Prosper", step4Desc: "Apply the insights and watch your farm's productivity soar",
        extraTitle: "Also", extraTitleHL: "Included", extraWeatherTitle: "Weather Forecasting", extraWeatherDesc: "Get hyper-local weather predictions tailored to your farm's GPS coordinates. Plan irrigation, planting, and harvesting with confidence.", extraInsuranceTitle: "Crop Insurance Guide", extraInsuranceDesc: "Navigate crop insurance options with ease. Compare plans, calculate premiums, and file claims directly through our platform.", extraCommunityTitle: "Farmer Community", extraCommunityDesc: "Connect with fellow farmers, share tips, trade resources, and learn from experienced agricultural experts in your region.", extraMarketTitle: "Market Prices", extraMarketDesc: "Real-time market prices for crops and livestock in your area. Find the best buyers and sell at optimal times for maximum profit.",
        testTitle: "What Farmers", testTitleHL: "Say", test1Name: "Ram Bahadur Thapa", test1Quote: "Urva Sansar helped me increase my rice yield by 40%. The AI plant analyzer caught a disease I would have missed completely.", test1Loc: "Chitwan, Nepal", test2Name: "Sita Devi Sharma", test2Quote: "The government subsidy tracker alone has saved me thousands of rupees. I finally know what programs I qualify for.", test2Loc: "Morang, Nepal", test3Name: "Krishna Prasad Oli", test3Quote: "The crop rotation planner transformed my farm. My soil health has improved dramatically in just one season.", test3Loc: "Kaski, Nepal",
        creatorsTitle: "Meet the", creatorsTitleHL: "Creators",
        ctaTitle: "Ready to Transform Your Farm?", ctaDesc: "Join thousands of farmers already using Urva Sansar to boost productivity and embrace sustainable agriculture.", ctaBtn: "Start Now",
        footerText: "Reliance TechFest Project.",
    },
    ne: {
        navLogin: "लगइन", heroBadge: "रिलायन्स टेकफेस्टको लागि निर्मित", heroTitle1: "कृषिको", heroTitle2: "भविष्य", heroDesc: "कृषिको नयाँ पुस्ताको अनुभव गर्नुहोस्। बाली व्यवस्थापन, माटो विश्लेषण, सरकारी अनुदान पहुँच, र AI प्रविधिबाट उत्पादन बढाउनुहोस्।", heroCTA: "सुरु गर्नुहोस्", heroLearn: "थप जान्नुहोस्",
        statFarmers: "सशक्त किसानहरू", statDistricts: "जिल्लाहरू समेटिएको", statCrops: "बाली प्रजातिहरू", statSupport: "AI सहायता",
        aboutTitle: "परियोजनाको", aboutTitleHL: "बारेमा", aboutDesc: "उर्व संसार नेपालमा कृषिमा क्रान्ति ल्याउन डिजाइन गरिएको हो। AI-संचालित विश्लेषण, सरकारी अनुदान ट्र्याकिङ, बाली रोटेशन सिफारिस, र पशु फोहोर व्यवस्थापन — हाम्रो प्लेटफर्मले किसानहरूलाई दिगो कृषि अभ्यास गर्दै उत्पादकत्व बढाउन आवश्यक उपकरणहरू प्रदान गर्छ।",
        featTitle: "हाम्रा", featTitleHL: "सुविधाहरू", featSubtitle: "आधुनिक किसानलाई चाहिने सबै कुरा, उन्नत AI प्रविधिद्वारा संचालित", featGovTitle: "सरकारी अनुदान", featGovDesc: "नवीनतम सरकारी कृषि अनुदान, अनुदान, र सहायता कार्यक्रमहरूको बारेमा अपडेट रहनुहोस्।", featPlantAITitle: "AI बिरुवा विश्लेषक", featPlantAIDesc: "आफ्नो बिरुवाहरूको फोटो अपलोड गर्नुहोस् र हाम्रो AI ले तुरुन्तै रोगहरू पहिचान गर्छ।", featAnimalAITitle: "AI पशु विश्लेषक", featAnimalAIDesc: "AI-संचालित विश्लेषणसँग पशुधन स्वास्थ्य निगरानी गर्नुहोस्।", featWasteTitle: "फोहोर व्यवस्थापन", featWasteDesc: "पशु फोहोरलाई मूल्यवान स्रोतमा बदल्नुहोस्।", featCropTitle: "बाली रोटेशन योजनाकार", featCropDesc: "तपाईंको माटोको प्रकारको आधारमा AI-उत्पन्न बाली रोटेशन योजनाहरू प्राप्त गर्नुहोस्।", featComplaintTitle: "मेरा गुनासोहरू", featComplaintDesc: "कृषि समस्याहरूको बारेमा गुनासो पेश गर्नुहोस् र ट्र्याक गर्नुहोस्।",
        howTitle: "यो कसरी", howTitleHL: "काम गर्छ", howSubtitle: "चार सजिलो चरणमा सुरु गर्नुहोस्", step1Title: "खाता बनाउनुहोस्", step1Desc: "सुरु गर्न आफ्नो खेत विवरण र व्यक्तिगत जानकारीसँग साइन अप गर्नुहोस्", step2Title: "लक्ष्य सेट गर्नुहोस्", step2Desc: "हामीलाई तपाईंको बाली, पशुधन, र तपाईं के हासिल गर्न चाहनुहुन्छ भन्नुहोस्", step3Title: "AI अन्तर्दृष्टि पाउनुहोस्", step3Desc: "उन्नत AI विश्लेषणद्वारा संचालित व्यक्तिगत सिफारिसहरू प्राप्त गर्नुहोस्", step4Title: "बढ्नुहोस् र समृद्ध हुनुहोस्", step4Desc: "अन्तर्दृष्टिहरू लागू गर्नुहोस् र तपाईंको खेतको उत्पादकत्व बढ्दै जानुहोस्",
        extraTitle: "यो पनि", extraTitleHL: "समावेश छ", extraWeatherTitle: "मौसम पूर्वानुमान", extraWeatherDesc: "तपाईंको खेतको GPS निर्देशांकमा आधारित मौसम भविष्यवाणी प्राप्त गर्नुहोस्।", extraInsuranceTitle: "बाली बीमा गाइड", extraInsuranceDesc: "बाली बीमा विकल्पहरू सजिलैसँग नेभिगेट गर्नुहोस्।", extraCommunityTitle: "किसान समुदाय", extraCommunityDesc: "साथी किसानहरूसँग जोडिनुहोस् र साझा गर्नुहोस्।", extraMarketTitle: "बजार मूल्य", extraMarketDesc: "तपाईंको क्षेत्रमा बाली र पशुधनको रियल-टाइम बजार मूल्यहरू।",
        testTitle: "किसानहरू के", testTitleHL: "भन्छन्", test1Name: "राम बहादुर थापा", test1Quote: "उर्व संसारले मेरो धानको उत्पादन ४०% बढाउन मद्दत गर्‍यो।", test1Loc: "चितवन, नेपाल", test2Name: "सीता देवी शर्मा", test2Quote: "सरकारी अनुदान ट्र्याकरले मात्रै मलाई हजारौं रुपैयाँ बचाएको छ।", test2Loc: "मोरङ, नेपाल", test3Name: "कृष्ण प्रसाद ओली", test3Quote: "बाली रोटेशन योजनाकारले मेरो खेतलाई परिवर्तन गर्‍यो।", test3Loc: "कास्की, नेपाल",
        creatorsTitle: "सिर्जनाकर्ताहरू", creatorsTitleHL: "भेट्नुहोस्",

        ctaTitle: "तपाईंको खेत रूपान्तरण गर्न तयार हुनुहुन्छ?", ctaDesc: "हजारौं किसानहरूसँग सामेल हुनुहोस् जसले पहिले नै उर्व संसार प्रयोग गरिरहेका छन्।", ctaBtn: "अहिले सुरु गर्नुहोस्",
        footerText: "रिलायन्स टेकफेस्ट परियोजना।",
    }
};

let currentLang = 'en';

function renderGrids() {
    // Stats Rendering
    document.getElementById('stats-grid').innerHTML = statsData.map(s => `
        <div class="text-center p-6 rounded-2xl border border-white/10 card-glass">
            <div class="text-4xl font-bold text-primary mb-2">${s.value}</div>
            <div class="text-sm text-gray-400 uppercase tracking-wider" data-t="${s.labelKey}"></div>
        </div>
    `).join('');

    // Features Rendering
    document.getElementById('features-grid').innerHTML = featuresData.map(f => `
        <div class="group card-glass p-8 rounded-[20px] transition-all duration-300 hover:-translate-y-2 hover:border-primary">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <i data-lucide="${f.icon}" class="w-7 h-7 text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3" data-t="${f.titleKey}"></h3>
            <p class="text-gray-400 text-sm leading-relaxed" data-t="${f.descKey}"></p>
        </div>
    `).join('');

    // Steps Rendering
    document.getElementById('steps-grid').innerHTML = stepsData.map((s, i) => `
        <div class="relative text-center group">
            <div class="text-6xl font-bold text-primary/10 mb-4">${s.num}</div>
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <i data-lucide="${s.icon}" class="w-8 h-8 text-primary"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2" data-t="${s.titleKey}"></h3>
            <p class="text-gray-400 text-sm" data-t="${s.descKey}"></p>
            ${i < stepsData.length - 1 ? '<div class="hidden lg:block absolute top-12 -right-4 w-8"><i data-lucide="chevron-right" class="w-6 h-6 text-primary/30"></i></div>' : ''}
        </div>
    `).join('');

    // Extras Rendering
    document.getElementById('extras-grid').innerHTML = extrasData.map(e => `
        <div class="flex gap-5 card-glass p-8 rounded-[20px] transition-all duration-300 hover:border-primary">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <i data-lucide="${e.icon}" class="w-6 h-6 text-primary"></i>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-2" data-t="${e.titleKey}"></h3>
                <p class="text-gray-400 text-sm leading-relaxed" data-t="${e.descKey}"></p>
            </div>
        </div>
    `).join('');

    // Testimonials Rendering
    document.getElementById('testimonials-grid').innerHTML = testimonialsData.map(tm => `
        <div class="card-glass p-8 rounded-[20px]">
            <div class="flex gap-1 mb-4">
                ${'<i data-lucide="star" class="w-4 h-4 text-[#a2d149] fill-[#a2d149]"></i>'.repeat(5)}
            </div>
            <p class="text-gray-400 text-sm italic mb-6 leading-relaxed">"<span data-t="${tm.quoteKey}"></span>"</p>
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm" id="initial-${tm.nameKey}"></div>
                <div>
                    <div class="font-semibold text-sm" data-t="${tm.nameKey}"></div>
                    <div class="text-xs text-gray-400 flex items-center gap-1">
                        <i data-lucide="map-pin" class="w-3 h-3"></i> <span data-t="${tm.locationKey}"></span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Creators Rendering
    document.getElementById('creators-grid').innerHTML = creatorsData.map(c => `
        <div class="card-glass p-8 rounded-[20px] text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary group">
            <div class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold transition-transform duration-300 group-hover:scale-110" 
                 style="background: linear-gradient(135deg, #a2d149, #2ecc71); color: #0f1710">
                ${c.initials}
            </div>
            <div class="text-lg font-semibold mb-1">${c.name}</div>
            <div class="text-sm uppercase tracking-[1px] text-[#a2d149]">${c.role}</div>
        </div>
    `).join('');

    updateTranslations();
    lucide.createIcons();
}

function updateTranslations() {
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        el.innerText = translations[currentLang][key] || key;
    });

    testimonialsData.forEach(tm => {
        const name = translations[currentLang][tm.nameKey];
        const el = document.getElementById(`initial-${tm.nameKey}`);
        if (el) el.innerText = name ? name.charAt(0) : '';
    });
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'ne' : 'en';
    document.getElementById('langSwitcher').innerText = currentLang === 'en' ? 'NE' : 'EN';
    updateTranslations();
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('agri-theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isLight = document.body.classList.contains('light');
    const themeIconContainer = document.getElementById('themeIcon');
    if (themeIconContainer) {
        themeIconContainer.innerHTML = `<i data-lucide="${isLight ? 'sun' : 'moon'}" class="w-5 h-5"></i>`;
        lucide.createIcons();
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('agri-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        updateThemeIcon();
    }
}

function navigateWithOverlay(url) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
    setTimeout(() => {
        window.location.href = url;
    }, 1500);
}

window.onload = () => {
    initTheme();
    renderGrids();

    // Attach loading overlay to all navigation links (login, get started, start now)
    document.querySelectorAll('a[href="pages/login.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithOverlay(link.href);
        });
    });
};