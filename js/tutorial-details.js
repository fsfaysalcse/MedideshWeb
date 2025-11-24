document.addEventListener('DOMContentLoaded', function() {
    
    const tocLinks = document.querySelectorAll('.toc-link');
    const stepContainers = document.querySelectorAll('.step-container');
    const sidebar = document.querySelector('.sidebar');
    
    // Update active Table of Contents link on scroll
    function updateActiveLink() {
        let currentStep = null;
        const scrollPosition = window.scrollY + 150;
        
        stepContainers.forEach((step, index) => {
            const stepTop = step.offsetTop;
            const stepBottom = stepTop + step.offsetHeight;
            
            if (scrollPosition >= stepTop && scrollPosition < stepBottom) {
                currentStep = index;
            }
        });
        
        tocLinks.forEach((link, index) => {
            link.classList.remove('active');
            if (index === currentStep) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Smooth scroll for TOC links
    tocLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetStep = stepContainers[index];
            if (targetStep) {
                const headerOffset = 100;
                const elementPosition = targetStep.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Platform icons interaction
    const platformIcons = document.querySelectorAll('.platform-icon');
    platformIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            if (title) {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate step numbers on scroll
    const stepNumbers = document.querySelectorAll('.step-number');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.6s ease-out';
                // Remove animation class after it runs so it can't re-trigger weirdly
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stepNumbers.forEach(number => {
        observer.observe(number);
    });
});