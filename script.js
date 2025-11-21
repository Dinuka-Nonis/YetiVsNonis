// --- Popup Logic ---
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.tabIndex = 0; // allow canvas to receive key events

// Show popup and focus canvas on load
// Show popup automatically on page load
window.onload = () => {
  popup.classList.remove('hidden'); // show the game popup
  canvas.focus();                   // focus the canvas so arrow keys work immediately
};


// Close button
closeBtn.onclick = () => popup.classList.add('hidden');

// --- Game Setup ---
const skier = {
  x: canvas.width / 2,
  y: canvas.height - 60,
  width: 30,
  height: 60,
  color: 'red',
  speed: 7
};

const keys = {};
const obstacles = [];
let score = 0;

// Keyboard input
canvas.addEventListener('keydown', (e) => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

canvas.addEventListener('keyup', (e) => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

// --- Game Loop ---
function update() {
  // Move skier
  if (keys.left && skier.x > 15) skier.x -= skier.speed;
  if (keys.right && skier.x < canvas.width - 15) skier.x += skier.speed;

  updateObstacles();
  spawnObstacle();
  checkCollision();
  draw();

  requestAnimationFrame(update);
}

// --- Obstacles ---
function updateObstacles() {
  obstacles.forEach(obs => {
    obs.y += 3; // obstacle speed
    if (obs.y > canvas.height) {
      obs.y = -40;
      obs.x = Math.random() * (canvas.width - obs.width);
      score++; // increase score
    }
  });
}

function spawnObstacle() {
  if (Math.random() < 0.001) { // low spawn chance
    obstacles.push({
      x: Math.random() * (canvas.width - 30),
      y: -40,
      width: 30,
      height: 40,
      color: 'green'
    });
  }
}

// --- Collision Detection ---
function checkCollision() {
  for (let obs of obstacles) {
    if (
      skier.x - skier.width/2 < obs.x + obs.width &&
      skier.x + skier.width/2 > obs.x &&
      skier.y < obs.y + obs.height &&
      skier.y + skier.height > obs.y
    ) {
      alert("Game Over! Score: " + score);
      resetGame();
      break;
    }
  }
}

// --- Draw Everything ---
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw obstacles
  obstacles.forEach(obs => {
    ctx.fillStyle = obs.color;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });

  // Draw skier (triangle)
  ctx.fillStyle = skier.color;
  ctx.beginPath();
  ctx.moveTo(skier.x, skier.y);           // top
  ctx.lineTo(skier.x - 15, skier.y + 60); 
  ctx.lineTo(skier.x + 15, skier.y + 60); 
  ctx.closePath();
  ctx.fill();

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

// --- Reset Game ---
function resetGame() {
  skier.x = canvas.width / 2;
  skier.y = canvas.height - 60;
  score = 0;

  obstacles.length = 0;
  for (let i = 0; i < 3; i++) { // initial obstacles
    obstacles.push({
      x: Math.random() * (canvas.width - 30),
      y: Math.random() * -300,
      width: 30,
      height: 40,
      color: 'green'
    });
  }

  keys.left = false;
  keys.right = false;
}

// --- Start Game ---
resetGame();
update();