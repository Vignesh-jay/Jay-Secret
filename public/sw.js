const CACHE = "jay-secret-v1";

const FILES = [
  "/",
  "/manifest.json",
  "/assets/css/style.css",
  "/assets/css/variables.css",
  "/assets/css/animations.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
