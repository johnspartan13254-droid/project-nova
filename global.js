/* ============================================
/* ============================================
   GLOBAL — COSMIC UTILITY ENGINE
   ============================================ */

/* Smooth random float */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/* Smooth random integer */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Global easing curves */
const Ease = {
    soft: t => t * t * (3 - 2 * t),
    pulse: t => Math.sin(t * Math.PI),
    bounce: t => Math.abs(Math.sin(t * 3)),
};

/* Realm-aware logger */
function realmLog(realm, message) {
    console.log(`[%c${realm}%c] ${message}`,
        "color:#fff;background:#444;padding:2px 6px;border-radius:4px;",
        "color:inherit;background:none;"
    );
}

/* Particle spawner */
function spawnParticle(options = {}) {
    const particle = document.createElement("div");
    particle.className = "global-particle";

    const size = options.size || randInt(4, 8);
    const color = options.color || "rgba(255,255,255,0.7)";
    const duration = options.duration || randInt(3000, 6000);
    const x = randInt(0, window.innerWidth);

    particle.style.left = `${x}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.animationDuration = `${duration}ms`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), duration);
}

/* Particle CSS injection */
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.innerHTML = `
        .global-particle {
            position: fixed;
            bottom: -10px;
            border-radius: 50%;
            animation: globalDriftUp linear forwards;
        }
        @keyframes globalDriftUp {
            from { transform: translateY(0); opacity: 1; }
            to   { transform: translateY(-140px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

/* ============================================================
   GLOBAL ACCORDION ENGINE
   ============================================================ */

export function initAccordions(selector = ".accordion") {
  const accordions = document.querySelectorAll(selector);
  if (!accordions.length) return;

  accordions.forEach(acc => {
    const toggle = acc.querySelector(".accordion-toggle");
    const content = acc.querySelector(".accordion-content");

    if (!toggle || !content) return;

    if (acc.classList.contains("open")) {
      toggle.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
    }

    toggle.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");

      if (isOpen) {
        content.style.maxHeight = null;
        content.classList.remove("open");
        toggle.classList.remove("active");
        acc.classList.remove("open");
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
        toggle.classList.add("active");
        acc.classList.add("open");
      }
    });
  });
}



