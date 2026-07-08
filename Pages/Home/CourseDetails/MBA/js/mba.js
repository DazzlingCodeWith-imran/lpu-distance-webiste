function toggleAccordion(button) {
    const item = button.closest('.accordion-item');
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
    }
}

// Optional: Open first item by default
document.addEventListener('DOMContentLoaded', function() {
    const firstItem = document.querySelector('.accordion-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
});
function lpToggleFaq(button) {
    const item = button.closest('.lp-faq-item');
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.lp-faq-item').forEach(el => {
        if (el !== item) {
            el.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
}

// Optional: Open first FAQ by default
document.addEventListener('DOMContentLoaded', function() {
    const firstFaq = document.querySelector('.lp-faq-item');
    if (firstFaq) {
        firstFaq.classList.add('active');
    }
});