// Main website initialization
// Import all functionality from modular files

// Since we're not using a module bundler, we'll declare functions as global
// and rely on script loading order

// Main website initialization - SINGLE DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Main Initialization');
    
    // Fix scroll restoration - always start at top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Core functionality
    initNavigation();
    initCatalog();
    initContactForm();
    initScrollEffects();
    initSmoothScrolling();
    initPlantFinder();
    initChoiceNavigation();
    initHeroVideo();
    initIOSVideoFallback();
    initParallaxEffects();
    
    // New features
    initChatBot();
    initModalEventListeners();
    initScrollNavbar();
    initChatButtonScroll();
    
    // Force FAQ initialization multiple times to ensure it works
    console.log('Attempting FAQ initialization...');
    initFAQ();
    
    // Fallback navigation - direct event binding
    setTimeout(() => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            console.log('Setting up fallback navigation...');
            
            // Remove any existing listeners first
            navToggle.onclick = null;
            
            // Add direct onclick handler
            navToggle.onclick = function(e) {
                console.log('Fallback nav clicked!');
                e.preventDefault();
                e.stopPropagation();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            };
        }
    }, 1000);
    
    setTimeout(() => {
        console.log('Second FAQ initialization attempt...');
        initFAQ();
    }, 500);
    
    setTimeout(() => {
        console.log('Third FAQ initialization attempt...');
        initFAQ();
    }, 1000);
    
    // Add FAQ link listener
    const faqLink = document.querySelector('a[href="#faq"]');
    if (faqLink) {
        faqLink.addEventListener('click', function(e) {
            console.log('FAQ link clicked, re-initializing FAQ');
            setTimeout(() => {
                initFAQ();
            }, 500);
        });
    }
    
    console.log('All functions initialized');
});

// Export functions for potential future use
window.CenproforestWebsite = {
    catalogData,
    renderCatalogItems,
    updateCatalogData: function(newData) {
        catalogData.length = 0;
        catalogData.push(...newData);
        renderCatalogItems();
    },
    plantFinder: {
        restart: restartFinder,
        requestQuote: requestQuote
    },
    chatBot: {
        sendMessage: sendMessage,
        askBot: askBot,
        talkToExpert: talkToExpert
    },
    faq: {
        toggleFAQ: toggleFAQ,
        filterFAQ: filterFAQ
    }
};

// Make functions globally accessible for HTML onclick handlers
window.toggleFAQ = typeof toggleFAQ !== 'undefined' ? toggleFAQ : function() { console.log('toggleFAQ not loaded'); };
window.showPlantFinder = typeof showPlantFinder !== 'undefined' ? showPlantFinder : function() { console.log('showPlantFinder not loaded'); };
window.showCatalog = typeof showCatalog !== 'undefined' ? showCatalog : function() { console.log('showCatalog not loaded'); };
window.showChoice = typeof showChoice !== 'undefined' ? showChoice : function() { console.log('showChoice not loaded'); };
window.restartFinder = typeof restartFinder !== 'undefined' ? restartFinder : function() { console.log('restartFinder not loaded'); };
window.requestQuote = typeof requestQuote !== 'undefined' ? requestQuote : function() { console.log('requestQuote not loaded'); };
window.filterFAQ = typeof filterFAQ !== 'undefined' ? filterFAQ : function() { console.log('filterFAQ not loaded'); };
window.handleFAQKeyPress = typeof handleFAQKeyPress !== 'undefined' ? handleFAQKeyPress : function() { console.log('handleFAQKeyPress not loaded'); };
window.openChatWithQuestion = typeof openChatWithQuestion !== 'undefined' ? openChatWithQuestion : function() { console.log('openChatWithQuestion not loaded'); };
window.showFAQLoadingIndicator = typeof showFAQLoadingIndicator !== 'undefined' ? showFAQLoadingIndicator : function() { console.log('showFAQLoadingIndicator not loaded'); };
window.updateFAQLoadingIndicator = typeof updateFAQLoadingIndicator !== 'undefined' ? updateFAQLoadingIndicator : function() { console.log('updateFAQLoadingIndicator not loaded'); };
window.hideFAQLoadingIndicator = typeof hideFAQLoadingIndicator !== 'undefined' ? hideFAQLoadingIndicator : function() { console.log('hideFAQLoadingIndicator not loaded'); };
window.initFAQ = typeof initFAQ !== 'undefined' ? initFAQ : function() { console.log('initFAQ not loaded'); };
window.renderFAQItems = typeof renderFAQItems !== 'undefined' ? renderFAQItems : function() { console.log('renderFAQItems not loaded'); };
window.sendMessage = typeof sendMessage !== 'undefined' ? sendMessage : function() { console.log('sendMessage not loaded'); };
window.askBot = typeof askBot !== 'undefined' ? askBot : function() { console.log('askBot not loaded'); };
window.handleChatKeyPress = typeof handleChatKeyPress !== 'undefined' ? handleChatKeyPress : function() { console.log('handleChatKeyPress not loaded'); };
window.talkToExpert = typeof talkToExpert !== 'undefined' ? talkToExpert : function() { console.log('talkToExpert not loaded'); };
window.showMap = typeof showMap !== 'undefined' ? showMap : function() { console.log('showMap not loaded'); };
window.closeMap = typeof closeMap !== 'undefined' ? closeMap : function() { console.log('closeMap not loaded'); };
window.openGoogleMaps = typeof openGoogleMaps !== 'undefined' ? openGoogleMaps : function() { console.log('openGoogleMaps not loaded'); };
window.openWaze = typeof openWaze !== 'undefined' ? openWaze : function() { console.log('openWaze not loaded'); };
window.adoptTree = typeof adoptTree !== 'undefined' ? adoptTree : function() { console.log('adoptTree not loaded'); };
window.openChatPopup = typeof openChatPopup !== 'undefined' ? openChatPopup : function() { console.log('openChatPopup not loaded'); };
window.closeChatPopup = typeof closeChatPopup !== 'undefined' ? closeChatPopup : function() { console.log('closeChatPopup not loaded'); };
window.removeFilter = typeof removeFilter !== 'undefined' ? removeFilter : function() { console.log('removeFilter not loaded'); };
window.clearAllFilters = typeof clearAllFilters !== 'undefined' ? clearAllFilters : function() { console.log('clearAllFilters not loaded'); };
window.selectOption = typeof selectOption !== 'undefined' ? selectOption : function() { console.log('selectOption not loaded'); };
window.nextQuestion = typeof nextQuestion !== 'undefined' ? nextQuestion : function() { console.log('nextQuestion not loaded'); };
window.goBackQuestion = typeof goBackQuestion !== 'undefined' ? goBackQuestion : function() { console.log('goBackQuestion not loaded'); };

// Scroll navbar hide/show functionality - With Animate.css animations
function initScrollNavbar() {
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.nav');
    let isHovering = false;
    let scrollTimeout;
    let isAnimating = false;
    
    if (!navbar) {
        console.log('ERROR: Navbar not found!');
        return;
    }
    
    // Initialize navbar state
    navbar.style.visibility = 'visible';
    navbar.classList.add('animate__animated');
    
    console.log('✅ Navbar scroll initialized with Animate.css');
    
    // Helper function to remove all animation classes
    function clearAnimationClasses() {
        navbar.classList.remove(
            'animate__backInUp', 
            'animate__backInDown',
            'animate__fadeOut',
            'animate__fadeIn'
        );
    }
    
    // Function to hide navbar with backInUp animation
    function hideNavbar() {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log('Hiding navbar with animate__backInUp');
        clearAnimationClasses();
        navbar.classList.add('animate__backInUp');
        
        // After animation completes, hide the navbar
        setTimeout(() => {
            navbar.style.transform = 'translateY(-100%)';
            isAnimating = false;
        }, 500); // Animate.css default duration
    }
    
    // Function to show navbar with backInDown animation
    function showNavbar() {
        if (isAnimating) return;
        isAnimating = true;
        
        console.log('Showing navbar with animate__backInDown');
        navbar.style.transform = 'translateY(0)';
        clearAnimationClasses();
        navbar.classList.add('animate__backInDown');
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Mouse movement detection at top of viewport
    document.addEventListener('mousemove', function(e) {
        // Show navbar when mouse moves to top 80px of viewport
        if (e.clientY <= 80 && window.scrollY > 50) {
            console.log('Mouse at top - showing navbar');
            isHovering = true;
            showNavbar();
            
            // Clear any pending hide timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Hide again after 3 seconds if not hovering over navbar
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 50 && !navbar.matches(':hover')) {
                    console.log('Timeout - hiding navbar');
                    isHovering = false;
                    hideNavbar();
                }
            }, 3000);
        }
    });
    
    // Keep navbar visible when actually hovering over it
    navbar.addEventListener('mouseenter', function() {
        isHovering = true;
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
    });
    
    navbar.addEventListener('mouseleave', function() {
        if (window.scrollY > 50) {
            scrollTimeout = setTimeout(() => {
                isHovering = false;
                hideNavbar();
            }, 1000);
        }
    });
    
    // Touch support for mobile
    document.addEventListener('touchstart', function(e) {
        if (e.touches[0] && e.touches[0].clientY <= 100 && window.scrollY > 50) {
            isHovering = true;
            showNavbar();
            
            setTimeout(() => {
                if (window.scrollY > 50) {
                    isHovering = false;
                    hideNavbar();
                }
            }, 4000);
        }
    });
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Handle navbar color change based on section
        const secondSection = document.querySelector('.about-summary-section');
        if (secondSection) {
            const secondSectionTop = secondSection.offsetTop;
            const navbarHeight = navbar.offsetHeight;
            
            if (currentScrollY + navbarHeight >= secondSectionTop) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Always show navbar at the very top
        if (currentScrollY <= 50) {
            if (navbar.style.transform === 'translateY(-100%)') {
                showNavbar();
            }
            isHovering = false;
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            lastScrollY = currentScrollY;
            return;
        }
        
        // Don't hide if user is hovering
        if (isHovering) {
            lastScrollY = currentScrollY;
            return;
        }
        
        // Hide navbar when scrolling down
        if (currentScrollY > lastScrollY + 10) { // Threshold to avoid micro-movements
            if (navbar.style.transform !== 'translateY(-100%)') {
                console.log('Scrolling down - hiding navbar');
                hideNavbar();
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Chat button scroll functionality - Show on scroll, hide at top
function initChatButtonScroll() {
    const chatButton = document.querySelector('.chat-float-btn');
    
    if (!chatButton) {
        console.log('Chat button not found');
        return;
    }
    
    function handleChatButtonScroll() {
        const scrollPosition = window.scrollY;
        const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index.html') || window.location.pathname === '';
        
        // Always show on homepage, or show after scrolling on other pages
        if (isHomePage) {
            chatButton.classList.add('visible');
        } else {
            // Show chat button once user starts scrolling (after 50px)
            // Hide when user is back at the very top
            if (scrollPosition > 50) {
                chatButton.classList.add('visible');
            } else {
                chatButton.classList.remove('visible');
            }
        }
    }
    
    // Initial check
    handleChatButtonScroll();
    
    // Force visible on homepage after a short delay
    setTimeout(() => {
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html') || window.location.pathname === '') {
            chatButton.classList.add('visible');
        }
    }, 500);
    
    // Listen for scroll events
    window.addEventListener('scroll', handleChatButtonScroll, { passive: true });
    
    console.log('✅ Chat button scroll initialized - appears on scroll, hides at top');
}

// Force FAQ initialization function
window.forceFAQInit = function() {
    console.log('Force FAQ initialization called');
    const faqGrid = document.getElementById('faq-grid');
    if (faqGrid) {
        console.log('FAQ grid found, rendering items directly');
        renderFAQItems();
        initFAQSearch();
    } else {
        console.error('FAQ grid not found');
    }
};