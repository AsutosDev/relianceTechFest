import { icon, refreshIcons } from '../icons.js';
import { analyzeDisease } from '../services/geminiService.js';
import { queueScan, getPendingScans } from '../services/offlineService.js';

export function renderDiseaseDetector(container, { language }) {
    const isNe = language === 'ne';
    let selectedFile = null;
    let previewUrl = null;
    let result = null;
    let isLoading = false;
    let activeTab = 'scan';

    const t = {
        title: isNe ? 'रोग पहिचान' : 'Disease Detection',
        subtitle: isNe ? 'बाली वा पशुको फोटो अपलोड गर्नुहोस्' : 'Upload a photo of your crop or livestock',
        upload: isNe ? 'फोटो छान्नुहोस्' : 'Choose Photo',
        camera: isNe ? 'क्यामेरा' : 'Camera',
        analyze: isNe ? 'विश्लेषण गर्नुहोस्' : 'Analyze',
        analyzing: isNe ? 'विश्लेषण गर्दै...' : 'Analyzing...',
        tabs: {
            scan: isNe ? 'स्क्यान' : 'Scan',
            library: isNe ? 'रोग पुस्तकालय' : 'Disease Library',
            history: isNe ? 'इतिहास' : 'History'
        },
        results: {
            disease: isNe ? 'रोग' : 'Disease',
            severity: isNe ? 'गम्भीरता' : 'Severity',
            confidence: isNe ? 'विश्वसनीयता' : 'Confidence',
            symptoms: isNe ? 'लक्षणहरू' : 'Symptoms',
            treatments: isNe ? 'उपचार' : 'Treatments',
            organic: isNe ? 'जैविक' : 'Organic',
            chemical: isNe ? 'रासायनिक' : 'Chemical',
            prevention: isNe ? 'रोकथाम' : 'Prevention',
            recovery: isNe ? 'निको हुने समय' : 'Recovery Time'
        },
        offline: isNe ? 'अफलाइन: स्क्यान पछि प्रशोधन हुनेछ' : 'Offline: Scan will be processed later',
        error: isNe ? 'विश्लेषण गर्न सकिएन' : 'Analysis failed'
    };

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <!-- Header -->
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="scan-line" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
          <p class="text-xs text-earth-500 dark:text-earth-400 mt-1">${t.subtitle}</p>
        </div>

        <!-- Tabs -->
        <div class="flex glass p-1.5 rounded-[1.5rem] mb-8 border border-white/20 shadow-2xl">
          ${['scan', 'library', 'history'].map(tab => `
            <button data-tab="${tab}" class="disease-tab flex-1 py-3 text-[11px] font-black uppercase tracking-tighter rounded-2xl transition-all ${activeTab === tab ? 'bg-nature-600 text-white shadow-lg' : 'text-earth-500 hover:text-earth-900 dark:hover:text-white'
            }">${t.tabs[tab]}</button>
          `).join('')}
        </div>

        <div id="disease-content">
          ${activeTab === 'scan' ? renderScanView() : activeTab === 'library' ? renderLibraryView() : renderHistoryView()}
        </div>
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function renderScanView() {
        return `
      <div class="space-y-6 animate-slide-up">
        <!-- Upload Area -->
        <div class="glass-card rounded-[2.5rem] p-8 shadow-2xl border border-white/20 text-center group">
          ${previewUrl ? `
            <div class="relative overflow-hidden rounded-[2rem] mb-6 shadow-inner border border-white/10">
              <img src="${previewUrl}" class="w-full h-56 object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          ` : `
            <div class="border-2 border-dashed border-earth-100 dark:border-earth-700 rounded-[2rem] p-12 mb-6 group-hover:border-nature-500/50 transition-colors">
              <i data-lucide="image-plus" class="w-16 h-16 text-earth-200 dark:text-earth-700 mx-auto mb-4 group-hover:scale-110 transition-transform"></i>
              <p class="text-xs font-black uppercase tracking-widest text-earth-400 group-hover:text-nature-600">${t.upload}</p>
            </div>
          `}
          <div class="flex gap-4">
            <label class="flex-1 cursor-pointer glass hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 text-earth-700 dark:text-earth-300 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg border-white/10">
              <i data-lucide="upload" class="w-4 h-4"></i> ${t.upload}
              <input type="file" accept="image/*" id="disease-file-input" class="hidden" />
            </label>
            <label class="flex-1 cursor-pointer glass hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 text-earth-700 dark:text-earth-300 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg border-white/10">
              <i data-lucide="camera" class="w-4 h-4"></i> ${t.camera}
              <input type="file" accept="image/*" capture="environment" id="disease-camera-input" class="hidden" />
            </label>
          </div>
        </div>

        ${selectedFile ? `
          <button id="disease-analyze-btn" class="w-full bg-nature-600 hover:bg-nature-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-nature-600/30 transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-wait' : ''}">
            ${isLoading ? `<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> ${t.analyzing}` : `<i data-lucide="scan-line" class="w-5 h-5"></i> ${t.analyze}`}
          </button>
        ` : ''}

        ${result ? renderResultView() : ''}
      </div>
    `;
    }

    function renderResultView() {
        if (!result) return '';
        if (result.affectedType === 'Other') {
            return `
        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-2xl border border-yellow-200 dark:border-yellow-800 text-center">
          <p class="text-yellow-700 dark:text-yellow-300">${result.localName}</p>
        </div>
      `;
        }

        const severityColors = { Low: 'green', Medium: 'yellow', High: 'orange', Critical: 'red' };
        const sevColor = severityColors[result.severity] || 'gray';
        const isDemo = result.localName.includes('Demo');

        return `
      <div class="bg-white dark:bg-earth-900 rounded-3xl p-6 shadow-xl border border-earth-100 dark:border-earth-800 space-y-5 animate-slide-up relative overflow-hidden">
        ${isDemo ? `
          <div class="absolute top-0 right-0 bg-nature-600 text-white text-[10px] font-bold px-4 py-1.5 rotate-45 translate-x-3 translate-y-2 shadow-sm">
            DEMO MODE
          </div>
        ` : ''}
        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-bold text-earth-900 dark:text-earth-100">${result.diseaseName}</h3>
            <p class="text-sm text-earth-500">${result.localName}</p>
          </div>
          <span class="bg-${sevColor}-100 dark:bg-${sevColor}-900/30 text-${sevColor}-700 dark:text-${sevColor}-300 px-3 py-1 rounded-full text-xs font-bold">${result.severity}</span>
        </div>

        <!-- Confidence -->
        <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-earth-500">${t.results.confidence}</span>
            <span class="font-bold text-nature-600">${result.confidence}%</span>
          </div>
          <div class="w-full bg-earth-200 dark:bg-earth-700 h-2 rounded-full">
            <div class="bg-nature-500 h-2 rounded-full transition-all" style="width: ${result.confidence}%"></div>
          </div>
        </div>

        <!-- Symptoms -->
        <div>
          <h4 class="text-sm font-bold text-earth-800 dark:text-earth-200 mb-2 flex items-center gap-2">
            <i data-lucide="alert-circle" class="w-4 h-4 text-orange-500"></i> ${t.results.symptoms}
          </h4>
          <ul class="list-disc pl-6 space-y-1 text-sm text-earth-600 dark:text-earth-400">
            ${(result.symptoms || []).map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>

        <!-- Treatments -->
        <div>
          <h4 class="text-sm font-bold text-earth-800 dark:text-earth-200 mb-2 flex items-center gap-2">
            <i data-lucide="pill" class="w-4 h-4 text-blue-500"></i> ${t.results.treatments}
          </h4>
          ${result.treatments ? `
            <div class="space-y-2">
              <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
                <p class="text-xs font-bold text-green-700 dark:text-green-300 mb-1">${t.results.organic}</p>
                <ul class="text-sm text-earth-600 dark:text-earth-400 list-disc pl-5">
                  ${(result.treatments.organic || []).map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                <p class="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">${t.results.chemical}</p>
                <ul class="text-sm text-earth-600 dark:text-earth-400 list-disc pl-5">
                  ${(result.treatments.chemical || []).map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
              ${result.treatments.dosage ? `<p class="text-xs text-earth-500 bg-earth-50 dark:bg-earth-800 p-2 rounded-lg">💊 ${result.treatments.dosage}</p>` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Prevention -->
        <div>
          <h4 class="text-sm font-bold text-earth-800 dark:text-earth-200 mb-2 flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-nature-500"></i> ${t.results.prevention}
          </h4>
          <ul class="list-disc pl-6 space-y-1 text-sm text-earth-600 dark:text-earth-400">
            ${(result.prevention || []).map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>

        ${result.recoveryTimeline ? `
          <div class="bg-nature-50 dark:bg-nature-900/20 p-3 rounded-xl flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-nature-600"></i>
            <span class="text-sm font-medium text-nature-700 dark:text-nature-300">${t.results.recovery}: ${result.recoveryTimeline}</span>
          </div>
        ` : ''}

        ${result.seasonalWarning ? `
          <div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-xl border border-orange-200 dark:border-orange-800">
            <p class="text-sm text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i> ${result.seasonalWarning}
            </p>
          </div>
        ` : ''}
      </div>
    `;
    }

    function renderLibraryView() {
        const diseases = [
            { name: isNe ? 'डढुवा रोग (Blast)' : 'Rice Blast', icon: '🍚', severity: 'High' },
            { name: isNe ? 'ढुसी रोग (Blight)' : 'Late Blight (Potato)', icon: '🥔', severity: 'Critical' },
            { name: isNe ? 'फल कुहिने रोग' : 'Fruit Rot (Tomato)', icon: '🍅', severity: 'Medium' },
            { name: isNe ? 'खुट्टा रोग (FMD)' : 'Foot & Mouth Disease', icon: '🐄', severity: 'High' },
            { name: isNe ? 'फौजी किरा' : 'Fall Armyworm', icon: '🐛', severity: 'High' },
        ];

        return `
      <div class="space-y-3 animate-slide-up">
        ${diseases.map(d => `
          <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
            <span class="text-2xl">${d.icon}</span>
            <div class="flex-1">
              <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${d.name}</h4>
            </div>
            <span class="text-[10px] font-bold px-2 py-1 rounded-full ${d.severity === 'Critical' ? 'bg-red-100 text-red-700' : d.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
            }">${d.severity}</span>
          </div>
        `).join('')}
      </div>
    `;
    }

    function renderHistoryView() {
        const pending = getPendingScans();
        return `
      <div class="space-y-3 animate-slide-up">
        ${pending.length === 0 ? `
          <div class="text-center p-8 text-earth-500 text-sm">
            ${isNe ? 'कुनै पेन्डिङ स्क्यान छैन' : 'No pending scans'}
          </div>
        ` : pending.map(s => `
          <div class="bg-white dark:bg-earth-900 p-4 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
            <i data-lucide="clock" class="w-5 h-5 text-yellow-500"></i>
            <div class="flex-1">
              <p class="text-sm text-earth-700 dark:text-earth-300">${isNe ? 'पेन्डिङ स्क्यान' : 'Pending Scan'}</p>
              <p class="text-xs text-earth-500">${new Date(s.timestamp).toLocaleString()}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    }

    function attachEvents() {
        // Tab switching
        container.querySelectorAll('.disease-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                render();
            });
        });

        // File inputs
        const handleFile = (file) => {
            selectedFile = file;
            previewUrl = URL.createObjectURL(file);
            result = null;
            render();
        };

        const fileInput = container.querySelector('#disease-file-input');
        if (fileInput) fileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });

        const cameraInput = container.querySelector('#disease-camera-input');
        if (cameraInput) cameraInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });

        // Analyze button
        const analyzeBtn = container.querySelector('#disease-analyze-btn');
        if (analyzeBtn && !isLoading) {
            analyzeBtn.addEventListener('click', async () => {
                if (!selectedFile || isLoading) return;

                if (!navigator.onLine) {
                    // Queue for later
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        queueScan(reader.result);
                        alert(t.offline);
                    };
                    reader.readAsDataURL(selectedFile);
                    return;
                }

                isLoading = true;
                render();

                try {
                    result = await analyzeDisease(selectedFile, language);
                    if (!result) {
                        alert(t.error);
                    }
                } catch (err) {
                    console.error(err);
                    alert(t.error);
                }
                isLoading = false;
                render();
            });
        }
    }

    render();
}
