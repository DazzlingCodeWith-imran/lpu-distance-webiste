// ============================================================
//   HERO BANNER — Interactive Effects (Optimized & Smooth)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Hero Banner initialized!');

    // ---------- PARALLAX EFFECT (SMOOTH) ----------
    const heroBg = document.querySelector('.hero-bg img');
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                if (heroBg) {
                    const speed = 0.15; // Slower for smoother feel
                    heroBg.style.transform = `scale(1.08) translateY(${scrolled * speed}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---------- FLOATING CARDS - ENHANCED HOVER ----------
    const floatCards = document.querySelectorAll('.float-card');
    
    floatCards.forEach(function(card) {
        let hoverTimer;
        
        card.addEventListener('mouseenter', function() {
            // Clear any pending reset timer
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
            
            // Pause animation and apply smooth scale
            this.style.animationPlayState = 'paused';
            this.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.style.transform = 'scale(1.06) translateY(-8px)';
            this.style.boxShadow = '0 16px 48px rgba(249, 115, 22, 0.25)';
            this.style.borderColor = 'rgba(249, 115, 22, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Apply smooth return with a slight delay for elegance
            this.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            
            // Resume animation after transition completes
            hoverTimer = setTimeout(() => {
                this.style.animationPlayState = 'running';
                hoverTimer = null;
            }, 700);
        });
    });

    // ---------- CTA BUTTON CLICK HANDLER ----------
    const buttons = document.querySelectorAll('.hero-btn-primary, .hero-btn-secondary');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const btnText = this.textContent.trim();
            console.log('🔘 Button clicked:', btnText);
            
            // Add ripple effect or custom action here
            // Example: this.classList.add('clicked');
            // setTimeout(() => this.classList.remove('clicked'), 300);
        });
    });

    // ---------- COUNT ANIMATION FOR STATS ----------
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number) {
                    animateNumber(target, number);
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(function(stat) {
        observer.observe(stat);
    });

    function animateNumber(element, target) {
        const duration = 2400; // Slightly longer for smoother feel
        const start = performance.now();
        const suffix = element.textContent.includes('+') ? '+' : '';
        const isK = element.textContent.includes('K');
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Cubic ease-out for smoother deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            let formatted;
            if (isK && target >= 1000) {
                formatted = Math.floor(current / 1000) + 'K';
            } else {
                formatted = current.toLocaleString();
            }
            
            element.textContent = formatted + (current < target && isK ? '' : suffix);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Final formatted value
                let finalText;
                if (isK && target >= 1000) {
                    finalText = Math.floor(target / 1000) + 'K';
                } else {
                    finalText = target.toLocaleString();
                }
                element.textContent = finalText + (target > 1000 ? '+' : '');
            }
        }
        
        requestAnimationFrame(update);
    }

    // ---------- SCROLL INDICATOR ----------
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = this.closest('.hero-banner').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Pulsing glow on hover
        scrollIndicator.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.color = 'rgba(255, 255, 255, 0.8)';
        });
        
        scrollIndicator.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.color = 'rgba(255, 255, 255, 0.4)';
        });
    }

    // ---------- BADGE ENHANCEMENT ----------
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        // Add a subtle glow on load
        setTimeout(function() {
            badge.style.transition = 'box-shadow 0.5s ease';
            badge.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.15)';
        }, 300);
        
        // Interactive glow on hover
        badge.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 0 40px rgba(249, 115, 22, 0.3)';
            this.style.transform = 'scale(1.02)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s ease';
            this.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.15)';
            this.style.transform = 'scale(1)';
        });
    }

    // ---------- OPTIMIZED RESIZE HANDLER ----------
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Handle any responsive adjustments if needed
            console.log('📐 Window resized - layout adjusted');
        }, 300);
    });

    // ---------- PERFORMANCE: Intersection Observer for lazy elements ----------
    // If you have additional elements that need lazy loading, add them here
    
    console.log('✅ Hero Banner animations ready!');
});

// ---------- FALLBACK FOR OLDER BROWSERS ----------
// Ensure smooth scrolling is supported
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('⚠️ Smooth scrolling not supported, using fallback');
    // Fallback for older browsers
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = this.closest('.hero-banner').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView();
            }
        });
    }
}