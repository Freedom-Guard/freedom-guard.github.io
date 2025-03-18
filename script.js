// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Function to set theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);

        // Add transition class
        document.documentElement.classList.add('theme-transition');
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    }

    // Function to update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            themeSwitch.title = 'Switch to light mode';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            themeSwitch.title = 'Switch to dark mode';
        }
    }

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;

    // Apply initial theme
    setTheme(currentTheme);

    // Theme switch event listener
    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Add theme transition styles
    const style = document.createElement('style');
    style.textContent = `
        .theme-transition,
        .theme-transition *,
        .theme-transition *:before,
        .theme-transition *:after {
            transition: all 0.3s ease-in-out !important;
            transition-delay: 0 !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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

    // Add scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .service-card, .download-card').forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });
});

// Add CSS class for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
        .fade-out {
            transition: none;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animateElements = document.querySelectorAll('.hero-content, .download-card, .service-card, .about-content, .contact-content');
animateElements.forEach(element => {
    observer.observe(element);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Add loading animation to download buttons
document.querySelectorAll('.download-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 2000);
    });
});
