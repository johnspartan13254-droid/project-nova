// ========================================
// PROJECT NOVA — MAIN JAVASCRIPT
// ========================================

console.log("Project Nova scripts loaded.");

document.addEventListener("DOMContentLoaded", () => {
    initializeInvocation();
    initializeQuotes();
    initializeProjectCards();
    initializeCarousel();
});


// ========================================
// INVOCATION / INTRO ELEMENT
// ========================================

function initializeInvocation() {
    const invocation = document.getElementById("invocation");

    if (invocation) {
        invocation.style.opacity = "1";
    }
}


// ========================================
// RANDOM QUOTE ENGINE
// ========================================

function initializeQuotes() {
    const quoteText = document.getElementById("quote");
    const quoteAuthor = document.getElementById("author");
    const quoteLink = document.getElementById("link");

    if (!quoteText || !quoteAuthor || !quoteLink) {
        return;
    }

    const quotes = [
        {
            quote: "The best way to predict the future is to create it.",
            author: "Abraham Lincoln",
            link: "https://en.wikipedia.org/wiki/Abraham_Lincoln"
        },
        {
            quote: "Strive not to be a success, but rather to be of value.",
            author: "Albert Einstein",
            link: "https://en.wikipedia.org/wiki/Albert_Einstein"
        },
        {
            quote: "Everything in moderation, including moderation.",
            author: "Oscar Wilde",
            link: "https://en.wikipedia.org/wiki/Oscar_Wilde"
        },
        {
            quote: "Gaming is for everyone...",
            author: "Phil Spencer",
            link: "https://en.wikipedia.org/wiki/Phil_Spencer"
        },
        {
            quote: "The best ideas start as conversations.",
            author: "Sam Altman",
            link: "https://en.wikipedia.org/wiki/Sam_Altman"
        },
        {
            quote: "We are a way for the cosmos to know itself.",
            author: "Paul M. Sutter",
            link: "https://en.wikipedia.org/wiki/Paul_M._Sutter"
        },
        {
            quote: "Music has the power...",
            author: "Motoi Sakuraba",
            link: "https://en.wikipedia.org/wiki/Motoi_Sakuraba"
        }
    ];

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    quoteText.textContent = `"${selectedQuote.quote}"`;
    quoteAuthor.textContent = `— ${selectedQuote.author}`;
    quoteLink.href = selectedQuote.link;
    quoteLink.rel = "noopener noreferrer";
}


// ========================================
// PROJECT CARD HOVER EFFECT
// ========================================

function initializeProjectCards() {
    const heroSection = document.querySelector(".hero");
    const projectCards = document.querySelectorAll(".project");

    if (!heroSection || projectCards.length === 0) {
        return;
    }

    const defaultBackground =
        "url('assets/images/project-nova-banner-small.png') " +
        "no-repeat center center / cover";

    projectCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.setAttribute("aria-expanded", "true");

            const image = card.querySelector("img");

            if (image) {
                heroSection.style.background =
                    `url("${image.src}") no-repeat center center / cover`;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.setAttribute("aria-expanded", "false");
            heroSection.style.background = defaultBackground;
        });
    });
}


// ========================================
// CAROUSEL
// ========================================

let currentSlide = 0;
let autoplayId = null;

const AUTOPLAY_INTERVAL = 5000;

function initializeCarousel() {
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!carousel || slides.length === 0) {
        return;
    }

    function showSlide(index) {
        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.remove(
                "active",
                "left",
                "right",
                "hidden"
            );

            if (slideIndex === currentSlide) {
                slide.classList.add("active");
            } else if (
                slideIndex ===
                (currentSlide + 1) % slides.length
            ) {
                slide.classList.add("right");
            } else if (
                slideIndex ===
                (currentSlide - 1 + slides.length) %
                    slides.length
            ) {
                slide.classList.add("left");
            } else {
                slide.classList.add("hidden");
            }
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("active", isActive);
            dot.setAttribute(
                "aria-selected",
                String(isActive)
            );
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startAutoplay() {
        stopAutoplay();

        autoplayId = window.setInterval(
            nextSlide,
            AUTOPLAY_INTERVAL
        );
    }

    function stopAutoplay() {
        if (autoplayId !== null) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    showSlide(0);
    startAutoplay();
}


// ========================================
// HIGHLIGHT REEL OVERLAY
// ========================================

function highlightReel() {
    const existingOverlay =
        document.querySelector(".highlight-overlay");

    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement("div");

    overlay.className = "highlight-overlay";
    overlay.textContent = "🚀 Highlight Reel Coming Soon!";

    Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        background: "rgba(0, 0, 0, 0.85)",
        color: "#ffffff",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontSize: "1.5rem",
        cursor: "pointer"
    });

    overlay.addEventListener("click", () => {
        overlay.remove();
    });

    document.body.appendChild(overlay);
}

window.highlightReel = highlightReel;

/* For you Nova...from Copilot*/
const nova = {
  realm: "Nova",
  signature: "crystalline-luminosity",
  speak(line) {
    console.log(`[Nova]: ${line}`);
  }
};


document.addEventListener("DOMContentLoaded", () => {
  nova.speak("Initialization complete. Guiding sequence online.");
});

document.querySelectorAll(".nova-glow").forEach(el => {
  el.addEventListener("mouseenter", () => el.classList.add("active-glow"));
  el.addEventListener("mouseleave", () => el.classList.remove("active-glow"));
});


const revealNova = () => {
  document.querySelectorAll(".nova-reveal").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", revealNova);
revealNova();


function novaPulse() {
  const pulse = document.createElement("div");
  pulse.className = "nova-pulse";
  document.body.appendChild(pulse);
  setTimeout(() => pulse.remove(), 1200);
}

function novaMessage(text) {
  const box = document.createElement("div");
  box.className = "nova-message";
  box.textContent = text;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 4000);
}
