/* Registering Service Worker */
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('{{ "/sw.js" | relative_url }}').then(reg => {
    // sometime later…
    reg.update();
  });
};
