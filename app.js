// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(reg => console.log("✅ Service Worker Registered", reg))
      .catch(err => console.error("❌ SW registration failed", err));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;
  const toggleBtn = document.getElementById("toggle-dark");

  // Theme Load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    html.classList.add("light-mode");
    toggleBtn && (toggleBtn.textContent = "☀️");
  }

  // Theme Toggle
  toggleBtn?.addEventListener("click", () => {
    body.classList.add("theme-fade");
    setTimeout(() => {
      const isLight = html.classList.toggle("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      toggleBtn.textContent = isLight ? "☀️" : "🌙";
      body.classList.remove("theme-fade");
    }, 200);
  });

  // Collapsible Missions
   document.querySelectorAll('.toggle-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.collapsible');
      card.classList.toggle('open');
      btn.textContent = card.classList.contains('open') ? '▲' : '▼';
    });
     });
 // 🎮 Game Modal Logic
const gameModal = document.getElementById("game-modal");
const gameFrame = document.getElementById("game-frame");
const openGameBtn = document.getElementById("open-game");
const closeGameBtn = document.getElementById("close-game");

let currentGame = "";
let clearFrameTimeout;

openGameBtn?.addEventListener("click", () => {
  const games = ["game/game1.html", "game/game2.html", "game/game3.html"];
  let newGame;

  do {
    newGame = games[Math.floor(Math.random() * games.length)];
  } while (newGame === currentGame);
  currentGame = newGame;

  clearTimeout(clearFrameTimeout);

  gameModal.classList.remove("hide");
  gameModal.classList.add("show");
  document.body.style.overflow = "hidden";

  // Log opening
  console.log("Opening game:", currentGame);

  setTimeout(() => {
    const bustCacheURL = `${currentGame}?t=${Date.now()}`;
    gameFrame.src = bustCacheURL;
  }, 50);
});

closeGameBtn?.addEventListener("click", () => {
  gameModal.classList.remove("show");
  gameModal.classList.add("hide");
  document.body.style.overflow = "";

  // Temporarily disable the open button
  openGameBtn.style.pointerEvents = "none";

  gameModal.addEventListener("animationend", function handleClose() {
    gameModal.classList.remove("hide");

    clearFrameTimeout = setTimeout(() => {
      console.log("Clearing game");
      gameFrame.src = "";

      // ✅ Re-enable open after full clear
      openGameBtn.style.pointerEvents = "auto";
    }, 100);

    gameModal.removeEventListener("animationend", handleClose);
  }, { once: true });
});


});


