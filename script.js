/* ----------------------
   script.js
   - dark mode toggle
   - reveal on scroll
   - lightbox
   - initialize Glider.js for each section
   - autoplay with pause-on-hover
   ---------------------- */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Dark toggle ---------- */
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // persist preference in localStorage (optional)
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', '1');
      } else {
        localStorage.removeItem('darkMode');
      }
    });

    // restore
    if (localStorage.getItem('darkMode')) {
      document.body.classList.add('dark-mode');
    }
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const h = window.innerHeight;
    reveals.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < h - 60) el.classList.add('active');
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const closeBtn = lightbox ? lightbox.querySelector('.close') : null;

  function openLightbox(src) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Attach clicks on gallery images and glider images
  document.querySelectorAll('#gallery img, .glider img').forEach(img => {
    img.addEventListener('click', (e) => {
      openLightbox(e.currentTarget.src);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // expose closeLightbox so old markup `onclick="closeLightbox()"` still works
  window.closeLightbox = closeLightbox;
});

/* ---------- Glider init (wait for resources) ---------- */
window.addEventListener('load', () => {
  if (typeof Glider === 'undefined') {
    console.warn('Glider.js not loaded — carousels disabled.');
    return;
  }

  // initialize each .glider-contain group
new Glider(document.querySelector('.glider'), {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  dots: '.dots',
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  },
  rewind: true
});

function autoScrollGlider(glider, delay = 3000) {
  let glide = document.querySelector(glider);
  let interval = setInterval(() => {
    glide.querySelector('.glider-next').click();
  }, delay);
  
  glide.addEventListener('mouseover', () => clearInterval(interval));
  glide.addEventListener('mouseout', () => {
    interval = setInterval(() => {
      glide.querySelector('.glider-next').click();
    }, delay);
  });
}

autoScrollGlider('.glider', 3000);


    // autoplay per glider
    let timer = null;
    const startAutoplay = () => {
      stopAutoplay();
      timer = setInterval(() => {
        try {
          const nextIndex = (gl.slide + 1) % gl.track.childElementCount;
          gl.scrollItem(nextIndex);
        } catch (e) {
          // ignore
        }
      }, 3500);
    };
    const stopAutoplay = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    // start autoplay
    startAutoplay();

    // pause on hover
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // restart on user drag
    gl.ele.addEventListener('glider-animated', () => {
      stopAutoplay();
      startAutoplay();
    });
  });
