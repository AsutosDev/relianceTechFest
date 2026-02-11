import { icon, refreshIcons } from '../icons.js';

export function renderSplashScreen(container, onComplete) {
    container.innerHTML = `
    <div class="fixed inset-0 z-[100] bg-gradient-to-br from-nature-600 via-nature-700 to-earth-800 flex flex-col items-center justify-center text-white animate-fade-in">
      <div class="relative mb-8">
        <div class="absolute inset-0 w-24 h-24 bg-white/20 rounded-full blur-xl" style="animation: splashPulse 2s infinite;"></div>
        <div class="relative w-24 h-24 flex items-center justify-center animate-bounce-slow">
          <img src="../assets/logo.png" alt="Logo" class="w-16 h-auto drop-shadow-lg">
        </div>
      </div>
      <h1 class="text-3xl font-bold tracking-wide mb-2">उर्व संसार</h1>
      <p class="text-nature-200 text-sm tracking-widest uppercase">Smart Farming Nepal</p>
      <div class="mt-12 flex gap-1">
        <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
        <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
        <div class="w-2 h-2 bg-white/60 rounded-full animate-bounce" style="animation-delay: 0.4s;"></div>
      </div>
    </div>
  `;

    setTimeout(() => {
        onComplete();
    }, 2500);
}
