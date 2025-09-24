// Navigation functionality
function initNavigation() {
    console.log('initNavigation function called!');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Navigation elements:', { navToggle, navMenu });
    
    if (!navToggle || !navMenu) {
        console.log('Navigation elements not found:', { navToggle, navMenu });
        return;
    }
    
    navToggle.addEventListener('click', function(e) {
        console.log('Nav toggle clicked!');
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Add touch event for better mobile support
    navToggle.addEventListener('touchstart', function(e) {
        console.log('Nav toggle touched!');
        e.preventDefault();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on any navigation link
    document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-cta-button').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll handling is now done in main.js - initScrollNavbar()
    // This section is disabled to prevent conflicts
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initNavigation, initSmoothScrolling };
}