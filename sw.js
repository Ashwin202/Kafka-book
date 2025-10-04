// Service Worker for Kafka Book PWA
const CACHE_NAME = 'kafka-book-v1.3';
const STATIC_CACHE_NAME = 'kafka-book-static-v1.3';
const DYNAMIC_CACHE_NAME = 'kafka-book-dynamic-v1.3';

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    '/diagrams.js',
    '/manifest.json',
    '/splash-screen.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('Opened static cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Static cache populated');
                // Force activation of new service worker
                return self.skipWaiting();
            })
            .catch(error => {
                console.log('Cache install failed:', error);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // For HTML files, always try network first for updates
                if (event.request.destination === 'document') {
                    return fetch(event.request)
                        .then(networkResponse => {
                            // Update cache with fresh content
                            if (networkResponse && networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(STATIC_CACHE_NAME)
                                    .then(cache => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            // Fallback to cache if network fails
                            return response || caches.match('/index.html');
                        });
                }
                
                // For other resources, return cached version if available
                if (response) {
                    // Update cache in background for non-critical resources
                    if (event.request.destination !== 'document') {
                        fetch(event.request)
                            .then(networkResponse => {
                                if (networkResponse && networkResponse.status === 200) {
                                    const responseClone = networkResponse.clone();
                                    caches.open(DYNAMIC_CACHE_NAME)
                                        .then(cache => {
                                            cache.put(event.request, responseClone);
                                        });
                                }
                            })
                            .catch(() => {
                                // Ignore network errors for background updates
                            });
                    }
                    return response;
                }
                
                // Fetch from network if not in cache
                return fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            const cacheName = event.request.destination === 'document' 
                                ? STATIC_CACHE_NAME 
                                : DYNAMIC_CACHE_NAME;
                            
                            caches.open(cacheName)
                                .then(cache => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete all old cache versions
                    if (cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME &&
                        cacheName.startsWith('kafka-book')) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Old caches cleaned up');
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});

// Clear all caches when service worker is unregistered
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        console.log('Clearing cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            }).then(() => {
                console.log('All caches cleared');
                event.ports[0].postMessage({ success: true });
            })
        );
    }
});

// Handle uninstall - clear all caches
self.addEventListener('uninstall', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    console.log('Uninstalling - clearing cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            console.log('All caches cleared on uninstall');
        })
    );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Handle any background sync tasks
    console.log('Background sync triggered');
    return Promise.resolve();
}

// Push notifications (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/128x128.png',
            badge: '/icons/64x64.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore Kafka Book',
                    icon: '/icons/64x64.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/icons/64x64.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
