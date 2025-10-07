document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');

    function updateActiveLink() {
        let currentSection = '';
        
        contentSections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const infoBoxes = document.querySelectorAll('.info-box, .warning-box');
    infoBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateX(-20px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        box.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(box);
    });

    const purposeCards = document.querySelectorAll('.purpose-card');
    purposeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    const rightItems = document.querySelectorAll('.right-item');
    rightItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            console.log('Email link clicked:', email);
        });
    });

    updateActiveLink();
});