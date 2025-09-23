// Plant Image Carousel System
class PlantCarousel {
    constructor(containerId, plantName) {
        this.container = document.getElementById(containerId);
        this.plantName = plantName;
        this.currentSlide = 0;
        this.images = [];
        this.thumbnails = [];
        this.init();
    }

    async init() {
        await this.loadImages();
        if (this.images.length > 1) {
            this.createCarouselHTML();
            this.setupEventListeners();
        } else if (this.images.length === 1) {
            this.createSingleImageHTML();
        }
    }

    async loadImages() {
        // Handle special case for Búcaro folder (has trailing space)
        const folderName = this.plantName === 'BÚCARO' ? 'Búcaro ' : this.plantName;
        
        // Load main image
        const mainImagePath = `../assets/Catalogo/${folderName}/${this.plantName === 'BÚCARO' ? 'Búcaro' : this.plantName}.jpg`;
        if (await this.imageExists(mainImagePath)) {
            this.images.push({
                path: mainImagePath,
                alt: `${this.plantName} - Imagen principal`
            });
        }

        // Load additional images (numbered 1, 2, 3, 4)
        for (let i = 1; i <= 4; i++) {
            const extensions = ['jpg', 'jpeg', 'png'];
            for (const ext of extensions) {
                const imagePath = `../assets/Catalogo/${folderName}/${this.plantName === 'BÚCARO' ? 'Búcaro' : this.plantName} ${i}.${ext}`;
                if (await this.imageExists(imagePath)) {
                    this.images.push({
                        path: imagePath,
                        alt: `${this.plantName} - Imagen ${i + 1}`
                    });
                    break; // Found image with this number, move to next number
                }
            }
        }

        // Check for special cases (like "assets/Catalogo/Hayuelo/hayuelo.jpg" with extra space)
        const specialPath = `../assets/Catalogo/${folderName}/${this.plantName === 'BÚCARO' ? 'Búcaro' : this.plantName} .jpg`;
        if (await this.imageExists(specialPath)) {
            this.images.push({
                path: specialPath,
                alt: `${this.plantName} - Imagen adicional`
            });
        }
    }

    async imageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
        });
    }

    createCarouselHTML() {
        this.container.innerHTML = `
            <div class="plant-carousel">
                <div class="carousel-main">
                    <div class="carousel-container">
                        <div class="carousel-slides" id="carousel-slides-${this.plantName}">
                            ${this.images.map((img, index) => `
                                <div class="slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                                    <img src="${img.path}" alt="${img.alt}" />
                                </div>
                            `).join('')}
                        </div>
                        ${this.images.length > 1 ? `
                            <button class="carousel-btn prev" id="prev-${this.plantName}">❮</button>
                            <button class="carousel-btn next" id="next-${this.plantName}">❯</button>
                        ` : ''}
                    </div>
                    ${this.images.length > 1 ? `
                        <div class="carousel-indicators">
                            ${this.images.map((_, index) => `
                                <span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                ${this.images.length > 1 ? `
                    <div class="carousel-thumbnails">
                        <h4>Vista previa de imágenes</h4>
                        <div class="thumbnail-grid">
                            ${this.images.map((img, index) => `
                                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-slide="${index}">
                                    <img src="${img.path}" alt="${img.alt}" />
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    createSingleImageHTML() {
        this.container.innerHTML = `
            <div class="plant-single-image">
                <img src="${this.images[0].path}" alt="${this.images[0].alt}" />
            </div>
        `;
    }

    setupEventListeners() {
        // Previous button
        const prevBtn = document.getElementById(`prev-${this.plantName}`);
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        // Next button
        const nextBtn = document.getElementById(`next-${this.plantName}`);
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicators
        const indicators = this.container.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Thumbnails
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-advance (optional)
        this.startAutoAdvance();
    }

    previousSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.images.length - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentSlide = this.currentSlide === this.images.length - 1 ? 0 : this.currentSlide + 1;
        this.updateCarousel();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update slides
        const slides = this.container.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        const indicators = this.container.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Update thumbnails
        const thumbnails = this.container.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoAdvance() {
        if (this.images.length > 1) {
            setInterval(() => {
                this.nextSlide();
            }, 5000); // Auto-advance every 5 seconds
        }
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get plant name from the page title or data attribute
    const plantName = document.querySelector('[data-plant-name]')?.getAttribute('data-plant-name') ||
                      document.querySelector('h1')?.textContent?.trim() ||
                      'Unknown Plant';
    
    const carouselContainer = document.getElementById('plant-carousel');
    if (carouselContainer) {
        new PlantCarousel('plant-carousel', plantName);
    }
});