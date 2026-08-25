/* ============================================
   YGGDRASIL REALM — EMERALD MYTH-ROOT ENGINE
   ============================================ */

/* Fade + grow-in effect for Yggdrasil tiles */
document.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll(".project-tile.yggdrasil");

    tiles.forEach(tile => {
        tile.style.opacity = 0;
        tile.style.transform = "scale(0.96)";

        setTimeout(() => {
            tile.style.transition = "opacity 1.4s ease, transform 1.4s ease";
            tile.style.opacity = 1;
            tile.style.transform = "scale(1)";
        }, 200);

        realmLog("Yggdrasil", "Myth-root tile awakened.");
    });
});


/* Breathing pulse (organic growth rhythm) */
setInterval(() => {
    const tiles = document.querySelectorAll(".project-tile.yggdrasil");

    tiles.forEach(tile => {
        const pulse = Ease.soft(Math.abs(Math.sin(Date.now() / 1400)));
        tile.style.boxShadow = `0 0 ${pulse * 18}px rgba(0,255,160,0.6)`;
    });
}, 80);


/* Branching highlight on hover */
const yggTiles = document.querySelectorAll(".project-tile.yggdrasil");

yggTiles.forEach(tile => {
    tile.addEventListener("mouseenter", () => {
        tile.classList.add("yggdrasil-branch");
        realmLog("Yggdrasil", "Branch highlight activated.");
    });

    tile.addEventListener("mouseleave", () => {
        tile.classList.remove("yggdrasil-branch");
    });
});


/* Emerald particle sprouts */
function spawnYggdrasilParticle() {
    spawnParticle({
        color: "rgba(0,255,160,0.7)",
        size: randInt(5, 9),
        duration: randInt(3500, 5500)
    });
}

setInterval(spawnYggdrasilParticle, 1500);
