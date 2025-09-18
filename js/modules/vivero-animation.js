// Vivero Plant Growth Animation Module
class ViveroAnimation {
    constructor() {
        this.plantContainer = document.getElementById('plant-container');
        this.plantSvg = document.getElementById('plant-svg');
        this.maskReveal = document.getElementById('mask-reveal');
        this.plantGroup = document.querySelector('.plant-group');
        this.isAnimated = false;
        this.animationInProgress = false;
        
        this.init();
    }

    init() {
        if (!this.plantContainer || !this.plantSvg) {
            console.warn('Vivero animation elements not found');
            return;
        }

        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated && !this.animationInProgress) {
                    this.startPlantGrowthAnimation();
                }
            });
        }, options);

        observer.observe(this.plantContainer);
    }

    startPlantGrowthAnimation() {
        if (this.animationInProgress || this.isAnimated) return;
        
        this.animationInProgress = true;
        this.isAnimated = true;

        // Hide placeholder and show SVG
        const placeholder = this.plantContainer.querySelector('.plant-placeholder');
        if (placeholder) {
            placeholder.style.opacity = '0';
            placeholder.style.transition = 'opacity 0.5s ease-out';
        }

        // Show the plant SVG
        this.plantSvg.classList.add('animate');
        this.plantGroup.classList.add('growing');

        // Start the mask reveal animation
        this.animateMaskReveal();

        // Start individual element animations with delays
        setTimeout(() => this.animateStem(), 200);
        setTimeout(() => this.animateLeaves(), 1000);
        setTimeout(() => this.animateFlower(), 2500);
        
        // Mark animation as complete
        setTimeout(() => {
            this.animationInProgress = false;
        }, 3500);
    }

    animateMaskReveal() {
        if (!this.maskReveal) return;

        // Animate the mask to reveal the plant from bottom to top
        this.maskReveal.style.animation = 'reveal-mask 3s ease-out forwards';
    }

    animateStem() {
        const stem = this.plantSvg.querySelector('.plant-stem');
        if (stem) {
            stem.style.animation = 'grow-stem 1.5s ease-out forwards';
        }
    }

    animateLeaves() {
        const leaves = this.plantSvg.querySelectorAll('.plant-leaf');
        
        leaves.forEach((leaf, index) => {
            setTimeout(() => {
                leaf.style.animation = 'grow-leaf 0.8s ease-out forwards';
            }, index * 200); // Stagger the leaf animations
        });
    }

    animateFlower() {
        const flower = this.plantSvg.querySelector('.plant-flower');
        const flowerDetails = this.plantSvg.querySelectorAll('.flower-detail');
        
        if (flower) {
            flower.style.animation = 'grow-flower 0.6s ease-out forwards';
        }

        flowerDetails.forEach((detail, index) => {
            setTimeout(() => {
                detail.style.animation = 'grow-flower 0.4s ease-out forwards';
            }, 300 + (index * 100));
        });
    }

    // Method to reset animation (useful for testing)
    resetAnimation() {
        this.isAnimated = false;
        this.animationInProgress = false;
        
        // Reset SVG visibility
        this.plantSvg.classList.remove('animate');
        this.plantGroup.classList.remove('growing');
        
        // Reset placeholder
        const placeholder = this.plantContainer.querySelector('.plant-placeholder');
        if (placeholder) {
            placeholder.style.opacity = '1';
        }

        // Reset mask
        if (this.maskReveal) {
            this.maskReveal.style.animation = 'none';
            this.maskReveal.style.height = '0';
            this.maskReveal.style.y = '400';
        }

        // Reset all animated elements
        const animatedElements = this.plantSvg.querySelectorAll('.plant-stem, .plant-leaf, .plant-flower, .flower-detail');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
    }
}

// Initialize the vivero animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.viveroAnimation = new ViveroAnimation();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViveroAnimation;
}