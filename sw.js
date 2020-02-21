var CACHE_NAME = 'my-site-offline';
var urlsToCache = [
    // '/Test_WebApp/',
    // '/Test_WebApp/preview.png',
    // '/Test_WebApp/script.js',
    // OFFLINE USE
    '/Test_WebApp/offline.svg',
    '/Test_WebApp/offline.html',
    // App Icon
    '/Test_WebApp/preview_512.png',
    '/Test_WebApp/manifest.json',
    '/Test_WebApp/sw.js',
    '/Test_WebApp/styles.css'
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
    if(navigator.onLine){
        // Load Normal
        event.respondWith(
            fetch(event.request).catch(function(){navigator.onLine=false;respondOffline(event)})
        );
    } else {
        respondOffline(event);
    }
});

function respondOffline(event){
    event.respondWith(
        caches.match((event.request.url.endsWith("/")?"/Test_WebApp/offline.html":event.request))
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                } else {
                    console.log("Kein Fund Für ",event.request)
                    return "<html><body>ERROR</body></html>";
                }
            }
        ).catch(
            function(error){
                console.error("Recieved an Error! ",error)
            }
        )
    );
}
