function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        console.log('Hero video initialized');

        // Ensure video plays automatically
        const playVideo = () => {
            heroVideo.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // Fallback: try to play after user interaction
                document.addEventListener('click', () => {
                    heroVideo.play().catch(err => console.log('Manual play failed:', err));
                }, { once: true });
            });
        };

        // Play immediately
        playVideo();

        // Also try to play when video metadata is loaded
        heroVideo.addEventListener('loadedmetadata', playVideo);

        // Ensure video loops
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            playVideo();
        });

        console.log('Hero video setup complete');
    } else {
        console.log('Hero video element not found');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}