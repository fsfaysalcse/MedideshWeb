document.addEventListener('DOMContentLoaded', function() {
    
    const shareButtons = document.querySelectorAll('.share-btn');
    const newsletterForm = document.getElementById('newsletterForm');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleTitle = document.querySelector('.article-title').textContent;
            const articleUrl = window.location.href;
            
            if (this.classList.contains('facebook')) {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('linkedin')) {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
                window.open(linkedinUrl, '_blank', 'width=600,height=400');
            } else {
                navigator.clipboard.writeText(articleUrl).then(() => {
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
                    this.style.backgroundColor = 'var(--success)';
                    this.style.borderColor = 'var(--success)';
                    this.style.color = 'var(--white)';
                    
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.style.backgroundColor = '';
                        this.style.borderColor = '';
                        this.style.color = '';
                    }, 2000);
                });
            }
        });
    });
    
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
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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
    
    const articleImages = document.querySelectorAll('.article-body img');
    articleImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    const relatedArticleLinks = document.querySelectorAll('.related-articles a, .post-card');
    relatedArticleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Related article clicked');
        });
    });
    
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    const notificationCards = document.querySelectorAll('.notification-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
        threshold: 0.3,
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
    
    [...highlightBoxes, ...notificationCards, ...statCards].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(element);
    });
    
    const featureListItems = document.querySelectorAll('.article-body ul.feature-list li');
    featureListItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.5 });
        
        itemObserver.observe(item);
    });
    
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        stepObserver.observe(step);
    });
    
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const sidebar = document.querySelector('.article-sidebar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        if (sidebar && window.innerWidth > 1024) {
            const sidebarTop = sidebar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sidebarTop < 100) {
                sidebar.style.position = 'sticky';
                sidebar.style.top = '100px';
            }
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    const readingTime = document.querySelector('.meta-item:last-child');
    if (readingTime && articleBody) {
        const text = articleBody.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTimeMinutes = Math.ceil(wordCount / 200);
        
        console.log(`Estimated reading time: ${readingTimeMinutes} minutes`);
    }
    
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
    
    console.log('Blog details page initialized');
});