// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Header shadow + back-to-top button
const header = document.getElementById('header');
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  topBtn.classList.toggle('show', window.scrollY > 400);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(timer); }
      el.textContent = n;
    }, 25);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// Enquiry form -> opens WhatsApp with the message
const form = document.getElementById('enquiryForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();

  const text =
    `Hello R&R Real Estates,%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Mobile: ${encodeURIComponent(phone)}%0A` +
    `Interested in: ${encodeURIComponent(interest)}%0A` +
    `Message: ${encodeURIComponent(message || '-')}`;

  window.open(`https://wa.me/919655752929?text=${text}`, '_blank');
  note.textContent = 'Thank you! Opening WhatsApp...';
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
