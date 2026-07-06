// ============================================================
//   LPU IN NUMBERS — Counter Animation
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Counter animation
    const counters = document.querySelectorAll('.stats-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            // Format number with commas
            const formatted = current.toLocaleString();
            counter.textContent = formatted;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                // Add plus sign for large numbers
                if (target >= 1000) {
                    counter.textContent = target.toLocaleString();
                }
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                // Add animate class for progress bar
                const item = counter.closest('.stats-item');
                if (item) {
                    item.classList.add('animate');
                }
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(function(counter) {
        observer.observe(counter);
    });

    // Set progress bar widths
    document.querySelectorAll('.stats-bar span').forEach(function(bar) {
        const width = bar.getAttribute('style');
        if (width) {
            const value = width.match(/\d+/);
            if (value) {
                bar.style.setProperty('--target-width', value[0] + '%');
            }
        }
    });

    console.log('✅ Stats section initialized successfully!');
});

// Window load handler
window.addEventListener('load', function() {
    // Trigger any additional animations
    const items = document.querySelectorAll('.stats-item');
    items.forEach(function(item, index) {
        setTimeout(function() {
            item.style.opacity = '1';
        }, index * 100);
    });
});