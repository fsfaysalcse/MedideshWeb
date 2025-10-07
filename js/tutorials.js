document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    const playButtons = document.querySelectorAll('[data-video]');
    const pathButtons = document.querySelectorAll('.btn-start-path');

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

    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.video;
            playVideo(videoId);
        });
    });

    function playVideo(videoId) {
        const videoTitle = videoId === 'featured' 
            ? 'Complete Setup Guide: Getting Started with MediDesh'
            : 'Tutorial Video';
        
        alert(`Video player would open here for: "${videoTitle}"\n\nIn production, this would:\n- Open a video player modal\n- Play the tutorial video\n- Track viewing progress\n- Allow fullscreen playback\n- Remember where you left off`);
    }

    pathButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pathCard = this.closest('.path-card');
            const pathTitle = pathCard.querySelector('h3').textContent;
            
            alert(`Starting learning path: "${pathTitle}"\n\nIn production, this would:\n- Navigate to the learning path page\n- Show all videos in sequence\n- Track your progress\n- Award certificates upon completion`);
        });
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

    document.querySelectorAll('.tutorial-card, .path-card, .featured-video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const tutorialCardElements = document.querySelectorAll('.tutorial-card');
    tutorialCardElements.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.play-btn-small')) {
                const title = this.querySelector('h3').textContent;
                const level = this.querySelector('.tutorial-level').textContent;
                
                alert(`Opening tutorial: "${title}"\nLevel: ${level}\n\nIn production, this would open the full tutorial page.`);
            }
        });
    });

    function simulateProgress(pathCard) {
        const progressFill = pathCard.querySelector('.progress-fill');
        const progressText = pathCard.querySelector('.progress-text');
        const totalVideos = parseInt(progressText.textContent.match(/\d+$/)[0]);
        let completed = 0;
        
        const interval = setInterval(() => {
            completed++;
            const percentage = (completed / totalVideos) * 100;
            progressFill.style.width = percentage + '%';
            progressText.textContent = `${completed} of ${totalVideos} completed`;
            
            if (completed >= totalVideos) {
                clearInterval(interval);
                setTimeout(() => {
                    alert('Congratulations! You completed this learning path! 🎉');
                }, 500);
            }
        }, 1000);
    }

    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                const playBtn = container.querySelector('[data-video]');
                if (playBtn) {
                    playBtn.click();
                }
            });
        }
    });

    tutorialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.05}s`;
    });
});