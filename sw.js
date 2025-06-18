const cacheName = "hacker-rpg-v1";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./assets/logo.png",
  "./assets/bg.jpg",
  "./assets/bg-light.jpg",
  "./contact.html",
  "./mission.html",
  "./resume.html",
  "./skills.html",
  "./favicon.ico",
  "/assets/sounds/typewriter-key.mp3",
"/assets/sounds/mission-success.mp3",
"./favicon.ico",
"./assets/favicon-32x32.png",
"./assets/favicon-16x16.png",
"./assets/apple-touch-icon.png"

];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
