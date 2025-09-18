// Stats Animation Module

// Live counter function
function startLiveCounter(element, baseValue) {
    let currentValue = baseValue;
    const label = element.closest('.stat-item').querySelector('.stat-label').textContent;
    
    // Determine increment pattern based on the stat type
    let increment, interval;
    
    if (label.includes('Árboles')) {
        // Trees delivered per year - increment by 50-200 every 2 seconds
        increment = () => Math.floor(Math.random() * 150) + 50;
        interval = 2000;
    } else if (label.includes('Clientes')) {
        // Satisfied clients - increment by 1 every 5 seconds
        increment = () => 1;
        interval = 5000;
    } else {
        // Years of experience - no live counter needed
        return;
    }
    
    setInterval(() => {
        const oldValue = currentValue;
        currentValue += increment();
        
        // Animate the change with subtle effect
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            element.textContent = formatNumber(currentValue);
            element.style.transform = 'scale(1)';
        }, 150);
    }, interval);
}

// Format numbers without suffixes, just commas
function formatNumber(num) {
    return num.toLocaleString();
}

function initStatsAnimation() {
    console.log('Initializing stats animation...');
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    console.log('Found elements:', { 
        statsSection: !!statsSection, 
        statCount: statNumbers.length,
        statNumbers: Array.from(statNumbers).map(el => el.textContent)
    });
    
    if (!statsSection || !statNumbers.length) {
        console.error('Stats elements not found', { statsSection, statCount: statNumbers.length });
        return;
    }

    let hasAnimated = false;

    // Reset animation flag on page load/reload
    window.addEventListener('beforeunload', () => {
        hasAnimated = false;
    });

    // Function to animate a number
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easeOutQuart for smooth deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeProgress);
            
            element.textContent = formatNumber(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = formatNumber(target);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Simple scroll-based trigger as fallback
    function checkStatsVisibility() {
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3;
        
        if (isVisible && !hasAnimated) {
            console.log('Starting stats animation via scroll check');
            hasAnimated = true;
            startAnimation();
        }
    }

    function startAnimation() {
        // Add entrance animation
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        statsSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            statsSection.style.opacity = '1';
            statsSection.style.transform = 'translateY(0)';
        }, 100);

        // Start number animations with staggered delays
        statNumbers.forEach((element, index) => {
            const target = parseInt(element.dataset.target);
            console.log(`Animating stat ${index}: ${target}`);
            
            setTimeout(() => {
                animateNumber(element, target, 2500);
            }, index * 300); // Stagger each counter by 300ms
        });
    }

    // Use scroll listener instead of intersection observer
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Also check on load
    setTimeout(checkStatsVisibility, 100);
    
    // Allow manual reset for testing
    window.resetStatsAnimation = () => {
        hasAnimated = false;
        console.log('Stats animation reset');
    };
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStatsAnimation);
} else {
    initStatsAnimation();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initStatsAnimation };
}