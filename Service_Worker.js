const CACHE_NAME = 'WebDeveloper-v2';
const urlsToCache = [
  './',
  './index.html',
  './css/bootstrap.min.css',
  './css/home.css',
  './js/bootstrap.bundle.min.js',
  './js/jquery-3.6.0.js',
  './regist_serviceWorker.js',
  './pwa/images/icons/icon-512x512.png',
  './pwa/images/icons/icon-72x72.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting());
      })
      .catch(err => console.log('Falló registro de cache', err))
  );
});

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(e.request))
  );
});
