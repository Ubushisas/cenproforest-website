// Super simple hero video initialization
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;

    // Force all the right attributes for autoplay
    heroVideo.muted = true;
    heroVideo.volume = 0;
    heroVideo.playsInline = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    heroVideo.setAttribute('muted', '');
    heroVideo.removeAttribute('controls');

    // Simple function to just play the video
    const playVideo = () => {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {
            // If it fails, try again on any user interaction
            const tryPlay = () => {
                heroVideo.muted = true;
                heroVideo.play();
            };
            document.addEventListener('touchstart', tryPlay, { once: true });
            document.addEventListener('click', tryPlay, { once: true });
            document.addEventListener('scroll', tryPlay, { once: true });
        });
    };

    // Try to play as soon as possible
    if (heroVideo.readyState >= 2) {
        playVideo();
    } else {
        heroVideo.addEventListener('loadeddata', playVideo, { once: true });
        heroVideo.addEventListener('canplay', playVideo, { once: true });
    }

    // Also try when page becomes visible
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && heroVideo.paused) {
            playVideo();
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}