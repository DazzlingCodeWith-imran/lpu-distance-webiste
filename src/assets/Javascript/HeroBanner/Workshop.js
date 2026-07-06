// ============================================================
//   WORKSHOPS & SEMINARS — Carousel JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('seminarsTrack');
    const prevBtn = document.getElementById('seminarsPrev');
    const nextBtn = document.getElementById('seminarsNext');
    const dotsContainer = document.getElementById('seminarsDots');
    
    if (!track || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found!');
        return;
    }

    const slides = track.querySelectorAll('.seminars-slide');
    if (slides.length === 0) {
        console.error('No slides found!');
        return;
    }

    let currentIndex = 0;
    let autoplayInterval;
    let visibleItems = getVisibleCount();
    const slideWidth = slides[0].offsetWidth + 28; // width + gap

    function getVisibleCount() {
        if (window.innerWidth >= 1200) return 3;
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 768) return 2;
        if (window.innerWidth >= 576) return 2;
        return 1;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = slides.length;
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('seminars-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                goToSlide(i);
                stopAutoplay();
                startAutoplay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        const maxIndex = slides.length - visibleItems;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.seminars-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        const maxIndex = slides.length - visibleItems;
        if (currentIndex >= maxIndex) {
            goToSlide(0);
        } else {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex <= 0) {
            goToSlide(slides.length - visibleItems);
        } else {
            goToSlide(currentIndex - 1);
        }
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    // Touch Support
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        isSwiping = false;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoplay();
    }, { passive: true });

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        const rect = track.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                stopAutoplay();
                startAutoplay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                stopAutoplay();
                startAutoplay();
            }
        }
    });

    // Pause on hover
    const carousel = document.querySelector('.seminars-carousel-wrapper');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // Responsive
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newVisibleItems = getVisibleCount();
            if (newVisibleItems !== visibleItems) {
                visibleItems = newVisibleItems;
                createDots();
                goToSlide(0);
            } else {
                goToSlide(currentIndex);
            }
        }, 250);
    });

    // Initialize
    createDots();
    goToSlide(0);
    startAutoplay();

    // Fix transition after initialization
    setTimeout(function() {
        track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 100);

    console.log('✅ Workshops & Seminars carousel initialized!');
    console.log(`📊 Total slides: ${slides.length}, Visible: ${visibleItems}`);
});