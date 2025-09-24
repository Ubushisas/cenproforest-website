// Simple GIF background - no complex video logic needed!
function initHeroVideo() {
    const heroGif = document.querySelector('.hero-gif');
    const heroVideo = document.querySelector('.hero-video');
    const videoContainer = document.querySelector('.hero_video_background');

    // If we still have a video element, hide it in favor of GIF
    if (heroVideo) {
        heroVideo.style.display = 'none';
        console.log('Video element hidden in favor of GIF');
    }

    // Ensure GIF loads properly
    if (heroGif && videoContainer) {
        console.log('Hero GIF initialized - automatic playback guaranteed!');

        // Optional: Add loading indicator while GIF loads
        heroGif.addEventListener('load', () => {
            console.log('Hero GIF loaded successfully');
            heroGif.style.opacity = '1';
        });

        // Set initial opacity for smooth loading
        heroGif.style.opacity = '0.9';
        heroGif.style.transition = 'opacity 0.5s ease-in-out';

        // Ensure GIF is visible
        setTimeout(() => {
            heroGif.style.opacity = '1';
        }, 100);
    } else {
        console.log('Hero GIF element not found');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}