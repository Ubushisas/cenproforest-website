// Hero video initialization
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) {
        console.log('Hero video element not found');
        return;
    }
    
    // Handle video loading
    heroVideo.addEventListener('loadeddata', function() {
        console.log('Video loaded successfully');
        this.classList.add('loaded');
    });
    
    heroVideo.addEventListener('canplay', function() {
        console.log('Video can start playing');
        this.classList.add('loaded');
    });
    
    // Handle video errors
    heroVideo.addEventListener('error', function(e) {
        console.error('Video failed to load:', e);
        console.log('Using fallback background');
        // Video will fall back to the gradient background
    });
    
    // Force video load if it's not already loading
    if (heroVideo.readyState < 2) {
        console.log('Forcing video load...');
        heroVideo.load();
    } else {
        console.log('Video already loaded');
        heroVideo.classList.add('loaded');
    }
    
    // Retry mechanism if video doesn't load within 5 seconds
    setTimeout(() => {
        if (!heroVideo.classList.contains('loaded')) {
            console.log('Video loading timeout, checking file...');
            // Check if video file exists by trying to load it
            fetch('assets/videos/17342967-uhd_4096_2160_30fps.mp4', { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        console.log('Video file exists, retrying load...');
                        heroVideo.load();
                        // Force play after reload
                        setTimeout(() => {
                            heroVideo.play().catch(e => console.log('Autoplay blocked:', e));
                        }, 1000);
                    } else {
                        console.log('Video file not found, using background fallback');
                    }
                })
                .catch(err => {
                    console.log('Error checking video file:', err);
                });
        }
    }, 5000);
    
    // Add visual indicator that video is loading
    console.log('Video element found. Current state:', heroVideo.readyState);
    console.log('Video source:', heroVideo.currentSrc || heroVideo.src);
    
    // Force autoplay for mobile and desktop
    const forcePlay = () => {
        heroVideo.play().then(() => {
            console.log('Video playing successfully');
        }).catch(e => {
            console.log('Autoplay blocked, attempting to force play:', e.message);
            // Try to play after user interaction
            setTimeout(() => {
                heroVideo.play().catch(err => console.log('Force play failed:', err));
            }, 1000);
        });
    };

    // Try to play immediately
    forcePlay();

    // Also try on user interaction events
    const enableAutoplay = () => {
        heroVideo.play();
        // Remove listeners after first interaction
        document.removeEventListener('touchstart', enableAutoplay);
        document.removeEventListener('click', enableAutoplay);
        document.removeEventListener('scroll', enableAutoplay);
    };

    // Add listeners for user interaction
    document.addEventListener('touchstart', enableAutoplay, { once: true });
    document.addEventListener('click', enableAutoplay, { once: true });
    document.addEventListener('scroll', enableAutoplay, { once: true });

    // Force play every few seconds if not playing
    const checkPlayback = setInterval(() => {
        if (heroVideo.paused && heroVideo.readyState >= 2) {
            console.log('Video is paused, attempting to resume...');
            heroVideo.play().catch(e => console.log('Resume failed:', e));
        }
        // Stop checking after video is playing consistently
        if (!heroVideo.paused) {
            clearInterval(checkPlayback);
        }
    }, 3000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}