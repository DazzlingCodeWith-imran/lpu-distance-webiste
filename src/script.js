document.addEventListener('DOMContentLoaded', function() {
  
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    });
  }

  // Init AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }

  // Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress-bar');
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }
  });

  // Back to top click
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Animated Counters
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length > 0) {
    const animateCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / 100;
        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(animateCounters, 20);
        } else {
          counter.innerText = target;
        }
      });
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
    
    const counterSection = document.querySelector('.counters-section');
    if (counterSection) {
      observer.observe(counterSection);
    }
  }

  // Form Validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        // Mock success
        const successMsg = form.querySelector('.success-message');
        if(successMsg) successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          if(successMsg) successMsg.style.display = 'none';
        }, 3000);
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Filter Tabs (Courses / Blog)
  const filterButtons = document.querySelectorAll('.filter-tabs .btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        const items = document.querySelectorAll('.course-item, .blog-item');
        items.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
   (function() {
      // ----- BLOG DATA (static, matching original) -----
      const blogData = [
        {
          category: 'learning',
          img: 'src/assets/blog-1.png',
          date: 'June 12, 2026',
          title: '5 Tips to Succeed in Online Learning',
          desc: 'Practical strategies to stay motivated and manage your time as a distance-learning student.',
          link: '#'
        },
        {
          category: 'admissions',
          img: 'src/assets/course-business.png',
          date: 'May 28, 2026',
          title: 'How to Choose the Right Program',
          desc: 'A step-by-step guide to evaluating accreditation, cost, and career fit before you apply.',
          link: '#'
        },
        {
          category: 'career',
          img: 'src/assets/placement-success.png',
          date: 'May 10, 2026',
          title: 'From Graduate to Hired: A Career Roadmap',
          desc: 'What our top-performing graduates did differently to land their first job offer fast.',
          link: '#'
        },
        {
          category: 'learning',
          img: 'src/assets/online-learning.png',
          date: 'April 22, 2026',
          title: 'Building a Study Routine That Actually Works',
          desc: 'Balancing work, family, and coursework without burning out.',
          link: '#'
        },
        {
          category: 'admissions',
          img: 'src/assets/course-tech.png',
          date: 'April 5, 2026',
          title: 'Financing Your Distance Education',
          desc: 'Scholarships, payment plans, and employer sponsorships you may qualify for.',
          link: '#'
        },
        {
          category: 'career',
          img: 'src/assets/course-health.png',
          date: 'March 18, 2026',
          title: 'Top In-Demand Healthcare Careers in 2026',
          desc: 'Why healthcare-focused distance degrees are seeing record enrollment this year.',
          link: '#'
        }
      ];

      // DOM refs
      const grid = document.getElementById('blog-grid');
      const prevBtn = document.getElementById('prev-page');
      const nextBtn = document.getElementById('next-page');
      const pageNumbersSpan = document.getElementById('page-numbers');

      // state
      let currentPage = 1;
      const itemsPerPage = 3;        // show 3 items per page
      let currentFilter = 'all';     // 'all', 'learning', 'admissions', 'career'
      let filteredItems = [...blogData];

      // ----- render function (grid + pagination) -----
      function render() {
        // 1) filter data
        if (currentFilter === 'all') {
          filteredItems = [...blogData];
        } else {
          filteredItems = blogData.filter(item => item.category === currentFilter);
        }

        // 2) pagination slice
        const totalItems = filteredItems.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
        // ensure currentPage is within bounds
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, totalItems);
        const pageItems = filteredItems.slice(start, end);

        // 3) build grid HTML
        let html = '';
        if (pageItems.length === 0) {
          // show empty state (optional)
          html = `<div class="col-12 text-center" style="padding:3rem 0; color:#64748b;">No posts match this filter.</div>`;
        } else {
          pageItems.forEach((item, index) => {
            // compute delay for aos (just for visual, but we keep data attributes)
            const delay = 100 + (index % 3) * 100;
            html += `
              <div class="col-lg-4 col-md-6 blog-item" data-category="${item.category}" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card-premium entity-card">
                  <img src="${item.img}" alt="${item.title}" loading="lazy">
                  <div class="entity-body">
                    <p class="entity-meta mb-2"><i class="fas fa-calendar me-1"></i> ${item.date}</p>
                    <h5>${item.title}</h5>
                    <p>${item.desc}</p>
                    <a href="${item.link}" class="fw-bold text-primary-orange text-decoration-none">Read More <i class="fas fa-arrow-right ms-1"></i></a>
                  </div>
                </div>
              </div>
            `;
          });
        }
        grid.innerHTML = html;

        // 4) update pagination controls
        updatePaginationControls(totalPages);
      }

      // ----- update pagination buttons & page numbers -----
      function updatePaginationControls(totalPages) {
        // prev / next disabled
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages || totalPages === 0);

        // generate page number buttons
        let pagesHtml = '';
        for (let i = 1; i <= totalPages; i++) {
          const activeClass = (i === currentPage) ? 'active-page' : '';
          pagesHtml += `<button class="page-btn ${activeClass}" data-page="${i}">${i}</button>`;
        }
        pageNumbersSpan.innerHTML = pagesHtml;

        // attach click listeners to page numbers
        document.querySelectorAll('#page-numbers .page-btn').forEach(btn => {
          btn.addEventListener('click', function(e) {
            const page = parseInt(this.getAttribute('data-page'), 10);
            if (!isNaN(page) && page !== currentPage) {
              currentPage = page;
              render();
            }
          });
        });
      }

      // ----- filter logic (tab clicks) -----
      function initFilterTabs() {
        const filterButtons = document.querySelectorAll('.filter-tabs .btn');
        filterButtons.forEach(btn => {
          btn.addEventListener('click', function() {
            // update active class
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // read filter
            const filter = this.getAttribute('data-filter') || 'all';
            currentFilter = filter;
            currentPage = 1;   // reset to first page on filter change
            render();
          });
        });
      }

      // ----- pagination prev/next listeners -----
      function initPaginationNav() {
        prevBtn.addEventListener('click', function() {
          if (currentPage > 1) {
            currentPage--;
            render();
          }
        });
        nextBtn.addEventListener('click', function() {
          const totalItems = (currentFilter === 'all') ? blogData.length : blogData.filter(i => i.category === currentFilter).length;
          const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
          if (currentPage < totalPages) {
            currentPage++;
            render();
          }
        });
      }

      // ----- initial render -----
      function init() {
        // set initial filter from active tab
        const activeTab = document.querySelector('.filter-tabs .btn.active');
        if (activeTab) {
          currentFilter = activeTab.getAttribute('data-filter') || 'all';
        }
        currentPage = 1;
        render();
        initFilterTabs();
        initPaginationNav();
      }

      // start
      init();
    })();

  // Swiper Init (if swiper exists)
  if (typeof Swiper !== 'undefined') {
    new Swiper('.hero-slider', {
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });

    new Swiper('.logo-slider', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 3000 },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }
    });

    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }
    });
  }

});


const homeLink = document.getElementById("homeDropdown");

homeLink.addEventListener("click", function (e) {
    if (window.innerWidth > 991) {
        window.location.href = this.getAttribute("href");
    }
});

document.querySelectorAll('.nav-item.dropdown > .nav-link.dropdown-toggle').forEach(link => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth > 991) {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
        }
    });
});