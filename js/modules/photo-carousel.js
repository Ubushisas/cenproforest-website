// Photo Carousel Module - Auto-play only
function initPhotoCarousel() {
    const track = document.getElementById('photo-track');
    
    if (!track) {
        console.log('Photo carousel track not found');
        return;
    }

    let currentSlide = 0;
    const totalSlides = 7; // Number of actual photos (excluding duplicates)
    let isTransitioning = false;

    // Function to update carousel position
    function updateCarousel(slideIndex, animate = true) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        if (animate) {
            track.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            track.style.transition = 'none';
        }
        
        const translateX = -slideIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        setTimeout(() => {
            isTransitioning = false;
        }, animate ? 800 : 0);
    }

    // Function to go to next slide
    function nextSlide() {
        if (isTransitioning) return;
        
        currentSlide++;
        updateCarousel(currentSlide);
        
        // Handle infinite loop
        if (currentSlide >= totalSlides) {
            setTimeout(() => {
                currentSlide = 0;
                updateCarousel(currentSlide, false);
            }, 800);
        }
    }

    // Auto-play carousel
    const autoPlayInterval = setInterval(nextSlide, 3500); // Change slide every 3.5 seconds

    // Initialize carousel
    updateCarousel(0, false);
    
    console.log('Auto-play photo carousel initialized successfully');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotoCarousel);
} else {
    initPhotoCarousel();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPhotoCarousel };
}