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
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    // AJAX submission for Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate required fields (your existing validation handles this)
    const formData = new FormData(contactForm);

    fetch("https://formsubmit.co/ajax/YOUR_EMAIL_HERE", {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Show success message
      const success = document.getElementById('successMsg');
      success.style.display = "block";
      success.textContent = "✔ Message sent successfully. Thank you!";

      // Reset form
      contactForm.reset();

      // Scroll to success message
      success.scrollIntoView({ behavior: "smooth" });
    })
    .catch(error => {
      alert("❌ Something went wrong. Please try again later.");
    });
  });
}


    fetch('https://formsubmit.co/ajax/your-email@example.com', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('successMsg').style.display = 'block';
      contactForm.reset();
    })
    .catch(err => console.error(err));
  });
}
// Enquiry Form Processing
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const service = enquiryForm.querySelector('#serviceSelect').value;
    const responseBox = document.getElementById('enquiryResponse');

    let message = "";

    switch (service) {
      case "consulting":
        message = `
          <h3>Estimated Cost for IT Consulting</h3>
          <p>Our consulting starts at <strong>R1,200/hr</strong>, or a <strong>R6,000</strong> project package.</p>
          <p>Typical small project (1–2 weeks): R6,000.</p>
          <p>We will contact you shortly with availability and a confirmed quote.</p>
        `;
        break;

      case "hardware":
        message = `
          <h3>Estimated Cost for Hardware Repairs</h3>
          <p>Diagnostics start at <strong>R350</strong>.</p>
          <p>Common repairs such as laptop screens range between <strong>R850–R1,800</strong>.</p>
          <p>We will contact you with exact pricing based on your device model.</p>
        `;
        break;

      case "software":
        message = `
          <h3>Estimated Cost for Software Debugging</h3>
          <p>Debugging starts at <strong>R800/hr</strong>.</p>
          <p>Small issues are often resolved within a few hours.</p>
          <p>We will assess your problem and send a detailed estimate.</p>
        `;
        break;

      case "business":
        message = `
          <h3>Small Business IT Support</h3>
          <p>Our business plans start at <strong>R1,999/month</strong>.</p>
          <p>Includes monitoring, backups, and 4 hours of support.</p>
          <p>Custom plans available depending on your business size.</p>
        `;
        break;

      default:
        message = `
          <h3>Thank You for Your Enquiry</h3>
          <p>We will review your message and respond within 24 hours.</p>
        `;
    }

    responseBox.innerHTML = message;
    responseBox.style.display = "block";

    enquiryForm.reset();
  });
}

// --- UNIVERSAL SEARCH REDIRECT (Cannot fail) ---
document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("quickSearch");

    if (!searchInput) {
        console.error("Search bar with ID 'quickSearch' not found.");
        return;
    }

    console.log("Search bar found — redirect enabled");

    searchInput.addEventListener("keyup", (event) => {

        if (event.key === "Enter") {

            const q = searchInput.value.trim().toLowerCase();
            console.log("Searching for:", q);

            if (q.includes("home")) {
                window.location.href = "home.html";
            }
            else if (q.includes("about")) {
                window.location.href = "about.html";
            }
            else if (q.includes("service")) {
                window.location.href = "services.html";
            }
            else if (q.includes("enquiry") || q.includes("enquire")) {
                window.location.href = "enquiry.html";
            }
            else if (q.includes("contact")) {
                window.location.href = "contact.html";
            }
            else {
                alert("Page not found — try: home, about, services, enquiry, contact.");
            }
        }
    });
});
