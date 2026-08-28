// ==========================================================
// 온라인 청첩장 - 최소 Service Worker
// 오프라인에서도 기본 화면이 뜨도록 핵심 파일만 캐싱합니다.
// ==========================================================

const CACHE_NAME = 'wedding-invitation-v1';
const CORE_ASSETS = [
  '/',
  '/static/css/style.css',
  '/static/js/main.js',
  '/manifest.json',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// 네트워크 우선, 실패 시 캐시로 폴백 (콘텐츠는 최신으로, 오프라인 대비는 유지)
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(function () {
        return caches.match(event.request);
      })
  );
});
