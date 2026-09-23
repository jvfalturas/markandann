/* ============================================================
   script.js — Fairytale Wedding RSVP
   ============================================================ */

// (function () {
//   'use strict';

//   /* ---------- DOM Helpers ---------- */
//   const $ = (sel, ctx = document) => ctx.querySelector(sel);
//   const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

//   /* ============================================================
//      1. MOBILE NAVIGATION TOGGLE
//      ============================================================ */
//   const navToggle = $('#navToggle');
//   const navMenu = $('#navMenu');
//   const navLinks = $$('.nav-link');

//   if (navToggle && navMenu) {
//     navToggle.addEventListener('click', function () {
//       const isOpen = navMenu.classList.toggle('open');
//       navToggle.classList.toggle('active', isOpen);
//       navToggle.setAttribute('aria-expanded', isOpen);
//     });

//     // Close menu when a link is clicked (smooth scroll handles navigation)
//     navLinks.forEach((link) => {
//       link.addEventListener('click', () => {
//         navMenu.classList.remove('open');
//         navToggle.classList.remove('active');
//         navToggle.setAttribute('aria-expanded', 'false');
//       });
//     });

//     // Close menu when clicking outside
//     document.addEventListener('click', function (e) {
//       if (
//         navMenu.classList.contains('open') &&
//         !navMenu.contains(e.target) &&
//         !navToggle.contains(e.target)
//       ) {
//         navMenu.classList.remove('open');
//         navToggle.classList.remove('active');
//         navToggle.setAttribute('aria-expanded', 'false');
//       }
//     });
//   }

//   /* ============================================================
//      2. HERO BUTTON — SMOOTH SCROLL (already handled by CSS
//         scroll-behavior, but we add a fallback)
//      ============================================================ */
//   const openStoryBtn = $('#openStoryBtn');
//   if (openStoryBtn) {
//     openStoryBtn.addEventListener('click', function (e) {
//       e.preventDefault();
//       const target = $('#story');
//       if (target) {
//         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     });
//   }

//   /* ============================================================
//      3. FLOATING PARTICLES (sparkles / petals / fireflies)
//         Lightweight — only runs on desktop / large screens to
//         keep mobile performance smooth.
//      ============================================================ */
//   const particlesContainer = $('#particles');

//   function createParticle() {
//     const el = document.createElement('div');
//     el.classList.add('particle');

//     const size = Math.random() * 5 + 2; // 2–7px
//     const left = Math.random() * 100;
//     const duration = Math.random() * 12 + 8; // 8–20s
//     const delay = Math.random() * 8;

//     // Randomly choose a warm sparkle or petal colour
//     const colours = [
//       'rgba(255, 250, 240, 0.8)',
//       'rgba(240, 226, 208, 0.7)',
//       'rgba(217, 184, 179, 0.6)',
//       'rgba(201, 169, 110, 0.5)',
//     ];
//     const colour = colours[Math.floor(Math.random() * colours.length)];

//     el.style.width = size + 'px';
//     el.style.height = size + 'px';
//     el.style.left = left + '%';
//     el.style.bottom = '-10px';
//     el.style.background = colour;
//     el.style.boxShadow = `0 0 ${size * 2}px ${size * 0.6}px ${colour}`;
//     el.style.animationDuration = duration + 's';
//     el.style.animationDelay = delay + 's';

//     // Some particles are petals (slightly larger, soft pink)
//     if (Math.random() > 0.7) {
//       el.style.width = size * 2.2 + 'px';
//       el.style.height = size * 1.1 + 'px';
//       el.style.borderRadius = '50% 0 50% 0';
//       el.style.background = 'rgba(243, 225, 221, 0.8)';
//       el.style.boxShadow = '0 0 8px 2px rgba(217, 184, 179, 0.4)';
//     }

//     particlesContainer.appendChild(el);

//     // Remove after animation ends to keep DOM clean
//     setTimeout(() => {
//       if (el.parentNode) el.parentNode.removeChild(el);
//     }, (duration + delay) * 1000 + 200);
//   }

//   // Only start particles if the hero section exists and the
//   // viewport is wide enough (avoid heavy load on tiny phones)
//   if (particlesContainer && window.innerWidth > 480) {
//     // Create initial batch
//     for (let i = 0; i < 30; i++) {
//       setTimeout(createParticle, i * 200);
//     }
//     // Continuously replenish
//     setInterval(() => {
//       if (document.visibilityState === 'visible') {
//         createParticle();
//       }
//     }, 1200);
//   } else if (particlesContainer) {
//     // Lighter version for small screens: fewer particles, slower
//     for (let i = 0; i < 12; i++) {
//       setTimeout(createParticle, i * 400);
//     }
//     setInterval(() => {
//       if (document.visibilityState === 'visible') {
//         createParticle();
//       }
//     }, 3000);
//   }

//   /* ============================================================
//      4. COUNTDOWN TIMER
//         Set your wedding date here — easy to change.
//      ============================================================ */
//   const WEDDING_DATE = new Date('2026-06-20T16:00:00').getTime();

//   const daysEl = $('#days');
//   const hoursEl = $('#hours');
//   const minutesEl = $('#minutes');
//   const secondsEl = $('#seconds');
//   const countdownMessage = $('#countdownMessage');
//   const countdownGrid = $('#countdown');

//   function updateCountdown() {
//     const now = Date.now();
//     const distance = WEDDING_DATE - now;

//     if (distance <= 0) {
//       // Wedding day has arrived!
//       if (countdownGrid) countdownGrid.style.display = 'none';
//       if (countdownMessage) {
//         countdownMessage.textContent = 'Today is the day! Our Fairytale Begins!';
//       }
//       return;
//     }

//     // Ensure message is cleared if countdown is active
//     if (countdownMessage) countdownMessage.textContent = '';
//     if (countdownGrid) countdownGrid.style.display = 'flex';

//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(
//       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutes = Math.floor(
//       (distance % (1000 * 60 * 60)) / (1000 * 60)
//     );
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
//     if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
//     if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
//     if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
//   }

//   // Start countdown
//   updateCountdown();
//   setInterval(updateCountdown, 1000);

//   /* ============================================================
//      5. INTERSECTION OBSERVER — SCROLL ANIMATIONS
//         Elements with .fade-up / .fade-left / .fade-right
//         become visible when they enter the viewport.
//      ============================================================ */
//   const animatedElements = $$('.fade-up, .fade-left, .fade-right');

//   if ('IntersectionObserver' in window && animatedElements.length > 0) {
//     const observerOptions = {
//       root: null,
//       rootMargin: '0px 0px -60px 0px',
//       threshold: 0.1,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//           // Optionally unobserve after revealing (better performance)
//           observer.unobserve(entry.target);
//         }
//       });
//     }, observerOptions);

//     animatedElements.forEach((el) => observer.observe(el));
//   } else {
//     // Fallback: reveal everything immediately
//     animatedElements.forEach((el) => el.classList.add('visible'));
//   }

//   /* ============================================================
//      6. BACKGROUND MUSIC — gentle toggle (no autoplay)
//         Replace the audio source with your own wedding song.
//         We create the Audio element via JS so there's no
//         hard-coded <audio> tag needed in HTML.
//      ============================================================ */
//   const musicBtn = $('#musicBtn');
//   const musicIcon = $('#musicIcon');

//   // Replace this URL with your own royalty-free wedding track
//   const MUSIC_URL =
//     'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=wedding-piano-115437.mp3';

//   let audio = null;
//   let isPlaying = false;

//   function initAudio() {
//     if (!audio) {
//       audio = new Audio(MUSIC_URL);
//       audio.loop = true;
//       audio.volume = 0.35;
//       audio.addEventListener('play', () => {
//         isPlaying = true;
//         musicBtn.classList.add('playing');
//         if (musicIcon) musicIcon.textContent = '♫';
//       });
//       audio.addEventListener('pause', () => {
//         isPlaying = false;
//         musicBtn.classList.remove('playing');
//         if (musicIcon) musicIcon.textContent = '♪';
//       });
//     }
//   }

//   if (musicBtn) {
//     musicBtn.addEventListener('click', function () {
//       initAudio();
//       if (!audio) return;

//       if (isPlaying) {
//         audio.pause();
//       } else {
//         audio.play().catch(() => {
//           /* Autoplay may still be blocked — ignore silently */
//         });
//       }
//     });
//   }

//   /* ============================================================
//      7. SMOOTH SCROLL FOR ALL ANCHOR LINKS
//         (Native CSS scroll-behavior handles most, but we
//         polyfill for older browsers / ensure offset)
//      ============================================================ */
//   $$('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener('click', function (e) {
//       const targetId = this.getAttribute('href');
//       if (targetId === '#') return;

//       const targetEl = document.querySelector(targetId);
//       if (targetEl) {
//         e.preventDefault();
//         const navHeight = $('.nav-wrapper')
//           ? $('.nav-wrapper').offsetHeight
//           : 0;
//         const top =
//           targetEl.getBoundingClientRect().top +
//           window.pageYOffset -
//           navHeight;

//         window.scrollTo({ top, behavior: 'smooth' });
//       }
//     });
//   });

//   /* ============================================================
//      8. SUBTLE PARALLAX ON HERO (only on larger screens)
//         Moves the hero content slightly as the user scrolls.
//      ============================================================ */
//   const heroContent = $('.hero-content');
//   const heroSection = $('.hero');

//   if (heroContent && heroSection && window.innerWidth > 768) {
//     let ticking = false;

//     window.addEventListener(
//       'scroll',
//       function () {
//         if (!ticking) {
//           window.requestAnimationFrame(function () {
//             const scrollY = window.pageYOffset;
//             const heroHeight = heroSection.offsetHeight;

//             if (scrollY <= heroHeight) {
//               const opacity = 1 - scrollY / (heroHeight * 0.8);
//               const translateY = scrollY * 0.25;

//               heroContent.style.opacity = Math.max(opacity, 0);
//               heroContent.style.transform = `translateY(${translateY}px)`;
//             }
//             ticking = false;
//           });
//           ticking = true;
//         }
//       },
//       { passive: true }
//     );
//   }

//   /* ============================================================
//      9. SCROLL-UP REVEAL (subtle — re-animate when scrolling
//         back up into a section)
//         We keep it simple: the IntersectionObserver above already
//         handles reveal on entry. This adds a gentle "reset" when
//         the element leaves the viewport entirely so it can
//         re-animate on re-entry, like turning back a page.
//      ============================================================ */
//   if ('IntersectionObserver' in window) {
//     const reObserver = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) {
//             // Element has left the viewport — reset animation
//             // only if it's the story cards (nice book-like feel)
//             entry.target.classList.remove('visible');
//           } else {
//             entry.target.classList.add('visible');
//           }
//         });
//       },
//       { threshold: 0.08 }
//     );

//     // Apply re-animation only to story cards for the
//     // "storybook page" feel without being distracting elsewhere
//     $$('.story-card').forEach((card) => {
//       reObserver.observe(card);
//     });
//   }
// })();




















// (function() {
//       "use strict";

//       // ============================================================
//       // 1. CONFIGURATION (easily editable)
//       // ============================================================
//       const weddingConfig = {
//         groom: "Alexander",
//         bride: "Jasmine",
//         weddingDate: "December 18, 2026 16:00:00",
//         music: "assets/music/wedding-song.mp3",
//         googleForm: "YOUR_GOOGLE_FORM_EMBED_URL_HERE",
//         prenupImages: [
//           "assets/images/prenup-01.jpg",
//           "assets/images/prenup-02.jpg",
//           "assets/images/prenup-03.jpg",
//           "assets/images/prenup-04.jpg",
//           "assets/images/prenup-05.jpg",
//           "assets/images/prenup-06.jpg"
//         ],
//         giftQr: "assets/images/gift-qr.png"
//       };

//       // ============================================================
//       // 2. LOADING SCREEN
//       // ============================================================
//       const loader = document.getElementById('loader');
//       window.addEventListener('load', () => {
//         setTimeout(() => {
//           loader.classList.add('hidden');
//         }, 1200);
//       });

//       // ============================================================
//       // 3. COUNTDOWN TIMER
//       // ============================================================
//       const weddingDate = new Date(weddingConfig.weddingDate).getTime();
//       const daysEl = document.getElementById('days');
//       const hoursEl = document.getElementById('hours');
//       const minutesEl = document.getElementById('minutes');
//       const secondsEl = document.getElementById('seconds');
//       const countdownMessage = document.getElementById('countdownMessage');
//       const countdownGrid = document.getElementById('countdownGrid');

//       function updateCountdown() {
//         const now = new Date().getTime();
//         const distance = weddingDate - now;

//         if (distance <= 0) {
//           countdownGrid.style.display = 'none';
//           countdownMessage.textContent = 'Today is the day! ❤️';
//           clearInterval(countdownInterval);
//           return;
//         }

//         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         daysEl.textContent = String(days).padStart(2, '0');
//         hoursEl.textContent = String(hours).padStart(2, '0');
//         minutesEl.textContent = String(minutes).padStart(2, '0');
//         secondsEl.textContent = String(seconds).padStart(2, '0');
//       }

//       updateCountdown();
//       const countdownInterval = setInterval(updateCountdown, 1000);

//       // ============================================================
//       // 4. MOBILE NAVIGATION
//       // ============================================================
//       const hamburger = document.getElementById('hamburger');
//       const navLinks = document.getElementById('navLinks');

//       hamburger.addEventListener('click', (e) => {
//         e.stopPropagation();
//         navLinks.classList.toggle('open');
//       });

//       // Close mobile nav when a link is clicked
//       navLinks.querySelectorAll('a').forEach(link => {
//         link.addEventListener('click', () => {
//           navLinks.classList.remove('open');
//         });
//       });

//       // Close when clicking outside
//       document.addEventListener('click', (e) => {
//         if (!navLinks.contains(e.target) && e.target !== hamburger) {
//           navLinks.classList.remove('open');
//         }
//       });

//       // Active link highlighting on scroll
//       const sections = document.querySelectorAll('section[id]');
//       const navAnchors = document.querySelectorAll('.nav-links a');

//       function highlightNav() {
//         let current = '';
//         sections.forEach(section => {
//           const sectionTop = section.offsetTop - 100;
//           if (window.scrollY >= sectionTop) {
//             current = section.getAttribute('id');
//           }
//         });
//         navAnchors.forEach(a => {
//           a.classList.remove('active');
//           if (a.getAttribute('href') === `#${current}`) {
//             a.classList.add('active');
//           }
//         });
//       }

//       window.addEventListener('scroll', highlightNav);

//       // ============================================================
//       // 5. SCROLL ANIMATIONS (IntersectionObserver)
//       // ============================================================
//       const animateElements = document.querySelectorAll('.animate-on-scroll');
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//             observer.unobserve(entry.target);
//           }
//         });
//       }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

//       animateElements.forEach(el => observer.observe(el));

//       // ============================================================
//       // 6. PRENUP GALLERY (Film strip carousel)
//       // ============================================================
//       const slidesContainer = document.getElementById('carouselSlides');
//       const dotsContainer = document.getElementById('carouselDots');
//       const prevBtn = document.getElementById('prevBtn');
//       const nextBtn = document.getElementById('nextBtn');
//       const images = weddingConfig.prenupImages;
//       let currentIndex = 0;
//       let autoplayInterval = null;
//       let isInteracting = false;

//       // Build slides
//       images.forEach((src, i) => {
//         const slide = document.createElement('div');
//         slide.className = 'carousel-slide';
//         const img = document.createElement('img');
//         img.src = src;
//         img.alt = `Prenup photo ${i + 1}`;
//         img.loading = 'lazy';
//         slide.appendChild(img);
//         slidesContainer.appendChild(slide);

//         // Dots
//         const dot = document.createElement('button');
//         dot.className = 'dot' + (i === 0 ? ' active' : '');
//         dot.dataset.index = i;
//         dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
//         dotsContainer.appendChild(dot);
//       });

//       const slides = document.querySelectorAll('.carousel-slide');
//       const dots = document.querySelectorAll('.dot');

//       function goToSlide(index) {
//         if (index < 0) index = slides.length - 1;
//         if (index >= slides.length) index = 0;
//         currentIndex = index;
//         slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
//         dots.forEach((dot, i) => {
//           dot.classList.toggle('active', i === currentIndex);
//         });
//       }

//       function nextSlide() { goToSlide(currentIndex + 1); }
//       function prevSlide() { goToSlide(currentIndex - 1); }

//       nextBtn.addEventListener('click', () => { nextSlide(); pauseAutoplay(); });
//       prevBtn.addEventListener('click', () => { prevSlide(); pauseAutoplay(); });

//       dots.forEach(dot => {
//         dot.addEventListener('click', () => {
//           goToSlide(parseInt(dot.dataset.index, 10));
//           pauseAutoplay();
//         });
//       });

//       // Autoplay
//       function startAutoplay() {
//         if (autoplayInterval) clearInterval(autoplayInterval);
//         autoplayInterval = setInterval(nextSlide, 4000);
//       }

//       function pauseAutoplay() {
//         if (autoplayInterval) {
//           clearInterval(autoplayInterval);
//           autoplayInterval = null;
//         }
//         isInteracting = true;
//         // Resume after 8 seconds of inactivity
//         setTimeout(() => {
//           if (isInteracting) {
//             isInteracting = false;
//             startAutoplay();
//           }
//         }, 8000);
//       }

//       startAutoplay();

//       // Touch/swipe support
//       let touchStartX = 0;
//       let touchEndX = 0;

//       const carousel = document.getElementById('carouselContainer');
//       carousel.addEventListener('touchstart', (e) => {
//         touchStartX = e.changedTouches[0].screenX;
//       }, { passive: true });

//       carousel.addEventListener('touchend', (e) => {
//         touchEndX = e.changedTouches[0].screenX;
//         if (touchStartX - touchEndX > 50) {
//           nextSlide();
//           pauseAutoplay();
//         } else if (touchEndX - touchStartX > 50) {
//           prevSlide();
//           pauseAutoplay();
//         }
//       }, { passive: true });

//       // ============================================================
//       // 7. MUSIC PLAYER
//       // ============================================================
//       const musicBtn = document.getElementById('musicBtn');
//       const bgMusic = document.getElementById('bgMusic');
//       bgMusic.volume = 0.5;

//       // Preload the music
//       bgMusic.load();

//       musicBtn.addEventListener('click', () => {
//         if (bgMusic.paused) {
//           bgMusic.play().then(() => {
//             musicBtn.textContent = '♫';
//             musicBtn.classList.add('playing');
//           }).catch(() => {
//             // Autoplay blocked or file not found
//             musicBtn.textContent = '♪';
//             musicBtn.classList.remove('playing');
//           });
//         } else {
//           bgMusic.pause();
//           musicBtn.textContent = '♪';
//           musicBtn.classList.remove('playing');
//         }
//       });

//       // Update button on audio events
//       bgMusic.addEventListener('play', () => {
//         musicBtn.textContent = '♫';
//         musicBtn.classList.add('playing');
//       });

//       bgMusic.addEventListener('pause', () => {
//         musicBtn.textContent = '♪';
//         musicBtn.classList.remove('playing');
//       });

//       // ============================================================
//       // 8. SMOOTH SCROLL FOR NAV LINKS (fallback for older browsers)
//       // ============================================================
//       document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//           const href = this.getAttribute('href');
//           if (href === '#') return;
//           const target = document.querySelector(href);
//           if (target) {
//             e.preventDefault();
//             target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//           }
//         });
//       });

//       // ============================================================
//       // 9. RSVP IFRAME (placeholder replacement)
//       // ============================================================
//       // The iframe src is already set in HTML. If a real URL is provided,
//       // we could set it dynamically, but we keep it as is for the placeholder.
//       // To make it easy to replace, we ensure the iframe uses the config value
//       // when it's not the placeholder.
//       const rsvpIframe = document.querySelector('.rsvp-iframe-wrapper iframe');
//       if (rsvpIframe) {
//         const currentSrc = rsvpIframe.getAttribute('src');
//         if (currentSrc === 'YOUR_GOOGLE_FORM_EMBED_URL_HERE' && weddingConfig.googleForm !== 'YOUR_GOOGLE_FORM_EMBED_URL_HERE') {
//           rsvpIframe.setAttribute('src', weddingConfig.googleForm);
//         }
//       }

//       // ============================================================
//       // 10. GIFT QR IMAGE (placeholder)
//       // ============================================================
//       const qrImg = document.querySelector('.qr-container img');
//       if (qrImg) {
//         qrImg.addEventListener('error', function() {
//           // Fallback if image not found
//           this.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
//             '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#F5EBDD"/><rect x="20" y="20" width="40" height="40" fill="#C6A15B"/><rect x="140" y="20" width="40" height="40" fill="#C6A15B"/><rect x="20" y="140" width="40" height="40" fill="#C6A15B"/><text x="100" y="115" font-family="serif" font-size="16" fill="#1C1C1C" text-anchor="middle">QR</text></svg>'
//           );
//         });
//       }

//       // ============================================================
//       // 11. PRELOAD MUSIC (Optional)
//       // ============================================================
//       // Already handled by preload="none" and load()

//       // ============================================================
//       // 12. REDUCED MOTION HANDLING
//       // ============================================================
//       const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
//       if (prefersReducedMotion.matches) {
//         // Disable autoplay for carousel if reduced motion
//         if (autoplayInterval) {
//           clearInterval(autoplayInterval);
//           autoplayInterval = null;
//         }
//         // Remove petal animations
//         document.querySelectorAll('.petal').forEach(p => p.style.display = 'none');
//       }

//       // ============================================================
//       // 13. INIT
//       // ============================================================
//       console.log('Wedding RSVP site loaded successfully.');

//     })();
























/* =====================================================
   WEDDING RSVP SITE — SCRIPT
   Organized into: CONFIG > LOADER > NAVIGATION > MUSIC >
   COUNTDOWN > STORY DECOR > GALLERY CAROUSEL > REVEAL
   ANIMATIONS > DECORATIVE FLOATS > INIT
===================================================== */

/* -----------------------------------------------------
   0. CONFIGURATION
   Edit these values to personalize the site.
----------------------------------------------------- */
const weddingConfig = {
  groom: "Aldrich",
  bride: "Marisol",
  // Format: "Month DD, YYYY HH:MM:SS" (24-hour clock, local time of the venue)
  weddingDate: "December 18, 2026 16:00:00",
  venueCeremony: "St. Augustine Chapel",
  ceremonyTime: "4:00 PM",
  venueReception: "The Meridian Grand Hall",
  receptionTime: "6:30 PM",
  location: "142 Harborview Road, Cebu City, Philippines",
  music: "assets/music/wedding-song.mp3",
  googleForm: "YOUR_GOOGLE_FORM_EMBED_URL_HERE",
  prenupImages: [
    "assets/images/prenup-01.jpg",
    "assets/images/prenup-02.jpg",
    "assets/images/prenup-03.jpg",
    "assets/images/prenup-04.jpg",
    "assets/images/prenup-05.jpg",
    "assets/images/prenup-06.jpg"
  ],
  qrImage: "assets/images/gift-qr.png",
  galleryAutoplay: true,
  galleryAutoplayInterval: 5000
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------------------------------
   1. LOADING SCREEN
----------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById("loading-screen");
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add("loaded");
    // Remove from accessibility tree / tab order once hidden
    setTimeout(() => loader.setAttribute("aria-hidden", "true"), 800);
  };

  if (document.readyState === "complete") {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener("load", () => setTimeout(hideLoader, 400));
  }

  // Safety net: never let the loader block the site for more than 4s
  setTimeout(hideLoader, 4000);
}

/* -----------------------------------------------------
   2. NAVIGATION (scroll header, mobile menu, active link)
----------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const links = document.querySelectorAll(".nav-link");

  if (!header || !toggle || !menu) return;

  // Header background on scroll
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    menu.classList.add("open");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  // Close mobile menu on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Active link highlighting based on section in view
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            links.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }
}

/* -----------------------------------------------------
   3. BACKGROUND MUSIC
----------------------------------------------------- */
function initMusic() {
  const audio = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");
  if (!audio || !button) return;

  // Apply configured music path (already set in HTML, kept in sync here)
  const source = audio.querySelector("source");
  if (source && weddingConfig.music) {
    source.src = weddingConfig.music;
    audio.load();
  }

  let userPaused = true;

  const setPlayingState = (isPlaying) => {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  };

  button.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        userPaused = false;
        setPlayingState(true);
      }).catch(() => {
        // Playback blocked or file missing — fail silently, keep UI consistent
        setPlayingState(false);
      });
    } else {
      audio.pause();
      userPaused = true;
      setPlayingState(false);
    }
  });

  // Attempt a silent, muted autoplay is intentionally skipped per browser policy;
  // music only starts on explicit user interaction with the button above.
  audio.addEventListener("pause", () => { if (userPaused) setPlayingState(false); });
  audio.addEventListener("playing", () => setPlayingState(true));
  audio.addEventListener("error", () => setPlayingState(false));
}

/* -----------------------------------------------------
   4. WEDDING COUNTDOWN
----------------------------------------------------- */
function initCountdown() {
  const els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    minutes: document.getElementById("cd-minutes"),
    seconds: document.getElementById("cd-seconds")
  };
  const grid = document.getElementById("countdown-timer");
  const completeMsg = document.getElementById("countdown-complete");

  if (!els.days || !els.hours || !els.minutes || !els.seconds) return;

  const targetDate = new Date(weddingConfig.weddingDate);
  let previous = { d: null, h: null, m: null, s: null };
  let intervalId = null;

  const pad = (n) => String(Math.max(n, 0)).padStart(2, "0");

  const animateTick = (el, value, prevValue) => {
    el.textContent = pad(value);
    if (prevValue !== null && prevValue !== value && !prefersReducedMotion) {
      el.classList.remove("tick");
      // force reflow so the animation can restart
      void el.offsetWidth;
      el.classList.add("tick");
    }
  };

  const update = () => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      clearInterval(intervalId);
      if (grid) grid.hidden = true;
      if (completeMsg) completeMsg.hidden = false;
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    animateTick(els.days, days, previous.d);
    animateTick(els.hours, hours, previous.h);
    animateTick(els.minutes, minutes, previous.m);
    animateTick(els.seconds, seconds, previous.s);

    previous = { d: days, h: hours, m: minutes, s: seconds };
  };

  update();
  intervalId = setInterval(update, 1000);
}

/* -----------------------------------------------------
   5. PRENUP GALLERY — FILM STRIP CAROUSEL
----------------------------------------------------- */
function initGallery() {
  const track = document.getElementById("filmstrip-track");
  const dotsWrap = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

  const frames = Array.from(track.querySelectorAll(".filmstrip-frame"));
  if (!frames.length) return;

  let index = 0;
  let autoplayId = null;

  // Build dot indicators
  frames.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to photo ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function goTo(i, userInitiated) {
    index = (i + frames.length) % frames.length;
    render();
    if (userInitiated) restartAutoplay();
  }

  function next(userInitiated) { goTo(index + 1, userInitiated); }
  function prev(userInitiated) { goTo(index - 1, userInitiated); }

  function startAutoplay() {
    if (!weddingConfig.galleryAutoplay || prefersReducedMotion) return;
    stopAutoplay();
    autoplayId = setInterval(() => next(false), weddingConfig.galleryAutoplayInterval);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn.addEventListener("click", () => prev(true));
  nextBtn.addEventListener("click", () => next(true));

  // Pause autoplay on hover / focus (desktop)
  const wrapper = track.closest(".filmstrip-wrapper");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", startAutoplay);
    wrapper.addEventListener("focusin", stopAutoplay);
    wrapper.addEventListener("focusout", startAutoplay);
  }

  // Native swipe support (touch)
  let touchStartX = 0;
  let touchDeltaX = 0;
  let isTouching = false;

  track.addEventListener("touchstart", (e) => {
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isTouching) return;
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    if (!isTouching) return;
    isTouching = false;
    const threshold = 40;
    if (touchDeltaX > threshold) {
      prev(true);
    } else if (touchDeltaX < -threshold) {
      next(true);
    } else {
      startAutoplay();
    }
  });

  // Keyboard support when the strip is focused
  const filmstrip = document.getElementById("filmstrip");
  if (filmstrip) {
    filmstrip.setAttribute("tabindex", "0");
    filmstrip.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next(true);
      if (e.key === "ArrowLeft") prev(true);
    });
  }

  render();
  startAutoplay();
}

/* -----------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
----------------------------------------------------- */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* -----------------------------------------------------
   7. DECORATIVE FLOATING ELEMENTS (subtle petals/hearts/sparkles)
----------------------------------------------------- */
function initFloatingDecor() {
  if (prefersReducedMotion) return;

  const symbols = ["♥", "✦", "❀"];
  const container = document.body;
  let count = 0;
  const maxConcurrent = 5;

  function spawn() {
    if (count >= maxConcurrent) return;
    count++;

    const el = document.createElement("span");
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    el.textContent = symbol;
    el.className = "floating-decor" + (symbol === "♥" ? " heart" : symbol === "✦" ? " sparkle" : "");
    el.style.left = `${Math.random() * 96}vw`;
    el.style.fontSize = `${0.7 + Math.random() * 0.8}rem`;
    el.style.animationDuration = `${9 + Math.random() * 6}s`;
    el.setAttribute("aria-hidden", "true");

    container.appendChild(el);

    el.addEventListener("animationend", () => {
      el.remove();
      count--;
    });
  }

  // Gentle, infrequent spawning — decorative, not distracting
  setInterval(spawn, 3200);
}

/* -----------------------------------------------------
   8. APPLY CONFIG TO DOM (names, date, venue text, form, QR)
   Lets editors change weddingConfig above and have it
   propagate without touching markup by hand.
----------------------------------------------------- */
function applyConfigToDOM() {
  const form = document.querySelector(".rsvp-iframe");
  if (form && weddingConfig.googleForm) {
    form.src = weddingConfig.googleForm;
  }
}

/* -----------------------------------------------------
   9. INIT
----------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavigation();
  initMusic();
  initCountdown();
  initGallery();
  initRevealAnimations();
  initFloatingDecor();
  applyConfigToDOM();
});