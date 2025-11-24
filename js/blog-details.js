document.addEventListener('DOMContentLoaded', function() {
    
    const newsletterForm = document.getElementById('newsletterForm');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    // Newsletter Form Handling
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Subscribed!';
                submitButton.style.backgroundColor = 'var(--success)';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.textContent = 'Subscribe';
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 2000);
            }, 1000);
        });
    }
    
    // Table of Contents Smooth Scrolling
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // If href is just "#", don't do anything
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Auto-generate IDs for headings if missing (Accessibility helper)
    const articleBody = document.querySelector('.article-body');
    if (articleBody) {
        const headings = articleBody.querySelectorAll('h2, h3');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                const id = heading.textContent.toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                heading.id = id;
            }
        });
    }
    
    // Animation on Scroll
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    const notificationCards = document.querySelectorAll('.notification-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    [...highlightBoxes, ...notificationCards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(element);
    });
    
    // Sticky Sidebar Logic for mobile/desktop switching
    const sidebar = document.querySelector('.article-sidebar');
    
    function checkSidebar() {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            if (sidebar) sidebar.style.position = 'static';
        } else {
            if (sidebar) sidebar.style.position = 'sticky';
        }
    }

    window.addEventListener('resize', checkSidebar);
    checkSidebar(); // Run on init
});