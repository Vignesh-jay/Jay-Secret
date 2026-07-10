const card = document.querySelector(".glass-card");
const background = document.querySelector(".background");
const leaves = document.getElementById("leaf-container");
const light = document.querySelector(".glass-light");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParallax() {
  currentX += (mouseX - currentX) * 0.06;
  currentY += (mouseY - currentY) * 0.06;

  background.style.transform = `translate(${currentX * -8}px, ${currentY * -8}px) scale(1.05)`;

  leaves.style.transform = `translate(${currentX * -5}px, ${currentY * -5}px)`;

  card.style.transform = `translate(${currentX * 3}px, ${currentY * 1.8}px)`;

  const rect = card.getBoundingClientRect();

  const lightX = mouseX * rect.width * 0.28 + rect.width / 2;

  const lightY = mouseY * rect.height * 0.28 + rect.height / 2;

  light.style.left = `${lightX}px`;

  light.style.top = `${lightY}px`;

  requestAnimationFrame(animateParallax);
}

animateParallax();
