 /* ── Toast ── */
      function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3500);
      }

      /* ── Email validation + Get Started ── */
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

      /* ── FAQ accordion ── */
      function toggleFAQ(btn) {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        // close all others
        document.querySelectorAll('.questions button.margin').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          const ans = b.closest('.questions').querySelector('.faq-answer');
          if (ans) ans.classList.remove('open');
        });
        // toggle clicked
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          const ans = btn.closest('.questions').querySelector('.faq-answer');
          if (ans) ans.classList.add('open');
        }
      }

      /* ── Scroll-reveal with IntersectionObserver ── */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // stagger delay for cards and boxes
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      // Add stagger delays to cards
      document.querySelectorAll('.card').forEach((el, i) => {
        el.dataset.delay = i * 80;
      });

      // Add stagger delays to boxes
      document.querySelectorAll('.boxes').forEach((el, i) => {
        el.dataset.delay = i * 100;
      });

      // Add stagger delays to questions
      document.querySelectorAll('.questions').forEach((el, i) => {
        el.dataset.delay = i * 60;
      });

      // Observe all reveal elements
      document.querySelectorAll('.reveal, .card, .boxes, .questions').forEach(el => {
        observer.observe(el);
      });

      /* ── Navbar shrink on scroll ── */
      window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 60) {
          nav.style.cssText = 'background:rgba(20,20,20,0.97);position:fixed;top:0;left:0;right:0;max-width:100%;padding:0 5vw;z-index:999;backdrop-filter:blur(8px);transition:all 0.3s;height:56px;box-shadow:0 2px 20px rgba(0,0,0,0.5);';
        } else {
          nav.style.cssText = '';
        }
      });