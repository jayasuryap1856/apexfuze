/* ============================================================
   APEX FUZE GYM — script.js
   Premium Fitness Brand Website
   ============================================================ */

'use strict';

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initNavbar();
  initScrollReveal();
  initParallaxWatermark();
  initCounters();
  initGalleryLightbox();
  initTestimonialSlider();
  initSmoothScroll();
  initMobileMenu();
});

/* ===== SPLASH SCREEN ===== */
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  document.body.classList.add('splash-active');

  const left  = splash.querySelector('.splash-logo-left');
  const right = splash.querySelector('.splash-logo-right');
  const tag   = splash.querySelector('.splash-tagline');

  // Phase 1: let glow build (600ms)
  // Phase 2: split (800ms)
  // Phase 3: fade splash (600ms)

  setTimeout(() => {
    if (left)  left.classList.add('split');
    if (right) right.classList.add('split');
    if (tag)   tag.classList.add('split');
  }, 1800);

  setTimeout(() => {
    splash.classList.add('hidden');
    document.body.classList.remove('splash-active');
  }, 2600);
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${id}`) {
            l.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const btn   = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!links.contains(e.target) && !btn.contains(e.target)) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

  elements.forEach(el => observer.observe(el));
}

/* ===== PARALLAX WATERMARK ===== */
function initParallaxWatermark() {
  const watermark = document.querySelector('.watermark');
  if (!watermark) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY  = window.scrollY;
        const parallax = scrollY * 0.06; // subtle
        watermark.style.transform = `translate(-50%, calc(-50% + ${parallax}px))`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ===== ANIMATED COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val[data-target]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target  = parseFloat(el.dataset.target);
    const decimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const start   = performance.now();

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOut(progress);
      const current  = decimal
        ? (eased * (target / 10)).toFixed(1)   // e.g. 4.8 from data-target="48"
        : Math.floor(eased * target);

      el.textContent = decimal ? current : current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = decimal ? (target / 10).toFixed(1) : target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

/* ===== GALLERY LIGHTBOX ===== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const closeBtn     = document.getElementById('lightboxClose');
  const prevBtn      = document.getElementById('lightboxPrev');
  const nextBtn      = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxImg || !galleryItems.length) return;

  let currentIndex = 0;

  const images = Array.from(galleryItems).map(item => {
    const img = item.querySelector('img');
    return img ? { src: img.src, alt: img.alt } : null;
  }).filter(Boolean);

  const openLightbox = (index) => {
    if (!images[index]) return;
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxImg.style.opacity = '1';
    }, 150);
  };

  lightboxImg.style.transition = 'opacity 0.15s ease';

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image ${i + 1}`);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(i);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}

/* ===== TESTIMONIAL SLIDER ===== */
function initTestimonialSlider() {
  const slider   = document.getElementById('testimonialSlider');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  const dotsWrap = document.getElementById('sliderDots');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  let current  = 0;
  let autoTimer;

  // Build dots
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  const updateDots = () => {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  };

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    const offset = -current * 100;
    slider.style.transform = `translateX(${offset}%)`;
    slider.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    updateDots();
  };

  slider.style.display    = 'flex';
  slider.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Auto-advance
  const startAuto = () => {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  };
  const resetAuto = () => {
    clearInterval(autoTimer);
    startAuto();
  };

  startAuto();

  // Touch / swipe support
  let startX = 0;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  });
}

/* ===== HERO ENTRANCE ===== */
/* Hero elements use .reveal-up classes, handled by initScrollReveal.
   We force-reveal hero immediately after splash. */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 2700 + i * 120);
    });
  }, 0);
});

/* ===== CURSOR GLOW (desktop only) ===== */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(circle, rgba(255,58,26,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(cursor);

  let px = 0, py = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    px = e.clientX;
    py = e.clientY;
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    cx = lerp(cx, px, 0.08);
    cy = lerp(cy, py, 0.08);
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  };
  animate();
})();

/* ===== NAVBAR ACTIVE LINK STYLE ===== */
const styleEl = document.createElement('style');
styleEl.textContent = `
  .nav-link.active {
    color: #fff !important;
  }
  .nav-link.active::after {
    transform: scaleX(1) !important;
  }
`;
document.head.appendChild(styleEl);
