/**
 * Theme Toggle & Scroll Progress
 * Modern UI interactions for jeremiahcha.com
 */

(function() {
  'use strict';

  // ============================================
  // Dark Mode Toggle
  // ============================================

  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Get saved theme or use system preference
  function getTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return prefersDark.matches ? 'dark' : 'light';
  }

  // Apply theme to document
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initialize theme on load
  setTheme(getTheme());

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Listen for system theme changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ============================================
  // Scroll Progress Indicator
  // ============================================

  const scrollProgress = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }
  }

  // Throttle scroll updates for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateScrollProgress();

  // ============================================
  // Smooth reveal animations on scroll
  // ============================================

  // Intersection Observer for fade-in elements
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with reveal class (can be added to future content)
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

})();
