// Mobile nav
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Active nav link
const currentPath = window.location.pathname.replace(/\/$/, '');
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = (a.getAttribute('href') || '').replace(/\/$/, '');
  if (href === currentPath || (currentPath === '' && href === '/index.html')) {
    a.classList.add('active');
  }
});

// Fade-up on scroll
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observer.observe(el));
}

// Count-up stats
function countUp(el) {
  const target   = +el.dataset.target;
  const suffix   = el.dataset.suffix  || '';
  const duration = +(el.dataset.duration || 1800);
  const step     = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-up').forEach(el => statObserver.observe(el));

// Form submission (Netlify handles POST)
document.querySelectorAll('form[data-netlify]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/', { method: 'POST', body: data })
      .then(() => {
        const msg = form.querySelector('.form-success');
        if (msg) { msg.style.display = 'block'; }
        form.reset();
      })
      .catch(() => alert('Something went wrong. Please try calling us on 01782 262888.'));
  });
});
