// Costa Brava offline cache. The version changes whenever a file changes.
const CACHE = 'costa-brava-a7cd471f8a';
const FILES = [
 "./",
 "besalu.html",
 "fonts/CormorantGaramond-italic-400-latin-ext.woff2",
 "fonts/CormorantGaramond-italic-400-latin.woff2",
 "fonts/CormorantGaramond-italic-500-latin-ext.woff2",
 "fonts/CormorantGaramond-italic-500-latin.woff2",
 "fonts/CormorantGaramond-normal-400-latin-ext.woff2",
 "fonts/CormorantGaramond-normal-400-latin.woff2",
 "fonts/CormorantGaramond-normal-500-latin-ext.woff2",
 "fonts/CormorantGaramond-normal-500-latin.woff2",
 "fonts/CormorantGaramond-normal-600-latin-ext.woff2",
 "fonts/CormorantGaramond-normal-600-latin.woff2",
 "fonts/Jost-normal-300-latin-ext.woff2",
 "fonts/Jost-normal-300-latin.woff2",
 "fonts/Jost-normal-400-latin-ext.woff2",
 "fonts/Jost-normal-400-latin.woff2",
 "fonts/Jost-normal-500-latin-ext.woff2",
 "fonts/Jost-normal-500-latin.woff2",
 "fonts/fonts.css",
 "girona.html",
 "icons/apple-touch-icon.png",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "images/begur-calle.jpg",
 "images/besalu-hospital.jpg",
 "images/besalu-mikve.jpg",
 "images/besalu-placa.jpg",
 "images/besalu-pont-vell.jpg",
 "images/besalu-puente.jpg",
 "images/besalu-sant-pere.jpg",
 "images/besalu-sant-vicenc.jpg",
 "images/besalu-vista.jpg",
 "images/cadaques-pueblo.jpg",
 "images/girona-banys-arabs.jpg",
 "images/girona-call.jpg",
 "images/girona-catedral-escalera.jpg",
 "images/girona-catedral.jpg",
 "images/girona-muralla.jpg",
 "images/girona-onyar.jpg",
 "images/girona-peixateries.jpg",
 "images/girona-sant-feliu.jpg",
 "images/parador-piscina.png",
 "images/parador.jpg",
 "images/rodes-campanario.jpg",
 "images/rodes-claustro-inferior.jpg",
 "images/rodes-claustro-superior.jpg",
 "images/rodes-galilea.jpg",
 "images/rodes-mirador.jpg",
 "images/rodes-nave.jpg",
 "images/rodes-santa-helena.jpg",
 "images/rodes.jpg",
 "index.html",
 "manifest.webmanifest",
 "rodes.html"
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // restaurant and map links go to the web as normal
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).catch(function () {
        if (e.request.mode === 'navigate') return caches.match('index.html');
      });
    })
  );
});
