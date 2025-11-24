document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const playButtons = document.querySelectorAll('[data-video]');
    const pathButtons = document.querySelectorAll('.btn-start-path');

    // Category Filtering
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            filterTutorials(category);
        });
    });

    function filterTutorials(category) {
        tutorialCards.forEach(card => {
            const cardCategories = card.dataset.category.split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // "Play" buttons on thumbnails - Redirect to details
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Stop bubbling so card click doesn't fire twice
            window.location.href = 'tutorial-details.html';
        });
    });

    // "Start Learning" Path buttons
    pathButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, all paths lead to the details page example
            window.location.href = 'tutorial-details.html';
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tutorial-card, .path-card, .featured-video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Card Click Handler (Backup if HTML onclick misses)
    tutorialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If the click wasn't on a button (buttons handle their own logic)
            if (!e.target.closest('button')) {
                window.location.href = 'tutorial-details.html';
            }
        });
    });

    // Staggered animation delay for grid items
    tutorialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
    });
});