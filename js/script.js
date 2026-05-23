/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ══════════════════════════════════════════
   EMAIL VALIDATION + GET STARTED
══════════════════════════════════════════ */
function handleGetStarted(inputId) {
  const input = document.getElementById(inputId);
  const email = input.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showToast('⚠️ Please enter your email address.');
    input.focus();
    return;
  }
  if (!re.test(email)) {
    showToast('⚠️ Please enter a valid email address.');
    input.focus();
    return;
  }
  showToast('🎉 Welcome! Redirecting you to plans...');
  input.value = '';
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function toggleFAQ(btn) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Close all
  document.querySelectorAll('.questions button.margin').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    const ans = b.closest('.questions').querySelector('.faq-answer');
    if (ans) ans.classList.remove('open');
  });

  // Open clicked one (if it was closed)
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    const ans = btn.closest('.questions').querySelector('.faq-answer');
    if (ans) ans.classList.add('open');
  }
}

/* ══════════════════════════════════════════
   SCROLL-REVEAL  ← THIS IS WHY CARDS/BOXES
   WERE INVISIBLE. opacity:0 is set in CSS
   and only this JS adds class "visible".
   Without script.js, nothing ever appeared.
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Stagger delays
document.querySelectorAll('.card').forEach((el, i) => {
  el.dataset.delay = i * 80;
});

document.querySelectorAll('.boxes').forEach((el, i) => {
  el.dataset.delay = i * 100;
});

document.querySelectorAll('.questions').forEach((el, i) => {
  el.dataset.delay = i * 60;
});

// Observe everything that needs revealing
document.querySelectorAll(
  '.reveal, .card, .boxes, .questions'
).forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════
   STICKY NAVBAR ON SCROLL
══════════════════════════════════════════ */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav-sticky');
  } else {
    nav.classList.remove('nav-sticky');
  }
});
