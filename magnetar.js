/* ===========================
   MAGNETAR REALM SCRIPT
   =========================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- 1. Field-line hover glow ---- */
  const links = document.querySelectorAll(".realm-magnetar a");
  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.filter = "drop-shadow(0 0 6px rgba(62,243,255,0.6))";
    });
    link.addEventListener("mouseleave", () => {
      link.style.filter = "none";
    });
  });


  /* ---- 2. Scroll pulse effect ---- */
  const magnetarRoot = document.querySelector(".realm-magnetar");
  window.addEventListener("scroll", () => {
    const intensity = Math.min(window.scrollY / 600, 1);
    magnetarRoot.style.backgroundPosition = `${intensity * 40}% ${intensity * 20}%`;
  });


  /* ---- 3. Auto‑pulse core elements ---- */
  const cores = document.querySelectorAll(".magnetar-core");
  cores.forEach(core => {
    core.addEventListener("click", () => {
      core.classList.add("magnetar-quake");
      setTimeout(() => core.classList.remove("magnetar-quake"), 600);
    });
  });


  /* ---- 4. Starquake micro-animation ---- */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes magnetar-quake {
      0% { transform: scale(1); }
      25% { transform: scale(1.08); }
      50% { transform: scale(0.94); }
      75% { transform: scale(1.06); }
      100% { transform: scale(1); }
    }
    .magnetar-quake {
      animation: magnetar-quake 0.6s ease-out;
    }
  `;
  document.head.appendChild(style);

});
