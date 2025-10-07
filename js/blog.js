document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    const newsletterForm = document.getElementById('newsletterForm');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterArticles(category);
        });
    });

    function filterArticles(category) {
        blogCards.forEach(card => {
            const cardCategory = card.dataset.category;
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
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

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            blogCards.forEach(card => {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            return;
        }

        blogCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'flex';
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

        categoryButtons.forEach(btn => btn.classList.remove('active'));
        categoryButtons[0].classList.add('active');
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('In production, this would load more articles via API. For now, all articles are displayed.');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1000);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            alert(`Thank you for subscribing with ${email}! In production, this would be connected to an email service.`);
            this.reset();
        });
    }

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

    document.querySelectorAll('.blog-card, .featured-article').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('.card-link, .btn-read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('In production, this would navigate to the full article page.');
        });
    });
});