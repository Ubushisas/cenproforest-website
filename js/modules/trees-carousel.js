// Trees Showcase Carousel Module with Perfect Seamless Infinite Loop
function initTreesCarousel() {
    const track = document.getElementById('trees-track');
    
    if (!track) {
        console.log('Trees carousel track not found');
        return;
    }

    const cards = track.querySelectorAll('.tree-card');
    const totalCards = cards.length;
    
    // We have 3 duplicate cards at the beginning and some at the end
    // The structure is: [3 duplicates] + [50 unique cards] + [7 duplicates at end]
    const duplicatesAtStart = 3;
    const originalCards = 50; // We now have 50 unique tree species from Arbolito folder
    const duplicatesAtEnd = 7;
    
    let isAnimating = true; // Always enable natural animation
    let animationId;
    let startTime = performance.now();
    let animationSpeed = 300000; // 300 seconds (5 minutes) for full cycle (extra slow)
    
    // Drag variables
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTransform = 0;
    let currentTransform = 0;
    let animationResumeTimeout = null;
    let hasDragged = false; // Track if user actually dragged

    // Get actual card width based on screen size
    function getCardWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 480) {
            return Math.min(300, screenWidth * 0.9) + 30; // Mobile: 300px or 90vw + gap
        } else if (screenWidth <= 768) {
            return Math.min(350, screenWidth * 0.85) + 30; // Tablet: 350px or 85vw + gap
        } else {
            return 430; // Desktop: 400px + 30px gap
        }
    }
    
    let cardWidth = getCardWidth();
    let totalWidth = originalCards * cardWidth;
    let startOffset = duplicatesAtStart * cardWidth; // Offset to start at the real first card
    
    // Update dimensions on window resize
    window.addEventListener('resize', () => {
        cardWidth = getCardWidth();
        totalWidth = originalCards * cardWidth;
        startOffset = duplicatesAtStart * cardWidth;
    });

    console.log(`Trees carousel initialized with ${totalCards} total cards (${originalCards} unique, ${duplicatesAtStart} start duplicates, ${duplicatesAtEnd} end duplicates)`);
    console.log(`Card width: ${cardWidth}px, Total width: ${totalWidth}px, Start offset: ${startOffset}px`);
    console.log(`Initial transform: ${currentTransform}px, Animation enabled: ${isAnimating}`);

    // Get current transform value
    function getCurrentTransform() {
        const transform = track.style.transform;
        const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    // PERFECT INFINITE LOOP - Using the duplicate structure properly
    function setTransform(value) {
        let adjustedValue = value;
        let didWrap = false;
        
        // Structure reminder: [3 start dupes] + [82 real] + [7 end dupes] = 92 total
        // The key is: start dupes are copies of LAST cards, end dupes are copies of FIRST cards
        
        // Calculate the "safe zone" where we have real cards
        // We want to wrap when we're about to run out of real cards
        const realCardsStart = -duplicatesAtStart * cardWidth; // Where real cards begin
        const realCardsEnd = -(duplicatesAtStart + originalCards) * cardWidth; // Where real cards end
        
        console.log(`Transform: ${value.toFixed(1)}px, Real cards: ${realCardsStart}px to ${realCardsEnd}px`);
        
        // INFINITE LOOP LOGIC:
        // When dragging RIGHT (value becomes positive), we're moving toward card 0
        // When dragging LEFT (value becomes more negative), we're moving toward the last card
        
        // Add buffer zones to prevent wrapping during normal card transitions
        const wrapBuffer = cardWidth * 1.5; // Larger buffer for smoother dragging
        
        // Only wrap when significantly past boundaries (not during normal card-to-card dragging)
        if (adjustedValue > realCardsStart + wrapBuffer) {
            const offset = adjustedValue - realCardsStart;
            adjustedValue = realCardsEnd + offset;
            didWrap = true;
            console.log(`🔄 WRAP TO END: ${offset.toFixed(1)}px past start, jumping to ${adjustedValue.toFixed(1)}px`);
        }
        else if (adjustedValue < realCardsEnd - wrapBuffer) {
            const offset = adjustedValue - realCardsEnd;
            adjustedValue = realCardsStart + offset;
            didWrap = true;
            console.log(`🔄 WRAP TO START: ${Math.abs(offset).toFixed(1)}px past end, jumping to ${adjustedValue.toFixed(1)}px`);
        }
        
        // PREVENT SCROLL INTERFERENCE
        if (didWrap) {
            // Disable page scrolling temporarily
            document.body.style.overflow = 'hidden';
            document.body.style.scrollBehavior = 'auto';
            
            // Re-enable after wrap completes
            setTimeout(() => {
                document.body.style.overflow = '';
                document.body.style.scrollBehavior = '';
            }, 100);
        }
        
        // Apply transform smoothly
        track.style.willChange = 'transform';
        
        // NEVER apply transition during dragging for immediate response
        if (isDragging || didWrap) {
            track.style.transition = 'none';
        }
        
        if (window.innerWidth <= 768) {
            track.style.transform = `translate3d(${adjustedValue}px, 0, 0)`;
        } else {
            track.style.transform = `translateX(${adjustedValue}px)`;
        }
        
        // Force immediate layout update for better responsiveness
        if (didWrap || isDragging) {
            track.offsetHeight;
        }
        
        currentTransform = adjustedValue;
        
        return adjustedValue;
    }

    // Continuous smooth scrolling animation with perfect infinite loop
    function startAnimation() {
        if (!isAnimating) return;
        
        function animate(currentTime) {
            if (!isAnimating || isDragging) return;
            
            // Calculate how much to move per frame (very slow constant speed)
            const pixelsPerSecond = totalWidth / (animationSpeed / 1000); // pixels per second
            const deltaTime = currentTime - (animate.lastTime || currentTime);
            animate.lastTime = currentTime;
            
            // Move by tiny amounts each frame for ultra-smooth movement
            const movement = (pixelsPerSecond * deltaTime) / 1000;
            currentTransform -= movement;
            
            // Apply seamless transform
            track.style.transition = 'none';
            setTransform(currentTransform);
            
            animationId = requestAnimationFrame(animate);
        }
        
        animationId = requestAnimationFrame(animate);
    }

    // Resume animation from current position maintaining speed
    function resumeAnimation() {
        if (!isAnimating) return;
        
        // Reset animation timing to start fresh from current position
        startTime = performance.now();
        
        // Continue animation from wherever we are
        startAnimation();
    }

    // Drag event handlers
    function handleMouseDown(e) {
        isDragging = true;
        hasDragged = false; // Reset drag tracking
        startX = e.clientX;
        
        // Get the CURRENT visual position (exactly where the carousel is right now)
        initialTransform = currentTransform;
        
        // Stop animation during drag
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // Cancel any pending animation resume
        if (animationResumeTimeout) {
            clearTimeout(animationResumeTimeout);
            animationResumeTimeout = null;
        }
        
        // Prevent any scroll interference during drag
        document.body.style.scrollBehavior = 'auto';
        
        track.style.cursor = 'grabbing';
        track.style.userSelect = 'none';
        e.preventDefault();
        e.stopPropagation();
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        e.stopPropagation();
        currentX = e.clientX;
        const deltaX = currentX - startX;
        
        // Mark as dragged if movement is significant (more than 10px for less sensitivity)
        if (Math.abs(deltaX) > 10) {
            hasDragged = true;
        }
        
        const newTransform = initialTransform + deltaX;
        
        // Apply smooth infinite scroll transform
        track.style.transition = 'none';
        setTransform(newTransform);
    }

    function handleMouseUp(e) {
        if (!isDragging) return;
        
        // Check if this was a click (no significant drag) and handle navigation
        if (!hasDragged) {
            const card = e.target.closest('.tree-card');
            if (card) {
                const plantId = getTreeTechnicalSheetId(card);
                if (plantId) {
                    console.log(`Tree card clicked: Plant ID ${plantId}, navigating to technical sheet...`);
                    window.location.href = `./Fichas Técnicas/plant-${plantId}.html`;
                } else {
                    console.log('Tree card clicked but no mapping found, going to general catalog...');
                    window.location.href = './catalogo.html';
                }
                return; // Exit early to prevent other actions
            }
        }
        
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.userSelect = '';
        
        // Re-enable smooth scrolling after drag ends
        setTimeout(() => {
            document.body.style.scrollBehavior = '';
        }, 100);
        
        // Resume natural animation immediately from current position
        resumeAnimation();
    }

    // Touch events
    function handleTouchStart(e) {
        const touch = e.touches[0];
        isDragging = true;
        hasDragged = false; // Reset drag tracking
        startX = touch.clientX;
        
        // Get the CURRENT visual position (exactly where the carousel is right now)
        initialTransform = currentTransform;
        
        // Stop animation during drag
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // Cancel any pending animation resume
        if (animationResumeTimeout) {
            clearTimeout(animationResumeTimeout);
            animationResumeTimeout = null;
        }
        
        // Prevent any scroll interference during touch drag
        document.body.style.scrollBehavior = 'auto';
        
        e.preventDefault();
        e.stopPropagation();
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        currentX = touch.clientX;
        const deltaX = currentX - startX;
        
        // Mark as dragged if movement is significant (more than 10px for less sensitivity)
        if (Math.abs(deltaX) > 10) {
            hasDragged = true;
        }
        
        const newTransform = initialTransform + deltaX;
        
        // Apply transform immediately without throttling for responsive dragging
        track.style.transition = 'none';
        setTransform(newTransform);
        
        e.preventDefault();
        e.stopPropagation();
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        // Check if this was a tap (no significant drag) and handle navigation
        if (!hasDragged) {
            const card = e.target.closest('.tree-card');
            if (card) {
                const plantId = getTreeTechnicalSheetId(card);
                if (plantId) {
                    console.log(`Tree card tapped: Plant ID ${plantId}, navigating to technical sheet...`);
                    window.location.href = `./Fichas Técnicas/plant-${plantId}.html`;
                } else {
                    console.log('Tree card tapped but no mapping found, going to general catalog...');
                    window.location.href = './catalogo.html';
                }
                return; // Exit early to prevent other actions
            }
        }
        
        isDragging = false;
        
        // Re-enable smooth scrolling after touch drag ends
        setTimeout(() => {
            document.body.style.scrollBehavior = '';
        }, 100);
        
        // Resume natural animation immediately from current position  
        resumeAnimation();
        
        e.preventDefault();
        e.stopPropagation();
    }

    // Mapping between carousel card classes and their technical sheet IDs
    function getTreeTechnicalSheetId(cardElement) {
        const classList = cardElement.classList;
        
        // Map carousel card CSS classes directly to their technical sheet IDs
                const treeMapping = {
            'acacia-amarilla-bg': 2,
            'acacia-japonesa-bg': 3,
            'acacia-mangium-bg': 4,
            'acacia-roja-bg': 6,
            'achiote-onoto-bg': 7,
            'arrayan-comun-o-castilla-bg': 10,
            'bucaro-cachimbo-bg': 12,
            'cajeto-garagay-bg': 13,
            'cambulo-bg': 14,
            'cayeno-bg': 18,
            'cedro-de-altura-bg': 19,
            'cerezo-capuli-bg': 22,
            'chicala-fresno-bg': 23,
            'cipres-bg': 24,
            'ciro-bg': 25,
            'clavellino-bg': 26,
            'coral-coralitos-bg': 27,
            'corono-bg': 28,
            'croton-ornamental-bg': 29,
            'duraznillo-bg': 32,
            'eucalyptus-globulus-bg': 33,
            'eugenia-arrayan-extranjero-bg': 36,
            'falso-pimiento-bg': 37,
            'garrocho-chuque-bg': 38,
            'guacimo-bg': 39,
            'guayacan-amarillo-bg': 41,
            'guayacan-de-manizales-bg': 42,
            'hayuelo-chanamo-bg': 43,
            'holly-liso-holly-rojo-bg': 45,
            'igua-nauno-bg': 46,
            'jazmin-del-cabo-laurel-huesito-bg': 47,
            'laurel-del-cera-bg': 48,
            'leucaena-acacia-forrajera-bg': 49,
            'lluvia-de-oro-bg': 51,
            'mano-de-oso-pata-de-gallina-bg': 52,
            'mataraton-bg': 53,
            'melina-bg': 54,
            'mortino-bg': 55,
            'nacedero-madre-de-agua-bg': 56,
            'nogal-cafetero-canalete-pardillo-bg': 57,
            'ocobo-flor-morado-roble-bg': 58,
            'ocobo-rosa-bg': 58,
            'palma-mariposa-bg': 64,
            'payande-chiminango-bg': 65,
            'pomarroso-brasilero-bg': 67,
            'teca-bg': 73,
            'urapan-bg': 75,
            'yopo-cafe-bg': 77
        };
        
        // Find matching class and return technical sheet ID
        for (const className of classList) {
            if (treeMapping[className]) {
                return treeMapping[className];
            }
        }
        
        return null;
    }

    // Click handler for tree cards to navigate to specific technical sheet
    function handleCardClick(e) {
        // Only navigate if we weren't dragging (to distinguish click from drag)
        if (!hasDragged) {
            const card = e.target.closest('.tree-card');
            if (card) {
                const plantId = getTreeTechnicalSheetId(card);
                if (plantId) {
                    console.log(`Tree card clicked: Plant ID ${plantId}, navigating to technical sheet...`);
                    window.location.href = `./Fichas Técnicas/plant-${plantId}.html`;
                } else {
                    console.log('Tree card clicked but no mapping found, going to general catalog...');
                    window.location.href = './catalogo.html';
                }
            }
        } else {
            console.log('Card click ignored - user was dragging');
        }
    }

    // Event listeners
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Add click listener for navigation to catalog
    track.addEventListener('click', handleCardClick);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isAnimating = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        } else {
            isAnimating = true;
            if (!isDragging) {
                resumeAnimation();
            }
        }
    });

    // Initialize - start positioned to show the real first card (Acacia Amarilla)
    track.style.animation = 'none';
    track.style.cursor = 'grab';
    
    // Start at the first REAL card position (skip the 3 duplicate cards at start)
    // Since we have 3 duplicates at start, we need to position past them
    currentTransform = -startOffset; // This positions us at the first real card (Acacia Amarilla)
    
    console.log(`Initializing carousel at position: ${currentTransform}px (skipping ${duplicatesAtStart} duplicate cards)`);
    
    // Apply initial transform
    track.style.willChange = 'transform';
    track.style.transition = 'none';
    
    if (window.innerWidth <= 768) {
        track.style.transform = `translate3d(${currentTransform}px, 0, 0)`;
    } else {
        track.style.transform = `translateX(${currentTransform}px)`;
    }
    
    // Force layout to ensure cards are rendered properly
    track.offsetWidth;
    
    // Start the continuous animation
    startAnimation();
    
    console.log('Trees carousel initialized with perfect seamless infinite scroll');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTreesCarousel);
} else {
    initTreesCarousel();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTreesCarousel };
}