
/* CONSERVATIVE PERFORMANCE OPTIMIZATIONS:
 * - Increased items per load from 6 to 12
 * - Reduced infinite scroll delay from 800ms to 200ms
 * - Improved scroll trigger point
 * - Reduced animation delays to 100ms
 * - Preserved all navigation functionality
 */
// Global variables
let currentFilters = {
    category: 'all',
    use: null,
    altitude: null,
    native: null
};
let searchQuery = '';
let displayedItems = 12;
const itemsPerLoad = 12;

// State persistence for better UX
const CATALOG_STATE_KEY = 'cenproforest_catalog_state';

function saveCatalogState() {
    // Get the current catalog grid element
    const catalogGrid = document.getElementById('catalog-grid');
    const firstVisibleCard = catalogGrid ? catalogGrid.querySelector('.catalog-item') : null;

    const state = {
        displayedItems: displayedItems,
        scrollPosition: window.scrollY,
        filters: currentFilters,
        searchQuery: searchQuery,
        timestamp: Date.now(),
        // Save viewport information for better restoration
        viewportHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        firstVisibleCardIndex: firstVisibleCard ? Array.from(catalogGrid.children).indexOf(firstVisibleCard) : 0
    };
    localStorage.setItem(CATALOG_STATE_KEY, JSON.stringify(state));
    console.log('Catalog state saved:', state);
}

function loadCatalogState() {
    try {
        const savedState = localStorage.getItem(CATALOG_STATE_KEY);
        if (savedState) {
            const state = JSON.parse(savedState);
            // Only restore state if it's less than 30 minutes old
            if (Date.now() - state.timestamp < 30 * 60 * 1000) {
                console.log('Loading catalog state:', state);
                return state;
            } else {
                console.log('Catalog state expired, clearing');
                clearCatalogState();
            }
        }
    } catch (e) {
        console.log('Could not load catalog state:', e);
        clearCatalogState();
    }
    return null;
}

function clearCatalogState() {
    localStorage.removeItem(CATALOG_STATE_KEY);
}

// Plant ID to Technical Sheet mapping
// This mapping ensures each catalog plant links to the correct technical sheet
// Updated for alphabetically sorted catalog data
const plantTechnicalSheetMapping = {
  1: 'plant-1',     // Abarco
  2: 'plant-2',     // Acacia Amarilla
  3: 'plant-3',     // Acacia Japonesa
  4: 'plant-4',     // Acacia Mangium
  5: 'plant-5',     // Acacia Negra
  6: 'plant-6',     // Acacia Roja
  7: 'plant-7',     // Achiote, Onoto
  8: 'plant-8',     // Aliso
  9: 'plant-9',     // Almendro
  10: 'plant-10',     // Arrayán Común
  11: 'plant-11',     // Balso
  12: 'plant-12',     // Búcaro
  13: 'plant-13',     // Cajeto
  14: 'plant-14',     // Cámbulo
  15: 'plant-15',     // Caoba
  16: 'plant-16',     // Caracolí
  17: 'plant-17',     // Casco De Vaca
  18: 'plant-18',     // Cayeno
  19: 'plant-19',     // Cedro de Altura
  20: 'plant-20',     // Cedro Rosado
  21: 'plant-21',     // Ceiba
  22: 'plant-22',     // Cerezo
  23: 'plant-23',     // Chicalá
  24: 'plant-24',     // Ciprés
  25: 'plant-25',     // Ciro
  26: 'plant-26',     // Clavellino
  27: 'plant-27',     // Coral, Coralitos
  28: 'plant-28',     // Corono
  29: 'plant-29',     // Croton Ornamental
  30: 'plant-30',     // Cucharo
  31: 'plant-31',     // Dinde Mora
  32: 'plant-32',     // Duraznillo
  33: 'plant-33',     // Eucalyptus Globulus
  34: 'plant-34',     // Eucalyptus Grandis
  35: 'plant-35',     // Eucalyptus Pellita
  36: 'plant-36',     // Eugenia-Arrayán extranjero
  37: 'plant-37',     // Falso Pimiento
  38: 'plant-38',     // Garrocho-Chuque
  39: 'plant-39',     // Guácimo
  40: 'plant-40',     // Gualanday
  41: 'plant-41',     // Guayacán Amarillo
  42: 'plant-42',     // Guayacán de Manizales
  43: 'plant-43',     // Hayuelo
  44: 'plant-44',     // Holly Espinoso
  45: 'plant-45',     // Holly Liso
  46: 'plant-46',     // Iguá, Nauno
  47: 'plant-47',     // Jazmín del cabo, Laurel Huesito
  48: 'plant-48',     // Laurel del Cera
  49: 'plant-49',     // Leucaena
  50: 'plant-50',     // Limón Ornamental
  51: 'plant-51',     // Lluvia de Oro
  52: 'plant-52',     // Mano de Oso, Pata de Gallina
  53: 'plant-53',     // Mataratón
  54: 'plant-54',     // Melina
  55: 'plant-55',     // Mortiño
  56: 'plant-56',     // Nacedero
  57: 'plant-57',     // Nogal Cafetero, Canalete, Pardillo
  58: 'plant-58',     // Ocobo
  59: 'plant-59',     // Oiti
  60: 'plant-60',     // Orejero
  61: 'plant-61',     // Palma Abanico
  62: 'plant-62',     // Palma Areca
  63: 'plant-63',     // Palma Botella, Palma Real
  64: 'plant-64',     // Palma Mariposa
  65: 'plant-65',     // Payande
  66: 'plant-66',     // Pino Pátula
  67: 'plant-67',     // Pomarroso Brasilero
  68: 'plant-68',     // Roble
  69: 'plant-69',     // Saman
  70: 'plant-70',     // Sauce llorón
  71: 'plant-71',     // Sauco
  72: 'plant-72',     // Suribio
  73: 'plant-73',     // Teca
  74: 'plant-74',     // Tulipán Africano
  75: 'plant-75',     // Urapan
  76: 'plant-76',     // Vainillo
  77: 'plant-77',     // Yopo Café
  78: 'plant-78',     // Yopo Negro
};

// Function to get technical sheet for plant ID
function getTechnicalSheetUrl(plantId) {
  // Return without .html extension for Jekyll pretty URLs
  const baseUrl = plantTechnicalSheetMapping[plantId] || `plant-${plantId}`;
  return baseUrl.replace('.html', '');
}

// Catalog functionality
function initCatalog() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) {
        console.log('Catalog grid not found, skipping catalog initialization');
        return;
    }

    // Try to restore previous catalog state
    const savedState = loadCatalogState();
    if (savedState) {
        console.log('Restoring catalog state:', savedState);

        // Show loading indicator for large state restoration
        if (savedState.displayedItems > 12) {
            showCatalogLoadingIndicator();
        }

        displayedItems = savedState.displayedItems;
        currentFilters = savedState.filters;
        searchQuery = savedState.searchQuery;

        // Restore search input if exists
        const searchInput = document.getElementById('catalog-search');
        if (searchInput && searchQuery) {
            searchInput.value = searchQuery;
        }
    }

    // Enhanced restoration logic
    if (savedState) {
        // Always render all saved items first
        renderCatalogItems();
        initFilterButtons();
        initInfiniteScroll();
        updateActiveFiltersDisplay();

        // Hide loading indicator if it was shown
        if (savedState.displayedItems > 12) {
            hideCatalogLoadingIndicator();
        }

        // Enhanced scroll restoration - try to position on the clicked card
        if (savedState.scrollPosition || savedState.clickedPlantId) {
            const restorePosition = () => {
                let targetScrollPosition = savedState.scrollPosition || 0;

                // If we have info about the clicked card, try to find it and scroll to it
                if (savedState.clickedPlantId || savedState.clickedPlantName) {
                    const catalogGrid = document.getElementById('catalog-grid');
                    if (catalogGrid) {
                        const cards = catalogGrid.querySelectorAll('.catalog-item');
                        for (let card of cards) {
                            const titleElement = card.querySelector('.catalog-item-title');
                            if (titleElement) {
                                const cardName = titleElement.textContent.trim();
                                if (cardName === savedState.clickedPlantName) {
                                    const cardRect = card.getBoundingClientRect();
                                    // Position the card near the top of viewport for easy visibility
                                    targetScrollPosition = window.scrollY + cardRect.top - 100;
                                    console.log('Found clicked card:', cardName, 'scrolling to:', targetScrollPosition);
                                    break;
                                }
                            }
                        }
                    }
                }

                // Scroll to the calculated position
                window.scrollTo({
                    top: Math.max(0, targetScrollPosition),
                    behavior: 'auto'
                });
                console.log('Restored scroll to position:', targetScrollPosition);
            };

            // Multiple restoration attempts for better reliability
            setTimeout(restorePosition, 100);
            setTimeout(restorePosition, 300);
            setTimeout(restorePosition, 600);

            // Final attempt after images load
            setTimeout(restorePosition, 1000);
        }
    } else {
        // Normal initialization for small loads
        renderCatalogItems();
        initFilterButtons();
        initInfiniteScroll();
        updateActiveFiltersDisplay();

        // Restore scroll position after items are loaded
        if (savedState && savedState.scrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, savedState.scrollPosition);
                console.log('Restored scroll position:', savedState.scrollPosition);
            }, 300);
        }
    }

    // Check if we need to scroll to a specific tree (from carousel click)
    scrollToTreeFromHash();
}

// Function to scroll to a specific tree when coming from carousel
function scrollToTreeFromHash() {
    const hash = window.location.hash;
    if (hash) {
        // Remove the # and decode the tree name
        const treeId = decodeURIComponent(hash.substring(1));
        console.log('Looking for tree with ID:', treeId);
        
        // First, load ALL catalog items to ensure target is in DOM
        const filteredItems = getFilteredItems();
        displayedItems = filteredItems.length; // Show all items
        renderCatalogItems(); // Re-render with all items
        
        // Wait for the catalog items to render, then scroll
        setTimeout(() => {
            const targetElement = document.getElementById(treeId);
            if (targetElement) {
                console.log('Found tree element, scrolling to:', targetElement);
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add a highlight effect to the target card
                targetElement.style.boxShadow = '0 0 20px rgba(107, 168, 50, 0.6)';
                targetElement.style.border = '2px solid var(--accent-green)';
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                    targetElement.style.border = '';
                }, 3000);
            } else {
                console.log('Tree element not found with ID:', treeId);
            }
        }, 500); // Wait for items to load
    }
}

function renderCatalogItems() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) {
        console.log('Catalog grid not found, skipping render');
        return;
    }
    
    const filteredItems = getFilteredItems();
    const itemsToShow = filteredItems.slice(0, displayedItems);
    
    // Only clear if we're starting fresh (filters changed) or first load
    const existingItems = catalogGrid.children.length;
    const needsRefresh = existingItems === 0 || currentFilters.changed;
    
    // Show loading indicator at the start if there are more items to load
    const loadingIndicator = document.getElementById('catalog-loading');
    if (loadingIndicator && filteredItems.length > displayedItems) {
        loadingIndicator.classList.remove('hidden');
    }
    
    if (needsRefresh) {
        // Keep loading indicator visible during transition
        if (loadingIndicator) {
            loadingIndicator.classList.remove('hidden');
        }
        
        // Smooth transition: fade out existing items first
        const existingCards = Array.from(catalogGrid.children);
        existingCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
            }, index * 50);
        });
        
        // Wait for fade out, then replace content
        setTimeout(() => {
            catalogGrid.innerHTML = '';
            addNewItems();
        }, Math.max(300, existingCards.length * 50));
    } else {
        // Just add new items (infinite scroll)
        addNewItems();
    }
    
    function addNewItems() {
        const startIndex = needsRefresh ? 0 : existingItems;
        const newItems = itemsToShow.slice(startIndex);
        
        newItems.forEach((item, index) => {
            const catalogItem = createCatalogItem(item);
            catalogGrid.appendChild(catalogItem);
            
            // Add staggered animation for new items
            setTimeout(() => {
                catalogItem.style.opacity = '1';
                catalogItem.style.transform = 'translateY(0)';
                
                // Hide loading indicator only after the last new item is visible
                if (index === newItems.length - 1) {
                    setTimeout(() => {
                        if (loadingIndicator) {
                            if (filteredItems.length <= displayedItems) {
                                loadingIndicator.classList.add('hidden');
                            }
                        }
                    }, 100); // Small delay to ensure card is fully visible
                }
            }, (startIndex + index) * 100);
        });
    }
    
    // Reset the changed flag
    currentFilters.changed = false;
}

function createCatalogItem(item) {
    const catalogItem = document.createElement('div');
    // Use tree card design instead of catalog-item
    catalogItem.className = 'tree-card catalog-tree-card';
    catalogItem.style.opacity = '0';
    catalogItem.style.transform = 'translateY(30px)';
    catalogItem.style.transition = 'all 0.6s ease';
    catalogItem.style.position = 'relative'; // Ensure relative positioning for overlay
    
    // Add anchor ID for direct navigation from carousel
    const anchorId = item.name.replace(/\s+/g, '-').toLowerCase();
    catalogItem.id = anchorId;
    
    // Generate background class based on plant name
    const bgClass = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') + '-bg';
    catalogItem.classList.add(bgClass);
    
    // Create technical sheet link using proper mapping
    const technicalSheetUrl = `fichas-tecnicas/${getTechnicalSheetUrl(item.id)}`;
    
    // Add background image if available
    const imagePath = getPlantImage(item.name, item.scientific_name);
    if (imagePath) {
        catalogItem.style.backgroundImage = `url('${imagePath}')`;
        catalogItem.style.backgroundSize = 'cover';
        catalogItem.style.backgroundPosition = 'center';
        catalogItem.style.backgroundRepeat = 'no-repeat';
    }
    
    // Clean altitude format (remove m.s.n.m and add just m)
    const cleanAltitude = item.altitude ? item.altitude.replace(/\s*m\.s\.n\.m/g, ' m') : 'N/A';
    
    catalogItem.innerHTML = `
        <div class="tree-card-overlay"></div>
        <div class="tree-card-content">
            <div class="tree-card-header">
                <div class="tree-metric-section">
                    <div class="tree-metric-value">${cleanAltitude}</div>
                    <div class="tree-metric-unit">msnm</div>
                </div>
                <div class="tree-header-divider"></div>
                <div class="tree-title-section">
                    <div class="tree-name">${item.name}</div>
                    <div class="tree-scientific-name">${item.scientific_name || ''}</div>
                </div>
            </div>
            <div class="tree-divider"></div>
        </div>
        <div class="tree-bottom-info">
            <div class="tree-cta-button">
                <button class="ver-ficha-btn">Ver Ficha Técnica</button>
            </div>
        </div>
    `;
    
    // Add invisible overlay link after creating the content
    const overlayLink = document.createElement('a');
    overlayLink.href = technicalSheetUrl;
    overlayLink.className = 'catalog-card-overlay-link';
    overlayLink.title = `Ver ficha técnica de ${item.name}`;
    overlayLink.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        text-decoration: none;
        display: block;
        cursor: pointer;
    `;

    // Save catalog state when user clicks on a plant card
    overlayLink.addEventListener('click', function(e) {
        // Save the specific card information for better restoration
        const clickedCardElement = e.target.closest('.catalog-item');
        const clickedCardRect = clickedCardElement ? clickedCardElement.getBoundingClientRect() : null;

        // Save enhanced state with clicked card info
        const enhancedState = {
            displayedItems: displayedItems,
            scrollPosition: window.scrollY,
            filters: currentFilters,
            searchQuery: searchQuery,
            timestamp: Date.now(),
            viewportHeight: window.innerHeight,
            documentHeight: document.documentElement.scrollHeight,
            clickedPlantId: plant.id,
            clickedPlantName: plant.name,
            clickedCardRect: clickedCardRect ? {
                top: clickedCardRect.top + window.scrollY,
                left: clickedCardRect.left,
                bottom: clickedCardRect.bottom + window.scrollY
            } : null
        };

        localStorage.setItem(CATALOG_STATE_KEY, JSON.stringify(enhancedState));
        console.log('Enhanced catalog state saved before navigating to:', technicalSheetUrl, enhancedState);
    });
    catalogItem.appendChild(overlayLink);
    
    return catalogItem;
}

function getCategoryName(category) {
    const categories = {
        'forestales': 'Forestales',
        'ornamentales': 'Ornamentales',
        'frutales': 'Frutales',
        'forrajeras': 'Pastales'
    };
    return categories[category] || category;
}

function getFilteredItems() {
    if (typeof catalogData === 'undefined') {
        console.error('catalogData is not defined');
        return [];
    }
    
    let filtered = catalogData;
    
    // Apply search filter first
    if (searchQuery && searchQuery.length >= 2) {
        filtered = searchItems(filtered, searchQuery);
    }
    
    // Then apply other filters
    filtered = filtered.filter(item => {
        // Category filter
        if (currentFilters.category !== 'all' && item.category !== currentFilters.category) {
            return false;
        }
        
        // Use filter
        if (currentFilters.use) {
            const itemUses = item.uses.map(use => use.toLowerCase());
            let hasMatchingUse = false;
            
            // Map filter values to actual uses
            switch (currentFilters.use) {
                case 'ornamental':
                    hasMatchingUse = itemUses.includes('ornamental');
                    break;
                case 'reforestacion':
                    hasMatchingUse = itemUses.includes('reforestación ambiental');
                    break;
                case 'cercas':
                    hasMatchingUse = itemUses.includes('cercas vivas');
                    break;
                case 'maderable':
                    hasMatchingUse = itemUses.includes('maderable');
                    break;
                case 'sombra':
                    hasMatchingUse = itemUses.includes('sombrío');
                    break;
                case 'RA':
                    hasMatchingUse = itemUses.includes('reforestación ambiental');
                    break;
                case 'SA':
                    hasMatchingUse = itemUses.includes('sistemas agroforestales');
                    break;
            }
            
            if (!hasMatchingUse) {
                return false;
            }
        }
        
        // Altitude filter
        if (currentFilters.altitude) {
            const altitude = item.altitude.toLowerCase();
            let matchesAltitude = false;
            
            // Extract altitude numbers from the string (handle formats like "0-1.000", "1.800-2.800")
            const altitudeNumbers = altitude.match(/(\d+(?:\.\d+)?)/g);
            if (altitudeNumbers) {
                // Convert strings like "1.000" to numbers like 1000
                const numbers = altitudeNumbers.map(num => parseInt(num.replace('.', '')));
                const minAlt = Math.min(...numbers);
                const maxAlt = Math.max(...numbers);
                
                switch (currentFilters.altitude) {
                    case 'caliente':
                        // Tierra Caliente: 0-800m (plant range overlaps with 0-800)
                        matchesAltitude = (minAlt <= 800);
                        break;
                    case 'templada':
                        // Tierra Templada: 800-1800m (plant range overlaps with 800-1800)
                        matchesAltitude = (maxAlt >= 800 && minAlt <= 1800);
                        break;
                    case 'fria':
                        // Tierra Fría: 1800m+ (plant can grow at 1800m or higher)
                        matchesAltitude = (maxAlt >= 1800);
                        break;
                }
            }
            
            if (!matchesAltitude) {
                return false;
            }
        }

        // Native filter
        if (currentFilters.native) {
            let matchesNative = false;

            switch (currentFilters.native) {
                case 'nativas':
                    matchesNative = item.native_status === 'NATIVO';
                    break;
                case 'introducidas':
                    matchesNative = item.native_status === 'INTRODUCIDA';
                    break;
                case 'todas':
                    matchesNative = true; // Show all
                    break;
            }

            if (!matchesNative) {
                return false;
            }
        }

        return true;
    });
    
    return filtered;
}

function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) {
        console.log('Filter buttons not found, skipping filter initialization');
        return;
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            const filterValue = this.dataset.value;
            
            // Handle "Todas" button - reset everything
            if (filterValue === 'all') {
                currentFilters = {
                    category: 'all',
                    use: null,
                    altitude: null,
                    changed: true // Mark for smooth transition and refresh
                };
                // Clear search query too
                searchQuery = '';
                const searchInput = document.getElementById('catalog-search-input');
                if (searchInput) searchInput.value = '';
                
                // Clear search results display
                const resultsCount = document.getElementById('search-results-count');
                if (resultsCount) resultsCount.style.display = 'none';
                
                // Remove active from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            } else {
                // Handle individual filter buttons
                // Remove active from other buttons in the same filter type
                const sameTypeButtons = document.querySelectorAll(`[data-filter="${filterType}"]`);
                sameTypeButtons.forEach(b => b.classList.remove('active'));
                
                // Set new filter value and activate button
                currentFilters[filterType] = filterValue;
                currentFilters.changed = true; // Mark for smooth transition
                this.classList.add('active');
            }
            
            // Reset display count
            displayedItems = itemsPerLoad;
            
            // Re-render items with animation
            const catalogGrid = document.getElementById('catalog-grid');
            if (catalogGrid) {
                catalogGrid.style.opacity = '0';
                setTimeout(() => {
                    renderCatalogItems();
                    catalogGrid.style.opacity = '1';
                    updateActiveFiltersDisplay();
                }, 100);
            }
        });
    });
}

function updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.getElementById('active-filters');
    if (!activeFiltersContainer) return;
    
    const activeFilters = [];
    
    if (currentFilters.category !== 'all') {
        const categoryNames = {
            'forestales': '🌲 Forestales',
            'forrajeras': '🌾 Forrajeras', 
            'ornamentales': '🌺 Ornamentales',
            'frutales': '🍎 Frutales'
        };
        activeFilters.push({
            type: 'category',
            value: currentFilters.category,
            displayName: categoryNames[currentFilters.category] || currentFilters.category
        });
    }
    
    if (currentFilters.use) {
        const useNames = {
            'ornamental': '🌳 Ornamental',
            'reforestacion': '🌲 Reforestación',
            'cercas': '🌿 Cercas Vivas',
            'maderable': '🪵 Maderable',
            'sombra': '🌴 Sombra',
            'RA': '🌱 Reforestación',
            'SA': '🌿 Sistemas Agroforestales'
        };
        activeFilters.push({
            type: 'use',
            value: currentFilters.use,
            displayName: useNames[currentFilters.use] || currentFilters.use
        });
    }
    
    if (currentFilters.altitude) {
        const altitudeNames = {
            'caliente': '🏖️ Clima Cálido < 800 msnm',
            'templada': '🌄 Clima Templado 800 – 1.800 msnm', 
            'fria': '⛰️ Clima Frío > 1.800 msnm'
        };
        activeFilters.push({
            type: 'altitude',
            value: currentFilters.altitude,
            displayName: altitudeNames[currentFilters.altitude] || currentFilters.altitude
        });
    }
    
    if (activeFilters.length > 0) {
        activeFiltersContainer.innerHTML = `
            <div class="active-filters-header">
                <h5>Filtros activos:</h5>
                <button class="clear-filters-btn" onclick="clearAllFilters()">Limpiar todo</button>
            </div>
            <div class="active-filters-list">
                ${activeFilters.map(filter => 
                    `<span class="active-filter-tag" data-filter-type="${filter.type}" data-filter-value="${filter.value}" onclick="removeFilter('${filter.type}', '${filter.value}')">${filter.displayName} <span style="margin-left: 0.2rem; font-weight: bold;">✕</span></span>`
                ).join('')}
            </div>
        `;
        activeFiltersContainer.style.display = 'block';
    } else {
        activeFiltersContainer.style.display = 'none';
    }
}

function removeFilter(filterType, filterValue) {
    // Remove the specific filter
    if (filterType === 'category') {
        currentFilters.category = 'all';
    } else {
        currentFilters[filterType] = null;
    }
    currentFilters.changed = true; // Mark for smooth transition
    
    // Remove active class from the corresponding button
    const filterButton = document.querySelector(`[data-filter="${filterType}"][data-value="${filterValue}"]`);
    if (filterButton) {
        filterButton.classList.remove('active');
    }
    
    // If category was removed, activate "Todas" button
    if (filterType === 'category') {
        const allButton = document.querySelector('[data-value="all"]');
        if (allButton) {
            allButton.classList.add('active');
        }
    }
    
    // Reset display count and re-render
    displayedItems = itemsPerLoad;
    renderCatalogItems();
    updateActiveFiltersDisplay();
}

function clearAllFilters() {
    currentFilters = {
        category: 'all',
        use: null,
        altitude: null,
        changed: true // Mark for smooth transition and refresh
    };
    clearCatalogState(); // Clear saved state when filters are reset
    
    // Clear search query too
    searchQuery = '';
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) searchInput.value = '';
    
    // Clear search results display
    const resultsCount = document.getElementById('search-results-count');
    if (resultsCount) resultsCount.style.display = 'none';
    
    // Remove active class from all filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Set "Todas" button as active
    const allButton = document.querySelector('[data-value="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    displayedItems = itemsPerLoad;
    renderCatalogItems();
    updateActiveFiltersDisplay();
}

function initInfiniteScroll() {
    let isLoading = false;

    function checkScrollAndLoad() {
        if (isLoading) return;

        // Save scroll position periodically
        saveCatalogState();
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        // Trigger load when user is 300px from bottom
        if (scrollTop + clientHeight >= scrollHeight - 500) {
            const filteredItems = getFilteredItems();
            
            // Only load more if there are more items to show
            if (displayedItems < filteredItems.length) {
                isLoading = true;
                
                // Show loading indicator and keep it visible
                const loadingIndicator = document.getElementById('catalog-loading');
                if (loadingIndicator) {
                    loadingIndicator.classList.remove('hidden');
                }
                
                // Simulate network delay for better UX
                setTimeout(() => {
                    const previousItemsCount = displayedItems;
                    displayedItems += itemsPerLoad;
                    
                    // Mark that we're adding items via infinite scroll (not filter change)
                    currentFilters.changed = false;
                    
                    renderCatalogItems();
                    saveCatalogState(); // Save state after loading more items
                    isLoading = false;
                }, 100);
            }
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScrollAndLoad);
    
    // Also check on resize
    window.addEventListener('resize', checkScrollAndLoad);
}

// WhatsApp consultation function
function consultWhatsApp(plantName, scientificName) {
    const phoneNumber = '573212402088'; // Cenproforest WhatsApp number
    const scientificText = scientificName ? ` (${scientificName})` : '';
    const message = `Hola! Me interesa obtener información sobre la planta ${plantName}${scientificText}. ¿Podrían proporcionarme detalles sobre disponibilidad, precios y condiciones de cultivo?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Search functionality
function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents/tildes
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters except spaces
        .trim();
}

function fuzzyMatch(searchTerm, targetText, threshold = 0.6) {
    if (!searchTerm || !targetText) return false;
    
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedTarget = normalizeText(targetText);
    
    // Exact match gets highest priority
    if (normalizedTarget.includes(normalizedSearch)) {
        return true;
    }
    
    // Split search into words for partial matching
    const searchWords = normalizedSearch.split(' ').filter(word => word.length > 0);
    const targetWords = normalizedTarget.split(' ');
    
    // Check if all search words have partial matches in target
    const matchedWords = searchWords.filter(searchWord => {
        return targetWords.some(targetWord => {
            // Allow partial word matches (for typos)
            if (targetWord.includes(searchWord) || searchWord.includes(targetWord)) {
                return true;
            }
            
            // Simple Levenshtein-like similarity for typos
            const similarity = calculateSimilarity(searchWord, targetWord);
            return similarity >= threshold;
        });
    });
    
    // Return true if most words match
    return matchedWords.length >= Math.max(1, Math.ceil(searchWords.length * 0.7));
}

function calculateSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    if (str1 === str2) return 1;
    
    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);
    
    if (maxLen === 0) return 1;
    
    // Simple character overlap similarity
    let matches = 0;
    const str1Chars = str1.split('');
    const str2Chars = str2.split('');
    
    str1Chars.forEach(char => {
        const index = str2Chars.indexOf(char);
        if (index !== -1) {
            matches++;
            str2Chars.splice(index, 1); // Remove matched character
        }
    });
    
    return matches / maxLen;
}

function searchItems(items, query) {
    if (!query || query.trim().length < 2) {
        return items;
    }
    
    const normalizedQuery = normalizeText(query);
    
    return items.filter(item => {
        // Search in name with better normalization
        const normalizedName = normalizeText(item.name);
        if (normalizedName.includes(normalizedQuery) || normalizedQuery.includes(normalizedName)) {
            return true;
        }
        
        // Search in scientific name
        if (item.scientific_name) {
            const normalizedScientific = normalizeText(item.scientific_name);
            if (normalizedScientific.includes(normalizedQuery) || normalizedQuery.includes(normalizedScientific)) {
                return true;
            }
        }
        
        // Search in category
        const categoryName = getCategoryName(item.category);
        const normalizedCategory = normalizeText(categoryName);
        if (normalizedCategory.includes(normalizedQuery) || normalizedQuery.includes(normalizedCategory)) {
            return true;
        }
        
        // Search in uses
        if (item.uses && item.uses.some(use => {
            const normalizedUse = normalizeText(use);
            return normalizedUse.includes(normalizedQuery) || normalizedQuery.includes(normalizedUse);
        })) {
            return true;
        }
        
        // Fuzzy search in description as fallback
        if (item.description && fuzzyMatch(query, item.description, 0.5)) {
            return true;
        }
        
        return false;
    });
}

function handleCatalogSearch() {
    console.log('Search function called!'); // Debug log
    
    const searchInput = document.getElementById('catalog-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const resultsCount = document.getElementById('search-results-count');
    
    if (!searchInput) {
        console.log('Search input not found!'); // Debug log
        return;
    }
    
    searchQuery = searchInput.value.trim();
    console.log('Search query:', searchQuery); // Debug log
    
    // Show/hide clear button
    if (clearBtn) {
        if (searchQuery.length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }
    
    // Reset displayed items count
    displayedItems = itemsPerLoad;
    
    // Clear existing catalog grid with animation
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) {
        console.log('Updating catalog grid...'); // Debug log
        catalogGrid.style.opacity = '0';
        setTimeout(() => {
            renderCatalogItems();
            catalogGrid.style.opacity = '1';
            updateSearchResultsCount();
            console.log('Catalog updated!'); // Debug log
        }, 100);
    } else {
        console.log('Catalog grid not found!'); // Debug log
    }
}

function updateSearchResultsCount() {
    const resultsCount = document.getElementById('search-results-count');
    if (!resultsCount) return;
    
    const filteredItems = getFilteredItems();
    
    if (searchQuery.length > 0) {
        const count = filteredItems.length;
        resultsCount.textContent = `${count} resultado${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''} para "${searchQuery}"`;
        resultsCount.style.display = 'block';
    } else {
        resultsCount.style.display = 'none';
    }
}

function clearSearch() {
    const searchInput = document.getElementById('catalog-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const resultsCount = document.getElementById('search-results-count');
    
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (resultsCount) resultsCount.style.display = 'none';
    
    searchQuery = '';
    displayedItems = itemsPerLoad;
    clearCatalogState(); // Clear saved state when search is cleared
    renderCatalogItems();
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleCatalogSearch();
    }
}

// Loading indicator functions for catalog state restoration
function showCatalogLoadingIndicator() {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) return;

    // Create loading indicator if it doesn't exist
    let loadingIndicator = document.getElementById('catalog-loading-indicator');
    if (!loadingIndicator) {
        loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'catalog-loading-indicator';
        loadingIndicator.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            z-index: 100;
            color: var(--primary-green);
            font-weight: 500;
        `;

        loadingIndicator.innerHTML = `
            <div style="
                width: 40px;
                height: 40px;
                border: 3px solid rgba(74, 124, 35, 0.2);
                border-top: 3px solid var(--primary-green);
                border-radius: 50%;
                animation: catalogSpin 1s linear infinite;
            "></div>
            <span style="font-size: 0.9rem;">Cargando plantas...</span>
        `;

        // Add CSS animation if not already present
        if (!document.getElementById('catalog-loading-styles')) {
            const style = document.createElement('style');
            style.id = 'catalog-loading-styles';
            style.textContent = `
                @keyframes catalogSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        catalogGrid.parentElement.appendChild(loadingIndicator);
    }

    // Position relative to catalog grid's parent
    catalogGrid.parentElement.style.position = 'relative';
    loadingIndicator.style.display = 'flex';
    catalogGrid.style.opacity = '0.3';
}

function hideCatalogLoadingIndicator() {
    const loadingIndicator = document.getElementById('catalog-loading-indicator');
    const catalogGrid = document.getElementById('catalog-grid');

    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }

    if (catalogGrid) {
        catalogGrid.style.opacity = '1';
    }
}

// Make functions globally available for HTML onclick events
window.handleCatalogSearch = handleCatalogSearch;
window.clearSearch = clearSearch;
window.handleSearchKeyPress = handleSearchKeyPress;
window.consultWhatsApp = consultWhatsApp;
window.removeFilter = removeFilter;
window.clearAllFilters = clearAllFilters;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initCatalog, 
        renderCatalogItems, 
        createCatalogItem, 
        getCategoryName, 
        getFilteredItems, 
        initFilterButtons, 
        updateActiveFiltersDisplay, 
        removeFilter, 
        clearAllFilters, 
        initInfiniteScroll,
        consultWhatsApp,
        handleCatalogSearch,
        clearSearch,
        handleSearchKeyPress 
    };
}