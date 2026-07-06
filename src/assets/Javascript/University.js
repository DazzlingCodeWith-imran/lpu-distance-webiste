// ============================================================
// UNIVERSITY HIGHLIGHTS — JavaScript
// ============================================================

(function () {
    'use strict';

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const filterButtons = document.querySelectorAll('.uni-filter-btn');
    const cards = document.querySelectorAll('.uni-card');
    const emptyMsg = document.getElementById('uniEmptyMsg');
    const grid = document.getElementById('uniGrid');

    // ============================================================
    // FILTER FUNCTION
    // ============================================================
    function applyFilter(category) {
        let visibleCount = 0;

        cards.forEach((card) => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Empty state toggle
        if (visibleCount === 0) {
            emptyMsg.style.display = 'block';
            emptyMsg.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            emptyMsg.style.display = 'none';
        }

        // Update grid layout
        updateGridLayout();
    }

    // ============================================================
    // UPDATE GRID LAYOUT
    // ============================================================
    function updateGridLayout() {
        if (!grid) return;
        
        const visibleCards = grid.querySelectorAll('.uni-card[style*="display: block"]');
        const totalCards = visibleCards.length;
        
        // Remove existing grid classes
        grid.classList.remove('grid-1', 'grid-2', 'grid-3');
        
        // Add appropriate grid class based on visible cards
        if (totalCards <= 1) {
            grid.classList.add('grid-1');
        } else if (totalCards <= 2) {
            grid.classList.add('grid-2');
        } else {
            grid.classList.add('grid-3');
        }
    }

    // ============================================================
    // FILTER BUTTON CLICK HANDLER
    // ============================================================
    filterButtons.forEach((btn) => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Apply filter
            const category = this.dataset.filter;
            applyFilter(category);

            // Smooth scroll to grid
            if (grid) {
                setTimeout(() => {
                    grid.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            }

            // Log for debugging
            console.log(`📋 Filter applied: ${category}`);
        });
    });

    // ============================================================
    // READ MORE BUTTON HANDLER
    // ============================================================
    document.querySelectorAll('.uni-card-link').forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.uni-card');
            const title = card?.querySelector('.uni-card-title')?.textContent?.trim() || 'Article';
            const category = card?.dataset?.category || 'General';

            // Log for debugging
            console.log(`📖 Read More clicked: ${title} (${category})`);

            // You can customize this action:
            // Option 1: Redirect to article page
            // window.location.href = `/article/${encodeURIComponent(title)}`;

            // Option 2: Open a modal
            // openArticleModal(title, category);

            // Option 3: Show alert (for demo)
            alert(`📖 You are viewing:\n\n${title}\nCategory: ${category}\n\nThis will redirect to the full article.`);

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ============================================================
    // VIEW ALL HIGHLIGHTS BUTTON
    // ============================================================
    const viewAllBtn = document.querySelector('.uni-view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset all filters
            filterButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            
            // Set "All" as active
            const allBtn = document.querySelector('.uni-filter-btn[data-filter="all"]');
            if (allBtn) {
                allBtn.classList.add('active');
                allBtn.setAttribute('aria-selected', 'true');
            }
            
            // Show all cards
            cards.forEach((card) => {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            });
            
            emptyMsg.style.display = 'none';
            updateGridLayout();

            console.log('📋 All highlights visible');
        });
    }

    // ============================================================
    // SUBSCRIBE FOR UPDATES BUTTON
    // ============================================================
    const subscribeBtn = document.querySelector('.uni-view-all-secondary');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('🔔 Subscribe clicked');
            
            // Customize: Open subscription modal or redirect
            // window.location.href = '/subscribe';
            
            // Visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                this.style.background = '#22C55E';
                this.style.borderColor = '#22C55E';
                this.style.color = '#FFFFFF';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                    this.style.color = '';
                    this.style.pointerEvents = '';
                }, 2500);
            }, 1500);
        });
    }

    // ============================================================
    // KEYBOARD NAVIGATION FOR FILTERS
    // ============================================================
    filterButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            const total = filterButtons.length;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = (index + 1) % total;
                filterButtons[next].focus();
                filterButtons[next].click();
            }
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = (index - 1 + total) % total;
                filterButtons[prev].focus();
                filterButtons[prev].click();
            }
            
            if (e.key === 'Home') {
                e.preventDefault();
                filterButtons[0].focus();
                filterButtons[0].click();
            }
            
            if (e.key === 'End') {
                e.preventDefault();
                filterButtons[total - 1].focus();
                filterButtons[total - 1].click();
            }
        });
    });

    // ============================================================
    // RESIZE HANDLER - Update grid on resize
    // ============================================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateGridLayout();
        }, 250);
    });

    // ============================================================
    // OBSERVER FOR ANIMATION ON SCROLL
    // ============================================================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // ============================================================
    // SEARCH FUNCTIONALITY (if search input exists)
    // ============================================================
    const searchInput = document.querySelector('.uni-search-input');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = this.value.toLowerCase().trim();
                const currentFilter = document.querySelector('.uni-filter-btn.active')?.dataset?.filter || 'all';
                
                cards.forEach((card) => {
                    const title = card.querySelector('.uni-card-title')?.textContent?.toLowerCase() || '';
                    const text = card.querySelector('.uni-card-text')?.textContent?.toLowerCase() || '';
                    const category = card.dataset.category || '';
                    
                    const matchesFilter = currentFilter === 'all' || category === currentFilter;
                    const matchesSearch = title.includes(query) || text.includes(query);
                    
                    if (matchesFilter && matchesSearch) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.3s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update empty state
                const visible = document.querySelectorAll('.uni-card[style*="display: block"]');
                if (visible.length === 0) {
                    emptyMsg.style.display = 'block';
                    emptyMsg.textContent = 'No highlights found matching your search.';
                } else {
                    emptyMsg.style.display = 'none';
                }
                
                updateGridLayout();
            }, 300);
        });
    }

    // ============================================================
    // CARD CLICK EXPAND (Optional feature)
    // ============================================================
    cards.forEach((card) => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.closest('a')) return;
            
            // Toggle expanded class
            this.classList.toggle('expanded');
            
            // Toggle text expansion
            const text = this.querySelector('.uni-card-text');
            if (text) {
                if (this.classList.contains('expanded')) {
                    text.style.webkitLineClamp = 'unset';
                    text.style.maxHeight = 'none';
                } else {
                    text.style.webkitLineClamp = '3';
                    text.style.maxHeight = '';
                }
            }
        });
    });

    // ============================================================
    // INIT - Set default filter
    // ============================================================
    function init() {
        // Find active tab or default to "All"
        const initialBtn = document.querySelector('.uni-filter-btn.active') || 
                          document.querySelector('.uni-filter-btn[data-filter="all"]') || 
                          filterButtons[0];
        
        if (initialBtn) {
            // Ensure only one active
            filterButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            initialBtn.classList.add('active');
            initialBtn.setAttribute('aria-selected', 'true');
            
            applyFilter(initialBtn.dataset.filter);
        } else {
            // Show all if no filter active
            cards.forEach((card) => {
                card.style.display = 'block';
            });
            emptyMsg.style.display = 'none';
            updateGridLayout();
        }

        console.log('✅ University Highlights initialized');
        console.log(`📊 Total highlights: ${cards.length}`);
        console.log(`🏷️ Categories: ${[...new Set([...cards].map(c => c.dataset.category))].join(', ')}`);
    }

    // ============================================================
    // START
    // ============================================================
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();