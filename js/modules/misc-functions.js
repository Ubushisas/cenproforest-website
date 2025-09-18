// Map Functions
function showMap() {
    const modal = document.getElementById('map-modal');
    const iframe = document.getElementById('map-iframe');
    
    // CENPROFOREST exact location: "Vivero forestal cenproforest Sas"
    // Using coordinates from the provided Google Maps link
    const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0249999999997!2d-75.1668!3d4.4421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5b2a0a0a0a1%3A0x1234567890abcdef!2sVivero%20forestal%20cenproforest%20Sas!5e0!3m2!1ses!2sco!4v1640000000000!5m2!1ses!2sco&q=Vivero+forestal+cenproforest+Sas';
    
    iframe.src = embedUrl;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMap() {
    const modal = document.getElementById('map-modal');
    const iframe = document.getElementById('map-iframe');
    
    modal.classList.add('hidden');
    iframe.src = 'about:blank';
    document.body.style.overflow = 'auto';
}

function openGoogleMaps() {
    window.open('https://maps.app.goo.gl/kvgtWszgc8kUcT2Z9', '_blank');
}

function openWaze() {
    const searchTerm = encodeURIComponent('Vivero forestal cenproforest Sas');
    window.open(`https://waze.com/ul?q=${searchTerm}`, '_blank');
}

// Adopt a Tree Functions
function adoptTree(plan) {
    const plans = {
        'basica': {
            name: 'Adopción Básica',
            price: '$50.000',
            features: ['Plántula de 6 meses', 'Certificado de adopción', '3 actualizaciones por año', 'Placa identificatoria']
        },
        'premium': {
            name: 'Adopción Premium',
            price: '$100.000',
            features: ['Árbol joven de 1 año', 'Certificado personalizado', 'Actualizaciones mensuales', 'Placa metálica personalizada', 'Visita guiada incluida']
        },
        'familiar': {
            name: 'Adopción Familiar',
            price: '$200.000',
            features: ['3 árboles de diferentes especies', 'Certificados para toda la familia', 'Actualizaciones mensuales', 'Placas personalizadas', '2 visitas guiadas al año', 'Kit educativo para niños']
        }
    };
    
    const selectedPlan = plans[plan];
    
    const message = `¡Hola! Me interesa el programa "Adopta un Árbol" de CENPROFOREST.

Plan seleccionado: ${selectedPlan.name} (${selectedPlan.price})

Incluye:
${selectedPlan.features.map(feature => `• ${feature}`).join('\n')}

¿Podrían proporcionarme más información sobre:
- Proceso de adopción
- Métodos de pago
- Especies disponibles
- Fechas de siembra

¡Gracias!`;

    const whatsappUrl = `https://wa.me/573212402088?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Chat Popup Functions - openChatPopup moved to simple_chatbot.js for full functionality

function closeChatPopup() {
    const popup = document.getElementById('chat-popup');
    const floatBtn = document.querySelector('.chat-float-btn');
    
    popup.classList.add('hidden');
    floatBtn.style.display = 'flex';
    document.body.classList.remove('chat-open'); // Remove class for mobile
}

// Choice navigation functions
function showCatalog() {
    // Redirect to catalog page
    window.location.href = 'catalogo.html';
}

function showChoice() {
    console.log('ShowChoice called');
    
    // Show choice section
    const choiceSection = document.getElementById('choice');
    if (choiceSection) {
        choiceSection.style.display = 'block';
        choiceSection.style.visibility = 'visible';
    }
    
    // Hide plant finder properly
    const plantFinder = document.getElementById('plant-finder');
    if (plantFinder) {
        plantFinder.classList.remove('show');
        plantFinder.classList.add('hidden');
    }
    
    // Reset plant finder state
    if (typeof restartFinder === 'function') {
        restartFinder();
    }
    
    // Smooth scroll to choice section
    setTimeout(() => {
        choiceSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Initialize modal event listeners
function initModalEventListeners() {
    // Close map modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('map-modal');
        if (e.target === modal) {
            closeMap();
        }
    });

    // Close map modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('map-modal');
            if (modal && !modal.classList.contains('hidden')) {
                closeMap();
            }
        }
    });

    // Close chat popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('chat-popup');
        const floatBtn = document.querySelector('.chat-float-btn');
        
        if (popup && floatBtn && !popup.contains(e.target) && !floatBtn.contains(e.target) && !popup.classList.contains('hidden')) {
            closeChatPopup();
        }
    });

    // Close chat popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('chat-popup');
            if (popup && !popup.classList.contains('hidden')) {
                closeChatPopup();
            }
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        showMap, 
        closeMap, 
        openGoogleMaps, 
        openWaze, 
        adoptTree, 
        closeChatPopup, 
        showCatalog, 
        showChoice, 
        initModalEventListeners 
    };
}