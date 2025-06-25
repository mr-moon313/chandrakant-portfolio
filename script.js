// ==== Dark Mode Toggle ====
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // ==== Reveal Animation ====
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

  // ==== Lightbox Setup ====
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.innerHTML = `<span class="close">&times;</span><img />`;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");

