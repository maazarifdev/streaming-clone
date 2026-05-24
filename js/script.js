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
   EMAIL VALIDATION
══════════════════════════════════════════ */
function handleGetStarted(inputId) {
  const input = document.getElementById(inputId);
  const email = input.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showToast('⚠️ Please enter your email address.');
    input.focus(); return;
  }
  if (!re.test(email)) {
    showToast('⚠️ Please enter a valid email address.');
    input.focus(); return;
  }
  showToast('🎮 Welcome to Nexplay! Setting up your account...');
  input.value = '';
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function toggleFAQ(btn) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  document.querySelectorAll('.questions button.margin').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    const ans = b.closest('.questions').querySelector('.faq-answer');
    if (ans) ans.classList.remove('open');
  });
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    const ans = btn.closest('.questions').querySelector('.faq-answer');
    if (ans) ans.classList.add('open');
  }
}

/* ══════════════════════════════════════════
   GENRE FILTER
══════════════════════════════════════════ */
function filterGenre(btn, genre) {
  document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    if (genre === 'all' || card.dataset.genre === genre) {
      card.style.display = '';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => { card.style.display = 'none'; }, 300);
    }
  });
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach((el, i)       => { el.dataset.delay = i * 80; });
document.querySelectorAll('.boxes').forEach((el, i)      => { el.dataset.delay = i * 100; });
document.querySelectorAll('.questions').forEach((el, i)  => { el.dataset.delay = i * 55; });

document.querySelectorAll(
  '.reveal, .card, .boxes, .questions'
).forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════
   STICKY NAV
══════════════════════════════════════════ */
const nav = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('nav-sticky');
    backTop.classList.add('show');
  } else {
    nav.classList.remove('nav-sticky');
    backTop.classList.remove('show');
  }
});

/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
