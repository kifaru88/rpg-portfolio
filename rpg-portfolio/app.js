if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(reg => console.log("✅ Service Worker Registered", reg))
      .catch(err => console.error("❌ SW registration failed", err));
  });
}


const html = document.documentElement;
const body = document.body;
const toggleBtn = document.getElementById("toggle-dark");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  html.classList.add("light-mode");
  setTimeout(() => body.classList.remove("theme-fade"), 300);
  toggleBtn.textContent = "☀️";
}

toggleBtn?.addEventListener("click", () => {
  body.classList.add("theme-fade");
  setTimeout(() => {
    const isLight = html.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    toggleBtn.textContent = isLight ? "☀️" : "🌙";
    body.classList.remove("theme-fade");
  }, 200);
});


