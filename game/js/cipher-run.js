// cipherrun.js
const canvas = document.getElementById("cipher-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const jumpSFX = document.getElementById("jump-sfx");
const collectSFX = document.getElementById("collect-sfx");
const hitSFX = document.getElementById("hit-sfx");

// Load Sprites
const playerImg = new Image();
playerImg.src = "assets/cipher-run/sprites/runner.png";

const firewallImg = new Image();
firewallImg.src = "assets/cipher-run/sprites/firewall.png";

let gravity = 1.2;
let gameSpeed = 6;
let frame = 0;

const player = {
  x: 100,
  y: canvas.height - 150,
  width: 48,
  height: 48,
  velocityY: 0,
  jumping: false,
  draw() {
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  },
  update() {
    this.velocityY += gravity;
    this.y += this.velocityY;
    if (this.y > canvas.height - this.height - 30) {
      this.y = canvas.height - this.height - 30;
      this.velocityY = 0;
      this.jumping = false;
    }
  },
  jump() {
    if (!this.jumping) {
      this.velocityY = -20;
      this.jumping = true;
      jumpSFX.currentTime = 0;
      jumpSFX.play();
    }
  }
};

class Obstacle {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height - 78;
    this.width = 40;
    this.height = 48;
  }
  draw() {
    ctx.drawImage(firewallImg, this.x, this.y, this.width, this.height);
  }
  update() {
    this.x -= gameSpeed;
    this.draw();
  }
}

const obstacles = [];

function handleObstacles() {
  if (frame % 120 === 0) {
    obstacles.push(new Obstacle());
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();

    // Collision detection
    const o = obstacles[i];
    if (
      player.x < o.x + o.width &&
      player.x + player.width > o.x &&
      player.y < o.y + o.height &&
      player.y + player.height > o.y
    ) {
      hitSFX.currentTime = 0;
      hitSFX.play();
      alert("🔥 You've hit a firewall! Game Over");
      document.location.reload();
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  player.draw();
  handleObstacles();
  frame++;
  requestAnimationFrame(animate);
}

// Controls
window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "KeyW", "Space"].includes(e.code)) {
    player.jump();
  }
});

animate();

