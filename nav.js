// ACS Website — Shared Navigation JS
// NOTE: components.js already defines window.tog / closeAll and injects the nav.
// This file is only needed if a page includes nav.js WITHOUT components.js
// (e.g. a static, non-injected nav markup). Keep the `menus` list below in
// sync with the category ids used in components.js (NAV_CATEGORIES).

document.addEventListener('DOMContentLoaded', function () {

  const menus = ['schools', 'students', 'parents', 'professionals'];

  function closeAll() {
    menus.forEach(m => {
      const dd = document.getElementById('dd-' + m);
      const nt = document.getElementById('nt-' + m);
      if (dd) dd.classList.remove('open');
      if (nt) nt.classList.remove('open');
    });
  }

  window.tog = function (id) {
    const dd = document.getElementById('dd-' + id);
    const nt = document.getElementById('nt-' + id);
    if (!dd) return;
    const isOpen = dd.classList.contains('open');
    closeAll();
    if (!isOpen) {
      dd.classList.add('open');
      if (nt) nt.classList.add('open');
    }
  };

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.ni') && !e.target.closest('.dd')) {
      closeAll();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  // Mark active nav link based on current page
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nt-plain').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
});