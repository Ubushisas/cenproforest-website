// Vivero Carousel - Right to Left with Physical Movement and Size Transitions
class ViveroCarousel {
    constructor() {
        this.carousel = document.querySelector('.vivero-carousel');
        this.carouselTrack = document.querySelector('.carousel-track');
        this.carouselItems = [];
        this.isAnimating = false;
        this.autoRotateInterval = 4000; // 4 seconds between rotations (3 + 1 more)
        this.autoRotateTimer = null;
        this.animationDuration = 1500; // 1.5 seconds for smooth transitions
        
        this.init();
    }

    init() {
        if (!this.carouselTrack || !this.carousel) {
            console.warn('Carousel elements not found');
            return;
        }

        this.carouselItems = Array.from(this.carouselTrack.querySelectorAll('.carousel-item'));
        
        if (this.carouselItems.length < 5) {
            console.warn('Need at least 5 carousel items');
            return;
        }

        this.setupCarousel();
        this.startAutoRotation();
        this.addEventListeners();
    }

    setupCarousel() {
        // Set up initial state with absolute positioning
        this.carouselTrack.style.position = 'relative';
        this.carouselTrack.style.width = '100%';
        this.carouselTrack.style.height = '430px';
        
        // Position cards with absolute positioning
        this.carouselItems.forEach((item, index) => {
            item.style.position = 'absolute';
            item.style.bottom = '0';
            item.style.opacity = '1'; // Ensure opacity starts at 1
            
            // Only show first 5 cards initially
            if (index < 5) {
                item.style.display = 'block';
                
                // Set initial positions
                if (index === 0) {
                    // Big card at position 0
                    item.style.left = '0px';
                    item.classList.add('carousel-item-big');
                    item.classList.remove('carousel-item-small');
                } else {
                    // Small cards at positions 1-4
                    const leftPosition = 335 + (index - 1) * 200; // 320 + 15 gap, then 185 + 15 for each small card
                    item.style.left = `${leftPosition}px`;
                    item.classList.add('carousel-item-small');
                    item.classList.remove('carousel-item-big');
                }
            } else {
                // Hide cards beyond position 4
                item.style.display = 'none';
                item.style.left = '935px'; // Pre-position at rightmost
                item.classList.add('carousel-item-small');
                item.classList.remove('carousel-item-big');
            }
            
            // DON'T set transition yet - wait until after initialization
            item.style.transition = 'none';
        });
        
        // Enable transitions after a brief delay
        setTimeout(() => {
            this.carouselItems.forEach(item => {
                item.style.transition = `all ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`;
            });
        }, 50);
    }

    animateCarousel() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Get ALL cards, not just visible ones
        // This ensures we're always working with the correct positions
        const visibleCards = [];
        for (let i = 0; i < this.carouselItems.length; i++) {
            if (this.carouselItems[i].style.display !== 'none') {
                visibleCards.push(this.carouselItems[i]);
            }
            if (visibleCards.length === 5) break;
        }
        
        // Get the next hidden card and prepare it to slide in
        const nextCard = this.carouselItems.find(item => item.style.display === 'none');
        if (nextCard) {
            // Position it just off-screen to the right
            nextCard.style.left = '1135px'; // Start position (200px past position 4)
            nextCard.style.opacity = '1';
            nextCard.style.display = 'block';
            nextCard.classList.add('carousel-item-small');
            nextCard.classList.remove('carousel-item-big');
            
            // Force reflow to ensure position is set before animation
            void nextCard.offsetHeight;
        }
        
        // Animate visible cards
        visibleCards.forEach((item, index) => {
            // Calculate new position (move left by one position)
            let newLeft;
            let willBeBig = false;
            
            if (index === 0) {
                // Big card fades out while moving left
                newLeft = -335; // Move off-screen to the left
                item.style.opacity = '0'; // Fade out
            } else if (index === 1) {
                // Card 1 moves to position 0 (becomes big)
                newLeft = 0;
                willBeBig = true;
            } else if (index === 2) {
                // Card 2 moves to position 1
                newLeft = 335;
            } else if (index === 3) {
                // Card 3 moves to position 2
                newLeft = 535;
            } else if (index === 4) {
                // Card 4 moves to position 3
                newLeft = 735;
            }
            
            // Apply the movement
            item.style.left = `${newLeft}px`;
            
            // Update size classes
            if (willBeBig) {
                item.classList.remove('carousel-item-small');
                item.classList.add('carousel-item-big');
            } else if (index === 0) {
                item.classList.remove('carousel-item-big');
                item.classList.add('carousel-item-small');
            }
        });
        
        // Animate the new card sliding in from the right
        if (nextCard) {
            setTimeout(() => {
                nextCard.style.left = '935px'; // Move to position 4
            }, 50); // Small delay to ensure smooth animation
        }
        
        // After animation completes, rearrange for next cycle
        setTimeout(() => {
            // Move the first card to the end
            const firstCard = this.carouselItems[0];
            
            // Hide it and reset position
            firstCard.style.transition = 'none';
            firstCard.style.display = 'none';
            firstCard.style.opacity = '1'; // Reset opacity for when it comes back
            
            // Move to end of DOM
            this.carouselTrack.appendChild(firstCard);
            
            // Update array reference
            this.carouselItems = Array.from(this.carouselTrack.querySelectorAll('.carousel-item'));
            
            // Re-enable transition after a frame
            requestAnimationFrame(() => {
                if (firstCard) firstCard.style.transition = `all ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`;
                if (nextCard) nextCard.style.transition = `all ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`;
                
                // Force a reflow to ensure positions are set
                void this.carouselTrack.offsetHeight;
                
                this.isAnimating = false;
            });
            
        }, this.animationDuration);
    }

    startAutoRotation() {
        // Add a small delay for the first animation to ensure proper initialization
        setTimeout(() => {
            this.animateCarousel();
            this.autoRotateTimer = setInterval(() => {
                this.animateCarousel();
            }, this.autoRotateInterval);
        }, 100); // Small delay to ensure DOM is fully ready
    }

    stopAutoRotation() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
    }

    addEventListeners() {
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoRotation();
        });
        
        // Resume on leave
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoRotation();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.viveroCarousel = new ViveroCarousel();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViveroCarousel;
}