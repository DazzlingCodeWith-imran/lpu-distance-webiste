// ============================================================
// ALUMNI CAROUSEL — JavaScript
// ============================================================

(function() {
    'use strict';

    const track = document.getElementById('alumniTrack');
    const prevBtn = document.getElementById('alumniPrev');
    const nextBtn = document.getElementById('alumniNext');
    const dotsContainer = document.getElementById('alumniDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.alumni-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    let autoPlayInterval = null;
    let isTransitioning = false;

    // Get cards per view based on screen width
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 992) return 3;
        if (width >= 768) return 3;
        if (width >= 576) return 2;
        return 2;
    }

    // Get card width with gap
    function getCardWidth() {
        const card = cards[0];
        if (!card) return 220;
        const gap = 20; // gap between cards
        return card.offsetWidth + gap;
    }

    // Update carousel position
    function updateCarousel() {
        if (isTransitioning) return;
        
        const cardWidth = getCardWidth();
        const offset = currentIndex * cardWidth;
        track.style.transform = `translate3d(-${offset}px, 0px, 0px)`;
        
        // Update dots
        updateDots();
    }

    // Create dots
    function createDots() {
        const totalDots = Math.ceil(totalCards / cardsPerView);
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'alumni-dot';
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        }
    }

    // Update dots
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.alumni-dot');
        const activeIndex = Math.floor(currentIndex / cardsPerView);
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0) index = 0;
        if (index > maxIndex) index = maxIndex;
        
        currentIndex = index;
        updateCarousel();
    }

    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        const nextIndex = Math.min(currentIndex + cardsPerView, maxIndex);
        if (nextIndex === currentIndex) {
            // Loop back to start
            goToSlide(0);
        } else {
            goToSlide(nextIndex);
        }
    }

    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        const prevIndex = Math.max(currentIndex - cardsPerView, 0);
        goToSlide(prevIndex);
    }

    // Auto-play
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Handle resize
    function handleResize() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            createDots();
            updateCarousel();
        }
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', function() {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            stopAutoPlay();
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoPlay();
        }
    }, { passive: true });

    // Mouse hover pause
    const carousel = document.querySelector('.alumni-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Initialize
    function init() {
        createDots();
        cardsPerView = getCardsPerView();
        maxIndex = Math.max(0, totalCards - cardsPerView);
        updateCarousel();
        startAutoPlay();
        
        console.log('✅ Alumni carousel initialized');
        console.log(`📊 Total alumni: ${totalCards}`);
        console.log(`👀 Cards per view: ${cardsPerView}`);
    }

    init();

})();