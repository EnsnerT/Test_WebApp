var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/Test_WebApp/',
    '/Test_WebApp/preview.png',
    '/Test_WebApp/manifest.json',
    '/Test_WebApp/sw.js',
    '/Test_WebApp/styles.css',
    '/Test_WebApp/script.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});
