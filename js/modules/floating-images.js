// Simple Horizontal Fade-in Animation Module
class FloatingImages {
    constructor() {
        this.imageContainer = document.querySelector('.vivero-carousel');
        this.images = [];
        this.hasAnimated = false;
        
        this.init();
    }

    init() {
        if (!this.imageContainer) {
            console.warn('Image container not found');
            return;
        }

        this.images = Array.from(this.imageContainer.querySelectorAll('.carousel-item'));
        
        if (this.images.length === 0) {
            console.warn('No images found');
            return;
        }

        this.setupInitialState();
        this.setupScrollObserver();
    }

    setupInitialState() {
        // Set initial state for all images
        this.images.forEach((image, index) => {
            // Add animation class
            image.classList.add('floating-image');
            
            // Initial state: only opacity 0, no movement
            image.style.opacity = '0';
            
            // Random duration between 0.6s and 0.8s
            const duration = 0.6 + (Math.random() * 0.2); // 0.6s - 0.8s
            image.style.transition = `opacity ${duration}s ease-out`;
        });
    }

    setupScrollObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.triggerAnimation();
                }
            });
        }, options);

        observer.observe(this.imageContainer);
    }

    triggerAnimation() {
        this.hasAnimated = true;
        
        // Animate images with staggered timing
        this.images.forEach((image, index) => {
            // Staggered delay between 0.1s - 0.2s
            const delay = index * (0.1 + (Math.random() * 0.1)); // 0.1s - 0.2s per image
            
            setTimeout(() => {
                // Only fade in, no movement
                image.style.opacity = '1';
            }, delay * 1000);
        });
    }

    // Method to reset animation (for testing)
    resetAnimation() {
        this.hasAnimated = false;
        this.setupInitialState();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.floatingImages = new FloatingImages();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingImages;
}