/* === SHIRWAL CIRCLE — app.js === */

const KEY_USER = 'shirwal_circle_user';
const WA_NUMBER = '917066644476';

const USER_ACCOUNTS = [
  {
    username: 'demo@shirwalcircle.in',
    password: 'Shirwal@123',
    name: 'Rohan Patil',
    phone: '+91 98765 12345',
    address: 'Datta Nagar, Shirwal'
  }
];

const SERVICES = {
  'Doctor':                        { desc: 'Consult with experienced local doctors. Home visits available on request.', website: null, icon: 'logo-doctor' },
  'Beauty Parlor':                 { desc: 'Professional beauty and grooming services for women. Bridal packages available.', website: null, icon: 'logo-beauty-parlor' },
  'Salon':                         { desc: 'Haircuts, styling, shaving, and grooming for men and kids.', website: null, icon: 'logo-salon' },
  'Electrical Technician':         { desc: 'Wiring, repairs, switches, fans, and fittings. Call for a quick visit.', website: null, icon: 'logo-electrical-technician' },
  'Plumbing Work':                 { desc: 'Pipe repairs, tap fitting, drainage cleaning, and bathroom work.', website: null, icon: 'logo-plumbing-work' },
  'Gas Mechanic':                  { desc: 'Gas stove repair and cylinder connection services at your door.', website: null, icon: 'logo-gas-mechanic' },
  'Refrigerator Mechanic':         { desc: 'Fridge gas refilling, compressor repair, and cooling issues fixed fast.', website: null, icon: 'logo-refrigerator-mechanic' },
  'TV/LED Mechanic':               { desc: 'Smart TV, LED panel, and set-top box repair at home.', website: null, icon: 'logo-tv-led-mechanic' },
  'Computer/Printer Technician':   { desc: 'Laptop, desktop, and printer repair with data recovery support.', website: null, icon: 'logo-computer-printer-technician' },
  'Xerox & Printing at Doorstep':  { desc: 'Document printing and xerox at your door. Bulk orders welcome.', website: null, icon: 'logo-xerox-printing-doorstep' },
  'Pest Control':                  { desc: 'Termite, cockroach, and general pest treatment for home and office.', website: null, icon: 'logo-pest-control' },
  'Home Cleaning':                 { desc: 'Full home deep cleaning by professional teams. Move-in/out specials.', website: null, icon: 'logo-home-cleaning' },
  'House Shifting':                { desc: 'Safe and affordable shifting with packing service available.', website: null, icon: 'logo-house-shifting' },
  'Painting Works':                { desc: 'Interior and exterior painting with quality materials.', website: null, icon: 'logo-painting-works' },
  'Laundry':                       { desc: 'Wash, dry, fold, and ironing service. Pickup and delivery available.', website: 'https://laundry.shirwal.in', icon: 'logo-laundry' },
  'Tiffin Services':               { desc: 'Fresh home-cooked meals delivered daily. Monthly subscription available.', website: 'https://mess.shirwal.in', icon: 'logo-tiffin-services' },
  'Real Estate & Properties':      { desc: 'Buy, sell, or rent property in Shirwal. Free consultation.', website: 'https://property.shirwal.in', icon: 'logo-real-estate-properties' },
  'Rickshaw':                      { desc: 'Local auto-rickshaw service for quick, affordable rides around Shirwal.', website: 'https://rickshaw.shirwal.in', icon: 'logo-rickshaw' },
  'Tours & Travels':               { desc: 'Local sightseeing, outstation trips, and wedding vehicle packages.', website: null, icon: 'logo-tours-and-travels' },
  'Car Services':                  { desc: 'Car wash, polishing, servicing, and minor repairs at your location.', website: null, icon: 'logo-car-services' },
  'Car Wash':                      { desc: 'Hand wash, foam wash, and interior cleaning. Doorstep available.', website: null, icon: 'logo-car-wash' },
  'Shop Act License':              { desc: 'Get your Shop Act License quickly with expert assistance in Shirwal.', website: 'https://shopact.shirwal.in', icon: 'logo-xerox-printing-doorstep' },
};

// ── USER ─────────────────────────────────────────────────────
function getUser() { try { return JSON.parse(localStorage.getItem(KEY_USER)); } catch { return null; } }
function setUser(u) { localStorage.setItem(KEY_USER, JSON.stringify(u)); }
function clearUser() { localStorage.removeItem(KEY_USER); }
function findAccount(u, p) { return USER_ACCOUNTS.find(a => a.username === u && a.password === p) || null; }

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const el = document.querySelector('[data-ui-toast]');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2200);
}

// ── AUTH UI ───────────────────────────────────────────────────
function updateAuthUI() {
  const user = getUser();
  document.querySelectorAll('[data-auth="logged-in"]').forEach(el => el.style.display = user ? '' : 'none');
  document.querySelectorAll('[data-auth="logged-out"]').forEach(el => el.style.display = user ? 'none' : '');
}

function requireAuth() {
  if (document.body.dataset.requiresAuth === 'true' && !getUser()) location.href = 'login.html';
}

function bindLogout() {
  document.querySelectorAll('[data-logout]').forEach(btn => {
    btn.addEventListener('click', () => { clearUser(); location.href = 'index.html'; });
  });
}

// ── LOGIN ─────────────────────────────────────────────────────
function bindLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errEl = document.getElementById('loginError');
    const acc = findAccount(username, password);
    if (acc) { setUser(acc); location.href = 'account.html'; }
    else { errEl.textContent = 'Incorrect email or password.'; errEl.style.display = 'block'; }
  });
}

// ── ACCOUNT ───────────────────────────────────────────────────
function renderAccount() {
  const user = getUser();
  if (!user) return;
  const set = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
  set('[data-user-name]', user.name);
  set('[data-user-initial]', user.name.charAt(0));
  set('[data-user-email]', user.username);
  set('[data-user-phone]', user.phone);
  set('[data-user-address]', user.address);
}

// ── POPUP ─────────────────────────────────────────────────────
function openPopup(serviceName) {
  const modal = document.querySelector('[data-service-popup]');
  if (!modal) return;
  const svc = SERVICES[serviceName] || { desc: 'Contact us for details.', website: null, icon: null };
  const msg = encodeURIComponent(`Hello, I need ${serviceName} in Shirwal. Please share availability and charges.`);

  modal.querySelector('[data-popup-title]').textContent = serviceName;
  modal.querySelector('[data-popup-copy]').textContent = svc.desc;

  // Icon
  const iconEl = modal.querySelector('[data-popup-icon]');
  if (iconEl && svc.icon) iconEl.src = `assets/${svc.icon}.svg`;

  // WhatsApp — hide if has website
  const waLink = modal.querySelector('[data-contact-link]');
  waLink.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  waLink.style.display = svc.website ? 'none' : 'inline-flex';

  // Website button
  const webBtn = modal.querySelector('[data-web-link]');
  if (webBtn) {
    if (svc.website) {
      webBtn.href = svc.website;
      webBtn.style.display = 'inline-flex';
    } else {
      webBtn.style.display = 'none';
    }
  }

  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  showToast(`${serviceName} details opened`);
}

function closePopup() {
  const modal = document.querySelector('[data-service-popup]');
  if (!modal) return;
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function bindPopup() {
  document.querySelectorAll('.vendor-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => openPopup(btn.dataset.service));
  });
  document.querySelectorAll('[data-close-popup]').forEach(el => {
    el.addEventListener('click', closePopup);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });
}

// ── DEEP LINK ─────────────────────────────────────────────────
function openServiceFromQuery() {
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  if (!service) return;
  const card = document.querySelector(`[data-service-card="${service}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('highlight-pulse');
    setTimeout(() => card.classList.remove('highlight-pulse'), 1600);
    setTimeout(() => openPopup(service), 400);
  }
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('.section .glass, .section-title, .section-sub, .section-label');
  if (!targets.length) return;
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.style.transitionDelay = Math.min(i * 45, 180) + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

// ── TYPEWRITER ────────────────────────────────────────────────
function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  let phrases = [];
  try { phrases = JSON.parse(el.dataset.typewriter); } catch (_) {}
  if (!Array.isArray(phrases) || !phrases.length) return;

  const textEl  = el.querySelector('.type-text');
  const caretEl = el.querySelector('.type-caret');
  if (!textEl) return;

  // Reduced motion / no-JS-friendly: just show the first phrase.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textEl.textContent = phrases[0];
    return;
  }

  const TYPE = 62, ERASE = 32, HOLD = 1700, BETWEEN = 420;
  let p = 0, i = 0, erasing = false, timer = null;

  const typing = on => caretEl && caretEl.classList.toggle('is-typing', on);

  function tick() {
    const phrase = phrases[p];

    if (!erasing) {
      i++;
      textEl.textContent = phrase.slice(0, i);
      typing(true);
      if (i >= phrase.length) {
        erasing = true;
        typing(false);
        timer = setTimeout(tick, HOLD);
        return;
      }
      // Slight human jitter so it doesn't feel robotic
      timer = setTimeout(tick, TYPE + Math.random() * 55);
    } else {
      i--;
      textEl.textContent = phrase.slice(0, i);
      typing(true);
      if (i <= 0) {
        erasing = false;
        p = (p + 1) % phrases.length;
        typing(false);
        timer = setTimeout(tick, BETWEEN);
        return;
      }
      timer = setTimeout(tick, ERASE);
    }
  }

  // Pause while the tab is hidden (saves battery on phones)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); }
    else { clearTimeout(timer); timer = setTimeout(tick, 400); }
  });

  timer = setTimeout(tick, 700);
}

// ── MOBILE NAV ────────────────────────────────────────────────
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!links.classList.contains('open'));
  });

  // Close on link tap, outside tap, or Escape
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', (e) => {
    if (!links.classList.contains('open')) return;
    if (!e.target.closest('.navbar-inner')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
  // Reset when returning to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780) setOpen(false);
  });
}

// ── NAVBAR CONDENSE ON SCROLL ─────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  let ticking = false;
  const update = () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

// ── POINTER-FOLLOW HIGHLIGHT ──────────────────────────────────
function initGlassSpotlight() {
  // Pointer effects are meaningless on touch — skip entirely.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.section .glass').forEach(card => {
    card.classList.add('glass-spot');
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  updateAuthUI();
  bindLogout();
  bindLoginForm();
  bindPopup();
  renderAccount();
  openServiceFromQuery();
  initReveal();
  initTypewriter();
  initMobileNav();
  initNavScroll();
  initGlassSpotlight();
});
