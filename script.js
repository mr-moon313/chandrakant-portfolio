// ==== Dark Mode Toggle & Reveal Effect ====
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

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

  // ==== Lightbox Functionality ====
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

  // ==== Smooth Scrolling for Navigation ====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// ==== Glider Carousels ====
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

    // ==== Autoplay with Pause on Hover ====
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
  });
});

