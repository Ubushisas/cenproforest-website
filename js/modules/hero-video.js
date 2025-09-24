// Force video to work on all devices including mobile
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    const videoContainer = document.querySelector('.hero_video_background');

    if (!heroVideo || !videoContainer) return;

    console.log('Initializing hero video for all devices');

    // Aggressively set all video attributes
    heroVideo.muted = true;
    heroVideo.volume = 0;
    heroVideo.playsInline = true;
    heroVideo.defaultMuted = true;
    heroVideo.autoplay = true;
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');
    heroVideo.setAttribute('muted', '');
    heroVideo.setAttribute('autoplay', '');
    heroVideo.removeAttribute('controls');

    // Remove any existing play button that might be causing issues
    const existingPlayButton = videoContainer.querySelector('.video-play-button');
    if (existingPlayButton) {
        existingPlayButton.remove();
    }

    // Create intersection observer to play video when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                attemptPlay();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroVideo);

    let playAttempts = 0;
    const maxAttempts = 10;

    const attemptPlay = async () => {
        if (playAttempts >= maxAttempts) {
            console.log('Max play attempts reached');
            return;
        }

        playAttempts++;
        console.log(`Play attempt ${playAttempts}`);

        try {
            // Ensure video is muted before play
            heroVideo.muted = true;
            heroVideo.volume = 0;

            await heroVideo.play();
            console.log('Video playing successfully!');

            // Hide any play buttons if video starts playing
            const playButtons = videoContainer.querySelectorAll('.custom-play-button');
            playButtons.forEach(btn => btn.remove());

        } catch (error) {
            console.log(`Play attempt ${playAttempts} failed:`, error);

            if (playAttempts === 1) {
                // On first failure, set up user interaction triggers
                setupUserInteractionTriggers();
            }
        }
    };

    const setupUserInteractionTriggers = () => {
        console.log('Setting up user interaction triggers');

        const triggerPlay = () => {
            console.log('User interaction detected, attempting play');
            attemptPlay();
        };

        // Add event listeners for various user interactions
        const events = ['touchstart', 'touchend', 'click', 'scroll', 'mousemove', 'keydown'];
        const cleanup = () => {
            events.forEach(event => {
                document.removeEventListener(event, triggerPlay);
                window.removeEventListener(event, triggerPlay);
            });
        };

        events.forEach(event => {
            document.addEventListener(event, triggerPlay, { once: true, passive: true });
            window.addEventListener(event, triggerPlay, { once: true, passive: true });
        });

        // Cleanup after successful play
        heroVideo.addEventListener('playing', cleanup, { once: true });
    };

    // Initial play attempt
    if (heroVideo.readyState >= 2) {
        attemptPlay();
    } else {
        heroVideo.addEventListener('loadeddata', attemptPlay, { once: true });
        heroVideo.addEventListener('canplay', attemptPlay, { once: true });
    }

    // Periodic check to restart video if it stops
    const healthCheck = setInterval(() => {
        if (heroVideo.paused && heroVideo.currentTime > 0) {
            console.log('Video paused unexpectedly, attempting restart');
            attemptPlay();
        }
    }, 3000);

    // Clean up health check when video is playing consistently
    heroVideo.addEventListener('playing', () => {
        setTimeout(() => {
            if (!heroVideo.paused) {
                clearInterval(healthCheck);
                console.log('Video stable, stopping health check');
            }
        }, 10000);
    }, { once: true });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}