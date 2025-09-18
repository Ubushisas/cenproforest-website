// Scroll effects
function initScrollEffects() {
    // Optimize intersection observer for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    const observerOptions = {
        threshold: isMobile ? 0.2 : 0.1, // Higher threshold on mobile to reduce trigger frequency
        rootMargin: isMobile ? '0px 0px -100px 0px' : '0px 0px -50px 0px' // Larger margin on mobile
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add plant growth animation to specific elements
                if (entry.target.classList.contains('catalog-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('plant-grow-in');
                }
                
                if (entry.target.classList.contains('choice-card')) {
                    entry.target.classList.add('plant-grow-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe catalog items and choice cards for plant growth
    document.querySelectorAll('.catalog-item, .choice-card').forEach(item => {
        observer.observe(item);
    });
    
    // Add scroll-based parallax for floating elements (disabled on mobile)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    if (!isMobile) {
        initScrollParallax();
    }
}

function initScrollParallax() {
    // Disable parallax on mobile devices to prevent performance issues
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (isMobile) {
        console.log('Parallax disabled on mobile device for performance');
        return;
    }
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Add some interactive features
function initParallaxEffects() {
    // Add parallax effect to hero section - completely disabled on mobile for performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    if (!isMobile) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }, 100), { passive: true }); // Further increased throttle for better mobile performance
    } else {
        console.log('All parallax effects disabled on mobile for optimal performance');
    }
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    document.querySelectorAll('button, .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Utility functions for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initScrollEffects, initScrollParallax, initParallaxEffects, throttle };
}