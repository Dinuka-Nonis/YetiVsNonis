// --- Popup Logic ---
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');

// Show popup automatically on page load
window.onload = () => {
  popup.classList.remove('hidden');
};

// Close button
closeBtn.onclick = () => popup.classList.add('hidden');

// --- Canvas Setup ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const skier = {
  x: canvas.width / 2,
  y: canvas.height - 60,
  width: 20,
  height: 40,
  color: 'red',
  speed: 5
};

// Keyboard input
const keys = {};
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// --- Game Loop ---
function update() {
  // Move skier left/right
  if (keys['ArrowLeft'] && skier.x > 10) skier.x -= skier.speed;
  if (keys['ArrowRight'] && skier.x < canvas.width - 10) skier.x += skier.speed;

  draw();
  requestAnimationFrame(update);
}

// --- Drawing ---
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw skier as triangle
  ctx.fillStyle = skier.color;
  ctx.beginPath();
  ctx.moveTo(skier.x, skier.y);           // top
  ctx.lineTo(skier.x - 10, skier.y + 40); // bottom-left
  ctx.lineTo(skier.x + 10, skier.y + 40); // bottom-right
  ctx.closePath();
  ctx.fill();
}

// Start game loop
update();
