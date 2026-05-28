const CACHE_NAME = 'nutriplan-cache-v3';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './logo.png',
  './maggi.png',
  './atta_noodles.png',
  './moong_dal_khichdi.png',
  './oats_upma.png',
  './palak_paneer.png',
  './ragi_dosa.png',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
  'https://unpkg.com/lucide@latest'
];

// Install event: cache all static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static shell and assets');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up outdated caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: serve from cache first, otherwise fetch and cache dynamically (Stale-While-Revalidate)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in the background to update the cache for next time
        fetch(e.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(e.request, networkResponse);
              });
            }
          })
          .catch(() => { /* Ignore background fetch failures when offline */ });
        return cachedResponse;
      }

      // If not in cache, fetch from network and dynamically cache
      return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cache external dynamic resources (like food images) and local files
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        console.log('[Service Worker] Fetch failed offline for:', e.request.url);
      });
    })
  );
});
