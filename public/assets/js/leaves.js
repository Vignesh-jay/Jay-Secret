let wind = 0;

setInterval(() => {
  wind = Math.random() * 160 - 80;
}, 8000);

const sunlight = document.querySelector(".background");

let hue = 0;

setInterval(() => {
  hue += 1;

  sunlight.style.filter = `brightness(${100 + Math.sin(hue / 20) * 3}%)
 saturate(${100 + Math.sin(hue / 30) * 5}%)`;
}, 100);

const container = document.getElementById("leaf-container");

const MAX_LEAVES = 8;

function createLeaf() {
  const leaf = document.createElement("img");

  const LEAF_PATH = "/assets/images/leaves/";

  const leaves = ["oak.svg", "maple.svg", "birch.svg", "elm.svg", "grass.svg"];

  leaf.src = LEAF_PATH + leaves[Math.floor(Math.random() * leaves.length)];

  leaf.className = "leaf";

  const blur = Math.random() * 3;
  const size = 18 + Math.random() * 30;
  const startX = Math.random() * window.innerWidth;
  const drift = wind + Math.random() * 140 - 70;
  const rotate = Math.random() * 720;
  const duration = 12 + Math.random() * 10;

  leaf.style.width = `${size}px`;
  leaf.style.left = `${startX}px`;
  leaf.style.opacity = 0.35 + Math.random() * 0.5;
  leaf.style.filter = `blur(${blur}px) drop-shadow(0 8px 12px rgba(0,0,0,.08))`;
  leaf.style.zIndex = blur > 1.5 ? 3 : 1;

  container.appendChild(leaf);

  leaf
    .animate(
      [
        {
          transform: `translate(0,-120px) rotate(0deg)`,
        },
        {
          transform: `translate(${drift}px,${window.innerHeight + 200}px) rotate(${rotate}deg)`,
        },
      ],
      {
        duration: duration * 1000,
        easing: "linear",
      },
    )
    .finished.then(() => {
      leaf.remove();

      createLeaf();
    });
}

for (let i = 0; i < MAX_LEAVES; i++) {
  setTimeout(createLeaf, i * 1200);
}
