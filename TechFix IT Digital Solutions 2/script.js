/* script.js — final, no errors */
/* Handles: hamburger slide-down, reveal on scroll, service search, lightbox, form basic validation */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Safety
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close when link clicked
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // Reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal-init');
  const revealOnce = () => {
    const trigger = window.innerHeight * 0.85;
    revealEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < trigger) el.classList.add('reveal');
    });
  };
  window.addEventListener('scroll', revealOnce);
  window.addEventListener('load', revealOnce);
  revealOnce();

  // Service search (services page)
  const serviceSearch = document.getElementById('serviceSearch');
  if (serviceSearch) {
    const items = document.querySelectorAll('.service-item');
    serviceSearch.addEventListener('input', () => {
      const q = serviceSearch.value.trim().toLowerCase();
      items.forEach(it => {
        it.style.display = (q === '' || it.innerText.toLowerCase().includes(q)) ? 'block' : 'none';
      });
    });
  }

  // Lightbox for images with class .team-photo
  document.querySelectorAll('img.team-photo').forEach(img => {
    img.addEventListener('click', () => {
      if (!img.src) return;
      const box = document.createElement('div');
      box.className = 'lightbox';
      const big = document.createElement('img');
      big.className = 'lightbox-img';
      big.src = img.src;
      box.appendChild(big);
      document.body.appendChild(box);
      box.addEventListener('click', () => box.remove());
    });
  });

  // Basic form client-side validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(inp => {
        if (!inp.value || inp.value.trim() === '') {
          inp.style.outline = '2px solid #ff6b6b';
          valid = false;
        } else {
          inp.style.outline = '';
        }
        if (inp.type === 'email' && inp.value) {
          const ok = /^\S+@\S+\.\S+$/.test(inp.value);
          if (!ok) { inp.style.outline = '2px solid #ff6b6b'; valid = false; }
        }
      });
      if (!valid) { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }
      else {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;
      }
    });
  });

});
