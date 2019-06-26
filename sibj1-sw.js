
'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'overwatchoffline' + cacheVersion
};
const offlineUrl = 'index.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          '.',
          offlineUrl
      ]);
    })
  );
});


// Menambahkan pengembalian offline ke online

this.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Kembali ke halaman offline 
              return caches.match(offlineUrl);
          })
    );
  }
  else{
        // melakukan respon terhadap apa saja yang dilakukan
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                        return response || fetch(event.request);
                    })
            );
      }
});