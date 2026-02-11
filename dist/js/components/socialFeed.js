import { icon, refreshIcons } from '../icons.js';
import { getCachedFeed, cacheFeed } from '../services/offlineService.js';

export function renderSocialFeed(container, { language, user }) {
    const isNe = language === 'ne';

    const MOCK_POSTS = [
        {
            id: '1', author: isNe ? 'सीता शर्मा' : 'Sita Sharma', avatar: '👩‍🌾', location: 'Chitwan',
            time: isNe ? '२ घण्टा अगाडि' : '2 hours ago',
            content: isNe ? 'यो वर्ष मेरो गोलभेडा खेतीमा राम्रो उत्पादन भयो! ड्रिप सिँचाइ प्रयोग गरेको फाइदा भयो।' : 'Great harvest from my tomato farm this year! Drip irrigation really made a difference.',
            image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=400&fit=crop',
            likes: 24, comments: 5, shares: 3
        },
        {
            id: '2', author: isNe ? 'राम थापा' : 'Ram Thapa', avatar: '👨‍🌾', location: 'Kaski',
            time: isNe ? '५ घण्टा अगाडि' : '5 hours ago',
            content: isNe ? 'कसैलाई भैँसीको दूध उत्पादन बढाउने तरिका थाहा छ? मेरो भैँसीले अहिले ६ लिटर मात्र दिन्छे।' : 'Does anyone know how to increase buffalo milk production? Mine is only giving 6 liters/day.',
            image: null,
            likes: 8, comments: 12, shares: 1
        },
        {
            id: '3', author: isNe ? 'कृषि ज्ञान केन्द्र' : 'Agri Knowledge Center', avatar: '🏛️', location: 'Kathmandu',
            time: isNe ? '१ दिन अगाडि' : '1 day ago',
            content: isNe ? '⚠️ चेतावनी: यो हप्ता तराईमा फौजी किरा (Fall Armyworm) देखिएको छ। मकै बालीमा विशेष ध्यान दिनुहोस्।' : '⚠️ Alert: Fall Armyworm detected in Terai region this week. Please check your maize crops carefully.',
            image: null,
            likes: 45, comments: 20, shares: 30
        }
    ];

    // Load cached or use mock
    let posts = getCachedFeed();
    if (posts.length === 0) {
        posts = MOCK_POSTS;
        cacheFeed(posts);
    }

    // Local state
    let postLikes = {};
    posts.forEach(p => { postLikes[p.id] = { count: p.likes, liked: false }; });
    let isOffline = !navigator.onLine;

    const t = {
        title: isNe ? 'कृषि समुदाय' : 'Farming Community',
        newPost: isNe ? 'के सोच्नुभएको छ?' : "What's on your mind?",
        post: isNe ? 'पोस्ट गर्नुहोस्' : 'Post',
        like: isNe ? 'मन पर्यो' : 'Like',
        comment: isNe ? 'टिप्पणी' : 'Comment',
        share: isNe ? 'शेयर' : 'Share',
        weather: isNe ? 'आजको मौसम' : "Today's Weather",
        offline: isNe ? 'अफलाइन मोड' : 'Offline Mode'
    };

    function render() {
        container.innerHTML = `
      <div class="px-4 pt-4 pb-28 max-w-lg mx-auto">
        ${isOffline ? `
          <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-300 animate-fade-in">
            <i data-lucide="wifi-off" class="w-4 h-4"></i> ${t.offline}
          </div>
        ` : ''}

        <!-- Weather Widget -->
        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 mb-6 text-white shadow-lg relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-xs font-medium">${t.weather}</p>
              <h3 class="text-2xl font-bold mt-1">${user ? user.district : 'Nepal'}</h3>
              <p class="text-sm opacity-90 mt-1">28°C • ${isNe ? 'आंशिक बादल' : 'Partly Cloudy'}</p>
            </div>
            <div class="text-5xl">⛅</div>
          </div>
        </div>

        <!-- Create Post -->
        <div class="bg-white dark:bg-earth-900 rounded-2xl p-4 mb-6 shadow-sm border border-earth-100 dark:border-earth-800">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-nature-600 text-white flex items-center justify-center font-bold">
              ${user && user.name ? user.name.charAt(0) : '?'}
            </div>
            <input type="text" id="feed-new-post-input" placeholder="${t.newPost}" 
              class="flex-1 bg-earth-50 dark:bg-earth-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-nature-500 border border-earth-200 dark:border-earth-700" />
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <label class="cursor-pointer flex items-center gap-1 text-xs text-earth-500 hover:text-nature-600 transition-colors">
                <i data-lucide="image" class="w-4 h-4"></i>
                <input type="file" accept="image/*" id="feed-image-input" class="hidden" />
              </label>
            </div>
            <button id="feed-post-btn" class="bg-nature-600 hover:bg-nature-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors">
              ${t.post}
            </button>
          </div>
          <div id="feed-image-preview" class="hidden mt-3"></div>
        </div>

        <!-- Posts -->
        <div class="space-y-4" id="feed-posts-list">
          ${posts.map(post => renderPost(post, t, postLikes, isNe)).join('')}
        </div>
      </div>
    `;

        refreshIcons(container);
        attachEvents();
    }

    function attachEvents() {
        // New post
        let selectedImage = null;
        const imgInput = container.querySelector('#feed-image-input');
        if (imgInput) {
            imgInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    selectedImage = URL.createObjectURL(file);
                    const preview = container.querySelector('#feed-image-preview');
                    preview.classList.remove('hidden');
                    preview.innerHTML = `<img src="${selectedImage}" class="w-full h-32 object-cover rounded-xl" />`;
                }
            });
        }

        const postBtn = container.querySelector('#feed-post-btn');
        if (postBtn) {
            postBtn.addEventListener('click', () => {
                const input = container.querySelector('#feed-new-post-input');
                if (!input.value.trim()) return;
                const newPost = {
                    id: Date.now().toString(),
                    author: user ? user.name : 'User',
                    avatar: '👤',
                    location: user ? user.district : '',
                    time: isNe ? 'अहिले' : 'Just now',
                    content: input.value,
                    image: selectedImage,
                    likes: 0, comments: 0, shares: 0
                };
                posts = [newPost, ...posts];
                postLikes[newPost.id] = { count: 0, liked: false };
                cacheFeed(posts);
                selectedImage = null;
                render();
            });
        }

        // Like buttons
        container.querySelectorAll('.feed-like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                if (postLikes[id]) {
                    postLikes[id].liked = !postLikes[id].liked;
                    postLikes[id].count += postLikes[id].liked ? 1 : -1;
                    const countEl = btn.querySelector('.like-count');
                    if (countEl) countEl.textContent = postLikes[id].count;
                    btn.classList.toggle('text-red-500', postLikes[id].liked);
                    btn.classList.toggle('text-earth-500', !postLikes[id].liked);
                }
            });
        });

        // Online/offline listeners
        const handleOnline = () => { isOffline = false; render(); };
        const handleOffline = () => { isOffline = true; render(); };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    }

    render();
}

function renderPost(post, t, postLikes, isNe) {
    const likeData = postLikes[post.id] || { count: post.likes, liked: false };
    return `
    <div class="bg-white dark:bg-earth-900 rounded-2xl shadow-sm border border-earth-100 dark:border-earth-800 overflow-hidden animate-fade-in">
      <!-- Author -->
      <div class="p-4 pb-2 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-earth-100 dark:bg-earth-800 flex items-center justify-center text-lg">
          ${post.avatar}
        </div>
        <div>
          <h4 class="font-bold text-sm text-earth-900 dark:text-earth-100">${post.author}</h4>
          <p class="text-[10px] text-earth-500">${post.location} • ${post.time}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="px-4 pb-3">
        <p class="text-sm text-earth-700 dark:text-earth-300 leading-relaxed">${post.content}</p>
      </div>

      ${post.image ? `
        <img src="${post.image}" alt="Post image" class="w-full h-52 object-cover" />
      ` : ''}

      <!-- Actions -->
      <div class="px-4 py-3 border-t border-earth-100 dark:border-earth-800 flex justify-around">
        <button data-id="${post.id}" class="feed-like-btn flex items-center gap-1.5 text-xs font-medium ${likeData.liked ? 'text-red-500' : 'text-earth-500'} hover:text-red-500 transition-colors">
          <i data-lucide="heart" class="w-4 h-4"></i>
          <span class="like-count">${likeData.count}</span>
        </button>
        <button class="flex items-center gap-1.5 text-xs font-medium text-earth-500 hover:text-blue-500 transition-colors">
          <i data-lucide="message-circle" class="w-4 h-4"></i> ${post.comments}
        </button>
        <button class="flex items-center gap-1.5 text-xs font-medium text-earth-500 hover:text-nature-500 transition-colors">
          <i data-lucide="share-2" class="w-4 h-4"></i> ${post.shares}
        </button>
      </div>
    </div>
  `;
}
