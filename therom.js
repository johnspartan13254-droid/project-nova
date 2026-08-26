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

    document.querySelectorAll('.accordion-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const accordion = button.parentElement;
        accordion.classList.toggle('open');
  
  const heroSection = document.querySelector('.hero');
  const projectCards = document.querySelectorAll('.project');
  const dots = document.querySelectorAll('.dot');
  <!--const slides = document.querySelector('.slides'); fix this later-->
  const totalSlides = 3;
  let currentSlide = 0;

  // Quotes Array
  const quotes = [
    { quote: "The best way to predict the future is to create it.", author: "Abraham Lincoln", link: "https://en.wikipedia.org/wiki/Abraham_Lincoln" },
    { quote: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", link: "https://en.wikipedia.org/wiki/Albert_Einstein" },
    { quote: "Everything in moderation, including moderation.", author: "Oscar Wilde", link: "https://en.wikipedia.org/wiki/Oscar_Wilde" },
    { quote: "Gaming is for everyone...", author: "Phil Spencer", link: "https://en.wikipedia.org/wiki/Phil_Spencer_(business_executive)" },
    { quote: "The best ideas start as conversations.", author: "Sam Altman", link: "https://en.wikipedia.org/wiki/Sam_Altman" },
    { quote: "We are a way for the cosmos to know itself.", author: "Paul M. Sutter", link: "https://en.wikipedia.org/wiki/Paul_M._Sutter" },
    { quote: "Music has the power...", author: "Motoi Sakuraba", link: "https://en.wikipedia.org/wiki/Motoi_Sakuraba" }
  ];

  // ...on Page Load (Show Random Quote )
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  window.onload = () => {
    document.getElementById('invocation').style.opacity = 1;
  };
  
  document.getElementById('quote').innerText = `"${quote.quote}"`;
  document.getElementById('author').innerText = `נ${quote.author}`;
  document.getElementById('link').href = quote.link;

  function getFilteredQuote(category = null, tone = null) {
    fetch('Quotes.json')
      .then(response => response.json())
      .then(data => {
        let filtered = data;

        if (category) {
          filtered = filtered.filter(q => q.category === category);
        }
        if (tone) {
          filtered = filtered.filter(q => q.tone === tone);
        }

        const randomIndex = Math.floor(Math.random() * filtered.length);
        const quote = filtered[randomIndex];
        displayQuote(quote);
      })
      .catch(error => console.error('Quote engine error:', error));
  }

function displayQuote(quote) {
  const container = document.querySelector('.quote-card');
  if (container) {
    // Safely set HTML for the quote
    container.innerHTML = `
      <cite>נ${quote.author}</cite>
    `;
    // Optionally apply a theme if provided
    if (quote.theme) {
      container.setAttribute('data-theme', quote.theme);
    }
  } else {
    console.warn('No element found with the selector .quote-card');
  }
}

if (quote && quote.quote) {
    container.innerHTML = `
    <blockquote>
      <p>"${Quotes.quote}"</p>
      <cite>נ${quote.author}</cite>
      <a href="${quote.link}" target="_blank">Learn more</a>
    </blockquote>
  ` ;
    }else{
        console.error('No quote available to display.');
    }


projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
    card.setAttribute('aria-expanded', 'true');
    const frontImage = card.querySelector('img')?.src;
        if (frontImage) {
            heroSection.style.background = `url('${frontImage}') no-repeat center center / cover`;
        }}
    );

card.addEventListener('mouseleave', () => {
    card.setAttribute('aria-expanded', 'false');
    heroSection.style.background = `url('images/project-nova-banner-small.png') no-repeat center center / cover`;
        });
    });

function showSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
        });
    }

function goToSlide(index) {
    showSlide(index);
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    }, 5000);

function highlightReel() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.85)';
    overlay.style.color = '#fff';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.fontSize = '1.5rem';
    overlay.innerText = '?? Highlight Reel Coming Soon!';

    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
    }
	
document.querySelectorAll('.accordion-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const accordion = button.parentElement;
    accordion.classList.toggle('open');
  });
});

