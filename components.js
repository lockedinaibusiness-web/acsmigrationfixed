// ACS Website — Shared Components (navbar + footer)
// Auto-detects if page is in root or pages/ subfolder

const isInPagesFolder = window.location.pathname.includes('/pages/');
const root = isInPagesFolder ? '../' : '';
const pages = isInPagesFolder ? '' : 'pages/';

function url(path) {
  // path like 'pages/contact.html' or 'index.html'
  if (path === 'index.html') {
    return root + 'index.html';
  }
  // strip 'pages/' prefix, then prepend correct path
  const file = path.replace('pages/', '');
  return root + 'pages/' + file;
}

// ---- New 4-category nav data ----
// each item: { label, href } — href is relative to the pages/ folder
const NAV_CATEGORIES = [
  {
    id: 'schools',
    label: 'For Schools',
    icon: 'building-school',
    items: [
      { label: 'Career Counselling', href: 'pages/career-counselling.html' },
      { label: 'Psychometric Test', href: 'pages/psychometric-test.html' },
      { label: 'Education Trips', href: 'pages/education-trips.html' },
      { label: 'Student Exchange', href: 'pages/student-exchange.html' },
      { label: 'Soft Skills Training', href: 'pages/soft-skills-training.html' },
      { label: 'AI Tools', href: 'pages/ai-tools.html' },
      { label: 'Game Based Learning', href: 'pages/game-based-learning.html' },
      { label: 'Robotics', href: 'pages/robotics.html' },
      { label: 'ATL Labs', href: 'pages/atl-labs.html' },
      { label: 'Career Fairs', href: 'pages/career-fairs.html' },
      { label: 'Skill Building Courses', href: 'pages/skill-building-courses.html' },
      { label: "Teacher's Training", href: 'pages/teachers-training.html' },
      { label: "Teacher's Hiring", href: 'pages/teachers-hiring.html' },
      { label: 'Event Management', href: 'pages/event-management.html' },
      { label: 'Motivational Sessions', href: 'pages/motivational-sessions.html' }
    ]
  },
  {
    id: 'students',
    label: 'For Students',
    icon: 'book',
    items: [
      { label: 'Study in India', href: 'pages/study-india.html' },
      { label: 'Study Abroad', href: 'pages/study-abroad.html' },
      { label: 'MBBS Abroad', href: 'pages/mbbs-abroad.html' },
      { label: 'Test Preparation', href: 'pages/ielts-toefl.html' },
      { label: 'Language Prep', href: 'pages/language-prep.html' },
      { label: 'Ivy League Admissions', href: 'pages/ivy-league-admissions.html' },
      { label: 'Internships', href: 'pages/internships.html' },
      { label: 'Scholarships', href: 'pages/scholarships.html' },
      { label: 'Vocational Courses', href: 'pages/vocational-courses.html' },
      { label: 'Overseas Accommodation', href: 'pages/overseas-accommodation.html' },
      { label: 'Education Loans', href: 'pages/education-loans.html' },
      { label: 'Certificate Courses', href: 'pages/certificate-courses.html' },
      { label: "Freshers' Jobs", href: 'pages/freshers-jobs.html' }
    ]
  },
  {
    id: 'parents',
    label: 'For Parents',
    icon: 'users',
    items: [
      { label: 'Online Schooling', href: 'pages/online-schooling.html' },
      { label: 'Home Schooling', href: 'pages/home-schooling.html' },
      { label: 'Activity Based Learning', href: 'pages/activity-based-learning.html' },
      { label: 'Pre-school Activities', href: 'pages/pre-school-activities.html' },
      { label: 'Education Loans', href: 'pages/education-loans.html' },
      { label: 'Coaching', href: 'pages/coaching.html' },
      { label: 'Sports', href: 'pages/sports.html' },
      { label: 'Books', href: 'pages/books.html' },
      { label: 'Stationery', href: 'pages/stationery.html' },
      { label: 'Art & Craft', href: 'pages/art-craft.html' },
      { label: 'Projects', href: 'pages/projects.html' }
    ]
  },
  {
    id: 'professionals',
    label: 'For Professionals',
    icon: 'briefcase',
    items: [
      { label: 'Immigration', href: 'pages/immigration.html' },
      { label: 'Online Education', href: 'pages/online-education.html' },
      { label: 'Jobs Abroad', href: 'pages/jobs-abroad.html' },
      { label: 'Corporate Learning', href: 'pages/corporate-learning.html' },
      { label: 'Mental Health', href: 'pages/mental-health.html' }
    ]
  }
];

// ---- Partner with Us form config ----
// 1. Deploy the provided Google Apps Script (Code.gs) as a Web App on your Google Sheet.
// 2. Paste the deployment URL below.
const PARTNER_FORM_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKSfHIs06YtDAAmd70fYRM-NBL_mG80JedzBZshejjjV03RWqCPAUdgkq4SNrXB5eU/exec';

// Partnership type dropdown options — same 4 categories used in the main nav dropdown.
// Edit this array if you want different/more specific options.
const PARTNER_TYPE_OPTIONS = NAV_CATEGORIES.map(c => c.label);

// splits an array into N nearly-equal columns (keeps left-to-right, top-to-bottom reading order)
function splitCols(arr, numCols) {
  const perCol = Math.ceil(arr.length / numCols);
  const cols = [];
  for (let i = 0; i < numCols; i++) {
    cols.push(arr.slice(i * perCol, (i + 1) * perCol));
  }
  return cols.filter(c => c.length);
}

function ddColHtml(items) {
  return items.map(item =>
    `<a class="dd-item" href="${url(item.href)}"><i class="ti ti-chevron-right" aria-hidden="true"></i><div><div class="dtxt">${item.label}</div></div></a>`
  ).join('\n');
}

function categoryDropdownHtml(cat) {
  const numCols = cat.items.length > 8 ? 2 : 1;
  const cols = splitCols(cat.items, numCols);
  const colsHtml = cols.map(col => `<div class="dd-col">${ddColHtml(col)}</div>`).join('\n');
  return `
  <div class="ni" id="ni-${cat.id}">
    <div class="nt" id="nt-${cat.id}" onclick="tog('${cat.id}')">${cat.label} <i class="ti ti-chevron-down" aria-hidden="true"></i></div>
    <div class="dd mega" id="dd-${cat.id}">
      <div class="dd-grid cols-${numCols}">
        ${colsHtml}
      </div>
      <a class="dd-cta" href="${root}pages/login.html">Register Now <span class="ncta-arrow"><i class="ti ti-arrow-right" aria-hidden="true"></i></span></a>
    </div>
  </div>`;
}

const ACS_NAV = `
<style>
  .nav {
    min-height: 68px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    background-color: #ffffff !important;
  }
  .nav .nt,
  .nav .nt-plain {
    font-size: 13px !important;
  }
  /* Partner = quiet outline, so it never competes with the gold CTA */
  .nav .nt-partner {
    background: transparent !important;
    color: #8A6412 !important;
    border: 1px solid #D9BC7E !important;
    padding: 6px 13px !important;
    font-weight: 600 !important;
  }
  .nav .nt-partner:hover {
    background: #FBF1DA !important;
    color: #6E4E10 !important;
    border-color: #C08F22 !important;
  }
  /* Mobile navigation drawer */
  .mobile-backdrop {
    position: fixed; inset: 0; z-index: 1001;
    background: rgba(24, 20, 14, .48);
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity .24s ease, visibility .24s ease;
  }
  .mobile-backdrop.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
  .mobile-drawer {
    position: fixed; inset: 0 0 0 auto; z-index: 1002;
    display: flex; flex-direction: column;
    width: min(390px, 90vw); height: 100vh; height: 100dvh;
    background: #fffdf8; color: #2e2110;
    box-shadow: -18px 0 48px rgba(30, 24, 14, .2);
    transform: translateX(102%); visibility: hidden; pointer-events: none;
    transition: transform .28s cubic-bezier(.2,.75,.25,1), visibility .28s;
    overscroll-behavior: contain;
  }
  .mobile-drawer.is-open { transform: translateX(0); visibility: visible; pointer-events: auto; }
  .mobile-drawer__head {
    flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between;
    min-height: 76px; padding: 12px 20px;
    border-bottom: 1px solid #eee2c6;
    background: linear-gradient(135deg, #fff9eb, #f8edda);
  }
  .mobile-drawer__brand { display: inline-flex; align-items: center; }
  .mobile-drawer__brand img { width: auto; height: 42px; }
  .mobile-drawer__close {
    display: inline-grid; place-items: center; width: 44px; height: 44px;
    border: 1px solid #ead8ad; border-radius: 14px; background: #fffdf8;
    color: #62480f; font-size: 22px;
  }
  .mobile-drawer__scroll { flex: 1 1 auto; overflow-y: auto; padding: 12px 14px 18px; -webkit-overflow-scrolling: touch; }
  .mobile-drawer__eyebrow { padding: 10px 10px 8px; color: #927544; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
  .mobile-drawer__link, .mobile-drawer__category {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    width: 100%; min-height: 50px; padding: 12px 12px;
    border: 0; border-bottom: 1px solid #f0e8d7; border-radius: 10px;
    background: transparent; color: #332716; text-align: left; text-decoration: none;
    font: 600 15px/1.35 var(--font-body, system-ui); cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .mobile-drawer__link:hover, .mobile-drawer__category:hover,
  .mobile-drawer__link:focus-visible, .mobile-drawer__category:focus-visible { background: #fbf1dc; outline: 2px solid #d7a33d; outline-offset: -2px; }
  .mobile-drawer__category-label { display: inline-flex; align-items: center; gap: 11px; }
  .mobile-drawer__category-label > i { color: #a87419; font-size: 19px; }
  .mobile-drawer__count { padding: 2px 8px; border-radius: 20px; background: #f7ecd2; color: #795814; font-size: 11px; font-weight: 700; }
  .mobile-drawer__chevron { color: #9b762d; transition: transform .2s ease; }
  .mobile-drawer__category[aria-expanded="true"] .mobile-drawer__chevron { transform: rotate(180deg); }
  .mobile-drawer__submenu { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .22s ease; }
  .mobile-drawer__submenu-inner { min-height: 0; overflow: hidden; }
  .mobile-drawer__submenu.is-open { grid-template-rows: 1fr; }
  .mobile-drawer__submenu a { display: block; padding: 11px 12px 11px 43px; color: #57472d; font-size: 14px; text-decoration: none; border-bottom: 1px solid #f1eadb; }
  .mobile-drawer__submenu a:hover, .mobile-drawer__submenu a:focus-visible { color: #825b13; background: #fcf5e8; outline: none; }
  .mobile-drawer__actions { flex: 0 0 auto; display: grid; gap: 10px; padding: 14px 20px calc(14px + env(safe-area-inset-bottom, 0px)); border-top: 1px solid #eee2c6; background: #fffdf8; }
  .mobile-drawer__action { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; border: 1px solid #c79b4b; border-radius: 13px; background: #fff; color: #745516; font: 700 15px/1 var(--font-body, system-ui); text-decoration: none; cursor: pointer; }
  .mobile-drawer__action--primary { border-color: #a87419; background: #a87419; color: #fff; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
  @media (prefers-reduced-motion: reduce) { .mobile-drawer, .mobile-backdrop, .mobile-drawer__submenu { transition-duration: .01ms; } }

  .nav a:focus,
  .nav a:active,
  .nav div:focus,
  .nav div:active {
    outline: none;
    box-shadow: none;
  }
  .nav .ncta {
    font-size: 13px !important;
    padding: 9px 8px 9px 18px !important;
  }
  .nav .ncta-arrow {
    width: 22px !important;
    height: 22px !important;
    font-size: 11px !important;
  }
  .nav .dd-item .dtxt {
    font-size: 13.5px !important;
  }
  .nav .dd-item .dsub {
    font-size: 13px !important;
  }

  /* ---- Smooth + responsive dropdown ---- */
  .nav .ni { position: relative; }

  .nav .nt {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: color 0.15s ease;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  .nav .nt:hover,
  .nav .ni:hover .nt,
  .nav .nt:focus,
  .nav .nt:active {
    color: #C9820A;
    outline: none;
    box-shadow: none;
  }

  .nav .nt .ti-chevron-down {
    transition: transform 0.25s ease;
  }
  .nav .nt.open .ti-chevron-down,
  .nav .ni:hover .nt .ti-chevron-down {
    transform: rotate(180deg);
  }

  .nav .dd {
    position: absolute;
    top: 100%;
    left: 0;
    background: linear-gradient(180deg, #fffdf7 0%, #fff8ea 100%);
    border: 1px solid #F0D28A;
    border-top: 3px solid #E8A317;
    border-radius: 12px;
    box-shadow: 0 16px 40px rgba(184, 122, 10, 0.18);
    padding: 20px;
    padding-top: 24px;
    margin-top: 0;
    z-index: 100;

    opacity: 0 !important;
    visibility: hidden !important;
    transform: translateY(8px);
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    pointer-events: none !important;

    max-height: 70vh;
    overflow-y: auto;
  }

  .nav .dd.open,
  .nav .ni:hover .dd {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0);
    pointer-events: auto !important;
  }

  .nav .dd-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 16px;
    background: #E8A317;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: 30px;
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .nav .dd-cta:hover {
    background: #C9820A;
    color: #fff;
  }
  .nav .dd-cta .ncta-arrow {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    color: #C9820A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
  }

  .nav .dd-grid {
    display: grid;
    gap: 8px 32px;
    grid-auto-flow: column;
  }
  .nav .dd-grid.cols-1 { grid-template-columns: minmax(200px, 1fr); }
  .nav .dd-grid.cols-2 { grid-template-columns: repeat(2, minmax(200px, 1fr)); }

  .nav .dd-col {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav .dd-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #6b4a12;
    transition: background-color 0.15s ease, transform 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }
  .nav .dd-item:hover {
    background: linear-gradient(90deg, #FCEBC2 0%, #FDF3DD 100%);
    transform: translateX(3px);
    color: #B8730A;
  }
  .nav .dd-item i {
    font-size: 14px;
    color: #E8A317;
    flex-shrink: 0;
  }
  .nav .dd-item:hover i {
    color: #C9820A;
  }

  /* ---- Responsive: tablet & mobile ---- */
  @media (max-width: 900px) {
    .nav .dd {
      position: fixed;
      left: 12px;
      right: 12px;
      top: auto;
      width: auto;
      max-height: 60vh;
    }
    .nav .dd-grid,
    .nav .dd-grid.cols-2 {
      grid-auto-flow: row;
      grid-template-columns: 1fr;
    }
    .nav .dd-item {
      white-space: normal;
    }
  }
</style>
<nav class="nav">
<a class="logo" href="${root}index.html">
  <img src="${root}images/logo.webp" alt="ACS Logo" width="188" height="110"
    decoding="async" fetchpriority="high" style="height: 44px; width: auto;">
</a>

  <button type="button" class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer">
    <i class="ti ti-menu-2" aria-hidden="true"></i>
  </button>

  <div class="ni">
    <a class="nt-plain" href="${root}index.html">Home</a>
  </div>

  <div class="ni">
    <a class="nt" href="${root}pages/about.html">About Us</a>
  </div>

  ${NAV_CATEGORIES.map(categoryDropdownHtml).join('\n')}

  <div class="ni">
    <a class="nt" href="${root}pages/contact.html">Contact Us</a>
  </div>

  <div class="ni">
    <button type="button" class="nt-plain nt-partner" data-open-partner>Partner with Us</button>
  </div>

  <a class="ncta" href="${root}pages/login.html">Register Now <span class="ncta-arrow"><i class="ti ti-arrow-right" aria-hidden="true"></i></span></a>
</nav>

<div class="mobile-backdrop" id="mobileBackdrop" aria-hidden="true"></div>

<aside class="mobile-drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-labelledby="mobileDrawerTitle" aria-hidden="true" inert>
  <div class="mobile-drawer__head">
    <a class="mobile-drawer__brand" href="${root}index.html" data-close-mobile-menu aria-label="ACS home">
      <img src="${root}images/logo.webp" alt="ACS" width="150" height="88">
    </a>
    <h2 id="mobileDrawerTitle" class="sr-only">Site navigation</h2>
    <button type="button" class="mobile-drawer__close" id="mobileDrawerClose" aria-label="Close menu"><i class="ti ti-x" aria-hidden="true"></i></button>
  </div>
  <nav class="mobile-drawer__scroll" aria-label="Mobile navigation">
    <div class="mobile-drawer__eyebrow">Explore</div>
    <a class="mobile-drawer__link" href="${root}index.html" data-close-mobile-menu>Home</a>
    <a class="mobile-drawer__link" href="${root}pages/about.html" data-close-mobile-menu>About Us</a>
    ${NAV_CATEGORIES.map(function (cat) {
      const panelId = `mobile-sub-${cat.id}`;
      return `<button type="button" class="mobile-drawer__category" aria-expanded="false" aria-controls="${panelId}">
        <span class="mobile-drawer__category-label"><i class="ti ti-${cat.icon}" aria-hidden="true"></i>${cat.label}<span class="mobile-drawer__count">${cat.items.length}</span></span>
        <i class="ti ti-chevron-down mobile-drawer__chevron" aria-hidden="true"></i>
      </button>
      <div class="mobile-drawer__submenu" id="${panelId}" aria-hidden="true" inert><div class="mobile-drawer__submenu-inner">
        ${cat.items.map(item => `<a href="${url(item.href)}" data-close-mobile-menu>${item.label}</a>`).join('\n')}
      </div></div>`;
    }).join('\n')}
    <a class="mobile-drawer__link" href="${root}pages/contact.html" data-close-mobile-menu>Contact Us</a>
  </nav>
  <div class="mobile-drawer__actions">
    <button type="button" class="mobile-drawer__action" data-open-partner>Partner with Us</button>
    <a class="mobile-drawer__action mobile-drawer__action--primary" href="${root}pages/login.html" data-close-mobile-menu>Register Now <i class="ti ti-arrow-right" aria-hidden="true"></i></a>
  </div>
</aside>
`;

const ACS_PARTNER_MODAL = `
<style>
  .partner-modal-overlay {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(30, 20, 5, 0.55);
    z-index: 999999 !important;
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding: 100px 16px 24px;
    overflow-y: auto;
  }
  .partner-modal-overlay.open {
    display: flex;
  }
  @media (max-width: 600px) {
    .partner-modal-overlay {
      padding: 90px 12px 20px;
    }
  }
  .partner-modal {
    background: #fffdf7;
    border-radius: 14px;
    border-top: 4px solid #E8A317;
    box-shadow: 0 24px 60px rgba(0,0,0,0.25);
    width: 100%;
    max-width: 460px;
    padding: 28px 26px 26px;
    position: relative;
    font-family: inherit;
  }
  .partner-modal h3 {
    margin: 0 0 4px;
    font-size: 22px;
    color: #3a2a08;
  }
  .partner-modal p.pm-sub {
    margin: 0 0 20px;
    font-size: 14px;
    color: #8a6a2a;
  }
  .partner-modal .pm-close {
    position: absolute;
    top: 14px;
    right: 16px;
    background: none;
    border: none;
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    color: #8a6a2a;
  }
  .partner-modal .pm-field {
    margin-bottom: 16px;
  }
  .partner-modal label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #5a4110;
    margin-bottom: 6px;
  }
  .partner-modal input,
  .partner-modal select,
  .partner-modal textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 12px;
    border: 1px solid #E8D6A8;
    border-radius: 8px;
    font-size: 14px;
    background: #fff;
    color: #3a2a08;
    font-family: inherit;
    resize: vertical;
  }
  .partner-modal input:focus,
  .partner-modal select:focus,
  .partner-modal textarea:focus {
    outline: none;
    border-color: #E8A317;
    box-shadow: 0 0 0 3px rgba(232,163,23,0.18);
  }
  .partner-modal .pm-submit {
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 8px;
    background: #E8A317;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    margin-top: 4px;
    transition: background 0.15s ease;
  }
  .partner-modal .pm-submit:hover {
    background: #C9820A;
  }
  .partner-modal .pm-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .partner-modal .pm-msg {
    margin-top: 14px;
    font-size: 14px;
    text-align: center;
    display: none;
  }
  .partner-modal .pm-msg.success { color: #1a7d3a; display: block; }
  .partner-modal .pm-msg.error { color: #c0392b; display: block; }
</style>
<div class="partner-modal-overlay" id="partnerModalOverlay">
  <div class="partner-modal">
    <button class="pm-close" onclick="closePartnerModal()" aria-label="Close">&times;</button>
    <h3>Partner with Us</h3>
    <p class="pm-sub">Fill in your details and we'll get in touch about partnership opportunities.</p>
    <form id="partnerForm">
      <div class="pm-field">
        <label for="pm-name">Name</label>
        <input type="text" id="pm-name" name="name" required />
      </div>
      <div class="pm-field">
        <label for="pm-email">Email</label>
        <input type="email" id="pm-email" name="email" required />
      </div>
      <div class="pm-field">
        <label for="pm-phone">Phone</label>
        <input type="tel" id="pm-phone" name="phone" required />
      </div>
      <div class="pm-field">
        <label for="pm-partnership">Partnership In</label>
        <select id="pm-partnership" name="partnership" required>
          <option value="" disabled selected>Select an option</option>
          ${PARTNER_TYPE_OPTIONS.map(o => `<option value="${o}">${o}</option>`).join('\n          ')}
        </select>
      </div>
      <div class="pm-field" id="pm-subfield" style="display:none;">
        <label for="pm-sub-partnership">Specific Interest <span style="font-weight:400;color:#a1885a;">(optional)</span></label>
        <select id="pm-sub-partnership" name="subPartnership">
          <option value="">Select an option</option>
        </select>
      </div>
      <div class="pm-field">
        <label for="pm-message">Message <span style="font-weight:400;color:#a1885a;">(optional)</span></label>
        <textarea id="pm-message" name="message" rows="3" placeholder="Tell us more..."></textarea>
      </div>
      <button type="submit" class="pm-submit" id="pm-submit-btn">Submit</button>
      <div class="pm-msg" id="pm-msg"></div>
    </form>
  </div>
</div>
`;

const ACS_FOOTER = `
<footer class="footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="f-logo"><span class="a1">A</span><span class="a2">C</span><span class="a3">S</span></div>
      <p style="line-height:1.7;">Honest, unbiased admissions & career guidance for ambitious students aiming for global opportunities.</p>
      <p style="margin-top:12px;color:#C7A868;">📍 India · Nepal · Sri Lanka</p>
    </div>
    <div class="footer-col">
      <h4>Study Abroad</h4>
      <a href="${root}pages/study-uk.html">Study in UK</a>
      <a href="${root}pages/study-canada.html">Study in Canada</a>
      <a href="${root}pages/study-usa.html">Study in USA</a>
      <a href="${root}pages/study-australia.html">Study in Australia</a>
      <a href="${root}pages/study-germany.html">Study in Germany</a>
      <a href="${root}pages/study-japan.html">Study in Japan</a>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <a href="${root}pages/admissions-consulting.html">Admissions Consulting</a>
      <a href="${root}pages/career-counselling.html">Career Counselling</a>
      <a href="${root}pages/ielts-toefl.html">Test Preparation</a>
      <a href="${root}pages/visa-services.html">Visa Services</a>
      <a href="${root}pages/scholarships.html">Scholarships</a>
      <a href="${root}pages/educat-platform.html">EduCat Platform</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="${root}pages/about.html">About Us</a>
      <a href="${root}pages/blog.html">Blog</a>
      <a href="${root}pages/contact.html">Contact Us</a>
      <a href="${root}pages/student-login.html">Student Login</a>
      <a href="${root}pages/contact.html">Book Consultation</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2025 Admissions and Career Services. All rights reserved.</span>
    <span>Privacy Policy · Terms of Use</span>
  </div>
</footer>
`;

// Inject nav and footer
document.addEventListener('DOMContentLoaded', function () {
  const navPlaceholder = document.getElementById('acs-nav');
  const footerPlaceholder = document.getElementById('acs-footer');
  if (navPlaceholder) navPlaceholder.outerHTML = ACS_NAV;
  if (footerPlaceholder) footerPlaceholder.outerHTML = ACS_FOOTER;

  // Inject Partner with Us modal (only once, appended to body)
  if (!document.getElementById('partnerModalOverlay')) {
    document.body.insertAdjacentHTML('beforeend', ACS_PARTNER_MODAL);
  }

  // JS-based hover-to-open (backup, in case CSS :hover gets overridden elsewhere)
  document.querySelectorAll('.nav .ni').forEach(function (ni) {
    const dd = ni.querySelector('.dd');
    const nt = ni.querySelector('.nt');
    if (!dd) return;
    ni.addEventListener('mouseenter', function () {
      closeAll();
      dd.classList.add('open');
      if (nt) nt.classList.add('open');
    });
    ni.addEventListener('mouseleave', function () {
      dd.classList.remove('open');
      if (nt) nt.classList.remove('open');
    });
  });
});

// ---- Dropdown logic ----
const menus = NAV_CATEGORIES.map(c => c.id);

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

document.addEventListener('click', function (e) {
  if (!e.target.closest('.ni') && !e.target.closest('.dd')) {
    closeAll();
  }
});

// Close dropdown on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeAll();
});

// ---- Mobile menu (hamburger) logic ----
function updateBodyScrollLock() {
  const mm = document.getElementById('mobileDrawer');
  const pm = document.getElementById('partnerModalOverlay');
  const mmOpen = mm && mm.classList.contains('is-open');
  const pmOpen = pm && pm.classList.contains('open');
  document.body.style.overflow = (mmOpen || pmOpen) ? 'hidden' : '';
}

function setMobileMenuOpen(open, restoreFocus) {
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileBackdrop');
  const toggle = document.getElementById('navToggle');
  if (!drawer) return;

  drawer.classList.toggle('is-open', open);
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  drawer.inert = !open;
  if (backdrop) backdrop.classList.toggle('is-open', open);
  if (toggle) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const icon = toggle.querySelector('i');
    if (icon) icon.className = open ? 'ti ti-x' : 'ti ti-menu-2';
  }
  updateBodyScrollLock();

  if (open) {
    const closeButton = document.getElementById('mobileDrawerClose');
    if (closeButton) closeButton.focus();
  } else if (restoreFocus !== false && toggle) {
    toggle.focus();
  }
}

window.toggleMobileMenu = function () {
  const drawer = document.getElementById('mobileDrawer');
  setMobileMenuOpen(!(drawer && drawer.classList.contains('is-open')));
};

window.closeMobileMenu = function () {
  setMobileMenuOpen(false);
};

// One delegated handler keeps the shared drawer controls wired on every page.
document.addEventListener('click', function (e) {
  const target = e.target instanceof Element ? e.target : null;
  if (!target) return;

  if (target.closest('#navToggle')) {
    window.toggleMobileMenu();
    return;
  }
  if (target.closest('#mobileDrawerClose, #mobileBackdrop')) {
    window.closeMobileMenu();
    return;
  }
  if (target.closest('[data-open-partner]')) {
    window.openPartnerModal();
    return;
  }
  if (target.closest('[data-close-mobile-menu]')) {
    setMobileMenuOpen(false, false);
    return;
  }

  const categoryButton = target.closest('.mobile-drawer__category');
  if (categoryButton) {
    const shouldOpen = categoryButton.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.mobile-drawer__category').forEach(function (button) {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      const expanded = button === categoryButton && shouldOpen;
      button.setAttribute('aria-expanded', String(expanded));
      if (panel) {
        panel.classList.toggle('is-open', expanded);
        panel.setAttribute('aria-hidden', String(!expanded));
        panel.inert = !expanded;
      }
    });
  }
});

// Escape closes the drawer; Tab stays inside while it acts as a modal dialog.
document.addEventListener('keydown', function (e) {
  const drawer = document.getElementById('mobileDrawer');
  if (!drawer || !drawer.classList.contains('is-open')) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    window.closeMobileMenu();
    return;
  }
  if (e.key !== 'Tab') return;
  const focusable = Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'))
    .filter(el => !el.closest('[inert]'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus();
  }
});

// Close when moving back to desktop navigation.
window.addEventListener('resize', function () {
  if (window.innerWidth > 900) setMobileMenuOpen(false, false);
});

// ---- Partner with Us modal logic ----
window.openPartnerModal = function () {
  closeAll();
  closeMobileMenu();
  const overlay = document.getElementById('partnerModalOverlay');
  if (overlay) overlay.classList.add('open');
  updateBodyScrollLock();
};

window.closePartnerModal = function () {
  const overlay = document.getElementById('partnerModalOverlay');
  if (overlay) overlay.classList.remove('open');
  updateBodyScrollLock();
};

// Close modal on outside click / Escape
document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'partnerModalOverlay') {
    closePartnerModal();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePartnerModal();
});

// Populate/show the "Specific Interest" sub-dropdown based on selected partnership category
document.addEventListener('change', function (e) {
  if (e.target && e.target.id === 'pm-partnership') {
    const subfield = document.getElementById('pm-subfield');
    const subSelect = document.getElementById('pm-sub-partnership');
    if (!subfield || !subSelect) return;

    const category = NAV_CATEGORIES.find(c => c.label === e.target.value);

    if (category && category.items && category.items.length) {
      subSelect.replaceChildren(new Option('Select an option', ''));
      category.items.forEach(function (item) {
        subSelect.add(new Option(item.label, item.label));
      });
      subfield.style.display = '';
    } else {
      subSelect.replaceChildren(new Option('Select an option', ''));
      subfield.style.display = 'none';
    }
  }
});

// Handle form submit -> sends data to Google Sheet via Apps Script Web App
document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'partnerForm') {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('pm-submit-btn');
    const msg = document.getElementById('pm-msg');

    if (!PARTNER_FORM_SCRIPT_URL || PARTNER_FORM_SCRIPT_URL.indexOf('PASTE_YOUR') === 0) {
      msg.className = 'pm-msg error';
      msg.textContent = 'Form is not connected to a Google Sheet yet. Set PARTNER_FORM_SCRIPT_URL in components.js.';
      return;
    }

    const data = {
      formType: 'partner',
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      partnership: form.partnership.value,
      subPartnership: form.subPartnership.value,
      message: form.message.value.trim(),
      pageSource: window.location.href
    };

    btn.disabled = true;
    btn.textContent = 'Submitting...';
    msg.className = 'pm-msg';
    msg.textContent = '';

    // Apps Script web apps don't send CORS headers back, so we POST in no-cors mode.
    // We can't read the response, but the request still reaches the sheet.
    fetch(PARTNER_FORM_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    })
      .then(function () {
        msg.className = 'pm-msg success';
        msg.textContent = 'Thank you! We will get in touch with you soon.';
        form.reset();
        const subfield = document.getElementById('pm-subfield');
        if (subfield) subfield.style.display = 'none';
        btn.textContent = 'Submit';
        btn.disabled = false;
        setTimeout(closePartnerModal, 1800);
      })
      .catch(function (err) {
        console.error('Partner form submit failed:', err);
        msg.className = 'pm-msg error';
        msg.textContent = 'Something went wrong. Please try again.';
        btn.textContent = 'Submit';
        btn.disabled = false;
      });
  }
});
