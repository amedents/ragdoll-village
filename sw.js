const CACHE='lwa-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url); if(u.origin!==self.location.origin||u.search)return; // skip cross-origin + query (no unbounded ?_au cache growth)
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c)).catch(()=>{});return res;}).catch(()=>caches.match(r))); });
