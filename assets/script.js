document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        window.addEventListener('scroll', () => {
            scrollToTop.classList.toggle('visible', window.pageYOffset > 300);
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active navigation state
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (navLink) {
                navLink.classList.toggle('active',
                    scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
                );
            }
        });
    });

    // Responsive navigation
    window.addEventListener('resize', () => {
        navLinks.style.display = window.innerWidth > 768 ? 'flex' : 'none';
    });

});
