document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsletterForm = document.getElementById('newsletterForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const loadMoreBtn = document.querySelector('.btn-load-more');

    // --- 1. Smooth Scrolling on Category Click ---
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the ID from the data-target attribute
            const targetId = this.dataset.target;
            
            // Handle "All Posts" or "Featured" separately to scroll to top
            if(targetId === 'all' || targetId === 'featured') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Calculate offset for fixed header (73px) + category nav (approx 60px) + padding
                const headerOffset = 160; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Active State on Scroll (Scroll Spy) ---
    const observerOptions = {
        root: null,
        // Trigger when the section is roughly near the top-middle of the viewport
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to the button matching the visible section ID
                const id = entry.target.getAttribute('id');
                const activeButton = document.querySelector(`.category-btn[data-target="${id}"]`);
                
                if (activeButton) {
                    activeButton.classList.add('active');
                } else if (id === 'featured') {
                    // Highlight "All Posts" or "Featured" if at top
                    const firstBtn = document.querySelector('.category-btn[data-target="all"]');
                    if(firstBtn) firstBtn.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe all sections that have an ID
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 3. Search Functionality (Scrolls to match) ---
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const allCards = document.querySelectorAll('.blog-card, .featured-article');
        
        if (searchTerm === '') return;

        let hasResults = false;

        // Loop through all articles to find a match
        for (const card of allCards) {
            const title = card.querySelector('h2, h3').textContent.toLowerCase();
            const excerpt = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                // Scroll to the specific card
                const offset = 200;
                const elementPosition = card.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });

                // Add a temporary highlight effect
                card.style.transition = 'transform 0.3s, box-shadow 0.3s';
                card.style.transform = 'scale(1.02)';
                card.style.boxShadow = '0 0 0 4px var(--primary-200)'; // Visual cue

                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 1500);

                hasResults = true;
                break; // Stop at the first match
            }
        }

        if (!hasResults) {
            alert("No articles found matching that term.");
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // --- 4. Load More Button (Simulation) ---
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('In production, this would load more articles via API.');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1000);
        });
    }

    // --- 5. Newsletter Form ---
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    // --- 6. Link Handling for Details Page ---
    document.querySelectorAll('.card-link, .btn-read-more, .featured-article, .blog-card').forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent redirect if clicking specific inner buttons/inputs
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            
            // Check if it's already an anchor tag to avoid double redirection
            if (this.tagName !== 'A') {
                window.location.href = 'blog-details.html';
            }
        });
    });

    // --- 7. Entrance Animations ---
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blog-card, .featured-article').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});