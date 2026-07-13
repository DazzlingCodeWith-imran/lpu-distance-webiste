
(function () {
    // ---------- data ----------
    const posts = [
        {
            id: 1,
            title: "MCA Distance Education in Punjab — Scope, Fees & Career",
            desc: "Explore MCA distance education opportunities in Punjab...",
            date: "2026-02-09",
            read: "11 min",
            category: "programs",
            url: "/Pages/Blog/mca-distance-education-punjab.html"
        },
         { id: 2, title: "BCA Distance Education in Punjab — Syllabus, Eligibility & Jobs", desc: "Start your IT career with BCA distance education in Punjab. Learn about syllabus, eligibility, fees, and job opportunities after BCA from LPU.", date: "2026-02-28", read: "11 min", category: "programs",url:"/Pages/Blog/bca-distance-education-punjab.html" },
        
        { id: 3, title: "LPU BA Distance Education in Mandi — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Mandi — fees, eligibility, career scope, and how to enroll from Mandi, Himachal Pradesh.", date: "2026-02-11", read: "7 min", category: "programs"},




        { id: 4, title: "LPU BA Distance Education in Hamirpur — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Hamirpur — fees, eligibility, career scope, and how to enroll from Hamirpur, Himachal Pradesh.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 5, title: "LPU BA Distance Education in Una — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Una — fees, eligibility, career scope, and how to enroll from Una, Himachal Pradesh.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 6, title: "LPU BA Distance Education in Bilaspur — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Bilaspur — fees, eligibility, career scope, and how to enroll from Bilaspur, Himachal Pradesh.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 7, title: "LPU BA Distance Education in Kullu — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Kullu — fees, eligibility, career scope, and how to enroll from Kullu, Himachal Pradesh.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 8, title: "LPU BA Distance Education in Jammu — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Jammu — fees, eligibility, career scope, and how to enroll from Jammu, Jammu & Kashmir.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 9, title: "LPU BA Distance Education in Srinagar — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Srinagar — fees, eligibility, career scope, and how to enroll from Srinagar, Jammu & Kashmir.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 10, title: "LPU BA Distance Education in Udhampur — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Udhampur — fees, eligibility, career scope, and how to enroll from Udhampur, Jammu & Kashmir.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 11, title: "LPU BA Distance Education in Kathua — 2026 Guide", desc: "Complete guide to LPU BA Distance Education in Kathua — fees, eligibility, career scope, and how to enroll from Kathua, Jammu & Kashmir.", date: "2026-02-11", read: "7 min", category: "programs" },
        { id: 12, title: "LPU Distance Education Fee Structure 2026 — Complete Breakdown", desc: "Detailed fee breakdown for all LPU distance education programs in 2026. Compare fees across MBA, MCA, BBA, BCA, B.Com, and more.", date: "2026-02-10", read: "11 min", category: "admissions" },
        { id: 13, title: "UGC-DEB Approved Distance Education Universities in Punjab", desc: "Know which universities in Punjab are UGC-DEB approved for distance education. Don't waste your time on unrecognized degrees.", date: "2026-02-09", read: "11 min", category: "admissions" },
        { id: 14, title: "How to Apply for LPU Distance Education — Step by Step Guide", desc: "Complete step-by-step guide to applying for LPU distance education in Punjab. From documents to enrollment — everything covered.", date: "2026-02-08", read: "11 min", category: "admissions" },
        { id: 15, title: "LPU Distance Education Study Material — How to Access & Use", desc: "Complete guide to LPU's study material for distance education — online portal access, video lectures, printed material, and effective study tips.", date: "2026-02-04", read: "11 min", category: "admissions" },
        { id: 16, title: "Key Features of Distance Education — How It Works in 2026", desc: "Learn how distance education works — study materials, examinations, personal contact programmes, and the complete learning process explained.", date: "2026-02-11", read: "6 min", category: "admissions" },
        { id: 17, title: "LPU Distance Education Fees Structure 2026 — Complete Breakdown", desc: "Detailed fee breakdown for every LPU distance education program in 2026 — MBA, MCA, BBA, BCA, B.Com, BA, MA, DCA and more with payment options.", date: "2026-02-13", read: "8 min", category: "admissions" },
        { id: 18, title: "How to Get Admission in LPU Distance Education — Step by Step Guide", desc: "Complete step-by-step admission guide for LPU Distance Education 2026 — from choosing your program to getting your enrollment number.", date: "2026-02-13", read: "7 min", category: "admissions" },
        { id: 19, title: "LPU Distance Education Eligibility 2026 — All Programs", desc: "Complete eligibility criteria for all LPU distance education programs in 2026. Check if you qualify for MBA, MCA, BBA, BCA, and other programs.", date: "2026-02-12", read: "7 min", category: "admissions" },
        { id: 20, title: "LPU Distance Education Last Date 2026 — Admission Deadlines", desc: "All important dates for LPU distance education 2026 — admission last dates, application deadlines, exam schedules, and PCP dates.", date: "2026-02-13", read: "5 min", category: "admissions" },
        { id: 21, title: "Top 10 Reasons to Choose LPU Distance Education in 2026", desc: "Why do thousands of Punjab students choose LPU for distance education? Here are the top 10 reasons that make LPU the #1 choice.", date: "2026-02-06", read: "11 min", category: "career" },
        { id: 22, title: "Is Distance Education Valid for Government Jobs? Complete Guide", desc: "The most common question: Is a distance education degree valid for government jobs? Here's the complete, definitive answer with rules and examples.", date: "2026-02-05", read: "11 min", category: "career" },
        { id: 23, title: "Career Options After Distance Education in Punjab", desc: "What careers await you after completing distance education? Explore job opportunities, expected salaries, and growth paths across Punjab's industries.", date: "2026-02-03", read: "11 min", category: "career" },
        { id: 24, title: "LPU Distance Education Placement Record — Companies & Packages", desc: "Detailed placement record of LPU distance education — top recruiting companies, salary packages, and success stories from Punjab graduates.", date: "2026-02-06", read: "6 min", category: "career" },
        { id: 25, title: "Top 15 Benefits of Distance Education in 2026", desc: "Explore the top 15 benefits of distance education and understand why millions of students and professionals choose this mode of learning.", date: "2026-02-11", read: "7 min", category: "career" },
        { id: 26, title: "Is LPU Distance Education Degree Valid for Government Jobs?", desc: "Complete guide on the validity of LPU distance education degree for government jobs, competitive exams, promotions, and higher education.", date: "2026-02-13", read: "7 min", category: "career" },
        { id: 27, title: "Is Distance MBA Valid for Government Jobs? Complete Guide 2026", desc: "Find out if your distance MBA is valid for government jobs in India. UGC-DEB rules, eligible exams, and how to ensure your degree is accepted.", date: "2026-02-12", read: "8 min", category: "career" },
        { id: 28, title: "Distance MBA in Digital Marketing — Scope, Salary & Career Guide 2026", desc: "Complete guide to pursuing a distance MBA in digital marketing. Career scope, salary expectations, job roles, and why LPU's Marketing MBA is the best choice.", date: "2026-02-12", read: "8 min", category: "career" },
        { id: 29, title: "Distance MBA in Finance — Career Scope, Salary & Top Colleges 2026", desc: "Everything about distance MBA in Finance — career scope, salary expectations, top colleges, and why it's the most popular MBA specialization.", date: "2026-02-18", read: "8 min", category: "career" },
        { id: 30, title: "Distance Education vs Regular Education — Which is Better?", desc: "A fair comparison of distance and regular education — covering recognition, flexibility, career prospects, costs, and which mode suits you best.", date: "2026-02-07", read: "11 min", category: "comparison" },
        { id: 31, title: "LPU vs IGNOU Distance Education — Which is Better?", desc: "The ultimate comparison: LPU vs IGNOU for distance education. We compare fees, quality, placements, and overall value for Punjab students.", date: "2026-02-10", read: "11 min", category: "comparison" },
        { id: 32, title: "Best Online MBA Programs in Punjab 2026 — Comparison", desc: "Looking for the best online MBA in Punjab? We compare the top programs by fees, quality, placements, and value for 2026 admissions.", date: "2026-02-08", read: "11 min", category: "comparison" },
        { id: 33, title: "LPU Distance Education Review — Student Experiences 2026", desc: "Real student perspectives on LPU distance education — covering study material, exams, support quality, and honest pros and cons.", date: "2026-02-04", read: "7 min", category: "comparison" },
        { id: 34, title: "LPU vs IGNOU — Which is Better for Distance Education in 2026?", desc: "A comprehensive head-to-head comparison of LPU and IGNOU for distance education — covering fees, placements, specializations, and more.", date: "2026-02-13", read: "10 min", category: "comparison" },
        { id: 35, title: "Top 10 UGC Approved Distance Education Universities in Punjab 2026", desc: "Complete list of UGC-DEB approved universities offering distance education in Punjab with fees, NAAC grades, and program comparisons.", date: "2026-02-13", read: "9 min", category: "comparison" },
        { id: 36, title: "MBA Distance Education vs Regular MBA — Which Should You Choose?", desc: "Comprehensive comparison of MBA distance education vs regular MBA — fees, career impact, flexibility, and ROI to help you make the right choice.", date: "2026-02-13", read: "9 min", category: "comparison" },
        { id: 37, title: "Best Online University in India 2026 — Top 10 Ranked", desc: "Discover the top 10 best online universities in India for 2026. Comprehensive ranking based on NAAC grade, fees, placements, and program quality.", date: "2026-02-12", read: "10 min", category: "comparison" },
        { id: 38, title: "LPU vs Manipal Online Education — Honest Comparison 2026", desc: "Detailed comparison of LPU and Manipal online education — fees, quality, placements, and which offers better value in 2026.", date: "2026-02-12", read: "8 min", category: "comparison" },
         { id: 38, title: "BBA Distance Education in Punjab — Why Choose BBA from LPU", desc: "Discover why BBA distance education from LPU is the best choice for aspiring business professionals in Punjab. Fees, scope, and career guide.", date: "2026-02-07", read: "8 min", category: "programs",url:"/Pages/Blog/bba-distance-education-punjab.html" }
    ];

    // ---------- state ----------
    let currentPage = 1;
    const perPage = 9; // show 9 per page
    let currentCategory = 'all';
    let searchTerm = '';

    // DOM refs
    const grid = document.getElementById('blogGrid');
    const paginationWrap = document.getElementById('paginationWrap');
    const filterContainer = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    // ---------- helpers ----------
    function getFilteredPosts() {
        return posts.filter(p => {
            const matchCat = currentCategory === 'all' || p.category === currentCategory;
            const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.desc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCat && matchSearch;
        });
    }

    function render() {
        const filtered = getFilteredPosts();
        const totalPages = Math.ceil(filtered.length / perPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * perPage;
        const pageItems = filtered.slice(start, start + perPage);

        // grid
        if (pageItems.length === 0) {
            grid.innerHTML = `<div class="no-posts" style="grid-column:1/-1;">No posts found matching your criteria.</div>`;
        } else {
            grid.innerHTML = pageItems.map(p => `
                    <a href="${p.url}" class="blog-card">
                        <div class="card-top">
                            <span class="card-badge ${p.category === 'admissions' ? 'blue' : ''}">${p.category}</span>
                        </div>
                        <div class="card-body">
                            <div class="card-title">${p.title}</div>
                            <div class="card-desc">${p.desc}</div>
                            <div class="card-meta">
                                <div class="left"><span>📅 ${p.date}</span><span>⏱️ ${p.read}</span></div>
                                <span class="arrow">→</span>
                            </div>
                        </div>
                    </a>
                `).join('');
        }

        // pagination (respect totalPages)
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        paginationWrap.innerHTML = paginationHTML;
    }

    // ---------- event listeners ----------
    // category filter
    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        currentPage = 1;
        render();
    });

    // search
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.trim();
        currentPage = 1;
        render();
    });

    // pagination click (delegation)
    paginationWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.page-btn');
        if (!btn) return;
        const page = parseInt(btn.dataset.page, 10);
        if (!isNaN(page) && page !== currentPage) {
            currentPage = page;
            render();
            // scroll to top of grid
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // initial render
    render();
})();

