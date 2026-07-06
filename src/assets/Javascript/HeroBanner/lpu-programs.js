(function () {
  const filterButtons = document.querySelectorAll('.lpu-filter-btn');
  const cards = document.querySelectorAll('.lpu-card');
  const emptyMsg = document.getElementById('emptyMsg');
  const grid = document.getElementById('programGrid');

  function applyFilter(category) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = card.dataset.category === category;
      if (matches) {
        card.classList.remove('lpu-hide');
        visibleCount++;
      } else {
        card.classList.add('lpu-hide');
      }
    });

    // Empty state toggle
    if (visibleCount === 0) {
      emptyMsg.classList.add('lpu-show');
    } else {
      emptyMsg.classList.remove('lpu-show');
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state + aria
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      applyFilter(btn.dataset.filter);
    });
  });

  // Apply button — hook your real logic here (redirect / open form / modal)
  document.querySelectorAll('.lpu-apply-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.lpu-card');
      const programName = card.querySelector('h3')?.textContent?.trim() || 'Program';

      // Example: redirect to an application form with the program pre-filled
      // window.location.href = `/apply?program=${encodeURIComponent(programName)}`;

      console.log(`Apply clicked for: ${programName}`);
    });
  });

  // Init with whichever tab has 'active' class in HTML (defaults to PG)
  const initialBtn = document.querySelector('.lpu-filter-btn.active') || filterButtons[0];
  if (initialBtn) applyFilter(initialBtn.dataset.filter);
})();