document.addEventListener("DOMContentLoaded", () => {
  
  // 1. STAR ANIMATION
  const canvas = document.getElementById("stars");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Create 200 stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x += s.dx;
        s.y += s.dy;

        // Reset stars if they go off screen
        if (s.x > canvas.width) s.x = 0;
        if (s.x < 0) s.x = canvas.width;
        if (s.y > canvas.height) s.y = 0;
        if (s.y < 0) s.y = canvas.height;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 2. REVEAL ON SCROLL
  const revealElements = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 50) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 3. DARK MODE
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // 4. LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  
  document.querySelectorAll(".glider img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
});

// 5. GLIDER INITIALIZATION (Wait for full load)
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
      rewind: true,
      responsive: [
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 1024, settings: { slidesToShow: 3 } }
      ]
    });
  });
});
