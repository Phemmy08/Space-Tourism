// Planet data
const planetData = {
    moon: {
        name: "MOON",
        description: "See our planet as you've never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you're there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
        distance: "384,400 KM",
        travelTime: "3 DAYS",
        image: "moon-planet.jpg"
    },
    mars: {
        name: "MARS",
        description: "Don't forget to pack your hiking boots. You'll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It's two and a half times the size of Everest!",
        distance: "225 MIL. KM",
        travelTime: "9 MONTHS",
        image: "mars-planet.jpg"
    },
    europa: {
        name: "EUROPA",
        description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover's dream. With an icy surface, it's perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
        distance: "628 MIL. KM",
        travelTime: "3 YEARS",
        image: "europa-planet.jpg"
    },
    titan: {
        name: "TITAN",
        description: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
        distance: "1.6 BIL. KM",
        travelTime: "7 YEARS",
        image: "titan-planet.jpg"
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const navItems = document.querySelectorAll('.nav-item');
    const tabButtons = document.querySelectorAll('.tab-button');
    const planetName = document.getElementById('planet-name');
    const planetDescription = document.getElementById('planet-description');
    const distance = document.getElementById('distance');
    const travelTime = document.getElementById('travel-time');
    const planetImage = document.getElementById('planet-img');
    const logo = document.querySelector('.logo-icon');
    
    // Navigation functionality
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planetKey = this.getAttribute('data-planet');
            switchPlanet(planetKey);
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Switch planet function
    function switchPlanet(planetKey) {
        const planet = planetData[planetKey];
        
        if (!planet) return;
        
        // Add fade out animation
        const contentElements = [planetName, planetDescription, distance, travelTime];
        contentElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        // Planet image transition
        planetImage.style.opacity = '0';
        planetImage.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Update content
            planetName.textContent = planet.name;
            planetDescription.textContent = planet.description;
            distance.textContent = planet.distance;
            travelTime.textContent = planet.travelTime;
            planetImage.src = planet.image;
            planetImage.alt = planet.name + ' Planet';
            
            // Fade in animation
            contentElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Planet image fade in
            planetImage.style.opacity = '1';
            planetImage.style.transform = 'scale(1)';
            
        }, 300);
    }
    
    // Logo animation
    logo.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.8s ease-in-out';
        
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 800);
    });
    
    // Parallax effect for background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('background-img');
        const speed = scrolled * 0.3;
        
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
    
    // Planet image hover effect
    planetImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.filter = 'brightness(1.1)';
    });
    
    planetImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeTabIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
        
        if (e.key === 'ArrowLeft' && activeTabIndex > 0) {
            e.preventDefault();
            tabButtons[activeTabIndex - 1].click();
        } else if (e.key === 'ArrowRight' && activeTabIndex < tabButtons.length - 1) {
            e.preventDefault();
            tabButtons[activeTabIndex + 1].click();
        }
        
        if (e.key === 'Enter' && e.target.classList.contains('tab-button')) {
            e.target.click();
        }
    });
    
    // Add focus styles for accessibility
    tabButtons.forEach(button => {
        button.setAttribute('tabindex', '0');
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
            this.style.outlineOffset = '4px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
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
    
    // Intersection Observer for scroll animations
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
    
    // Observe elements
    const animateElements = document.querySelectorAll('.content-left, .content-right');
    animateElements.forEach(el => observer.observe(el));
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Responsive adjustments
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.navbar');
        
        if (isMobile) {
            navbar.style.padding = '1rem';
        } else {
            navbar.style.padding = '2rem 4rem';
        }
    });
    
    // Add CSS transitions dynamically
    const style = document.createElement('style');
    style.textContent = `
        .tab-button {
            transition: all 0.3s ease;
        }
        
        .planet-image {
            transition: all 0.5s ease;
        }
        
        .destination-content * {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Destination page initialized successfully! 🚀');
});