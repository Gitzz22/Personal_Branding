// ===== DOWNLOAD CV =====
const downloadCV = document.getElementById('downloadCV');
if (downloadCV) {
  downloadCV.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'CV Sigit Prakoso.pdf'; // ganti dengan nama file CV kamu
    link.download = 'CV Sigit Prakoso.pdf';
    link.click();
  });
}


// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav__link');

// Scroll handler for nav style
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinkItems.forEach(l => l.style.color = '');
        link.style.color = '#7eb8d4';
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ===== SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-bar__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const width = el.getAttribute('data-width');
      el.style.width = width + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));


// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);

  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };

  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat__num');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      animateCounter(el, target);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.7 });

statNums.forEach(num => statsObserver.observe(num));


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate sending
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    btnText.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      btnText.textContent = originalText;
      submitBtn.disabled = false;
      formSuccess.classList.add('show');

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 4000);
    }, 1600);
  });
}


// ===== SMOOTH PARALLAX on hero blobs =====
const blob1 = document.querySelector('.blob--1');
const blob2 = document.querySelector('.blob--2');

window.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 768) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  if (blob1) {
    blob1.style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
  }
  if (blob2) {
    blob2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
  }
});


// ===== PROJECT CARD TILT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease';
  });
});


// ===== CURSOR CUSTOM (desktop only) =====
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: #7eb8d4;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
    mix-blend-mode: normal;
  `;
  document.body.appendChild(cursor);

  const follower = document.createElement('div');
  follower.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 1px solid rgba(126, 184, 212, 0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.15s ease;
  `;
  document.body.appendChild(follower);

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = mx - 3 + 'px';
    cursor.style.top = my - 3 + 'px';

    follower.style.left = mx - 16 + 'px';
    follower.style.top = my - 16 + 'px';
  });

  // Grow on interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, input, textarea');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'scale(1.8)';
      follower.style.borderColor = 'rgba(126, 184, 212, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'scale(1)';
      follower.style.borderColor = 'rgba(126, 184, 212, 0.4)';
    });
  });
}


// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
