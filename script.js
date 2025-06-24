// Reveal animation on scroll
const reveals = document.querySelectorAll('.reveal');
const toggleReveal = () => {
  for (const el of reveals) {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) el.classList.add('visible');
  }
};

window.addEventListener('scroll', toggleReveal);
window.addEventListener('load', toggleReveal);

// Dark mode toggle
const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Lightbox feature
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

const triggers = document.querySelectorAll('.lightbox-trigger');
triggers.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === lightboxImg) {
    lightbox.style.display = 'none';
  }
});
