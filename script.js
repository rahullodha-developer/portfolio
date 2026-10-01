// Mobile navigation and digital resume interactions
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navBackdrop = document.getElementById('navBackdrop');

function closeMobileMenu() {
  if (navToggle && navMenu) {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
  }
}

function openMobileMenu() {
  if (navToggle && navMenu) {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('is-visible');
    document.body.classList.add('menu-open');
  }
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close when clicking the backdrop
  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close when clicking outside of the nav header
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('is-open')) {
      const header = document.querySelector('.nav');
      if (header && !header.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMobileMenu();
      navToggle.focus();
    }
  });

  // Auto-close menu if resized to desktop breakpoint (> 900px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}

// Smooth scroll for internal links & auto-close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
