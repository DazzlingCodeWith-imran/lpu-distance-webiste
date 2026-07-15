document.addEventListener("DOMContentLoaded", () => {

    const slidesEl = document.getElementById("slides");
    const dotsEl = document.getElementById("dots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!slidesEl || !dotsEl || !prevBtn || !nextBtn) return;

    const slides = slidesEl.querySelectorAll(".slide");
    const total = slides.length;

    if (total <= 1) return;

    let index = 0;
    let autoSlide = null;

    // Create Dots
    dotsEl.innerHTML = "";

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            index = i;
            render();
            restartAuto();
        });

        dotsEl.appendChild(dot);
    });

    function render() {

        slidesEl.style.transform = `translate3d(-${index * 100}%,0,0)`;

        [...dotsEl.children].forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

    }

    function next() {
        index++;
        if (index >= total) index = 0;
        render();
    }

    function prev() {
        index--;
        if (index < 0) index = total - 1;
        render();
    }

    function startAuto() {
        stopAuto();
        autoSlide = setInterval(next, 3500);
    }

    function stopAuto() {
        if (autoSlide) {
            clearInterval(autoSlide);
            autoSlide = null;
        }
    }

    function restartAuto() {
        startAuto();
    }

    nextBtn.addEventListener("click", () => {
        next();
        restartAuto();
    });

    prevBtn.addEventListener("click", () => {
        prev();
        restartAuto();
    });

    // Pause when tab inactive
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAuto();
        } else {
            startAuto();
        }
    });

    // Initial Render
    render();

    // FIX: reduced-motion check ab sirf entrance/CSS animations
    // ke liye hai, autoplay slider ko band nahi karega.
    // Pehle "stopAuto()" yahan call hota tha jo autoplay ko
    // turant band kar deta tha agar OS me reduce-motion ON tha —
    // isi wajah se refresh ke baad slider khud se nahi chalta tha,
    // sirf click karne par restartAuto() se chalta tha.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Slider ka auto-transition ek functional feature hai,
        // isliye ise reduce-motion se disable nahi kar rahe.
        // Sirf decorative entrance animations (agar CSS me hain)
        // yahan disable karo, jaise:
        const hero = document.getElementById("heroContent");
        if (hero) hero.style.animation = "none";

        document.querySelectorAll(".eyebrow,.hero-title,.hero-subtitle,.cta-row,.badge-strip")
            .forEach(el => {
                el.style.animation = "none";
                el.style.opacity = "1";
                el.style.transform = "none";
            });
    }

    // Start Immediately — ab yeh hamesha chalega
    startAuto();

});