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
});


