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

    // Load cached user posts (filter out any old mocks that might have been cached)
    const cachedPosts = getCachedFeed().filter(p => !['1', '2', '3'].includes(p.id));
    let posts = [...MOCK_POSTS, ...cachedPosts];

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
        <div class="bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-3xl p-5 mb-8 text-white shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div class="relative z-10 flex items-center justify-between">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full w-fit">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <p class="text-[9px] font-black uppercase tracking-widest">${t.weather}</p>
              </div>
              <h3 class="text-3xl font-black mt-2 tracking-tight">${user ? user.district : 'Nepal'}</h3>
              <p class="text-sm font-bold opacity-90 flex items-center gap-2">
                <i data-lucide="cloud-sun" class="w-4 h-4"></i> 28°C • ${isNe ? 'आंशिक बादल' : 'Partly Cloudy'}
              </p>
            </div>
            <div class="text-6xl filter drop-shadow-2xl animate-float">⛅</div>
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
                
                // Save only user posts to cache
                const userPosts = posts.filter(p => !['1', '2', '3'].includes(p.id));
                cacheFeed(userPosts);
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
    <div class="glass-card rounded-3xl shadow-xl overflow-hidden animate-fade-in hover:scale-[1.01] transition-transform duration-300">
      <!-- Author -->
      <div class="p-5 pb-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-nature-600/10 dark:bg-nature-400/10 flex items-center justify-center text-2xl shadow-inner active:scale-90 transition-transform cursor-pointer border border-nature-500/10">
            ${post.avatar}
          </div>
          <div>
            <h4 class="font-extrabold text-sm text-earth-950 dark:text-white leading-none">${post.author}</h4>
            <p class="text-[11px] font-bold text-earth-500 dark:text-earth-400 mt-1 flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3"></i> ${post.location} • ${post.time}
            </p>
          </div>
        </div>
        <button class="p-2 text-earth-400 hover:text-nature-600 transition-colors">
          <i data-lucide="more-horizontal" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="px-5 pb-4">
        <p class="text-[15px] text-earth-800 dark:text-earth-200 leading-relaxed font-medium">${post.content}</p>
      </div>

      ${post.image ? `
        <div class="px-3 pb-3">
          <img src="${post.image}" alt="Post image" class="w-full h-64 object-cover rounded-2xl shadow-md border border-white/10" />
        </div>
      ` : ''}

      <!-- Actions -->
      <div class="px-5 py-4 bg-white/30 dark:bg-black/20 backdrop-blur-sm flex justify-between items-center gap-4">
        <div class="flex gap-4">
          <button data-id="${post.id}" class="feed-like-btn flex items-center gap-2 text-xs font-black ${likeData.liked ? 'text-red-500' : 'text-earth-500'} hover:scale-110 transition-all">
            <i data-lucide="heart" class="w-5 h-5 ${likeData.liked ? 'fill-current' : ''}"></i>
            <span class="like-count">${likeData.count}</span>
          </button>
          <button class="flex items-center gap-2 text-xs font-black text-earth-500 hover:text-blue-500 hover:scale-110 transition-all">
            <i data-lucide="message-circle" class="w-5 h-5"></i> ${post.comments}
          </button>
        </div>
        <button class="flex items-center gap-2 text-xs font-black text-earth-500 hover:text-nature-500 hover:scale-110 transition-all">
          <i data-lucide="share-2" class="w-5 h-5"></i> ${post.shares}
        </button>
      </div>
    </div>
  `;
}
