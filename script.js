// script.js

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Toggle dark mode
  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Gallery image zoom
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `<span class="close">&times;</span><img />`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});

function openLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.style.position = 'fixed';
  lightbox.style.top = 0;
  lightbox.style.left = 0;
  lightbox.style.width = '100%';
  lightbox.style.height = '100%';
  lightbox.style.background = 'rgba(0, 0, 0, 0.8)';
  lightbox.style.display = 'flex';
  lightbox.style.alignItems = 'center';
  lightbox.style.justifyContent = 'center';
  lightbox.style.zIndex = 1000;
  lightbox.onclick = () => document.body.removeChild(lightbox);

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '90%';
  img.style.borderRadius = '10px';
  lightbox.appendChild(img);

  document.body.appendChild(lightbox);
}

window.addEventListener('load', () => {
  const sliders = document.querySelectorAll('.glider-contain');

  sliders.forEach((container) => {
    const glider = new Glider(container.querySelector('.glider'), {
      slidesToShow: 1.2,
      slidesToScroll: 1,
      draggable: true,
      dots: container.querySelector('.dots'),
      arrows: {
        prev: container.querySelector('.glider-prev'),
        next: container.querySelector('.glider-next')
      },
      rewind: true
    });

    // Autoplay setup for each glider
    let autoplayTimer;
    function autoplay() {
      autoplayTimer = setTimeout(() => {
        glider.scrollItem(glider.slide + 1, true);
      }, 3000);
    }

    glider.ele.addEventListener('glider-animated', () => {
      clearTimeout(autoplayTimer);
      autoplay();
    });

    autoplay();
  });
});
