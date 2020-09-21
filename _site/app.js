/* Registering Service Worker */
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    // sometime later…
    reg.update();
  });
};
