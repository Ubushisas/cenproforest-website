function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        console.log('Hero video initialized');

        // Force video properties for better compatibility
        heroVideo.muted = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
        heroVideo.autoplay = true;

        // Mobile-specific optimizations
        heroVideo.setAttribute('webkit-playsinline', '');
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('muted', '');

        // Aggressive play attempts
        const playVideo = () => {
            heroVideo.play().then(() => {
                console.log('Video playing successfully');
            }).catch(e => {
                console.log('Video autoplay failed:', e);

                // Try different approaches for mobile
                setTimeout(() => {
                    heroVideo.play().catch(err => console.log('Delayed play failed:', err));
                }, 1000);

                // Fallback: play on any user interaction
                const playOnInteraction = () => {
                    heroVideo.play().then(() => {
                        console.log('Video started after user interaction');
                        document.removeEventListener('touchstart', playOnInteraction);
                        document.removeEventListener('click', playOnInteraction);
                    }).catch(err => console.log('Interaction play failed:', err));
                };

                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            });
        };

        // Multiple play attempts
        playVideo();

        // Try again when metadata loads
        heroVideo.addEventListener('loadedmetadata', playVideo);
        heroVideo.addEventListener('canplay', playVideo);

        // Force reload if needed
        heroVideo.addEventListener('loadstart', () => {
            console.log('Video started loading');
        });

        // Ensure video loops properly
        heroVideo.addEventListener('ended', () => {
            heroVideo.currentTime = 0;
            playVideo();
        });

        console.log('Hero video setup complete with mobile optimizations');
    } else {
        console.log('Hero video element not found');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initHeroVideo };
}