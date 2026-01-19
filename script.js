
document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     STAR BACKGROUND
  ===================== */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const darkToggle = document.getElementById("darkToggle");

  let stars = [];
  let isDarkMode = true;
  let animationId;

  function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8,
      opacity: Math.random(),
      blink: Math.random() * 0.02
    }));
  }

  function drawStars() {
    if (!isDarkMode) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(s => {
      s.opacity += s.blink;
      if (s.opacity > 1 || s.opacity < 0) s.blink *= -1;

      ctx.globalAlpha = s.opacity;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    animationId = requestAnimationFrame(drawStars);
  }

  function startStars() {
    cancelAnimationFrame(animationId);
    drawStars();
  }

  function stopStars() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    isDarkMode = !document.body.classList.contains("light-mode");
    darkToggle.textContent = isDarkMode ? "🌙" : "☀️";

    isDarkMode ? startStars() : stopStars();
  });

  window.addEventListener("resize", initStars);
  initStars();
  startStars();

  /* =====================
     SCROLL REVEAL
  ===================== */
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* =====================
     LIGHTBOX
  ===================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".glider img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });

  /* =====================
     SMOOTH SCROLL
  ===================== */
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
});

/* =====================
   GLIDER INIT
===================== */
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
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } }
      ]
    });
  });
});
