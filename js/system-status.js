document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdatedTime();
    generateUptimeChart();
    generateMiniCharts();
    setupSubscribeForm();
    
    setInterval(updateLastUpdatedTime, 60000);

    function updateLastUpdatedTime() {
        const lastUpdated = document.getElementById('lastUpdated');
        if (lastUpdated) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Asia/Dhaka',
                timeZoneName: 'short'
            };
            lastUpdated.textContent = now.toLocaleString('en-US', options);
        }
    }

    function generateUptimeChart() {
        const chartContainer = document.getElementById('uptimeChart');
        if (!chartContainer) return;

        const days = 90;
        const uptimeStates = ['excellent', 'excellent', 'excellent', 'excellent', 'good'];
        
        for (let i = 0; i < days; i++) {
            const day = document.createElement('div');
            day.className = 'chart-day';
            
            const randomState = uptimeStates[Math.floor(Math.random() * uptimeStates.length)];
            day.classList.add(randomState);
            
            const uptime = randomState === 'excellent' ? 99.5 + Math.random() * 0.5 : 
                          randomState === 'good' ? 95 + Math.random() * 4 : 
                          90 + Math.random() * 5;
            
            day.setAttribute('data-date', getDaysAgo(days - i - 1));
            day.setAttribute('data-uptime', uptime.toFixed(2) + '%');
            
            day.addEventListener('mouseenter', function(e) {
                showTooltip(e, this);
            });
            
            day.addEventListener('mouseleave', function() {
                hideTooltip();
            });
            
            chartContainer.appendChild(day);
        }
    }

    function getDaysAgo(daysAgo) {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function showTooltip(event, element) {
        const existingTooltip = document.querySelector('.uptime-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'uptime-tooltip';
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8rem;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;
        
        const date = element.getAttribute('data-date');
        const uptime = element.getAttribute('data-uptime');
        tooltip.textContent = `${date}: ${uptime} uptime`;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.uptime-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    function generateMiniCharts() {
        const miniCharts = document.querySelectorAll('.mini-chart');
        
        miniCharts.forEach(chart => {
            const values = chart.getAttribute('data-values').split(',').map(Number);
            const maxValue = Math.max(...values);
            
            values.forEach(value => {
                const bar = document.createElement('div');
                bar.className = 'bar';
                const height = (value / maxValue) * 100;
                bar.style.height = height + '%';
                chart.appendChild(bar);
            });
        });
    }

    function setupSubscribeForm() {
        const subscribeForm = document.getElementById('subscribeForm');
        
        if (subscribeForm) {
            subscribeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    alert(`Thank you! You've been subscribed to status updates at ${email}\n\nIn production, this would:\n- Send a confirmation email\n- Add you to our status notification list\n- Send updates for all incidents and maintenance`);
                    
                    button.textContent = 'Subscribed!';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        subscribeForm.reset();
                    }, 2000);
                }, 1000);
            });
        }
    }

    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.05}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
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

    document.querySelectorAll('.uptime-stat, .metric-card, .incident-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const statusDots = document.querySelectorAll('.status-dot');
    statusDots.forEach(dot => {
        dot.style.animation = 'pulse 2s ease-in-out infinite';
    });

    function simulateRealTimeUpdates() {
        const statusLabels = document.querySelectorAll('.service-status .status-label');
        
        setInterval(() => {
            statusLabels.forEach(label => {
                if (Math.random() < 0.001) {
                    const parent = label.closest('.service-status');
                    const dot = parent.querySelector('.status-dot');
                    
                    parent.classList.remove('operational');
                    parent.classList.add('degraded');
                    label.textContent = 'Degraded Performance';
                    
                    setTimeout(() => {
                        parent.classList.remove('degraded');
                        parent.classList.add('operational');
                        label.textContent = 'Operational';
                    }, 5000);
                }
            });
        }, 10000);
    }

    if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }
});