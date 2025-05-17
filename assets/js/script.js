  // Initialize AOS Animation
        AOS.init({
            duration: 800,
            once: true,
            delay: 100
        });
        
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loading-screen').style.opacity = '0';
                setTimeout(() => {
                    document.querySelector('.loading-screen').style.display = 'none';
                    
                    // Activate fade-up elements
                    const fadeUpElements = document.querySelectorAll('.fade-up');
                    fadeUpElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('active');
                        }, index * 200);
                    });
                    
                    // Initialize Typed.js
                    const options = {
                        strings: ['Desenvolvedor FullStack.', 'Especialista em Java.', 'Especialista em Node.js.', 'Especialista em React.'],
                        typeSpeed: 50,
                        backSpeed: 30,
                        backDelay: 2000,
                        loop: true
                    };
                    
                    new Typed('.hero-subtitle', options);
                    
                }, 500);
            }, 1500);
        });
        
        // Mobile Menu
        const menuBtn = document.getElementById('menu-btn');
        const nav = document.getElementById('nav');
        const overlay = document.getElementById('overlay');
        
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Change hamburger icon
            const icon = menuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link or overlay
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
        
        overlay.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Project card hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
        
        // Staggered animation for skills list
        const skillsItems = document.querySelectorAll('.skills-list li');
        skillsItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
        });