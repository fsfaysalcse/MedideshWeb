document.addEventListener('DOMContentLoaded', function() {
    
    const tocLinks = document.querySelectorAll('.toc-link');
    const stepContainers = document.querySelectorAll('.step-container');
    const sidebar = document.querySelector('.sidebar');
    
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
    
    const relatedItems = document.querySelectorAll('.related-item');
    relatedItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('Related tutorial clicked');
        });
    });
    
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
    
    const stepNumbers = document.querySelectorAll('.step-number');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 600);
            }
        });
    }, observerOptions);
    
    stepNumbers.forEach(number => {
        observer.observe(number);
    });
    
    const featureListItems = document.querySelectorAll('.feature-list li');
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.5 });
    
    featureListItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        itemObserver.observe(item);
    });
    
    const videoIframe = document.querySelector('.video-container iframe');
    if (videoIframe) {
        videoIframe.addEventListener('load', function() {
            console.log('Video loaded successfully');
        });
    }
    
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(46, 139, 87, 0.4); }
            100% { transform: scale(1); }
        }
        
        .header {
            transition: transform 0.3s ease;
        }
        
        .step-number {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    infoBoxes.forEach(box => {
        boxObserver.observe(box);
    });
    
    if (window.matchMedia('(max-width: 1024px)').matches) {
        if (sidebar) {
            sidebar.style.position = 'static';
        }
    }
    
    window.addEventListener('resize', function() {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            if (sidebar) {
                sidebar.style.position = 'static';
            }
        } else {
            if (sidebar) {
                sidebar.style.position = 'sticky';
            }
        }
    });
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    console.log('Tutorial details page initialized');
});