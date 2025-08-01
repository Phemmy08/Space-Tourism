// Space Launch 101 Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Data for different launch vehicles
    const launchVehicles = [
        {
            title: "LAUNCH VEHICLE",
            description: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
            image: "rocket-launch.jpg"
        },
        {
            title: "SPACEPORT",
            description: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, similar to an airport or seaport. Currently, only a handful of spaceports exist worldwide that can launch vehicles into orbit. Our spaceport features state-of-the-art facilities and launch infrastructure.",
            image: "spaceport.jpg"
        },
        {
            title: "SPACE CAPSULE",
            description: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry vehicle designed to return to Earth's surface safely. The capsule is designed to survive re-entry through Earth's atmosphere and land or splash down safely, protecting the crew and cargo inside.",
            image: "space-capsule.jpg"
        }
    ];

    // Get DOM elements
    const stepCircles = document.querySelectorAll('.step-circle');
    const mainHeading = document.querySelector('.main-heading');
    const description = document.querySelector('.description');
    const rocketImage = document.querySelector('.rocket-image');

    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-menu li');

    // Step navigation functionality
    stepCircles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            // Remove active class from all circles
            stepCircles.forEach(c => c.classList.remove('active'));
            // Add active class to clicked circle
            circle.classList.add('active');
            
            // Update content based on selected step
            updateContent(index);
        });

        // Add hover effects
        circle.addEventListener('mouseenter', () => {
            if (!circle.classList.contains('active')) {
                circle.style.transform = 'scale(1.1)';
            }
        });

        circle.addEventListener('mouseleave', () => {
            if (!circle.classList.contains('active')) {
                circle.style.transform = 'scale(1)';
            }
        });
    });

    // Navigation menu hover effects
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.style.borderBottom = '3px solid rgba(255, 255, 255, 0.5)';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.borderBottom = 'none';
            }
        });

        // Click functionality for navigation
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Function to update content
    function updateContent(index) {
        const vehicle = launchVehicles[index];
        
        // Add fade out effect
        mainHeading.style.opacity = '0';
        description.style.opacity = '0';
        rocketImage.style.opacity = '0';

        setTimeout(() => {
            // Update content
            mainHeading.textContent = vehicle.title;
            description.textContent = vehicle.description;
            rocketImage.src = vehicle.image;
            rocketImage.alt = vehicle.title;

            // Fade in new content
            mainHeading.style.opacity = '1';
            description.style.opacity = '1';
            rocketImage.style.opacity = '1';
        }, 300);
    }

    // Smooth scrolling for navigation (if implementing single-page navigation)
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        const activeStep = document.querySelector('.step-circle.active');
        const activeIndex = Array.from(stepCircles).indexOf(activeStep);

        if (e.key === 'ArrowUp' && activeIndex > 0) {
            e.preventDefault();
            stepCircles[activeIndex - 1].click();
        } else if (e.key === 'ArrowDown' && activeIndex < stepCircles.length - 1) {
            e.preventDefault();
            stepCircles[activeIndex + 1].click();
        }
    });

    // Add scroll animations
    function handleScroll() {
        const elements = document.querySelectorAll('.step-circle, .main-heading, .description');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Initialize animations on load
    setTimeout(() => {
        const elements = document.querySelectorAll('.section-title, .step-circle, .main-heading');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);

    // Add CSS transitions programmatically
    const style = document.createElement('style');
    style.textContent = `
        .main-heading, .description, .rocket-image {
            transition: opacity 0.3s ease-in-out;
        }
        
        .step-circle {
            transition: all 0.3s ease;
        }
        
        .section-title, .main-heading {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Set initial body opacity
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    console.log('Space Launch 101 - Interactive features loaded successfully! 🚀');
});