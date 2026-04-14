// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
document.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  ring.style.left = x + 'px';
  ring.style.top = y + 'px';
});

// Cursor Hover effects
document.querySelectorAll('button, a, .service-card, .video-thumb').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'var(--indigo)';
    cursor.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(6,182,212,0.5)';
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ============================================================
// REVEAL ON SCROLL
// ============================================================
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // If it's a stat card, trigger counter
      if (entry.target.classList.contains('stat-card')) {
        startCounter(entry.target.querySelector('.stat-num'));
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter Function
function startCounter(el) {
  if (el.dataset.started) return;
  el.dataset.started = true;
  const target = parseInt(el.dataset.val);
  let count = 0;
  const duration = 2000;
  const inc = target / (duration / 16);
  const timer = setInterval(() => {
    count += inc;
    if (count >= target) {
      el.innerText = target + (target === 100 ? '%' : '+');
      clearInterval(timer);
    } else {
      el.innerText = Math.floor(count) + '+';
    }
  }, 16);
}

// ============================================================
// SERVICE CARD MOUSE EFFECT
// ============================================================
function handleCardHover(e, card) {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty('--mx', `${x}px`);
  card.style.setProperty('--my', `${y}px`);
}

// ============================================================
// BEFORE/AFTER SLIDER
// ============================================================
const baWrapper = document.getElementById('ba-slider');
const baHandle = document.getElementById('ba-handle');
const baClip = document.getElementById('ba-clip');

if (baWrapper) {
  let isResizing = false;

  const updateSlider = (x) => {
    const rect = baWrapper.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    baHandle.style.left = pos + '%';
    baClip.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
  };

  baHandle.addEventListener('mousedown', () => isResizing = true);
  window.addEventListener('mouseup', () => isResizing = false);
  window.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    updateSlider(e.clientX);
  });
  // Touch support
  baHandle.addEventListener('touchstart', () => isResizing = true);
  window.addEventListener('touchend', () => isResizing = false);
  window.addEventListener('touchmove', (e) => {
    if (!isResizing) return;
    updateSlider(e.touches[0].clientX);
  });
}

// ============================================================
// FORM SUBMISSION
// ============================================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  const success = document.getElementById('form-success');
  btn.innerText = 'Sending...';
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
  }, 1500);
}

// ============================================================
// VAULT / ADMIN LOGIN
// ============================================================
// Keyboard Shortcut: Ctrl + Shift + S
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'S') {
    e.preventDefault();
    document.getElementById('admin-login').classList.add('show');
  }
});

function tryLogin() {
  const pass = document.getElementById('login-pass').value;
  if (pass === 'samiya') {
    openVault();
  } else {
    const err = document.getElementById('login-err');
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 2000);
  }
}

function openVault() {
  document.getElementById('admin-login').classList.remove('show');
  document.getElementById('admin-panel').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeVault() {
  document.getElementById('admin-panel').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function switchTab(tabId) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function saveNotify() {
  const n = document.getElementById('admin-notify');
  n.style.display = 'block';
  setTimeout(() => n.style.display = 'none', 3000);
}

// Auto-open via URL param ?access=samiya
function checkAccess() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('access') === 'samiya' || window.location.pathname.includes('samiya-vault')) {
    openVault();
  }
}
checkAccess();

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (links.style.display === 'flex') { links.style.display = ''; return; }
  links.style.display = 'flex';
  links.style.position = 'fixed';
  links.style.top = '70px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.flexDirection = 'column';
  links.style.background = 'rgba(5,5,5,.97)';
  links.style.padding = '24px';
  links.style.gap = '20px';
  links.style.backdropFilter = 'blur(20px)';
  links.style.borderBottom = '1px solid rgba(255,255,255,.08)';
  links.style.zIndex = '99';
}

// ============================================================
// NAV SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.background = window.scrollY > 50 ? 'rgba(5,5,5,.9)' : 'rgba(5,5,5,.6)';
});