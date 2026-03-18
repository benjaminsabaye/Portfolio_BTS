// ===== THEME TOGGLE =====
const THEME_KEY = 'bs-theme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = getTheme();
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Apply saved theme immediately (before paint to avoid flash)
applyTheme(getTheme());

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(3)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === current) a.classList.add('active');
});

// ===== INJECT TOGGLE BUTTON into nav =====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (nav && !nav.querySelector('.theme-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Changer le thème');
    btn.innerHTML = `
      <span class="icon-dark">🌙</span>
      <span class="icon-light">☀️</span>
      <span class="label">Thème</span>
    `;
    btn.addEventListener('click', toggleTheme);
    nav.appendChild(btn);
  }
});
