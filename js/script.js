document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       MENU MOBILE
    ========================================= */
    const navMenu = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn  = document.getElementById('menu-btn');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.replace('ph-list', 'ph-x');
        } else {
            menuIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    /* =========================================
       DARK MODE
    ========================================= */
    const themeBtn  = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    /* =========================================
       CAROUSEL
    ========================================= */
    const slides  = document.querySelectorAll('.carousel-slide');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');

    let currentSlide = 0;
    let autoPlayTimer;

    function showTargetSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        slides[currentSlide].classList.add('active');
    }

    function runAutoPlay() {
        autoPlayTimer = setInterval(() => {
            showTargetSlide(currentSlide + 1);
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        runAutoPlay();
    }

    btnNext.addEventListener('click', () => { showTargetSlide(currentSlide + 1); resetAutoPlay(); });
    btnPrev.addEventListener('click', () => { showTargetSlide(currentSlide - 1); resetAutoPlay(); });

    runAutoPlay();

    /* =========================================
       CONTADORES ANIMADOS
    ========================================= */
    const counters = document.querySelectorAll('.stat-num');

    function numCounterAnimation(el) {
        const targetNumber  = parseInt(el.getAttribute('data-target'), 10);
        const durationLimit = 2000;
        let   counterValue  = 0;
        const incrementAmount = targetNumber / (durationLimit / 20);

        const updateVisualsTimer = setInterval(() => {
            counterValue += incrementAmount;
            if (counterValue >= targetNumber) {
                el.textContent = targetNumber.toLocaleString('pt-BR');
                clearInterval(updateVisualsTimer);
            } else {
                el.textContent = Math.ceil(counterValue).toLocaleString('pt-BR');
            }
        }, 20);
    }

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numCounterAnimation(entry.target);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counterItem => {
        scrollObserver.observe(counterItem);
    });

});
