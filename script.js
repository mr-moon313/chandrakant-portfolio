document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".close");

  document.querySelectorAll(".glider img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});

window.addEventListener("load", () => {
  document.querySelectorAll(".glider-contain").forEach(container => {
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
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } }
      ]
    });

    let autoplayTimer;
    const autoplay = () => {
      autoplayTimer = setTimeout(() => {
        glider.scrollItem(glider.slide + 1, true);
      }, 4000);
    };

    glider.ele.addEventListener("glider-animated", () => {
      clearTimeout(autoplayTimer);
      autoplay();
    });

    container.addEventListener("mouseenter", () => clearTimeout(autoplayTimer));
    container.addEventListener("mouseleave", autoplay);

    autoplay();
  });
});
