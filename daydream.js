/* ============================================
   DAYDREAM REALM — LAVENDER DRIFTSPACE ENGINE
   ============================================ */

/* Soft fade-in for all Daydream tiles */
document.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll(".project-tile.daydream");

    tiles.forEach(tile => {
        tile.style.opacity = 0;
        tile.style.transform = "translateY(10px)";
        
        setTimeout(() => {
            tile.style.transition = "opacity 1.2s ease, transform 1.2s ease";
            tile.style.opacity = 1;
            tile.style.transform = "translateY(0)";
        }, 150);
    });
});


/* Shimmer on hover */
const daydreamTiles = document.querySelectorAll(".project-tile.daydream");

daydreamTiles.forEach(tile => {
    tile.addEventListener("mouseenter", () => {
        tile.classList.add("daydream-shimmer");
    });

    tile.addEventListener("mouseleave", () => {
        tile.classList.remove("daydream-shimmer");
    });
});


/* Gentle float loop (soft realm drift) */
setInterval(() => {
    daydreamTiles.forEach(tile => {
        tile.style.transform = `translateY(${Math.sin(Date.now() / 1200) * 3}px)`;
    });
}, 60);


/* Optional: tiny lavender particles drifting upward */
function spawnDaydreamParticle() {
    const particle = document.createElement("div");
    particle.className = "daydream-particle";
    document.body.appendChild(particle);

    const x = Math.random() * window.innerWidth;
    const duration = 4000 + Math.random() * 3000;

    particle.style.left = `${x}px`;
    particle.style.animationDuration = `${duration}ms`;

    setTimeout(() => particle.remove(), duration);
}

setInterval(spawnDaydreamParticle, 1200);
