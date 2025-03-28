// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Text rotation animation
    const textElements = document.querySelectorAll('.typing-text .text');
    let currentIndex = 0;

    function showNextText() {
        // Hide current text
        textElements[currentIndex].style.opacity = '0';
        
        setTimeout(() => {
            // Move to next text
            currentIndex = (currentIndex + 1) % textElements.length;
            // Show next text
            textElements[currentIndex].style.opacity = '1';
        }, 500);
    }

    // Show first text immediately
    if (textElements.length > 0) {
        textElements[0].style.opacity = '1';
        // Start rotation
        setInterval(showNextText, 3000);
    }

    // Make hero section visible immediately
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.opacity = '1';
        hero.style.visibility = 'visible';
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
    }

    // Make all sections visible
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.style.transform = 'none';
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Navbar background change on scroll
    const nav = document.querySelector('.nav');
    
    function updateNavBackground() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavBackground);
    updateNavBackground();

    // Add hover effect to buttons
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Enhanced scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Enhanced section animations with stagger effect
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // Stagger the animations
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Center content on resize
    function adjustContentPosition() {
        if (heroContent) {
            const viewportHeight = window.innerHeight;
            const contentHeight = heroContent.offsetHeight;
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const adjustment = Math.max(0, (viewportHeight - contentHeight - navHeight) / 2);
            heroContent.style.transform = `translateY(calc(-5% + ${adjustment}px))`;
        }
    }

    window.addEventListener('resize', adjustContentPosition);
    adjustContentPosition();
});

// Add styles for new features
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #818cf8, #6366f1);
        background-size: 200% 100%;
        animation: gradient 2s linear infinite;
        z-index: 1001;
        width: 0;
        transition: width 0.2s ease;
    }

    .nav-links a.active {
        color: #6366f1 !important;
    }

    .section.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes gradient {
        0% { background-position: 0% 0%; }
        100% { background-position: 200% 0%; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
