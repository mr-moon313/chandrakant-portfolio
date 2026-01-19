document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Star Animation (The Moon & Stars Theme) ---
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    // Create stars
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        opacity: Math.random(),
        blink: Math.random() * 0.02
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    stars.forEach(s => {
      // Twinkle effect
      s.opacity += s.blink;
      if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
      
      ctx.globalAlpha = s.opacity;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", initStars);
  initStars();
  drawStars();

  // --- 2. Reveal Sections on Scroll ---
  const revealElements = document.querySelectorAll(".reveal");
  function checkReveal() {
    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", checkReveal);
  checkReveal();

  // --- 3. Lightbox Logic ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  
  document.querySelectorAll(".glider img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = "none";
  });

  // --- 4. Smooth Scrolling ---
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const darkToggle = document.getElementById("darkToggle");
  let stars = [];
  let isDarkMode = true; // Default state

  function initStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        opacity: Math.random(),
        blink: Math.random() * 0.02
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ONLY draw stars if isDarkMode is true
    if (isDarkMode) {
      ctx.fillStyle = "white";
      stars.forEach(s => {
        s.opacity += s.blink;
        if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
        ctx.globalAlpha = s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }

  // Dark Mode Toggle Logic
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      isDarkMode = !document.body.classList.contains("light-mode");
      
      // Change icon based on mode
      darkToggle.textContent = isDarkMode ? "🌙" : "☀️";
    });
  }

  window.addEventListener("resize", initStars);
  initStars();
  drawStars();
  
  // Keep your existing Reveal and Smooth Scroll logic below...
});

// --- 5. Glider Gallery Initialization ---
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
