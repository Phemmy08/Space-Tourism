// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Explore button functionality
    const exploreButton = document.querySelector('.explore-button');
    
    exploreButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 150);
        
        // You can add navigation logic here
        console.log('Explore button clicked - Ready for space travel!');
        
        // Example: Add a pulse effect
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 600);
    });
    
    // Add pulse animation class via CSS
    const style = document.createElement('style');
    style.textContent = `
        .pulse {
            animation: pulse 0.6s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('background-img');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Logo animation on click
    const logo = document.querySelector('.logo-icon');
    
    logo.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.8s ease-in-out';
        
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 800);
    });
    
    // Add typing effect to the title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.content-left, .content-right');
    animateElements.forEach(el => observer.observe(el));
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Adjust layout based on screen size
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.navbar');
        
        if (isMobile) {
            navbar.style.padding = '1rem';
        } else {
            navbar.style.padding = '2rem 4rem';
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('nav-item')) {
            e.target.click();
        }
        
        if (e.key === ' ' && e.target === exploreButton) {
            e.preventDefault();
            exploreButton.click();
        }
    });
    
    // Add focus styles for accessibility
    navItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
            this.style.outlineOffset = '4px';
        });
        
        item.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    exploreButton.setAttribute('tabindex', '0');
    exploreButton.addEventListener('focus', function() {
        this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
        this.style.outlineOffset = '8px';
    });
    
    exploreButton.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
    
    console.log('Space Travel Website initialized successfully! 🚀');
});