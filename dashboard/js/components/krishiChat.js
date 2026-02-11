import { icon, refreshIcons } from '../icons.js';
import { createKrishiChat } from '../services/geminiService.js';

export function renderKrishiChat(container, { language }) {
    const isNe = language === 'ne';
    let messages = [];
    let chatSession = null;
    let isLoading = false;

    const t = {
        title: isNe ? 'कृषि सहायक' : 'Krishi Sahathi',
        subtitle: isNe ? 'तपाईंको AI कृषि साथी' : 'Your AI Farming Assistant',
        placeholder: isNe ? 'कृषि सम्बन्धी प्रश्न सोध्नुहोस्...' : 'Ask any farming question...',
        greeting: isNe ? 'नमस्कार! 🙏 म कृषि सहायक हुँ। कृषि, बजार भाउ, वा सरकारी योजना बारे सोध्नुहोस्।' : 'Namaste! 🙏 I am Krishi Sahathi. Ask me about farming, market prices, or government schemes.',
        suggestions: isNe
            ? ['धानमा डढुवा रोग कसरी नियन्त्रण गर्ने?', 'आजको गोलभेडाको भाउ कति हो?', 'बाली बीमा कसरी गर्ने?']
            : ['How to control rice blast disease?', "What's the price of tomatoes today?", 'How to apply for crop insurance?']
    };

    // Init welcome message
    messages = [{ role: 'ai', content: t.greeting }];

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto h-full flex flex-col">
        <!-- Header -->
        <div class="text-center mb-4">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="message-circle" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
          <p class="text-xs text-earth-500 dark:text-earth-400">${t.subtitle}</p>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto no-scrollbar space-y-6 mb-4 px-2" id="chat-messages">
          ${messages.map(msg => `
            <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in">
              <div class="${msg.role === 'user'
                ? 'bg-nature-600 text-white rounded-3xl rounded-br-sm max-w-[85%] px-5 py-3.5 shadow-xl shadow-nature-600/20 font-medium'
                : 'glass-card text-earth-800 dark:text-earth-200 rounded-3xl rounded-bl-sm max-w-[85%] px-5 py-3.5 shadow-lg'}">
                <div class="text-[15px] leading-relaxed chat-msg-content">${msg.role === 'ai' ? renderMarkdown(msg.content) : escapeHtml(msg.content)}</div>
              </div>
            </div>
          `).join('')}
 
          ${isLoading ? `
            <div class="flex justify-start animate-fade-in">
              <div class="glass-card rounded-3xl rounded-bl-sm px-5 py-4 shadow-lg">
                <div class="flex gap-1.5">
                  <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
                  <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                  <div class="w-2 h-2 bg-nature-500 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
 
        <!-- Suggestions (only if empty chat) -->
        ${messages.length <= 1 && !isLoading ? `
          <div class="mb-4 space-y-2 px-2 animate-slide-up">
            ${t.suggestions.map(s => `
              <button class="chat-suggestion w-full text-left glass-card hover:bg-nature-500 hover:text-white dark:hover:bg-nature-600 p-4 rounded-2xl text-sm font-bold text-earth-700 dark:text-earth-300 transition-all border-earth-100 dark:border-earth-700 group">
                <div class="flex items-center justify-between">
                  <span>${s}</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>
              </button>
            `).join('')}
          </div>
        ` : ''}
 
        <!-- Input -->
        <div class="flex gap-3 glass p-2 rounded-2xl border border-white/20 shadow-2xl">
          <input type="text" id="chat-input" placeholder="${t.placeholder}"
            class="flex-1 bg-transparent px-4 py-3 text-sm outline-none font-bold text-earth-900 dark:text-white placeholder:text-earth-400" />
          <button id="chat-send-btn" class="bg-nature-600 hover:bg-nature-700 text-white p-4 rounded-xl shadow-lg shadow-nature-600/30 transition-all active:scale-95 ${isLoading ? 'opacity-50' : ''}">
            <i data-lucide="send" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    `;

        refreshIcons(container);
        attachEvents();

        // Scroll to bottom
        const msgContainer = container.querySelector('#chat-messages');
        if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    async function sendMessage(text) {
        if (!text.trim() || isLoading) return;

        messages.push({ role: 'user', content: text });
        isLoading = true;
        render();

        try {
            if (!chatSession) {
                chatSession = createKrishiChat(language);
            }
            const result = await chatSession.sendMessage(text);
            const response = await result.response;
            const aiText = response.text() || 'Sorry, I could not generate a response.';
            messages.push({ role: 'ai', content: aiText });
        } catch (err) {
            console.error('Chat error:', err);
            messages.push({ role: 'ai', content: isNe ? 'माफ गर्नुहोस्, त्रुटि भयो। पछि फेरि प्रयास गर्नुहोस्।' : 'Sorry, an error occurred. Please try again later.' });
        }

        isLoading = false;
        render();
    }

    function attachEvents() {
        const input = container.querySelector('#chat-input');
        const sendBtn = container.querySelector('#chat-send-btn');

        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (input) sendMessage(input.value);
            });
        }

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') sendMessage(input.value);
            });
        }

        // Suggestions
        container.querySelectorAll('.chat-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                sendMessage(btn.textContent.trim());
            });
        });
    }

    render();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderMarkdown(text) {
    try {
        if (window.marked) {
            return window.marked.parse(text);
        }
    } catch (e) {
        console.warn('Markdown parse error:', e);
    }
    return escapeHtml(text);
}
