/* ============================================================
   Finance-boot — Scripts
   ============================================================ */

// ---------- Mobile menu ----------
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobile-menu');
  const burger = document.querySelector('.navbar__burger');
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ---------- FAQ accordion ----------
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(function (el) {
    el.classList.remove('open');
  });

  // Open clicked (if it was closed)
  if (!isOpen) {
    item.classList.add('open');
  }
}

// ---------- Navbar scroll shadow ----------
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ---------- Intersection Observer animations ----------
const observerConfig = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerConfig);

document.querySelectorAll(
  '.step, .feature-card, .pricing-card, .testimonial, .faq-item'
).forEach(function (el, i) {
  el.classList.add('fade-in');
  el.style.transitionDelay = (i % 4) * 0.07 + 's';
  observer.observe(el);
});

// Inject fade-in styles dynamically
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .5s ease, transform .5s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

// ---------- Thank You page — personalise title by ?plan= ----------
(function () {
  if (!document.querySelector('.thankyou-card')) return;

  const params = new URLSearchParams(window.location.search);
  const plan = (params.get('plan') || '').toLowerCase();

  const planNames = { pro: 'Plano Pro', business: 'Plano Business' };

  if (planNames[plan]) {
    const title = document.querySelector('.thankyou-title');
    if (title) title.textContent = 'Obrigado pela assinatura do ' + planNames[plan] + '!';
  }
})();
