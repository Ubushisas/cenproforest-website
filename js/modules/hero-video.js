// Hero video initialization
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) {
        console.log('Hero video element not found');
        return;
    }

    // Detect iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    console.log('iOS detected:', isIOS);
    
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
    
    // iOS-specific video configuration
    if (isIOS) {
        // Force iOS-specific attributes
        heroVideo.setAttribute('webkit-playsinline', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('autoplay', '');
        heroVideo.setAttribute('muted', '');
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        console.log('iOS video attributes set');
    }

    // Aggressive autoplay function
    const forcePlay = () => {
        // Ensure video is muted for autoplay to work
        heroVideo.muted = true;
        heroVideo.volume = 0;

        return heroVideo.play().then(() => {
            console.log('Video playing successfully');
            return true;
        }).catch(e => {
            console.log('Autoplay blocked:', e.message);
            return false;
        });
    };

    // Try to play immediately after video is ready
    const attemptAutoplay = async () => {
        if (heroVideo.readyState >= 2) {
            const success = await forcePlay();
            if (!success && isIOS) {
                console.log('iOS autoplay failed, setting up touch triggers');
                setupIOSTouchTriggers();
            }
        }
    };

    // iOS-specific touch triggers
    const setupIOSTouchTriggers = () => {
        const playVideo = async (e) => {
            console.log('iOS touch detected, attempting play');
            heroVideo.muted = true;
            const success = await forcePlay();
            if (success) {
                // Remove all listeners after successful play
                document.removeEventListener('touchstart', playVideo);
                document.removeEventListener('touchend', playVideo);
                document.removeEventListener('click', playVideo);
                document.removeEventListener('scroll', playVideo);
                window.removeEventListener('scroll', playVideo);
            }
        };

        // Add multiple touch event listeners for iOS
        document.addEventListener('touchstart', playVideo, { passive: true });
        document.addEventListener('touchend', playVideo, { passive: true });
        document.addEventListener('click', playVideo, { passive: true });
        document.addEventListener('scroll', playVideo, { passive: true });
        window.addEventListener('scroll', playVideo, { passive: true });

        // Also try on any user interaction with the page
        ['mousedown', 'keydown', 'touchmove'].forEach(event => {
            document.addEventListener(event, playVideo, { once: true, passive: true });
        });
    };

    // Try autoplay immediately
    attemptAutoplay();

    // For non-iOS devices, use standard approach
    if (!isIOS) {
        const enableAutoplay = () => {
            forcePlay();
        };

        // Add listeners for user interaction
        document.addEventListener('touchstart', enableAutoplay, { once: true });
        document.addEventListener('click', enableAutoplay, { once: true });
        document.addEventListener('scroll', enableAutoplay, { once: true });
    }

    // Continuous monitoring for paused videos
    const monitorPlayback = setInterval(() => {
        if (heroVideo.paused && heroVideo.readyState >= 2) {
            console.log('Video paused, attempting resume...');
            heroVideo.muted = true;
            heroVideo.play().catch(e => console.log('Resume failed:', e));
        }

        // Clear interval if video is consistently playing
        if (!heroVideo.paused) {
            clearInterval(monitorPlayback);
            console.log('Video playing consistently, stopping monitor');
        }
    }, 2000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}