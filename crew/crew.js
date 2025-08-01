// Crew member data
const crewData = [
    {
        role: "FLIGHT ENGINEER",
        name: "ANOUSHEH ANSARI",
        bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
        image: "anousheh-ansari.jpg"
    },
    {
        role: "COMMANDER",
        name: "DOUGLAS HURLEY",
        bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He was the pilot of the final mission of the Space Shuttle program, STS-135. He then became one of the first astronauts to travel to the International Space Station aboard a SpaceX Crew Dragon spacecraft.",
        image: "douglas-hurley.jpg"
    },
    {
        role: "MISSION SPECIALIST",
        name: "MARK SHUTTLEWORTH",
        bio: "Mark Richard Shuttleworth is a South African entrepreneur who was the first South African to travel to space as a space tourist. He founded Canonical, the company behind the Ubuntu operating system. Shuttleworth also founded security company Thawte, which specialized in digital certificates and internet security.",
        image: "mark-shuttleworth.jpg"
    },
    {
        role: "PILOT",
        name: "VICTOR GLOVER",
        bio: "Victor Jerome Glover is a NASA astronaut of the class of 2013. He is a commander in the U.S. Navy where he pilots an F/A-18, in addition to being a test pilot and naval aviator. He was the pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station.",
        image: "victor-glover.jpg"
    }
];

// Current crew member index
let currentCrewIndex = 0;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const navItems = document.querySelectorAll('.nav-item');
    const navDots = document.querySelectorAll('.nav-dot');
    const crewRole = document.getElementById('crew-role');
    const crewName = document.getElementById('crew-name');
    const crewBio = document.getElementById('crew-bio');
    const crewImage = document.getElementById('crew-image');
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
    
    // Crew navigation dots functionality
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (index !== currentCrewIndex) {
                switchCrewMember(index);
            }
        });
        
        // Add hover effects
        dot.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.2)';
            }
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Switch crew member function
    function switchCrewMember(index) {
        if (index < 0 || index >= crewData.length) return;
        
        const crew = crewData[index];
        
        // Update active dot
        navDots.forEach(dot => dot.classList.remove('active'));
        navDots[index].classList.add('active');
        
        // Add fade out animation
        const contentElements = [crewRole, crewName, crewBio];
        contentElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        // Crew image transition
        crewImage.style.opacity = '0';
        crewImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            // Update content
            crewRole.textContent = crew.role;
            crewName.textContent = crew.name;
            crewBio.textContent = crew.bio;
            crewImage.src = crew.image;
            crewImage.alt = crew.name;
            
            // Fade in animation
            contentElements.forEach((el, idx) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, idx * 100);
            });
            
            // Image fade in
            crewImage.style.opacity = '1';
            crewImage.style.transform = 'translateX(0)';
            
        }, 300);
        
        currentCrewIndex = index;
    }
    
    // Auto-rotation functionality (optional)
    let autoRotateTimer;
    
    function startAutoRotation() {
        autoRotateTimer = setInterval(() => {
            const nextIndex = (currentCrewIndex + 1) % crewData.length;
            switchCrewMember(nextIndex);
        }, 8000); // Change every 8 seconds
    }
    
    function stopAutoRotation() {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }
    
    // Start auto-rotation
    startAutoRotation();
    
    // Stop auto-rotation when user interacts
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoRotation();
            // Restart after 10 seconds of inactivity
            setTimeout(startAutoRotation, 10000);
        });
    });
    
    // Logo animation
    logo.addEventListener('click', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.8s ease-in-out';
        
        setTimeout(() => {
            this.style.transform = 'rotate(0deg)';
        }, 800);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentCrewIndex > 0 ? currentCrewIndex - 1 : crewData.length - 1;
            switchCrewMember(prevIndex);
            stopAutoRotation();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentCrewIndex + 1) % crewData.length;
            switchCrewMember(nextIndex);
            stopAutoRotation();
        }
        
        // Number keys for direct navigation
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            switchCrewMember(index);
            stopAutoRotation();
        }
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
    
    // Crew image hover effect
    crewImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.filter = 'brightness(1.15) contrast(1.1)';
    });
    
    crewImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1.1) contrast(1)';
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next crew member
                const nextIndex = (currentCrewIndex + 1) % crewData.length;
                switchCrewMember(nextIndex);
            } else {
                // Swipe right - previous crew member
                const prevIndex = currentCrewIndex > 0 ? currentCrewIndex - 1 : crewData.length - 1;
                switchCrewMember(prevIndex);
            }
            stopAutoRotation();
        }
    }
    
    // Add focus styles for accessibility
    navDots.forEach((dot, index) => {
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `View crew member ${index + 1}`);
        
        dot.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.7)';
            this.style.outlineOffset = '4px';
        });
        
        dot.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
        
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
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
    
    // Pause auto-rotation when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRotation();
        } else {
            startAutoRotation();
        }
    });
    
    // Add CSS transitions dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-dot {
            transition: all 0.3s ease;
        }
        
        .crew-image {
            transition: all 0.5s ease;
        }
        
        .crew-info * {
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
    
    console.log('Crew page initialized successfully! 👨‍🚀');
});