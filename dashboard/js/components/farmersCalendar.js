import { icon, refreshIcons } from '../icons.js';
import { generateMonthData, getMonthName, getDayName, getFarmingAdviceForDate } from '../services/nepaliCalendarService.js';

export function renderFarmersCalendar(container, { language }) {
    const isNe = language === 'ne';
    let currentYear = 2082;
    let currentMonth = 0;
    let selectedDate = null;

    const t = {
        title: isNe ? 'कृषि पात्रो' : "Farmer's Calendar",
        today: isNe ? 'आज' : 'Today',
        advice: isNe ? 'कृषि सल्लाह' : 'Farming Advice'
    };

    function render() {
        const dates = generateMonthData(currentYear, currentMonth);
        const monthName = getMonthName(currentMonth, language);
        const dayHeaders = [0, 1, 2, 3, 4, 5, 6].map(i => getDayName(i, language));

        const firstDayOffset = dates.length > 0 ? dates[0].weekDay : 0;

        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        <div class="text-center mb-6">
          <h2 class="text-xl font-bold text-earth-900 dark:text-earth-100 flex items-center justify-center gap-2">
            <i data-lucide="calendar" class="w-5 h-5 text-nature-600"></i> ${t.title}
          </h2>
        </div>

        <div class="bg-white dark:bg-earth-900 rounded-3xl shadow-xl border border-earth-100 dark:border-earth-800 overflow-hidden animate-slide-up">
          <!-- Month Navigation -->
          <div class="bg-nature-600 text-white px-6 py-4 flex items-center justify-between">
            <button id="cal-prev" class="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <i data-lucide="chevron-left" class="w-5 h-5"></i>
            </button>
            <div class="text-center">
              <h3 class="text-xl font-bold">${monthName}</h3>
              <p class="text-nature-200 text-sm">${currentYear} BS</p>
            </div>
            <button id="cal-next" class="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <i data-lucide="chevron-right" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Day Headers -->
          <div class="grid grid-cols-7 text-center py-2 border-b border-earth-100 dark:border-earth-800">
            ${dayHeaders.map((d, i) => `
              <span class="text-xs font-bold ${i === 6 ? 'text-red-500' : 'text-earth-500 dark:text-earth-400'}">${d}</span>
            `).join('')}
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-px p-2">
            ${Array.from({ length: firstDayOffset }).map(() => `<div class="p-2"></div>`).join('')}
            ${dates.map(d => {
            const isSelected = selectedDate && selectedDate.day === d.day;
            const isHoliday = d.isHoliday;
            const hasEvent = !!d.event;
            return `
                <button data-day="${d.day}" class="cal-day-btn relative p-2 rounded-xl text-center transition-all hover:bg-earth-100 dark:hover:bg-earth-800 ${isSelected ? 'bg-nature-600 text-white hover:bg-nature-700' : ''
                }">
                  <span class="text-sm font-bold ${isHoliday && !isSelected ? 'text-red-500' : isSelected ? '' : 'text-earth-900 dark:text-earth-100'}">${d.day}</span>
                  ${hasEvent ? `<div class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : d.isAuspicious ? 'bg-nature-500' : 'bg-orange-400'}"></div>` : ''}
                </button>
              `;
        }).join('')}
          </div>
        </div>

        <!-- Selected Date Details -->
        ${selectedDate ? `
          <div class="mt-4 bg-white dark:bg-earth-900 rounded-2xl p-5 shadow-sm border border-earth-100 dark:border-earth-800 animate-fade-in">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="text-lg font-bold text-earth-900 dark:text-earth-100">${monthName} ${selectedDate.day}</h4>
                <p class="text-xs text-earth-500">${getDayName(selectedDate.weekDay, language)} • ${selectedDate.tithi}</p>
                ${selectedDate.adDate ? `<p class="text-xs text-earth-400 mt-0.5">${selectedDate.adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
              </div>
              ${selectedDate.isAuspicious ? `<span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full text-xs font-bold">✨ ${isNe ? 'शुभ' : 'Auspicious'}</span>` : ''}
            </div>

            ${selectedDate.event ? `
              <div class="bg-nature-50 dark:bg-nature-900/20 p-3 rounded-xl mb-3">
                <p class="text-sm font-bold text-nature-700 dark:text-nature-300 flex items-center gap-2">
                  <i data-lucide="calendar-check" class="w-4 h-4"></i> ${selectedDate.event}
                </p>
              </div>
            ` : ''}

            <div class="bg-earth-50 dark:bg-earth-800 p-3 rounded-xl">
              <p class="text-xs font-bold text-earth-500 uppercase mb-1">${t.advice}</p>
              <p class="text-sm text-earth-700 dark:text-earth-300">${getFarmingAdviceForDate(selectedDate, language)}</p>
            </div>
          </div>
        ` : ''}

        <!-- Events this month -->
        <div class="mt-4 space-y-2">
          ${dates.filter(d => d.event).map(d => `
            <div class="bg-white dark:bg-earth-900 p-3 rounded-xl shadow-sm border border-earth-100 dark:border-earth-800 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl ${d.isAuspicious ? 'bg-nature-100 dark:bg-nature-900/30 text-nature-600' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'} flex items-center justify-center font-bold text-sm">
                ${d.day}
              </div>
              <div>
                <p class="text-sm font-bold text-earth-900 dark:text-earth-100">${d.event}</p>
                <p class="text-xs text-earth-500">${getDayName(d.weekDay, language)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

        refreshIcons(container);
        attachEvents(dates);
    }

    function attachEvents(dates) {
        container.querySelector('#cal-prev')?.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            selectedDate = null;
            render();
        });

        container.querySelector('#cal-next')?.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            selectedDate = null;
            render();
        });

        container.querySelectorAll('.cal-day-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const day = parseInt(btn.dataset.day);
                selectedDate = dates.find(d => d.day === day) || null;
                render();
            });
        });
    }

    render();
}
