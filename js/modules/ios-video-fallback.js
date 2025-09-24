// iOS Video Fallback - Custom play button if autoplay fails
function initIOSVideoFallback() {
    const heroVideo = document.querySelector('.hero-video');
    const videoContainer = document.querySelector('.hero_video_background');

    if (!heroVideo || !videoContainer) return;

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (!isIOS) return;

    console.log('iOS detected - setting up video fallback');

    let fallbackTimeout;
    let playButtonCreated = false;

    // Create custom play button
    const createPlayButton = () => {
        if (playButtonCreated) return;

        const playButton = document.createElement('div');
        playButton.className = 'ios-video-play-button';
        playButton.innerHTML = `
            <div class="play-button-circle">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="29" fill="rgba(255,255,255,0.9)" stroke="rgba(45,80,22,0.8)" stroke-width="2"/>
                    <path d="M23 18L23 42L41 30L23 18Z" fill="#2d5016"/>
                </svg>
            </div>
            <div class="play-button-text">Toca para reproducir</div>
        `;

        // Style the play button
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: pulsePlay 2s infinite;
        `;

        // Add styles for the button elements
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulsePlay {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
                50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            }

            .play-button-circle {
                margin-bottom: 10px;
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
            }

            .play-button-text {
                color: white;
                font-size: 16px;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
                font-family: 'Poppins', sans-serif;
            }

            .ios-video-play-button:hover .play-button-circle svg circle {
                fill: rgba(255,255,255,1);
            }
        `;

        if (!document.querySelector('#ios-video-fallback-styles')) {
            style.id = 'ios-video-fallback-styles';
            document.head.appendChild(style);
        }

        // Add click handler
        playButton.addEventListener('click', async () => {
            console.log('iOS play button clicked');
            heroVideo.muted = true;

            try {
                await heroVideo.play();
                playButton.style.opacity = '0';
                setTimeout(() => {
                    if (playButton.parentNode) {
                        playButton.parentNode.removeChild(playButton);
                    }
                }, 300);
                console.log('iOS video started playing');
            } catch (error) {
                console.log('iOS video play failed:', error);
            }
        });

        videoContainer.appendChild(playButton);
        playButtonCreated = true;
        console.log('iOS play button created');
    };

    // Check if video is playing after a delay
    const checkVideoStatus = () => {
        fallbackTimeout = setTimeout(() => {
            if (heroVideo.paused || heroVideo.currentTime === 0) {
                console.log('iOS video not playing, showing play button');
                createPlayButton();
            }
        }, 3000); // Wait 3 seconds before showing fallback
    };

    // Start monitoring
    if (heroVideo.readyState >= 2) {
        checkVideoStatus();
    } else {
        heroVideo.addEventListener('loadeddata', checkVideoStatus, { once: true });
    }

    // Clean up timeout if video starts playing
    heroVideo.addEventListener('playing', () => {
        if (fallbackTimeout) {
            clearTimeout(fallbackTimeout);
        }
        // Hide play button if it exists
        const playButton = document.querySelector('.ios-video-play-button');
        if (playButton) {
            playButton.style.opacity = '0';
            setTimeout(() => {
                if (playButton.parentNode) {
                    playButton.parentNode.removeChild(playButton);
                }
            }, 300);
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initIOSVideoFallback };
}