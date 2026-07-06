// ============================================================
//   PROGRAMS TABBED SYSTEM
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.programs-tab');
    const contents = {
        pg: document.getElementById('pg-content'),
        ug: document.getElementById('ug-content'),
        diploma: document.getElementById('diploma-content')
    };

    // Function to switch tabs
    function switchTab(tabId) {
        // Update tabs
        tabs.forEach(function(tab) {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            }
        });

        // Update content
        Object.keys(contents).forEach(function(key) {
            if (contents[key]) {
                contents[key].classList.remove('active');
            }
        });

        if (contents[tabId]) {
            contents[tabId].classList.add('active');
        }
    }

    // Add click event to tabs
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });

    // Set default active tab (PG)
    switchTab('pg');

    console.log('✅ Programs section initialized!');
    console.log('📚 Tabs: PG, UG, Diploma');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Any responsive adjustments if needed
    }, 250);
});