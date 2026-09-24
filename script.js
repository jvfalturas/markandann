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
  music: "music/tahanan_el_manu.mp3",
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
// function initLoader() {
//   const loader = document.getElementById("loading-screen");
//   if (!loader) return;

//   const hideLoader = () => {
//     loader.classList.add("loaded");
//     // Remove from accessibility tree / tab order once hidden
//     setTimeout(() => loader.setAttribute("aria-hidden", "true"), 800);
//   };

//   if (document.readyState === "complete") {
//     setTimeout(hideLoader, 400);
//   } else {
//     window.addEventListener("load", () => setTimeout(hideLoader, 400));
//   }

//   // Safety net: never let the loader block the site for more than 4s
//   setTimeout(hideLoader, 4000);
// }


/* -----------------------------------------------------
   1. ENVELOPE INTRO
----------------------------------------------------- */
function initEnvelopeIntro() {
  const envelope = document.getElementById("envelope-intro");
  if (!envelope) return;

  document.body.style.overflow = "hidden";

  let opened = false;

  const openEnvelope = () => {
    if (opened) return;
    opened = true;

    envelope.classList.add("opened");

    // Total: ~4s
    // Flap: 0-1.6s
    // Letter slide: 1.6-3s
    // Letter fade: 2.8-4s
    // Envelope fade out: 2.8-4s
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 3200);

    setTimeout(() => {
      envelope.remove();
    }, 4400);
  };

  envelope.addEventListener("click", openEnvelope);

  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });

  setTimeout(() => {
    if (!opened) openEnvelope();
  }, 12000);
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
  // initLoader();
  initEnvelopeIntro();
  initNavigation();
  initMusic();
  initCountdown();
  initGallery();
  initRevealAnimations();
  initFloatingDecor();
  applyConfigToDOM();
});