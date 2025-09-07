self.addEventListener("push", (e) => {
  const data = e.data.json() || {};

  const opts = {
    body: data.body || "You have a new notification!",
    data,
    tag: data.tag || "general-notification",
    renotify: true,
  };

  e.waitUntil(
    self.registration.showNotification(data.title || "Notification", opts)
  );
});

self.addEventListener("notificationclick", (e) => {
    e.notification.close();
    const url = e.notification.data.url || '/';
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then( windowClients => {
            for (let client of windowClients) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
}
);
