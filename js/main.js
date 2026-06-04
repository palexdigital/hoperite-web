// ============================================================
// HOPERITE FAST FOOD — MAIN JAVASCRIPT
// ============================================================

const PHONE = '27742718108';
const WA_BASE = `https://wa.me/${PHONE}?text=`;

// ---- Loader ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- Mobile Menu ----
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// Add staggered delays to grid children
document.querySelectorAll('.featured-grid .meal-card, .why-grid .why-card, .menu-grid .menu-item, .contact-grid .contact-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// ---- Menu Tabs ----
const menuTabs = document.querySelectorAll('.menu-tab');
const menuGrids = document.querySelectorAll('.menu-grid');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    menuTabs.forEach(t => t.classList.remove('active'));
    menuGrids.forEach(g => g.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// ---- Gallery Lightbox ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- WhatsApp Order ----
window.orderWhatsApp = function(meal) {
  const msg = encodeURIComponent(`Hello Hoperite Fast Food, I would like to order ${meal}.`);
  window.open(`${WA_BASE}${msg}`, '_blank');
};

// ---- Testimonial Slider Dots ----
const slider = document.querySelector('.testimonials-slider');
const dots = document.querySelectorAll('.slider-dot');

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const cards = slider.querySelectorAll('.testimonial-card');
    if (cards[i]) {
      slider.scrollTo({ left: cards[i].offsetLeft - 24, behavior: 'smooth' });
    }
  });
});

slider?.addEventListener('scroll', () => {
  const cards = slider.querySelectorAll('.testimonial-card');
  let closest = 0;
  let minDist = Infinity;
  cards.forEach((card, i) => {
    const dist = Math.abs(card.getBoundingClientRect().left);
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  dots.forEach((d, i) => d.classList.toggle('active', i === closest));
});

// ---- Highlight today in hours ----
const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const today = dayNames[new Date().getDay()];
document.querySelectorAll('.hours-row').forEach(row => {
  const dayEl = row.querySelector('.day');
  if (dayEl && dayEl.textContent.trim() === today) row.classList.add('today');
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Parallax hero ----
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.05)`;
  }
}, { passive: true });

console.log('🔥 Hoperite Fast Food — Website Loaded');
