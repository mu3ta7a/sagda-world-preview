const C='sw-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./icon-192.png'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(x=>{const cp=x.clone();caches.open(C).then(c=>c.put(r,cp));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
self.addEventListener('push',e=>{let t='';try{t=(e.data&&e.data.json().n)||''}catch(_){}e.waitUntil(self.registration.showNotification(t||"Sagda's WORLD",{body:'',icon:'icon-192.png',badge:'icon-192.png',tag:'chat',renotify:true}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
