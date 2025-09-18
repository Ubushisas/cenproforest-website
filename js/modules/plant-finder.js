// Plant Finder State
let currentQuestion = 1;
let userAnswers = {};
const totalQuestions = 4;

// Plant Finder functionality
function initPlantFinder() {
    console.log('Initializing Plant Finder...');
    
    // Add click listeners to all option buttons
    const optionButtons = document.querySelectorAll('.option-btn');
    console.log('Found option buttons:', optionButtons.length);
    
    if (optionButtons.length === 0) {
        console.warn('No option buttons found. Plant Finder may not be loaded yet.');
        return;
    }
    
    optionButtons.forEach((btn, index) => {
        // Remove any existing listeners
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = document.querySelectorAll('.option-btn')[index];
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Option clicked:', this.dataset.value);
            selectOption(this);
        });
    });
    
    // Initialize progress
    updateProgress();
    console.log('Plant Finder initialized successfully');
}

function selectOption(button) {
    console.log('SelectOption called with button:', button);
    
    const question = button.closest('.question');
    if (!question) {
        console.error('Could not find parent question');
        return;
    }
    
    const questionId = question.id;
    const questionNumber = parseInt(questionId.split('-')[1]);
    const value = button.dataset.value;
    
    console.log('Question ID:', questionId, 'Number:', questionNumber, 'Value:', value);
    
    // Remove selected class from siblings
    const allOptions = button.parentElement.querySelectorAll('.option-btn');
    allOptions.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Store answer
    userAnswers[`question${questionNumber}`] = value;
    console.log('Stored answer:', userAnswers);
    
    // Proceed to next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 500);
}

function nextQuestion() {
    console.log('NextQuestion called. Current question:', currentQuestion);
    
    if (currentQuestion < totalQuestions) {
        // Hide current question
        const currentQuestionEl = document.getElementById(`question-${currentQuestion}`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.remove('active');
            console.log('Hidden question:', currentQuestion);
        }
        
        // Show next question
        currentQuestion++;
        const nextQuestionEl = document.getElementById(`question-${currentQuestion}`);
        if (nextQuestionEl) {
            nextQuestionEl.classList.add('active');
            console.log('Showing question:', currentQuestion);
        }
        
        // Update progress
        updateProgress();
        
        // Show back button (except on first question)
        const backBtn = document.getElementById('back-question-btn');
        if (backBtn && currentQuestion > 1) {
            backBtn.style.display = 'block';
        }
    } else {
        // Show results
        console.log('All questions completed, showing results');
        showResults();
    }
}

function goBackQuestion() {
    console.log('Going back. Current question:', currentQuestion);
    
    if (currentQuestion > 1) {
        // Hide current question
        const currentQuestionEl = document.getElementById(`question-${currentQuestion}`);
        if (currentQuestionEl) {
            currentQuestionEl.classList.remove('active');
        }
        
        // Remove answer for current question
        delete userAnswers[`question${currentQuestion}`];
        
        // Go back to previous question
        currentQuestion--;
        const prevQuestionEl = document.getElementById(`question-${currentQuestion}`);
        if (prevQuestionEl) {
            prevQuestionEl.classList.add('active');
        }
        
        // Update progress
        updateProgress();
        
        // Hide back button if we're on first question
        const backBtn = document.getElementById('back-question-btn');
        if (backBtn && currentQuestion === 1) {
            backBtn.style.display = 'none';
        }
        
        // Clear selection from current question (so user can re-select)
        const buttons = prevQuestionEl.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
    }
}

function updateProgress() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    console.log(`Updating progress: ${currentQuestion}/${totalQuestions}`);
    
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    if (progressText) {
        progressText.textContent = `Pregunta ${currentQuestion} de ${totalQuestions}`;
    }
}

function showResults() {
    // Hide questions
    document.getElementById('finder-questions').style.display = 'none';
    
    // Show results
    const resultsSection = document.getElementById('finder-results');
    resultsSection.classList.remove('hidden');
    
    // Hide back button when showing results
    const backBtn = document.getElementById('back-question-btn');
    if (backBtn) {
        backBtn.style.display = 'none';
    }
    
    // Update progress to 100%
    document.getElementById('progress-fill').style.width = '100%';
    document.getElementById('progress-text').textContent = '¡Recomendaciones listas!';
    
    // Generate recommendations
    const recommendations = generateRecommendations();
    displayRecommendations(recommendations);
}

function generateRecommendations() {
    const recommendations = [];

    if (typeof catalogData === 'undefined') {
        console.error('catalogData is not defined');
        return [];
    }

    // Get user answers
    const purpose = userAnswers.question1;
    const altitude = userAnswers.question2;
    const area = userAnswers.question3;
    const timeline = userAnswers.question4;

    console.log('User answers:', userAnswers);

    catalogData.forEach(plant => {
        let matches = true;
        let reasons = [];

        // Purpose matching - strict criteria
        let purposeMatch = false;
        if (purpose === 'comercial' && plant.category === 'forestales') {
            purposeMatch = true;
            reasons.push('Ideal para plantaciones comerciales');
        }
        if (purpose === 'ornamental' && plant.category === 'ornamentales') {
            purposeMatch = true;
            reasons.push('Perfecto para paisajismo');
        }
        if (purpose === 'frutal' && plant.category === 'frutales') {
            purposeMatch = true;
            reasons.push('Excelente para producción de frutos');
        }
        if (purpose === 'forraje' && plant.category === 'forrajeras') {
            purposeMatch = true;
            reasons.push('Ideal para alimentación animal');
        }

        // Cross-category benefits
        if (purpose === 'sombra' && (plant.category === 'forestales' || plant.category === 'ornamentales')) {
            purposeMatch = true;
            reasons.push('Proporciona excelente sombra');
        }
        if (purpose === 'conservacion' && plant.category === 'forestales') {
            purposeMatch = true;
            reasons.push('Contribuye a la conservación ambiental');
        }

        if (!purposeMatch) {
            matches = false;
        }

        // Altitude matching - precise matching with actual catalog data
        if (matches && plant.altitude && altitude !== 'no-se') {
            const plantAltitudes = plant.altitude.match(/\d+/g);
            if (plantAltitudes && plantAltitudes.length >= 2) {
                const minAlt = parseInt(plantAltitudes[0]);
                const maxAlt = parseInt(plantAltitudes[1]);

                let altitudeMatch = false;
                if (altitude === '0-800' && minAlt <= 800) {
                    altitudeMatch = true;
                    reasons.push('Adaptada a tierra caliente (0-800m)');
                }
                if (altitude === '800-1800' && minAlt <= 1800 && maxAlt >= 800) {
                    altitudeMatch = true;
                    reasons.push('Perfecta para tierra templada (800-1800m)');
                }
                if (altitude === '1800-3000' && maxAlt >= 1800) {
                    altitudeMatch = true;
                    reasons.push('Resistente a tierra fría (1800-3000m)');
                }

                if (!altitudeMatch) {
                    matches = false;
                }
            }
        } else if (altitude === 'no-se') {
            reasons.push('Adaptable a diferentes altitudes');
        }

        // Additional benefits based on timeline
        if (matches && timeline === 'rapido' && plant.uses && plant.uses.some(use =>
            use.toLowerCase().includes('carbón') ||
            use.toLowerCase().includes('forraje') ||
            plant.name.toLowerCase().includes('eucalipto')
        )) {
            reasons.push('Crecimiento rápido');
        }

        if (matches && timeline === 'inmediato' && plant.category === 'ornamentales') {
            reasons.push('Efecto decorativo inmediato');
        }

        // Area considerations
        if (matches && area === 'urbano' && plant.category === 'ornamentales') {
            reasons.push('Apta para espacios urbanos');
        }
        if (matches && area === 'grande' && plant.category === 'forestales') {
            reasons.push('Ideal para grandes extensiones');
        }

        if (matches) {
            recommendations.push({
                ...plant,
                reasons: reasons.slice(0, 3) // Max 3 reasons
            });
        }
    });

    console.log('Filtered recommendations:', recommendations.length, 'plants');

    // Return ALL matching plants, sorted alphabetically
    return recommendations.sort((a, b) => a.name.localeCompare(b.name));
}

function displayRecommendations(recommendations) {
    const resultsGrid = document.getElementById('results-grid');
    resultsGrid.innerHTML = '';

    if (recommendations.length === 0) {
        resultsGrid.innerHTML = `
            <div class="no-results">
                <p>No encontramos plantas específicas para tus criterios, pero tenemos muchas opciones en nuestro catálogo completo.</p>
                <a href="catalogo.html" class="cta-button">Ver Catálogo Completo</a>
            </div>
        `;
        return;
    }

    // Skip the big cards and only show the summary list
    addResultsSummary(recommendations);
}

function addResultsSummary(recommendations) {
    // Add summary section before results-actions
    const resultsSection = document.getElementById('finder-results');
    const resultsActions = resultsSection.querySelector('.results-actions');

    // Remove existing summary if it exists
    const existingSummary = resultsSection.querySelector('.results-summary');
    if (existingSummary) {
        existingSummary.remove();
    }

    // Skip creating summary if no recommendations (for no-results case)
    if (recommendations.length === 0) {
        return;
    }

    // Create summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'results-summary';
    summaryDiv.innerHTML = `
        <div class="summary-header">
            <h4>📋 Plantas recomendadas (${recommendations.length} especies)</h4>
            <p>Estas plantas cumplen con los criterios de tu proyecto y serán incluidas en tu solicitud de cotización:</p>
        </div>
        <div class="summary-plants">
            ${recommendations.map(plant => `
                <div class="summary-plant">
                    <span class="summary-bullet">•</span>
                    <span class="summary-name">${plant.name}</span>
                    <span class="summary-altitude">(${plant.altitude}m)</span>
                </div>
            `).join('')}
        </div>
    `;

    // Insert before results-actions
    resultsSection.insertBefore(summaryDiv, resultsActions);
}

function viewPlantInCatalog(plantId) {
    // Redirect to catalog page with plant ID
    window.location.href = `catalogo.html?plant=${plantId}`;
}

function restartFinder() {
    console.log('Restarting Plant Finder...');
    
    // Reset state
    currentQuestion = 1;
    userAnswers = {};
    
    // Hide results
    const resultsSection = document.getElementById('finder-results');
    if (resultsSection) {
        resultsSection.classList.add('hidden');
    }
    
    // Show questions
    const questionsSection = document.getElementById('finder-questions');
    if (questionsSection) {
        questionsSection.style.display = 'block';
    }
    
    // Reset questions
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    const firstQuestion = document.getElementById('question-1');
    if (firstQuestion) {
        firstQuestion.classList.add('active');
    }
    
    // Reset selections
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Reset progress
    updateProgress();
    
    // Hide back button on restart (will show again when needed)
    const backBtn = document.getElementById('back-question-btn');
    if (backBtn) {
        backBtn.style.display = 'none';
    }
    
    // Re-initialize event listeners
    initPlantFinder();
    
    console.log('Plant Finder restarted successfully');
}

function requestQuote() {
    // Get recommended plants from the results
    const recommendedPlants = [];
    document.querySelectorAll('.result-card h4').forEach(title => {
        recommendedPlants.push(title.textContent);
    });
    
    // Validate we have plants to include
    if (recommendedPlants.length === 0) {
        alert('No se encontraron plantas recomendadas para incluir en el mensaje.');
        return;
    }
    
    // Create WhatsApp message with plant list - removed "solicitar" word
    const message = `Hola, completé el test de recomendación y quisiera información sobre estas plantas:

${recommendedPlants.map((plant, i) => `• ${plant}`).join('\n')}`;
    
    // Direct redirect to WhatsApp without confirmation popup
    const whatsappUrl = `https://wa.me/573212402088?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function getAnswerText(question, value) {
    const answers = {
        question1: {
            'comercial': 'Plantación Comercial',
            'ornamental': 'Decoración/Paisajismo',
            'frutal': 'Producción de Frutos',
            'forraje': 'Forraje para Ganado',
            'sombra': 'Sombra y Protección',
            'conservacion': 'Conservación Ambiental'
        },
        question2: {
            '0-800': '0-800 m (Tierra Caliente)',
            '800-1800': '800-1800 m (Tierra Templada)',
            '1800-3000': '1800-3000 m (Tierra Fría)',
            'no-se': 'No estoy seguro'
        },
        question3: {
            'pequena': 'Pequeña (< 1 hectárea)',
            'mediana': 'Mediana (1-10 hectáreas)',
            'grande': 'Grande (> 10 hectáreas)',
            'urbano': 'Espacio Urbano'
        },
        question4: {
            'rapido': 'Rápido (1-3 años)',
            'medio': 'Mediano plazo (3-7 años)',
            'largo': 'Largo plazo (7+ años)',
            'inmediato': 'Efecto inmediato'
        }
    };
    
    return answers[question][value] || value;
}

// Choice Navigation Functions
function initChoiceNavigation() {
    // Handle smooth scrolling to sections
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

function showPlantFinder() {
    console.log('ShowPlantFinder called');
    
    // Show plant finder using the new show class
    const plantFinder = document.getElementById('plant-finder');
    if (plantFinder) {
        console.log('Plant finder element found:', plantFinder);
        
        // Remove hidden class and add show class
        plantFinder.classList.remove('hidden');
        plantFinder.classList.add('show');
        
        console.log('Plant finder classes after:', plantFinder.className);
    } else {
        console.error('Plant finder element not found!');
        return;
    }
    
    // Hide choice section
    const choiceSection = document.getElementById('choice');
    if (choiceSection) {
        choiceSection.style.display = 'none';
    }
    
    // Initialize plant finder immediately
    initPlantFinder();
    
    // Scroll to plant finder after a short delay
    setTimeout(() => {
        plantFinder.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
}

// Make functions globally available
window.restartFinder = restartFinder;
window.requestQuote = requestQuote;
window.initPlantFinder = initPlantFinder;
window.showPlantFinder = showPlantFinder;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPlantFinder,
        selectOption,
        nextQuestion,
        goBackQuestion,
        updateProgress,
        showResults,
        generateRecommendations,
        displayRecommendations,
        viewPlantInCatalog,
        restartFinder,
        requestQuote,
        getAnswerText,
        initChoiceNavigation,
        showPlantFinder
    };
}