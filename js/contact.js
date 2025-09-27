// Contact Form Management
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.formSuccess = document.getElementById('formSuccess');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.setupValidation();
            this.setupPhoneFormatting();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.showLoading();
            this.simulateSubmission();
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-group');
        
        // Clear previous errors
        this.clearFieldError(fieldGroup);

        // Required field validation
        if (!value) {
            this.showFieldError(fieldGroup, 'This field is required');
            return false;
        }

        // Email validation
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(fieldGroup, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(fieldGroup, 'Please enter a valid phone number');
                return false;
            }
        }

        return true;
    }

    showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('error');
        
        let errorElement = fieldGroup.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            fieldGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(fieldGroup) {
        fieldGroup.classList.remove('error');
        const errorElement = fieldGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') || input.value.trim()) {
                    this.validateField(input);
                }
            });

            input.addEventListener('input', () => {
                const fieldGroup = input.closest('.form-group');
                if (fieldGroup.classList.contains('error')) {
                    this.clearFieldError(fieldGroup);
                }
            });
        });
    }

    setupPhoneFormatting() {
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                // Bangladesh phone number formatting
                if (value.startsWith('880')) {
                    value = '+' + value.substring(0, 3) + ' ' + value.substring(3, 7) + ' ' + value.substring(7);
                } else if (value.startsWith('01')) {
                    value = '+880 ' + value.substring(1, 5) + ' ' + value.substring(5);
                }
                
                e.target.value = value;
            });
        }
    }

    showLoading() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        this.submitBtn.disabled = true;
    }

    hideLoading() {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        this.submitBtn.disabled = false;
    }

    simulateSubmission() {
        // Simulate API call
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess();
            this.trackFormSubmission();
        }, 2000);
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.formSuccess.style.display = 'flex';
        
        // Scroll to success message
        this.formSuccess.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    reset() {
        this.form.style.display = 'block';
        this.formSuccess.style.display = 'none';
        this.form.reset();
        
        // Clear any validation errors
        const errorGroups = this.form.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => this.clearFieldError(group));
        
        // Scroll back to form
        this.form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    trackFormSubmission() {
        const inquiryType = document.getElementById('inquiryType').value;
        
        // Analytics tracking (replace with your analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: inquiryType || 'unknown',
                value: 1
            });
        }
        
        console.log('Contact form submitted:', {
            inquiry_type: inquiryType,
            timestamp: new Date().toISOString()
        });
    }
}

// FAQ Management
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        // Auto-close other FAQs when one opens
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-question')) {
                const clickedFAQ = e.target.closest('.faq-item');
                const allFAQs = document.querySelectorAll('.faq-item');
                
                allFAQs.forEach(faq => {
                    if (faq !== clickedFAQ && faq.classList.contains('active')) {
                        faq.classList.remove('active');
                    }
                });
            }
        });
    }
}

// FAQ Toggle Function (called from HTML)
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        faqItem.classList.add('active');
    }
}

// Reset Form Function (called from HTML)
function resetForm() {
    const contactForm = window.contactFormInstance;
    if (contactForm) {
        contactForm.reset();
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.nav = document.querySelector('.nav');
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.header') && this.nav.classList.contains('active')) {
                    this.closeMenu();
                }
            });
            
            // Close menu when clicking on nav links
            this.nav.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.nav.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMenu() {
        this.nav.classList.remove('active');
        this.menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.method-card, .detail-item, .faq-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Form Field Enhancements
class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupTextareaAutoResize();
        this.setupInquiryTypeSuggestions();
        this.setupCharacterCounter();
    }

    setupTextareaAutoResize() {
        const textarea = document.getElementById('message');
        if (textarea) {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
    }

    setupInquiryTypeSuggestions() {
        const inquiryType = document.getElementById('inquiryType');
        const messageField = document.getElementById('message');
        
        const suggestions = {
            'sales': 'Please tell us about your pharmacy size, current challenges, and what features interest you most...',
            'demo': 'What would you like to see in a demo? Any specific features or use cases you\'d like us to focus on?',
            'support': 'Please describe the issue you\'re experiencing, including any error messages...',
            'partnership': 'Tell us about your organization and what type of partnership you\'re interested in...',
            'career': 'What position are you interested in? Please tell us about your background...',
            'other': 'Please provide as much detail as possible about your inquiry...'
        };
        
        if (inquiryType && messageField) {
            inquiryType.addEventListener('change', function() {
                const selectedType = this.value;
                if (suggestions[selectedType] && !messageField.value.trim()) {
                    messageField.placeholder = suggestions[selectedType];
                }
            });
        }
    }

    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        const maxLength = 1000;
        
        if (messageField) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: var(--gray-500);
                margin-top: 0.25rem;
            `;
            
            messageField.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const currentLength = messageField.value.length;
                counter.textContent = `${currentLength}/${maxLength}`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = 'var(--warning)';
                } else if (currentLength > maxLength) {
                    counter.style.color = 'var(--error)';
                } else {
                    counter.style.color = 'var(--gray-500)';
                }
            };
            
            messageField.addEventListener('input', updateCounter);
            updateCounter();
        }
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Log page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.now();
                console.log(`Contact page loaded in ${loadTime.toFixed(2)}ms`);
            }
        });

        // Track user interactions
        this.trackInteractions();
    }

    trackInteractions() {
        // Track method card clicks
        document.querySelectorAll('.method-action').forEach(action => {
            action.addEventListener('click', (e) => {
                const methodType = e.target.closest('.method-card').querySelector('h3').textContent;
                console.log('Method clicked:', methodType);
            });
        });

        // Track FAQ interactions
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => {
                const faqTitle = e.target.querySelector('span').textContent;
                console.log('FAQ opened:', faqTitle);
            });
        });

        // Track map interactions
        const mapFrame = document.querySelector('.office-map iframe');
        if (mapFrame) {
            mapFrame.addEventListener('load', () => {
                console.log('Map loaded successfully');
            });
        }
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        // Global error handling
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.logError(e.error);
        });

        // Promise rejection handling
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.logError(e.reason);
        });
    }

    logError(error) {
        // In production, send to error tracking service
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            page: 'contact',
            userAgent: navigator.userAgent
        };

        // Replace with actual error tracking service
        console.log('Error logged:', errorInfo);
    }
}

// Accessibility Enhancements
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIALabels();
    }

    setupKeyboardNavigation() {
        // Handle Enter key on FAQ questions
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(question);
                }
            });
        });

        // Handle Escape key to close active FAQ
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const activeFAQ = document.querySelector('.faq-item.active');
                if (activeFAQ) {
                    activeFAQ.classList.remove('active');
                }
            }
        });
    }

    setupFocusManagement() {
        // Ensure proper focus management for form validation
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                const firstError = form.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');
                if (firstError) {
                    setTimeout(() => {
                        firstError.focus();
                    }, 100);
                }
            });
        }
    }

    setupARIALabels() {
        // Add ARIA labels for better screen reader support
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach((question, index) => {
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('aria-controls', `faq-answer-${index}`);
            
            const answer = question.nextElementSibling;
            if (answer) {
                answer.setAttribute('id', `faq-answer-${index}`);
            }
        });

        // Update ARIA attributes when FAQ state changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const faqItem = mutation.target;
                    const question = faqItem.querySelector('.faq-question');
                    const isActive = faqItem.classList.contains('active');
                    
                    if (question) {
                        question.setAttribute('aria-expanded', isActive.toString());
                    }
                }
            });
        });

        document.querySelectorAll('.faq-item').forEach(item => {
            observer.observe(item, { attributes: true });
        });
    }
}

// Theme Management (if needed)
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupThemeToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }
}

// Analytics Integration
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Contact Page',
                page_location: window.location.href
            });
        }
    }

    setupEventTracking() {
        // Track CTA clicks
        document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                this.trackEvent('button_click', {
                    button_text: buttonText,
                    section: e.target.closest('section')?.className || 'unknown'
                });
            });
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackEvent('scroll_depth', {
                        scroll_percent: maxScroll
                    });
                }
            }
        });
    }

    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        console.log('Event tracked:', eventName, parameters);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    window.contactFormInstance = new ContactForm();
    new FAQManager();
    new SmoothScroll();
    new MobileMenu();
    
    // Enhancements
    new ScrollAnimations();
    new FormEnhancements();
    new AccessibilityEnhancements();
    
    // Monitoring and analytics
    new PerformanceMonitor();
    new ErrorHandler();
    new Analytics();
    
    // Optional theme management
    // new ThemeManager();
    
    console.log('Contact page initialized successfully');
});

// Utility Functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format phone number
    formatPhoneNumber(value) {
        const cleaned = value.replace(/\D/g, '');
        
        if (cleaned.startsWith('880')) {
            return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 7)} ${cleaned.substring(7)}`;
        } else if (cleaned.startsWith('01')) {
            return `+880 ${cleaned.substring(1, 5)} ${cleaned.substring(5)}`;
        }
        
        return value;
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ContactForm,
        FAQManager,
        SmoothScroll,
        MobileMenu,
        utils
    };
}