// Project Nova Carousel Scripts
console.log("Project Nova scripts loaded.");

let current = 0;
let autoplayId = null;
const AUTOPLAY_INTERVAL = 5000; // 5 seconds

let slides, dots, carousel;

document.addEventListener('DOMContentLoaded', () => {
  // Cache elements AFTER DOM loads
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');
  carousel = document.querySelector('.carousel');

  if (slides.length === 0) {
    console.warn("No slides found!");
    return;
  }

  // Setup initial render
  updateSlides();

  // Start autoplay
  startAutoplay();

  // Pause autoplay on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // Pause autoplay when user switches tabs
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
});


// -------------------------------
// SLIDE STATE MANAGEMENT
// -------------------------------
function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'left', 'right', 'hidden');

    if (i === current) {
      slide.classList.add('active');
    } else if (i === (current + 1) % slides.length) {
      slide.classList.add('right');
    } else if (i === (current - 1 + slides.length) % slides.length) {
      slide.classList.add('left');
    } else {
      slide.classList.add('hidden');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
    dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
  });
}


// -------------------------------
// NAVIGATION FUNCTIONS
// -------------------------------
function goToSlide(index) {
  current = (index + slides.length) % slides.length;
  updateSlides();
}

function nextSlide() {
  current = (current + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  updateSlides();
}


// -------------------------------
// AUTOPLAY ENGINE
// -------------------------------
function startAutoplay() {
  stopAutoplay(); // ensures only 1 interval runs
  autoplayId = setInterval(nextSlide, AUTOPLAY_INTERVAL);
}

function stopAutoplay() {
  if (autoplayId !== null) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}


// Expose function to window for inline onclick handlers
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
