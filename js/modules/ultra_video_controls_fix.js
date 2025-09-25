// Ultra aggressive video controls hiding
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');

    if (video) {
        // Remove controls attribute completely
        video.removeAttribute('controls');

        // Set additional attributes to prevent control appearance
        video.setAttribute('disablepictureinpicture', '');
        video.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
        video.setAttribute('oncontextmenu', 'return false');
        video.setAttribute('tabindex', '-1');

        // Force disable any interaction
        video.style.pointerEvents = 'none';
        video.style.webkitTouchCallout = 'none';
        video.style.webkitUserSelect = 'none';
        video.style.userSelect = 'none';
        video.style.outline = 'none';
        video.style.border = 'none';

        // Prevent any click events
        video.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        video.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        // Prevent context menu
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Force hide controls after load
        video.addEventListener('loadstart', function() {
            video.controls = false;
        });

        video.addEventListener('loadedmetadata', function() {
            video.controls = false;
        });

        video.addEventListener('canplay', function() {
            video.controls = false;
        });

        // Mobile-specific fixes
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            video.style.webkitAppearance = 'none';
            video.style.mozAppearance = 'none';
            video.style.appearance = 'none';
        }
    }
});