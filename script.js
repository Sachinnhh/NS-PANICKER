/* ============================================================
   NS Panicker Chartered Accountants — script.js
   ============================================================ */

'use strict';

// ============================================================
// CUSTOM CURSOR — luxury gold ring + dot
// ============================================================
(function initCursor() {
  // Only on pointer devices (not touch-only)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  // Inject cursor elements
  const ring = document.createElement('div');
  const dot  = document.createElement('div');
  ring.id = 'cursor-ring';
  dot.id  = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 7px; height: 7px;
      background: #D5B061;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, background 0.2s ease, opacity 0.2s ease;
      will-change: transform;
    }

    #cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 36px; height: 36px;
      border: 1.5px solid rgba(213, 176, 97, 0.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition:
        width  0.35s cubic-bezier(0.4, 0, 0.2, 1),
        height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        border-color 0.35s ease,
        background   0.35s ease,
        opacity      0.25s ease;
      will-change: transform;
    }

    /* Hover state — expands ring, shrinks dot */
    body.cursor-hover #cursor-ring {
      width: 54px; height: 54px;
      border-color: rgba(213, 176, 97, 0.9);
      background: rgba(213, 176, 97, 0.07);
    }
    body.cursor-hover #cursor-dot {
      width: 4px; height: 4px;
      background: #D5B061;
    }

    /* Click state */
    body.cursor-click #cursor-ring {
      width: 26px; height: 26px;
      border-color: #D5B061;
      background: rgba(213, 176, 97, 0.18);
    }
    body.cursor-click #cursor-dot {
      width: 10px; height: 10px;
    }

    /* CTA button hover — fill ring gold */
    body.cursor-cta #cursor-ring {
      width: 58px; height: 58px;
      background: rgba(213, 176, 97, 0.18);
      border-color: #D5B061;
      border-width: 2px;
    }
    body.cursor-cta #cursor-dot {
      background: #b8943e;
      width: 5px; height: 5px;
    }

    /* Text / input — thin vertical bar feel */
    body.cursor-text #cursor-ring {
      width: 3px; height: 32px;
      border-radius: 2px;
      border-color: rgba(213, 176, 97, 0.85);
    }
    body.cursor-text #cursor-dot {
      opacity: 0;
    }

    /* Hidden when leaving window */
    body.cursor-out #cursor-ring,
    body.cursor-out #cursor-dot {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  // Position tracking — dot snaps, ring lags
  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly via CSS transform set directly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  }, { passive: true });

  // Ring smoothly lags behind
  function animateRing() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover detection — interactive elements
  const hoverSelectors = [
    'a', 'button', '.service-card', '.why-card', '.pillar',
    '.slider-btn', '.dot', '.back-to-top', '.social-icon',
    '.testi-card', '.nav-link', '.logo-emblem'
  ].join(', ');

  const ctaSelectors = '.btn, .nav-link--cta';
  const textSelectors = 'input, textarea, select, [contenteditable]';

  document.addEventListener('mouseover', e => {
    const el = e.target;
    if (el.matches(ctaSelectors) || el.closest(ctaSelectors)) {
      document.body.classList.add('cursor-cta');
    } else if (el.matches(textSelectors) || el.closest(textSelectors)) {
      document.body.classList.add('cursor-text');
    } else if (el.matches(hoverSelectors) || el.closest(hoverSelectors)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    const el = e.target;
    if (el.matches(ctaSelectors) || el.closest(ctaSelectors)) {
      document.body.classList.remove('cursor-cta');
    } else if (el.matches(textSelectors) || el.closest(textSelectors)) {
      document.body.classList.remove('cursor-text');
    } else if (el.matches(hoverSelectors) || el.closest(hoverSelectors)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Click pulse
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    document.body.classList.add('cursor-out');
  });
  document.addEventListener('mouseenter', () => {
    document.body.classList.remove('cursor-out');
  });
})();

// ============================================================
// NAVBAR — scroll state & mobile menu
// ============================================================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ============================================================
// ACTIVE NAV LINK — highlight on scroll
// ============================================================
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================================
// ANIMATED COUNTERS
// ============================================================
function animateCounter(el, target, duration = 2000) {
  const start     = performance.now();
  const startVal  = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(startVal + eased * (target - startVal));
    el.textContent = current.toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('en-IN');
  }

  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number[data-target]');
let countersStarted = false;

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target, 2200);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ============================================================
// TESTIMONIALS SLIDER
// ============================================================
const track    = document.getElementById('testimonialsTrack');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
const dotsWrap = document.getElementById('sliderDots');

if (track && prevBtn && nextBtn && dotsWrap) {
  const cards      = track.querySelectorAll('.testi-card');
  const total      = cards.length;
  let   current    = 0;
  let   autoTimer  = null;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    stopAuto();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    startAuto();
  }, { passive: true });

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  startAuto();
}

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const required = contactForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c0392b';
        valid = false;
      }
    });

    if (!valid) {
      // Shake effect on first invalid field
      const first = contactForm.querySelector('[required]:placeholder-shown, [required][value=""]');
      return;
    }

    // Simulate submission (replace with actual fetch/AJAX in production)
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const origText  = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending…</span> <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled  = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      // Re-enable after reset in case they hide success
      submitBtn.innerHTML = origText;
      submitBtn.disabled  = false;
    }, 1400);
  });

  // Clear red border on input
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => { field.style.borderColor = ''; });
  });
}

// ============================================================
// SMOOTH SCROLL for anchor links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// FOOTER YEAR
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================
// SUBTLE PARALLAX on Hero blobs (desktop only)
// ============================================================
if (window.matchMedia('(min-width: 769px) and (prefers-reduced-motion: no-preference)').matches) {
  const blobs = document.querySelectorAll('.hero-blob');

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 14;
      blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
}

// ============================================================
// GOLD SHIMMER on service cards (CSS-driven, JS triggers class)
// ============================================================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('shimmer'));
  card.addEventListener('mouseleave', () => card.classList.remove('shimmer'));
});

// ============================================================
// KEYBOARD ACCESSIBILITY — close menu on Escape
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});