/**
 * SandboxCodex - AI Software Engineer
 * Frontend JavaScript
 * Handles interactivity: menu, tabs, forms, animations
 */

document.addEventListener('DOMContentLoaded', function () {
  initializeMenuSystem();
  initializeBlogTabs();
  initializeNewsletterForm();
  initializeScrollAnimations();
  initializeSmoothScroll();
  initializeCopyButtons();
});

/**
 * Mobile Menu/Drawer System
 */
function initializeMenuSystem() {
  const drawer = document.getElementById('drawer');
  const menuOpen = document.getElementById('menuOpen');
  const menuClose = document.getElementById('menuClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (!drawer || !menuOpen || !menuClose || !drawerBackdrop) return;

  // Open menu
  menuOpen.addEventListener('click', function () {
    drawer.classList.add('open');
  });

  // Close menu
  menuClose.addEventListener('click', function () {
    drawer.classList.remove('open');
  });

  // Close on backdrop click
  drawerBackdrop.addEventListener('click', function () {
    drawer.classList.remove('open');
  });

  // Close on link click
  const drawerLinks = document.querySelectorAll('.drawer-panel a');
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      drawer.classList.remove('open');
    });
  });
}

/**
 * Blog Tab Switching
 */
function initializeBlogTabs() {
  const tabs = document.querySelectorAll('.blog-tabs .tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      tabs.forEach(function (t) {
        t.classList.remove('active');
      });
      // Add active class to clicked tab
      tab.classList.add('active');

      // Optional: Filter posts by category (future enhancement)
      const category = tab.textContent.trim();
      console.log('Switched to category:', category);
    });
  });
}

/**
 * Newsletter Form Submission
 */
function initializeNewsletterForm() {
  const newsForm = document.querySelector('.news-form');

  if (!newsForm) return;

  newsForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const input = newsForm.querySelector('input[type="email"]');
    const button = newsForm.querySelector('button');

    if (!input || !input.value) {
      alert('Vui lòng nhập email của bạn');
      return;
    }

    const email = input.value;

    // Simulate form submission
    button.textContent = 'ĐANG GỬI...';
    button.disabled = true;

    setTimeout(function () {
      button.textContent = 'ĐÃ ĐĂNG KÝ ✓';
      button.style.background = 'var(--green)';

      // Reset after 3 seconds
      setTimeout(function () {
        button.textContent = 'ĐĂNG KÝ';
        button.style.background = '';
        button.disabled = false;
        input.value = '';
      }, 3000);

      console.log('Newsletter signup:', email);
    }, 1000);
  });
}

/**
 * Intersection Observer for Scroll Animations
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections for animation on scroll
  const animatableElements = document.querySelectorAll(
    '.card, .post-card, .tech-item, .setup-item'
  );
  animatableElements.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Smooth Scroll Behavior (Enhanced)
 */
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Ignore empty hash links
      if (href === '#' || href === '#!') {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Close menu if open
        const drawer = document.getElementById('drawer');
        if (drawer) {
          drawer.classList.remove('open');
        }

        // Scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/**
 * Copy Code Block (Optional enhancement)
 */
function initializeCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const codeBlock = this.parentElement.querySelector('.code-block');
      if (!codeBlock) return;

      const text = codeBlock.textContent;
      navigator.clipboard.writeText(text).then(function () {
        const originalText = btn.textContent;
        btn.textContent = 'COPIED!';

        setTimeout(function () {
          btn.textContent = originalText;
        }, 2000);
      });
    });
  });
}

/**
 * Utility: Log page analytics
 */
function trackEvent(eventName, eventData) {
  if (typeof window !== 'undefined') {
    console.log('Event:', eventName, eventData);
    // Future: Send to analytics service
  }
}

// Export for testing/modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeMenuSystem,
    initializeBlogTabs,
    initializeNewsletterForm,
    initializeScrollAnimations,
    initializeSmoothScroll,
    trackEvent,
  };
}
