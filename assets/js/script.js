// Initialize AOS Animation with better defaults
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,    // Reduced for better performance
        once: true,
        delay: 50,         // Reduced delay for better UX
        disable: 'mobile'  // Disable on mobile for better performance
    });
});

// Loading Screen - Improved with cleaner timing
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    // Create one-time animation function
    const animateElements = () => {
        fadeUpElements.forEach((element, index) => {
            setTimeout(() => element.classList.add('active'), index * 150);
        });
        
        // Custom implementation for text rotation with extra-long first phrase display
        const setupHeroTyping = () => {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const phrases = [
                'Desenvolvedor FullStack.',
                'Especialista em Java.',
                'Especialista em Node.js.',
                'Especialista em React.'
            ];
            
            let currentPhraseIndex = 0;
            let currentCharIndex = 0;
            let isDeleting = false;
            let typingSpeed = 60;
            
            // Very long delay (ms) for the first phrase specifically - increased to 18000ms (18 seconds)
            const FIRST_PHRASE_DELAY = 3000;
            // Normal delay for other phrases
            const NORMAL_PHRASE_DELAY = 2000;
            
            // When the first phrase appears again in rotation, we want it to stay longer too
            // This function checks if we're showing "Desenvolvedor FullStack" and returns appropriate delay
            const getPhraseDelay = (index) => {
                return index % phrases.length === 0 ? FIRST_PHRASE_DELAY : NORMAL_PHRASE_DELAY;
            };
            
            function typeNextChar() {
                // Current phrase being typed
                const currentPhrase = phrases[currentPhraseIndex];
                
                // Calculate delay based on action
                let delay = typingSpeed;
                
                if (isDeleting) {
                    // Faster when deleting
                    delay = typingSpeed / 2;
                } else if (currentCharIndex === currentPhrase.length) {
                    // When reached end of phrase, wait longer
                    // Use the function to determine delay based on which phrase we're showing
                    delay = getPhraseDelay(currentPhraseIndex);
                    isDeleting = true;
                }
                
                // Update the text
                heroSubtitle.textContent = currentPhrase.substring(0, currentCharIndex);
                
                // Move to next char or phrase
                if (isDeleting) {
                    currentCharIndex--;
                } else {
                    currentCharIndex++;
                }
                
                // When deleted everything, switch to next phrase
                if (isDeleting && currentCharIndex === 0) {
                    isDeleting = false;
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                }
                
                // Loop the typing effect
                setTimeout(typeNextChar, delay);
            }
            
            // Start the typing effect
            typeNextChar();
        };

        // Replace Typed.js initialization with our custom implementation
        setupHeroTyping();
    };

    // Simplified loading sequence
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none';
            animateElements();
        }, { once: true });
    }, 1000); // Reduced waiting time
});

// Mobile Menu - Refactored for cleaner code
const setupMobileMenu = () => {
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('overlay');
    const icon = menuBtn.querySelector('i');
    
    const closeMenu = () => {
        menuBtn.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        icon.className = 'fas fa-bars'; // Direct class assignment is cleaner
    };
    
    menuBtn.addEventListener('click', () => {
        const isOpen = menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });
    
    // Event delegation for nav links instead of multiple listeners
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeMenu();
    });
    
    overlay.addEventListener('click', closeMenu);
};

// Header scroll effect - Using throttle for better performance
const setupScrollEffects = () => {
    const header = document.getElementById('header');
    let lastScrollPosition = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        lastScrollPosition = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                header.classList.toggle('scrolled', lastScrollPosition > 50);
                ticking = false;
            });
            
            ticking = true;
        }
    });
};

// Smooth scrolling for anchor links - Improved with modern method
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// Project cards hover effect - Using CSS variables for better performance
const setupProjectCards = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.setProperty('--lift-amount', '-10px');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--lift-amount', '0px');
        });
    });
};

// Skills animation - Improved with single DOM operation
const setupSkillsAnimation = () => {
    const skillsItems = document.querySelectorAll('.skills-list li');
    
    skillsItems.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 80}ms`);
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScrolling();
    setupProjectCards();
    setupSkillsAnimation();
});