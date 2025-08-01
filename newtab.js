document.addEventListener('DOMContentLoaded', () => {
  const notes = document.getElementById('notes');

  chrome.storage.local.get('quicklinks_notes', (result) => {
    notes.value = result.quicklinks_notes || '';
  });

  notes.addEventListener('input', () => {
    chrome.storage.local.set({ quicklinks_notes: notes.value });
  });

  const addressInput = document.getElementById("address-input");
  document.querySelector('.address-bar').addEventListener('submit', function (e) {
    e.preventDefault();
    let query = addressInput.value.trim();

    if (!query) return;

    const isLikelyURL = /^https?:\/\//i.test(query) || /^[\w-]+\.[a-z]{2,}/i.test(query);

    if (isLikelyURL) {
      if (!/^https?:\/\//i.test(query)) {
        query = 'https://' + query;
      }

      try {
        new URL(query);
        window.location.assign(query);
      } catch {
        window.location.assign('https://www.google.com/search?q=' + encodeURIComponent(query));
      }
    } else {
      window.location.assign('https://www.google.com/search?q=' + encodeURIComponent(query));
    }
  });
});
