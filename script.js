/* ============================================================
   script.js — Fairytale Wedding RSVP
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ============================================================
     1. MOBILE NAVIGATION TOGGLE
     ============================================================ */
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const navLinks = $$('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked (smooth scroll handles navigation)
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     2. HERO BUTTON — SMOOTH SCROLL (already handled by CSS
        scroll-behavior, but we add a fallback)
     ============================================================ */
  const openStoryBtn = $('#openStoryBtn');
  if (openStoryBtn) {
    openStoryBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const target = $('#story');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ============================================================
     3. FLOATING PARTICLES (sparkles / petals / fireflies)
        Lightweight — only runs on desktop / large screens to
        keep mobile performance smooth.
     ============================================================ */
  const particlesContainer = $('#particles');

  function createParticle() {
    const el = document.createElement('div');
    el.classList.add('particle');

    const size = Math.random() * 5 + 2; // 2–7px
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8; // 8–20s
    const delay = Math.random() * 8;

    // Randomly choose a warm sparkle or petal colour
    const colours = [
      'rgba(255, 250, 240, 0.8)',
      'rgba(240, 226, 208, 0.7)',
      'rgba(217, 184, 179, 0.6)',
      'rgba(201, 169, 110, 0.5)',
    ];
    const colour = colours[Math.floor(Math.random() * colours.length)];

    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = left + '%';
    el.style.bottom = '-10px';
    el.style.background = colour;
    el.style.boxShadow = `0 0 ${size * 2}px ${size * 0.6}px ${colour}`;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = delay + 's';

    // Some particles are petals (slightly larger, soft pink)
    if (Math.random() > 0.7) {
      el.style.width = size * 2.2 + 'px';
      el.style.height = size * 1.1 + 'px';
      el.style.borderRadius = '50% 0 50% 0';
      el.style.background = 'rgba(243, 225, 221, 0.8)';
      el.style.boxShadow = '0 0 8px 2px rgba(217, 184, 179, 0.4)';
    }

    particlesContainer.appendChild(el);

    // Remove after animation ends to keep DOM clean
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, (duration + delay) * 1000 + 200);
  }

  // Only start particles if the hero section exists and the
  // viewport is wide enough (avoid heavy load on tiny phones)
  if (particlesContainer && window.innerWidth > 480) {
    // Create initial batch
    for (let i = 0; i < 30; i++) {
      setTimeout(createParticle, i * 200);
    }
    // Continuously replenish
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        createParticle();
      }
    }, 1200);
  } else if (particlesContainer) {
    // Lighter version for small screens: fewer particles, slower
    for (let i = 0; i < 12; i++) {
      setTimeout(createParticle, i * 400);
    }
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        createParticle();
      }
    }, 3000);
  }

  /* ============================================================
     4. COUNTDOWN TIMER
        Set your wedding date here — easy to change.
     ============================================================ */
  const WEDDING_DATE = new Date('2026-06-20T16:00:00').getTime();

  const daysEl = $('#days');
  const hoursEl = $('#hours');
  const minutesEl = $('#minutes');
  const secondsEl = $('#seconds');
  const countdownMessage = $('#countdownMessage');
  const countdownGrid = $('#countdown');

  function updateCountdown() {
    const now = Date.now();
    const distance = WEDDING_DATE - now;

    if (distance <= 0) {
      // Wedding day has arrived!
      if (countdownGrid) countdownGrid.style.display = 'none';
      if (countdownMessage) {
        countdownMessage.textContent = 'Today is the day! Our Fairytale Begins!';
      }
      return;
    }

    // Ensure message is cleared if countdown is active
    if (countdownMessage) countdownMessage.textContent = '';
    if (countdownGrid) countdownGrid.style.display = 'flex';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Start countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================================
     5. INTERSECTION OBSERVER — SCROLL ANIMATIONS
        Elements with .fade-up / .fade-left / .fade-right
        become visible when they enter the viewport.
     ============================================================ */
  const animatedElements = $$('.fade-up, .fade-left, .fade-right');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after revealing (better performance)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal everything immediately
    animatedElements.forEach((el) => el.classList.add('visible'));
  }

  /* ============================================================
     6. BACKGROUND MUSIC — gentle toggle (no autoplay)
        Replace the audio source with your own wedding song.
        We create the Audio element via JS so there's no
        hard-coded <audio> tag needed in HTML.
     ============================================================ */
  const musicBtn = $('#musicBtn');
  const musicIcon = $('#musicIcon');

  // Replace this URL with your own royalty-free wedding track
  const MUSIC_URL =
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=wedding-piano-115437.mp3';

  let audio = null;
  let isPlaying = false;

  function initAudio() {
    if (!audio) {
      audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.35;
      audio.addEventListener('play', () => {
        isPlaying = true;
        musicBtn.classList.add('playing');
        if (musicIcon) musicIcon.textContent = '♫';
      });
      audio.addEventListener('pause', () => {
        isPlaying = false;
        musicBtn.classList.remove('playing');
        if (musicIcon) musicIcon.textContent = '♪';
      });
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', function () {
      initAudio();
      if (!audio) return;

      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {
          /* Autoplay may still be blocked — ignore silently */
        });
      }
    });
  }

  /* ============================================================
     7. SMOOTH SCROLL FOR ALL ANCHOR LINKS
        (Native CSS scroll-behavior handles most, but we
        polyfill for older browsers / ensure offset)
     ============================================================ */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = $('.nav-wrapper')
          ? $('.nav-wrapper').offsetHeight
          : 0;
        const top =
          targetEl.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     8. SUBTLE PARALLAX ON HERO (only on larger screens)
        Moves the hero content slightly as the user scrolls.
     ============================================================ */
  const heroContent = $('.hero-content');
  const heroSection = $('.hero');

  if (heroContent && heroSection && window.innerWidth > 768) {
    let ticking = false;

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const scrollY = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrollY <= heroHeight) {
              const opacity = 1 - scrollY / (heroHeight * 0.8);
              const translateY = scrollY * 0.25;

              heroContent.style.opacity = Math.max(opacity, 0);
              heroContent.style.transform = `translateY(${translateY}px)`;
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ============================================================
     9. SCROLL-UP REVEAL (subtle — re-animate when scrolling
        back up into a section)
        We keep it simple: the IntersectionObserver above already
        handles reveal on entry. This adds a gentle "reset" when
        the element leaves the viewport entirely so it can
        re-animate on re-entry, like turning back a page.
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const reObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Element has left the viewport — reset animation
            // only if it's the story cards (nice book-like feel)
            entry.target.classList.remove('visible');
          } else {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    // Apply re-animation only to story cards for the
    // "storybook page" feel without being distracting elsewhere
    $$('.story-card').forEach((card) => {
      reObserver.observe(card);
    });
  }
})();