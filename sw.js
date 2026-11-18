// Relevé Numérobis : garde l'application disponible hors connexion. Réseau d'abord (pour recevoir les mises à jour), sinon copie gardée.
const NOM="releve-numerobis-1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(NOM).then(c=>c.addAll(["./","index.html","manifest.webmanifest","icone-192.png","icone-512.png"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==NOM).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(NOM).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
