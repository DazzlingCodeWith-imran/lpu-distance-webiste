document.addEventListener('DOMContentLoaded', function () {
    console.log("✅ Awards.js loaded");

    const track = document.getElementById('awardsTrack');
    const prevBtn = document.getElementById('awardsPrevBtn');   // ← Changed
    const nextBtn = document.getElementById('awardsNextBtn');   // ← Changed
    const dotsContainer = document.getElementById('dotsContainer');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) {
        console.error("❌ Awards elements missing");
        return;
    }

    const items = Array.from(track.children);
    const itemCount = items.length;
    let currentIndex = 0;
    let cardWidth = items[0].offsetWidth + 24;

    function updateCardWidth() {
        cardWidth = items[0].offsetWidth + 24;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'awards-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.awards-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, itemCount - 1));
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
    }

    // ==================== BUTTONS ====================
    prevBtn.addEventListener('click', function () {
        console.log("Prev clicked");
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
        console.log("Next clicked");
        if (currentIndex < itemCount - 1) goToSlide(currentIndex + 1);
    });

    // Keyboard + Touch
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (diff > 50) nextBtn.click();
        else if (diff < -50) prevBtn.click();
    });

    window.addEventListener('resize', () => {
        updateCardWidth();
        goToSlide(currentIndex);
    });

    createDots();
    updateCardWidth();
    goToSlide(0);

    console.log("✅ Awards Carousel Ready");
});