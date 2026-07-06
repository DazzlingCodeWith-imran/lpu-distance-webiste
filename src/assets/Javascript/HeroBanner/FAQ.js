// ============================================================
// FAQ SECTION — JavaScript
// ============================================================

(function() {
    'use strict';

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');

            // Close all other FAQs
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current FAQ
            if (isOpen) {
                item.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard support (Enter/Space)
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Open first FAQ by default (optional)
    // if (faqItems.length > 0) {
    //     faqItems[0].classList.add('active');
    //     faqItems[0].querySelector('.faq-question').setAttribute('aria-expanded', 'true');
    // }

    console.log('✅ FAQ section initialized');
    console.log(`📋 Total FAQs: ${faqItems.length}`);

})();