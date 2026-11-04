/* Onde & Formule — service worker (generato da tools/gensw.js).
   Strategia: tutti i file dell'app in cache all'installazione; poi "cache first" con aggiornamento in background.
   Una nuova versione si installa in attesa e si attiva quando l'utente tocca "Aggiorna". */
"use strict";
const VERSION = "of-d16f7bd8f9";
const PRECACHE = [
 "./",
 "./app.js",
 "./data-formule.js",
 "./data-problemi.js",
 "./data-quiz.js",
 "./fonts/AtkinsonHyperlegible-400-latin-ext.woff2",
 "./fonts/AtkinsonHyperlegible-400-latin.woff2",
 "./fonts/AtkinsonHyperlegible-700-latin-ext.woff2",
 "./fonts/AtkinsonHyperlegible-700-latin.woff2",
 "./fonts/IBMPlexMono-500-latin-ext.woff2",
 "./fonts/IBMPlexMono-500-latin.woff2",
 "./fonts/IBMPlexMono-600-latin-ext.woff2",
 "./fonts/IBMPlexMono-600-latin.woff2",
 "./fonts/Kalam-400-latin-ext.woff2",
 "./fonts/Kalam-400-latin.woff2",
 "./fonts/Kalam-700-latin-ext.woff2",
 "./fonts/Kalam-700-latin.woff2",
 "./icons/apple-touch-icon.png",
 "./icons/favicon.png",
 "./icons/icon-192.png",
 "./icons/icon-512.png",
 "./icons/icon-maskable-512.png",
 "./index.html",
 "./labs.js",
 "./manifest.json",
 "./style.css",
 "./vendor/katex/LICENSE",
 "./vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
 "./vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
 "./vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Main-Bold.woff2",
 "./vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
 "./vendor/katex/fonts/KaTeX_Main-Italic.woff2",
 "./vendor/katex/fonts/KaTeX_Main-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
 "./vendor/katex/fonts/KaTeX_Math-Italic.woff2",
 "./vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
 "./vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
 "./vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Script-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
 "./vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2",
 "./vendor/katex/katex.min.css",
 "./vendor/katex/katex.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(PRECACHE.map(u => new Request(u, { cache: "reload" })))));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("of-") && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("message", event => { if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    // pagina: dalla cache (funziona offline); se c'è rete la aggiorno per la prossima volta
    event.respondWith(caches.open(VERSION).then(cache => cache.match("./index.html").then(hit => {
      const net = fetch(req).then(res => { if (res.ok && url.pathname.endsWith("/")) cache.put("./index.html", res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  event.respondWith(caches.open(VERSION).then(cache => cache.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && res.type === "basic") cache.put(req, res.clone());
    return res;
  }))));
});
