/* Scroll spy - highlight left sidebar tab based on visible section */
(function() {
    const sections = document.querySelectorAll('section[id^="section-"]');
    const tabs = document.querySelectorAll('.section-tab');

    function updateActiveTab() {
        const scrollPos = window.scrollY + 100;
        let activeSection = 1;

        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeSection = index + 1;
            }
        });

        tabs.forEach(tab => {
            const sectionNum = parseInt(tab.getAttribute('data-section'), 10);
            tab.classList.toggle('active', sectionNum === activeSection);
        });
    }

    // Update on scroll (throttled)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveTab();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll for tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Initial check
    updateActiveTab();
})();
