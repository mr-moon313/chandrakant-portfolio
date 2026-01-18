
// script.js

document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll
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

  // Lightbox setup
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `<span class="close">&times;</span><img />`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");

  document.querySelectorAll(".gallery-grid img, .glider img").forEach((img) => {
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

window.addEventListener("load", () => {
  document.querySelectorAll(".glider-contain").forEach((container) => {
    const gliderEl = container.querySelector(".glider");

    const glider = new Glider(gliderEl, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dots: container.querySelector(".dots"),
      arrows: {
        prev: container.querySelector(".glider-prev"),
        next: container.querySelector(".glider-next")
      },
      scrollLock: true,
      duration: 0.5,
      rewind: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });

    // Autoplay with pause on hover
    let autoplayTimer;
    function autoplay() {
      autoplayTimer = setTimeout(() => {
        glider.scrollItem(glider.slide + 1, true);
      }, 4000);
    }

    glider.ele.addEventListener("glider-animated", () => {
      clearTimeout(autoplayTimer);
      autoplay();
    });

    container.addEventListener("mouseenter", () => clearTimeout(autoplayTimer));
    container.addEventListener("mouseleave", autoplay);

    autoplay();

    // script.js

document.addEventListener("DOMContentLoaded", () => {

  /* Reveal on scroll */
  const revealElements = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top < windowHeight - 50) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* Dark mode */
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  /* Lightbox */
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `<span class="close">&times;</span><img />`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  document.querySelectorAll(".gallery-grid img, .glider img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  /* ⭐ STAR BACKGROUND */
  const canvas = document.getElementById("stars");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      dx: Math.random() * 0.3,
      dy: Math.random() * 0.3
    }));

    function animateStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.x += s.dx;
        s.y += s.dy;

        if (s.x > canvas.width) s.x = 0;
        if (s.y > canvas.height) s.y = 0;
      });

      requestAnimationFrame(animateStars);
    }

    animateStars();
  }
});

/* Glider */
window.addEventListener("load", () => {
  document.querySelectorAll(".glider-contain").forEach(container => {
    new Glider(container.querySelector(".glider"), {
      slidesToShow: 1,
      draggable: true,
      dots: container.querySelector(".dots"),
      arrows: {
        prev: container.querySelector(".glider-prev"),
        next: container.querySelector(".glider-next")
      },
      rewind: true
    });
  });
});
});
});
