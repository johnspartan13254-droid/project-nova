// Project Everbloom — Living Design Engine
class EverbloomEngine {
    constructor(selector) {
        this.el = document.querySelector(selector);
        if (!this.el) return;

        this.state = {
            bloom: 0,
            pulse: false,
            t: 0
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.animate();
        this.updateBloomFromScroll();
    }

    bindEvents() {
        // Pulse on click
        this.el.addEventListener('click', () => {
            this.pulse();
        });

        // Bloom on hover
        this.el.addEventListener('pointerenter', () => {
            this.setBloom(1);
        });

        this.el.addEventListener('pointerleave', () => {
            this.setBloom(0);
        });

        // Scroll-based bloom
        window.addEventListener('scroll', () => {
            this.updateBloomFromScroll();
        });
    }

    setBloom(level) {
        this.state.bloom = Math.max(0, Math.min(1, level));
        this.applyBloom();
    }

    updateBloomFromScroll() {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPos = window.scrollY;
        const bloomLevel = scrollPos / maxScroll;

        this.setBloom(bloomLevel);
    }

    applyBloom() {
        const bloom = this.state.bloom;

        // Example: tie bloom to CSS variables
        this.el.style.setProperty('--bloom-scale', 1 + bloom * 0.15);
        this.el.style.setProperty('--bloom-light', bloom * 0.4);
        this.el.style.setProperty('--bloom-rotate', bloom * 6 + 'deg');
    }

    pulse() {
        if (this.state.pulse) return;
        this.state.pulse = true;

        this.el.classList.add('everbloom-pulse');

        setTimeout(() => {
            this.el.classList.remove('everbloom-pulse');
            this.state.pulse = false;
        }, 300);
    }

    animate() {
        const loop = () => {
            this.state.t += 0.015;

            // Gentle breathing motion
            const drift = Math.sin(this.state.t) * 2;
            this.el.style.transform = `translateY(${drift}px)`;

            requestAnimationFrame(loop);
        };

        loop();
    }
}

// Initialize engine
new EverbloomEngine('.everbloom');
