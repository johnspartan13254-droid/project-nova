/* ============================================
   GLOBAL — COSMIC UTILITY ENGINE
   ============================================ */

/* Smooth random float (for drift, shimmer, pulses) */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/* Smooth random integer */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Global easing curves */
const Ease = {
    soft: t => t * t * (3 - 2 * t),          // soft drift
    pulse: t => Math.sin(t * Math.PI),       // pulse wave
    bounce: t => Math.abs(Math.sin(t * 3)),  // playful bounce
};

/* Global logger (pretty + realm-aware) */
function realmLog(realm, message) {
    console.log(`[%c${realm}%c] ${message}`,
        "color:#fff;background:#444;padding:2px 6px;border-radius:4px;",
        "color:inherit;background:none;"
    );
}

/* Global particle spawner (realms can override color) */
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

/* Global particle CSS helper */
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
