// ============================================================
// navbar.js – all class names renamed to lp-*
// ============================================================
(function() {
  'use strict';

  // ----- DOM refs -----
  const sidebar = document.getElementById('lpSidebar');
  const overlay = document.getElementById('lpOverlay');
  const openBtn = document.getElementById('lpSidebarToggle');
  const closeBtn = document.getElementById('lpCloseSidebar');

  // ----- helper functions -----
  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ----- open trigger -----
  if (openBtn) {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openSidebar();
    });
  }

  // ----- close via button -----
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeSidebar();
    });
  }

  // ----- close via overlay click -----
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeSidebar();
      }
    });
  }

  // ----- close on Escape key -----
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // ----- close when a sidebar link is clicked (optional) -----
  if (sidebar) {
    const links = sidebar.querySelectorAll('.lp-sidebar-link');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        // close after a tiny delay to allow navigation
        setTimeout(closeSidebar, 80);
      });
    });
  }

  // ----- auto-close on resize to desktop -----
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992 && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // ----- (optional) close if user taps outside panel on mobile (via overlay already) -----

  console.log('LP Navbar: renamed classes, separate files, left slide sidebar ready.');
})();