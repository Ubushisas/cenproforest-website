// FAQ Data
const faqData = [
    {
        question: '¿Qué plantas son mejores para clima frío?',
        answer: 'Para altitudes superiores a 1800 metros recomendamos Pino Pátula, Eucalipto Globulus, Acacia Melanoxylon y Kikuyo. Estas especies están especialmente adaptadas a temperaturas bajas.',
        keywords: ['clima', 'frío', 'altura', 'temperatura', 'pino', 'eucalipto']
    },
    {
        question: '¿Cuáles son las mejores épocas para sembrar?',
        answer: 'Varía por especie: Eucalipto (todo el año), Frutales (Enero-Marzo y Sept-Nov), Pino (Feb-Abril y Ago-Oct), Pastos (inicio de lluvias, Abril-Mayo).',
        keywords: ['época', 'siembra', 'plantar', 'cuando', 'tiempo', 'temporada']
    },
    {
        question: '¿Hacen envíos a todo el país?',
        answer: 'Sí, realizamos envíos a todo Colombia con transporte especializado que garantiza el cuidado óptimo de las plantas durante el traslado.',
        keywords: ['envío', 'transporte', 'colombia', 'entrega', 'domicilio']
    },
    {
        question: '¿Qué cuidados necesita el aguacate?',
        answer: 'Requiere altitud de 800-2200m, riego moderado y constante, suelo bien drenado, protección contra vientos y fertilización cada 3 meses.',
        keywords: ['aguacate', 'cuidados', 'riego', 'fertilizar', 'suelo']
    },
    {
        question: '¿Cuánto tiempo tardan en crecer los eucaliptos?',
        answer: 'Los eucaliptos son de crecimiento rápido. En condiciones óptimas pueden alcanzar 3-4 metros en el primer año y estar listos para cosecha en 7-10 años.',
        keywords: ['eucalipto', 'crecimiento', 'tiempo', 'años', 'desarrollo']
    },
    {
        question: '¿Qué documentos necesito para comprar plantas?',
        answer: 'Para compras comerciales necesitas registro ICA si planeas revender. Para uso personal solo requieres identificación. Nosotros contamos con registro ICA No. 005247.',
        keywords: ['documentos', 'ica', 'registro', 'comprar', 'requisitos']
    },
    {
        question: '¿Ofrecen asesoría técnica?',
        answer: 'Sí, brindamos asesoría técnica especializada en selección de especies, preparación de terreno, siembra, cuidados y manejo de cultivos.',
        keywords: ['asesoría', 'técnica', 'ayuda', 'consulta', 'experto']
    },
    {
        question: '¿Cuál es la diferencia entre plantas forestales y ornamentales?',
        answer: 'Las forestales se usan para madera, pulpa o reforestación comercial. Las ornamentales se destinan a paisajismo, decoración y embellecimiento de espacios.',
        keywords: ['diferencia', 'forestales', 'ornamentales', 'tipos', 'uso']
    }
];

// Debounce timer for AI queries
let aiQueryTimer = null;

// Text normalization function to handle accents and tildes
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents/tildes
        .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
}

// AI Integration for FAQ
async function queryAIForFAQ(originalQuery, normalizedQuery) {
    try {
        console.log('Querying AI for:', originalQuery);
        
        // Show loading indicator
        showLoadingIndicator();
        
        // TODO: Update with production backend URL
        const response = await fetch('https://cenproforestsas.com/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: originalQuery,
                context: 'FAQ'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('AI Response received:', data);
            
            // Show AI response as a suggestion
            showAIResponse(data.response, originalQuery);
        } else {
            console.log('AI backend not available, using fallback');
            hideLoadingIndicator();
        }
    } catch (error) {
        console.log('AI query failed, using normal suggestions:', error);
        hideLoadingIndicator();
    }
}

// Show loading indicator
function showLoadingIndicator() {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (!suggestionsDiv) return;
    
    suggestionsDiv.innerHTML = '';
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'suggestion-item loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <span>Buscando respuesta...</span>
        </div>
    `;
    
    suggestionsDiv.appendChild(loadingIndicator);
    suggestionsDiv.style.display = 'block';
}

// Hide loading indicator
function hideLoadingIndicator() {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.innerHTML = '';
        suggestionsDiv.style.display = 'none';
    }
}

// Show AI response in suggestions
function showAIResponse(aiResponse, query) {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (!suggestionsDiv) return;
    
    suggestionsDiv.innerHTML = '';
    
    const aiSuggestion = document.createElement('div');
    aiSuggestion.className = 'suggestion-item ai-response';
    aiSuggestion.innerHTML = `
        <div class="ai-content">
            <strong>Respuesta:</strong>
            <p>${aiResponse}</p>
        </div>
    `;
    
    suggestionsDiv.appendChild(aiSuggestion);
    suggestionsDiv.style.display = 'block';
}

// FAQ Functions
function initFAQ() {
    console.log('Initializing FAQ...');
    
    // Only initialize search, no FAQ grid items
    initFAQSearch();
}

function renderFAQItems() {
    console.log('Starting renderFAQItems...');
    const faqGrid = document.getElementById('faq-grid');
    console.log('FAQ Grid element:', faqGrid);
    
    if (!faqGrid) {
        console.error('FAQ grid element not found! The FAQ section may not be loaded.');
        return;
    }
    
    console.log('FAQ Data:', faqData);
    console.log('FAQ Data length:', faqData.length);
    
    // Add temporary message while FAQ loads
    faqGrid.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">🔍 Cargando preguntas frecuentes... Mientras tanto, prueba buscar términos como "clima", "siembra", "cuidados"</div>';
    
    setTimeout(() => {
        faqGrid.innerHTML = '';
        
        faqData.forEach((item, index) => {
            console.log(`Creating FAQ item ${index}:`, item);
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <div class="faq-question" data-index="${index}">
                    <span>${item.question}</span>
                    <span class="toggle-icon">▼</span>
                </div>
                <div class="faq-answer">
                    <div class="faq-answer-content">${item.answer}</div>
                </div>
            `;
            
            // Add click event listener to the question
            const questionDiv = faqItem.querySelector('.faq-question');
            questionDiv.addEventListener('click', function() {
                console.log('FAQ question clicked:', index);
                toggleFAQ(index);
            });
            
            faqGrid.appendChild(faqItem);
            console.log(`FAQ item ${index} added to grid`);
        });
        
        console.log('FAQ items rendered:', faqData.length);
        console.log('FAQ Grid innerHTML:', faqGrid.innerHTML.substring(0, 200) + '...');
    }, 1000);
}

function toggleFAQ(index) {
    console.log('ToggleFAQ called with index:', index);
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('Found FAQ items:', faqItems.length);
    
    if (index >= faqItems.length || index < 0) {
        console.error('Index out of bounds:', index);
        return;
    }
    
    const clickedItem = faqItems[index];
    console.log('Clicked item:', clickedItem);
    
    if (!clickedItem) {
        console.error('No item found at index:', index);
        return;
    }
    
    // Check if item is already active
    const isActive = clickedItem.classList.contains('active');
    
    // Close all other items
    faqItems.forEach((item, i) => {
        if (i !== index) {
            item.classList.remove('active');
        }
    });
    
    // Toggle clicked item
    if (isActive) {
        clickedItem.classList.remove('active');
    } else {
        clickedItem.classList.add('active');
    }
    
    console.log('Item toggled, now active:', clickedItem.classList.contains('active'));
}

function initFAQSearch() {
    console.log('Initializing FAQ search...');
    const searchInput = document.getElementById('faq-search');
    const suggestionsDiv = document.getElementById('faq-suggestions');
    
    console.log('Search input element:', searchInput);
    console.log('Suggestions div element:', suggestionsDiv);
    
    if (!searchInput || !suggestionsDiv) {
        console.error('FAQ search elements not found');
        return;
    }
    
    searchInput.addEventListener('input', function() {
        console.log('FAQ search input event');
        const searchTerm = this.value.toLowerCase();
        console.log('Search term:', searchTerm);
        
        if (searchTerm.length > 0) {
            showFAQSuggestions(searchTerm);
        } else {
            hideFAQSuggestions();
        }
        
        filterFAQ();
    });
    
    searchInput.addEventListener('focus', function() {
        console.log('FAQ search focus event');
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 0) {
            showFAQSuggestions(searchTerm);
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            hideFAQSuggestions();
        }
    });
    
    console.log('FAQ search initialized successfully');
}

function showFAQSuggestions(searchTerm) {
    console.log('Showing FAQ suggestions for:', searchTerm);
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (!suggestionsDiv) {
        console.error('Suggestions div not found');
        return;
    }
    
    // Only show suggestions for terms with 2+ characters
    if (searchTerm.length < 2) {
        hideFAQSuggestions();
        return;
    }
    
    const normalizedSearchTerm = normalizeText(searchTerm);
    const suggestions = [];
    
    // Get matching questions using normalized text
    faqData.forEach(item => {
        const normalizedQuestion = normalizeText(item.question);
        const normalizedKeywords = item.keywords ? 
            item.keywords.map(k => normalizeText(k)) : [];
        
        if (normalizedQuestion.includes(normalizedSearchTerm) || 
            normalizedKeywords.some(keyword => keyword.includes(normalizedSearchTerm))) {
            suggestions.push(item.question);
        }
    });
    
    // Only add common terms for longer searches to avoid spam
    if (searchTerm.length >= 3) {
        const commonTerms = [
            'plantas clima frío', 'época siembra', 'temporadas',
            'envíos', 'transporte', 'aguacate cuidados',
            'eucalipto crecimiento', 'documentos ica',
            'asesoría técnica', 'forestales ornamentales'
        ];
        
        commonTerms.forEach(term => {
            if (term.toLowerCase().includes(searchTerm.toLowerCase()) && 
                !suggestions.some(s => s.toLowerCase().includes(term.toLowerCase()))) {
                suggestions.push(`${term}`);
            }
        });
    }
    
    console.log('Generated suggestions:', suggestions);
    
    if (suggestions.length > 0) {
        suggestionsDiv.innerHTML = '';
        // Limit to top 3 suggestions to avoid overwhelming the user
        suggestions.slice(0, 3).forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', function() {
                const searchInput = document.getElementById('faq-search');
                searchInput.value = suggestion;
                filterFAQ();
                hideFAQSuggestions();
            });
            suggestionsDiv.appendChild(suggestionItem);
        });
        suggestionsDiv.style.display = 'block';
        console.log('Suggestions shown');
    } else {
        hideFAQSuggestions();
        console.log('No suggestions found');
    }
}

function hideFAQSuggestions() {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
}

function handleFAQKeyPress(event) {
    console.log('🔍 FAQ key pressed:', event.key);
    if (event.key === 'Enter') {
        event.preventDefault();
        const searchInput = document.getElementById('faq-search');
        const searchTerm = searchInput ? searchInput.value : '';
        console.log('✅ Enter pressed with search term:', searchTerm);
        
        if (searchTerm.trim()) {
            console.log('🚀 Opening chat with question:', searchTerm);
            
            // Show visual feedback immediately and keep it visible
            showFAQLoadingIndicator();
            
            // Keep the loading indicator visible for longer
            setTimeout(() => {
                updateFAQLoadingIndicator('Conectando con el asistente...');
            }, 1000);
            
            // Open chat and continue the conversation with longer delay
            setTimeout(() => {
                openChatWithQuestion(searchTerm);
                
                // Clear the search input after chat opens successfully
                setTimeout(() => {
                    if (searchInput) {
                        searchInput.value = '';
                    }
                }, 2000);
            }, 1500);
        } else {
            console.log('❌ No search term provided');
        }
    }
}

function filterFAQ() {
    console.log('FilterFAQ called');
    const searchInput = document.getElementById('faq-search');
    
    if (!searchInput) {
        console.error('FAQ search input not found');
        return;
    }
    
    const searchTerm = normalizeText(searchInput.value);
    console.log('Search term (normalized):', searchTerm);
    
    // Clear any existing AI query timer
    if (aiQueryTimer) {
        clearTimeout(aiQueryTimer);
    }
    
    // Only query AI after user stops typing for 1.5 seconds
    if (searchTerm.length > 3) {
        aiQueryTimer = setTimeout(() => {
            queryAIForFAQ(searchInput.value, searchTerm);
        }, 1500);
    }
    
    // Show suggestions when searching
    if (searchTerm.length > 0) {
        showFAQSuggestions(searchTerm);
    } else {
        hideFAQSuggestions();
    }
}

// Function to open chat with a question
function openChatWithQuestion(question) {
    console.log('💬 Opening chat with question:', question);
    
    // Update loading indicator to show "Abriendo chat..."
    updateFAQLoadingIndicator('Abriendo chat...');
    
    // Multiple attempts to open the chat popup
    let chatOpened = false;
    
    // Method 1: Use the proper openChatPopup function
    if (typeof openChatPopup === 'function') {
        console.log('🚀 Opening chat popup using openChatPopup function');
        try {
            openChatPopup();
            chatOpened = true;
            console.log('✅ Chat popup opened successfully');
        } catch (error) {
            console.error('❌ Error calling openChatPopup:', error);
        }
    }
    
    // Method 2: Direct DOM manipulation as fallback
    if (!chatOpened) {
        console.log('⚠️ Trying fallback method - direct DOM manipulation');
        const chatPopup = document.getElementById('chat-popup');
        const floatBtn = document.querySelector('.chat-float-btn');
        
        if (chatPopup) {
            chatPopup.classList.remove('hidden');
            if (floatBtn) {
                floatBtn.style.display = 'none';
            }
            chatOpened = true;
            console.log('✅ Chat popup opened via fallback');
        }
    }
    
    // Method 3: Force visibility with CSS
    if (!chatOpened) {
        console.log('⚠️ Trying force visibility method');
        const chatPopup = document.getElementById('chat-popup');
        if (chatPopup) {
            chatPopup.style.display = 'block';
            chatPopup.style.visibility = 'visible';
            chatPopup.style.opacity = '1';
            chatPopup.style.zIndex = '10000';
            chatOpened = true;
            console.log('✅ Chat popup forced visible');
        }
    }
    
    if (!chatOpened) {
        console.error('❌ All methods failed to open chat');
        updateFAQLoadingIndicator('Error: No se pudo abrir el chat. Por favor, haz clic en el botón de chat manualmente.');
        setTimeout(() => {
            hideFAQLoadingIndicator();
        }, 3000);
        return;
    }
    
    // Visual confirmation that chat opened - scroll to it and focus
    setTimeout(() => {
        const chatPopup = document.getElementById('chat-popup');
        if (chatPopup && !chatPopup.classList.contains('hidden')) {
            // Scroll to make sure chat is visible
            chatPopup.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Focus on the input field
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.focus();
            }
            
            console.log('✅ Chat is now visible and focused');
        }
    }, 200);
    
    // Update loading indicator
    updateFAQLoadingIndicator('Preparando conversación...');
    
    // Wait for the chat to be ready, then send the question
    setTimeout(() => {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        console.log('🔍 Chat input found:', !!chatInput);
        console.log('🔍 Chat messages found:', !!chatMessages);
        
        if (chatInput && chatMessages) {
            // Clear any existing messages except the default bot message
            const messages = chatMessages.querySelectorAll('.message');
            messages.forEach((msg, index) => {
                if (index > 0) { // Keep the first message (default greeting)
                    msg.remove();
                }
            });
            console.log('🧹 Extra chat messages cleared');
            
            // Add the user's question
            chatInput.value = question;
            console.log('📝 Question added to input:', question);
            
            // Update loading indicator
            updateFAQLoadingIndicator('Enviando pregunta...');
            
            // Trigger the send message function
            if (typeof sendMessage === 'function') {
                console.log('🚀 Calling sendMessage function');
                sendMessage();
                
                // Hide loading indicator after sending (wait for response)
                setTimeout(() => {
                    hideFAQLoadingIndicator();
                }, 1500);
            } else {
                console.error('❌ sendMessage function not found, using fallback');
                // Fallback: manually add message and call AI
                if (typeof addMessage === 'function') {
                    console.log('🔄 Using addMessage fallback');
                    addMessage(question, 'user');
                    addMessage('Escribiendo...', 'bot');
                    
                    // Use proper AI response generation
                    const generateResponse = async () => {
                        try {
                            // Try to get AI response first
                            let response = 'Te ayudo con tu consulta sobre plantas. ¿Podrías darme más detalles sobre tu ubicación y el tipo de planta que buscas? 🌱';
                            
                            if (typeof generateBotResponse === 'function') {
                                console.log('🤖 Using generateBotResponse for AI response');
                                response = await generateBotResponse(question);
                            } else if (typeof getAIResponse === 'function') {
                                console.log('🤖 Using getAIResponse for AI response');
                                const aiResponse = await getAIResponse(question);
                                if (aiResponse && aiResponse.success) {
                                    response = aiResponse.response;
                                }
                            } else {
                                console.log('🤖 Using direct API call');
                                // Direct API call as last resort
                                const apiResponse = await fetch('https://cenproforestsas.com/api/chat', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        message: question,
                                        session_id: 'faq_session_' + Date.now()
                                    })
                                });
                                
                                if (apiResponse.ok) {
                                    const data = await apiResponse.json();
                                    if (data.success) {
                                        response = data.response;
                                    }
                                }
                            }
                            
                            return response;
                        } catch (error) {
                            console.error('Error generating AI response:', error);
                            // Only use hardcoded fallback if everything else fails
                            if (question.toLowerCase().includes('barranquilla')) {
                                return '¡Hola! Para Barranquilla (clima cálido, 18m altitud), te recomiendo plantas como Mango, Limón y Acacia Mangium. Son ideales para ese clima tropical. ¿Te gustaría saber más sobre alguna de estas opciones? 🌴';
                            } else {
                                return 'Te ayudo con tu consulta sobre plantas. ¿Podrías darme más detalles sobre tu ubicación y el tipo de planta que buscas? 🌱';
                            }
                        }
                    };
                    
                    // Generate and display response
                    generateResponse().then(response => {
                        const messages = document.querySelectorAll('.message');
                        const lastMessage = messages[messages.length - 1];
                        if (lastMessage && lastMessage.textContent.includes('Escribiendo...')) {
                            lastMessage.remove();
                        }
                        
                        addMessage(response, 'bot');
                        
                        // Hide loading indicator after response
                        hideFAQLoadingIndicator();
                    });
                } else {
                    console.error('❌ addMessage function not found either');
                    hideFAQLoadingIndicator();
                }
            }
        } else {
            console.error('❌ Chat elements not found');
            updateFAQLoadingIndicator('Error: No se pudo abrir el chat. Por favor, intenta de nuevo.');
            
            // Hide loading indicator after error
            setTimeout(() => {
                hideFAQLoadingIndicator();
            }, 3000);
        }
    }, 1000);
}

// Show loading indicator for FAQ
function showFAQLoadingIndicator() {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.innerHTML = `
            <div class="faq-loading-indicator">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <span>Preparando consulta...</span>
                </div>
            </div>
        `;
        suggestionsDiv.style.display = 'block';
    }
}

// Update loading indicator message
function updateFAQLoadingIndicator(message) {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.innerHTML = `
            <div class="faq-loading-indicator">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <span>${message}</span>
                </div>
            </div>
        `;
        suggestionsDiv.style.display = 'block';
    }
}

// Hide loading indicator for FAQ
function hideFAQLoadingIndicator() {
    const suggestionsDiv = document.getElementById('faq-suggestions');
    if (suggestionsDiv) {
        // Don't hide immediately, fade out slowly
        setTimeout(() => {
            suggestionsDiv.style.display = 'none';
            suggestionsDiv.innerHTML = '';
        }, 300);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initFAQ, 
        renderFAQItems, 
        toggleFAQ, 
        initFAQSearch, 
        showFAQSuggestions, 
        hideFAQSuggestions, 
        handleFAQKeyPress, 
        filterFAQ,
        openChatWithQuestion,
        showFAQLoadingIndicator,
        updateFAQLoadingIndicator,
        hideFAQLoadingIndicator
    };
}