// New Structured Chatbot Implementation
console.log('🔧 STRUCTURED CHATBOT LOADING...');

// Chat state management
let chatState = {
  currentFlow: null,
  currentStep: 0,
  responses: {},
  isActive: false
};

// Expose global functions
window.openChatPopup = function() {
  console.log('🔧 Opening chat popup');
  const chatPopup = document.getElementById('chat-popup');
  
  if (chatPopup) {
    chatPopup.classList.remove('hidden');
    document.body.classList.add('chat-open');
    
    // Show greeting if no messages
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages && chatMessages.children.length === 0) {
      showGreeting();
    }
    
    // Focus on input
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      setTimeout(() => chatInput.focus(), 100);
    }
  }
};

window.closeChatPopup = function() {
  const chatPopup = document.getElementById('chat-popup');
  if (chatPopup) {
    chatPopup.classList.add('hidden');
    document.body.classList.remove('chat-open');
  }
};

window.sendMessage = function() {
  const input = document.getElementById('chat-input');
  const message = input ? input.value.trim() : '';
  
  if (!message) return;
  
  // Add user message
  addMessage(message, 'user');
  input.value = '';
  
  // Process as text input response if in flow
  if (chatState.isActive && chatState.currentFlow) {
    handleTextResponse(message);
  } else {
    // Default response for free text when not in flow
    addMessage('Gracias por tu mensaje. Para ayudarte mejor, elige una de las opciones principales:', 'bot');
    setTimeout(() => showGreeting(), 1000);
  }
};

window.handleChatKeyPress = function(event) {
  if (event.key === 'Enter') {
    window.sendMessage();
  }
};

window.talkToExpert = function() {
  const message = `¡Hola! Me gustaría hablar con un experto de CENPROFOREST sobre sus plantas y servicios.

¿Podrían ayudarme con información sobre:
- Recomendaciones de plantas para mi proyecto
- Precios y disponibilidad
- Asesoría técnica

Gracias!`;

  const whatsappUrl = `https://wa.me/573212402088?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

function showGreeting() {
  if (!window.CHATBOT_FLOW) {
    console.error('CHATBOT_FLOW not loaded');
    return;
  }
  
  const greeting = window.CHATBOT_FLOW.greeting;
  addMessageWithButtons(greeting.message, 'bot', greeting.options);
}

function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      ${sender === 'user' ? '👤' : '<img src="assets/images/solologo_1.png" alt="CENPROFOREST Logo" />'}
    </div>
    <div class="message-content">
      <p style="white-space: pre-line;">${text}</p>
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessageWithButtons(text, sender, buttons = [], showWhatsApp = false) {
  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  let buttonsHtml = '';
  if (buttons && buttons.length > 0) {
    buttonsHtml = `
      <div class="chat-options" style="margin-top: 15px;">
        ${buttons.map(button => `
          <button class="chat-option-btn" onclick="handleOptionClick('${button}')" 
                  style="display: block; width: 100%; margin: 5px 0; padding: 12px; 
                         background: #f8f9fa; border: 1px solid #ddd; border-radius: 8px; 
                         cursor: pointer; text-align: left; transition: all 0.2s;
                         font-size: 14px;">
            ${button}
          </button>
        `).join('')}
      </div>
    `;
  }
  
  const whatsappButtonHtml = showWhatsApp ? `
    <div class="whatsapp-button-container" style="margin-top: 15px;">
      <button class="contact-btn" onclick="sendWhatsAppSummary()" 
              style="background: #25D366; color: white; border: none; padding: 12px 24px; 
                     border-radius: 25px; font-weight: 600; cursor: pointer; 
                     display: flex; align-items: center; gap: 8px;">
        <span>📱 Contactar por WhatsApp</span>
      </button>
    </div>
  ` : '';
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      ${sender === 'user' ? '👤' : '<img src="assets/images/solologo_1.png" alt="CENPROFOREST Logo" />'}
    </div>
    <div class="message-content">
      <p style="white-space: pre-line;">${text}</p>
      ${buttonsHtml}
      ${whatsappButtonHtml}
    </div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Add hover effects to buttons
  const optionBtns = messageDiv.querySelectorAll('.chat-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.background = '#e9ecef';
      this.style.borderColor = '#6ba832';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.background = '#f8f9fa';
      this.style.borderColor = '#ddd';
    });
  });
}

window.handleOptionClick = function(option) {
  console.log('Option clicked:', option);
  
  // Add user message showing their choice
  addMessage(option, 'user');
  
  // Check if this is a main flow selection
  if (window.CHATBOT_FLOW.flows[option]) {
    startFlow(option);
  } else if (chatState.isActive) {
    // Handle response within current flow
    handleFlowResponse(option);
  } else {
    // Unknown option, show greeting again
    setTimeout(() => showGreeting(), 800);
  }
};

function startFlow(flowName) {
  chatState.currentFlow = flowName;
  chatState.currentStep = 0;
  chatState.responses = { flowType: flowName };
  chatState.isActive = true;
  
  console.log('Starting flow:', flowName);
  
  setTimeout(() => {
    askNextQuestion();
  }, 800);
}

function askNextQuestion() {
  if (!chatState.currentFlow || !window.CHATBOT_FLOW.flows[chatState.currentFlow]) {
    console.error('Invalid flow state');
    return;
  }
  
  const flow = window.CHATBOT_FLOW.flows[chatState.currentFlow];
  const sequence = flow.sequence;
  
  if (chatState.currentStep >= sequence.length) {
    // Flow complete, show summary
    showSummary();
    return;
  }
  
  const currentQuestion = sequence[chatState.currentStep];
  
  if (currentQuestion.options) {
    // Multiple choice question
    addMessageWithButtons(currentQuestion.question, 'bot', currentQuestion.options);
  } else if (currentQuestion.input === 'text') {
    // Text input question
    addMessage(currentQuestion.question, 'bot');
  }

  // Update input state based on current question
  setTimeout(() => updateInputState(), 100);
}

function handleFlowResponse(response) {
  if (!chatState.currentFlow) return;
  
  const flow = window.CHATBOT_FLOW.flows[chatState.currentFlow];
  const sequence = flow.sequence;
  const currentQuestion = sequence[chatState.currentStep];
  
  // Clean response by removing emojis for storage
  const cleanResponse = cleanEmojisFromText(response);
  
  // Store response with step identifier
  const stepKey = `step_${chatState.currentStep}`;
  chatState.responses[stepKey] = cleanResponse;
  
  // Map response to semantic keys for summary
  mapResponseToSummary(chatState.currentStep, cleanResponse, currentQuestion.question);
  
  // Move to next step
  chatState.currentStep++;
  
  setTimeout(() => {
    askNextQuestion();
  }, 800);
}

function handleTextResponse(response) {
  handleFlowResponse(response);
}

function cleanEmojisFromText(text) {
  // Remove emojis and extra spaces from text for WhatsApp message
  return text
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/^\s+/, '') // Remove leading spaces
    .trim();
}

function mapResponseToSummary(stepIndex, response, question) {
  // Map responses to summary fields based on question content
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('tipo de proyecto') || lowerQuestion.includes('proyecto tienes')) {
    chatState.responses.proyecto = response;
  } else if (lowerQuestion.includes('área') || lowerQuestion.includes('area')) {
    chatState.responses.area = response;
  } else if (lowerQuestion.includes('cuántos árboles') || lowerQuestion.includes('arboles')) {
    chatState.responses.cantidad = response;
  } else if (lowerQuestion.includes('ciudad')) {
    chatState.responses.ciudad = response;
  } else if (lowerQuestion.includes('persona natural') || lowerQuestion.includes('empresa')) {
    chatState.responses.tipo = response;
  } else if (lowerQuestion.includes('nombre')) {
    chatState.responses.nombre = response;
  } else if (lowerQuestion.includes('tema necesitas') || lowerQuestion.includes('apoyo')) {
    chatState.responses.tema = response;
  } else if (lowerQuestion.includes('consulta')) {
    chatState.responses.consulta = response;
  }
}

function showSummary() {
  if (!window.CHATBOT_FLOW.final_summary) return;
  
  let summaryMessage = window.CHATBOT_FLOW.final_summary.message;
  
  // Replace placeholders with actual values
  summaryMessage = summaryMessage
    .replace('[PROYECTO]', chatState.responses.proyecto || chatState.responses.tema || chatState.responses.consulta || 'No especificado')
    .replace('[ÁREA]', chatState.responses.area || 'No especificada')
    .replace('[CANTIDAD]', chatState.responses.cantidad || 'No especificada')
    .replace('[CIUDAD]', chatState.responses.ciudad || 'No especificada')
    .replace('[TIPO]', chatState.responses.tipo || 'No especificado')
    .replace('[NOMBRE]', chatState.responses.nombre || 'No especificado');
  
  // Show summary with WhatsApp button
  addMessageWithButtons(summaryMessage, 'bot', [], true);
  
  // Reset chat state
  chatState.isActive = false;
}

window.sendWhatsAppSummary = function() {
  if (!window.CHATBOT_FLOW.final_summary) return;
  
  let whatsappMessage = window.CHATBOT_FLOW.final_summary.whatsapp_message;
  
  // Replace placeholders with actual values
  whatsappMessage = whatsappMessage
    .replace('[PROYECTO]', chatState.responses.proyecto || chatState.responses.tema || chatState.responses.consulta || 'No especificado')
    .replace('[ÁREA]', chatState.responses.area || 'No especificada')
    .replace('[CANTIDAD]', chatState.responses.cantidad || 'No especificada')
    .replace('[CIUDAD]', chatState.responses.ciudad || 'No especificada')
    .replace('[TIPO]', chatState.responses.tipo || 'No especificado')
    .replace('[NOMBRE]', chatState.responses.nombre || 'No especificado');
  
  const whatsappUrl = `https://wa.me/573212402088?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(whatsappUrl, '_blank');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Structured chatbot initialized on DOMContentLoaded');
  });
} else {
  console.log('✅ Structured chatbot initialized immediately');
}


function isTextInputAllowed() {
  // Only allow text input when not in active flow or for specific questions
  if (!chatState.isActive || !chatState.currentFlow) {
    return false; // No free text outside of flows
  }

  const flow = window.CHATBOT_FLOW.flows[chatState.currentFlow];
  const sequence = flow.sequence;

  if (chatState.currentStep >= sequence.length) {
    return false; // Flow completed
  }

  const currentQuestion = sequence[chatState.currentStep];

  // Only allow text input for city and name questions
  if (currentQuestion.input === 'text') {
    const question = currentQuestion.question.toLowerCase();
    return question.includes('ciudad') || question.includes('nombre');
  }

  return false; // All other cases: no text input allowed
}

function updateInputState() {
  const input = document.getElementById('chat-input');
  const sendButton = input ? input.nextElementSibling : null;

  if (input) {
    if (isTextInputAllowed()) {
      input.disabled = false;
      input.placeholder = 'Escribe tu respuesta...';
      input.style.opacity = '1';
      if (sendButton) sendButton.style.opacity = '1';
    } else {
      input.disabled = true;
      input.placeholder = 'Elige una opción de arriba';
      input.style.opacity = '0.6';
      if (sendButton) sendButton.style.opacity = '0.6';
    }
  }
}

console.log('✅ STRUCTURED CHATBOT LOADED SUCCESSFULLY');
console.log('Functions available:', {
  openChatPopup: typeof window.openChatPopup,
  sendMessage: typeof window.sendMessage,
  handleChatKeyPress: typeof window.handleChatKeyPress,
  handleOptionClick: typeof window.handleOptionClick,
  sendWhatsAppSummary: typeof window.sendWhatsAppSummary
});