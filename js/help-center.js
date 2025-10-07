document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('helpSearch');
    const searchBtn = document.querySelector('.search-btn');
    const categoryCards = document.querySelectorAll('.category-card');
    const articleItems = document.querySelectorAll('.article-item');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }

        let foundResults = false;

        articleItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'flex';
                item.style.backgroundColor = 'var(--primary-50)';
                foundResults = true;
                
                setTimeout(() => {
                    item.style.backgroundColor = 'var(--white)';
                }, 2000);
            } else {
                item.style.display = 'flex';
            }
        });

        if (foundResults) {
            const popularSection = document.querySelector('.popular-articles');
            popularSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert(`No results found for "${searchTerm}". Try different keywords or browse categories below.`);
        }
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category || 'general';
            alert(`In production, this would navigate to the ${category} category page with filtered articles.`);
        });
    });

    articleItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('h3').textContent;
            alert(`In production, this would open the full article: "${title}"`);
        });
    });

    const supportOptions = document.querySelectorAll('.support-option');
    supportOptions.forEach(option => {
        const chatOption = option.querySelector('h3');
        if (chatOption && chatOption.textContent === 'Live Chat') {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Live chat widget would open here. In production, this would connect to a live support agent.');
            });
        }
    });

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

    document.querySelectorAll('.category-card, .article-item, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
});

function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!wasActive) {
        faqItem.classList.add('active');
    }
}