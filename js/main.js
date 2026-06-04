/* ========================================
   HOPERITE FAST FOOD - MAIN JAVASCRIPT
   ======================================== */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMenuTabs();
    initScrollAnimations();
    initIntersectionObserver();
    initSmoothScroll();
});

/* ========================================
   NAVIGATION FUNCTIONALITY
   ======================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navigation on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ========================================
   MENU TABS FUNCTIONALITY
   ======================================== */

function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const tabContents = document.querySelectorAll('.menu-tab-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            menuTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Set first tab as active by default
    if (menuTabs.length > 0) {
        menuTabs[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 70;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   SCROLL ANIMATIONS (AOS-like)
   ======================================== */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

/* ========================================
   INTERSECTION OBSERVER
   ======================================== */

function initIntersectionObserver() {
    // Lazy load images (if needed in future)
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Format phone number for WhatsApp
function formatWhatsAppMessage(message) {
    return encodeURIComponent(message);
}

// Get WhatsApp URL
function getWhatsAppURL(phone, message) {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${formatWhatsAppMessage(message)}`;
}

// Load external AOS library if needed
function loadAOSLibrary() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/aos@next/dist/aos.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@next/dist/aos.js';
    script.onload = function() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                offset: 100,
                easing: 'ease-in-out-quad'
            });
        }
    };
    document.head.appendChild(script);
}

/* ========================================
   PERFORMANCE OPTIMIZATION
   ======================================== */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
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
}

/* ========================================
   ANALYTICS & TRACKING
   ======================================== */

// Track WhatsApp clicks
function trackWhatsAppClick(e) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_order_click', {
            'event_category': 'engagement',
            'event_label': e.target.textContent
        });
    }
}

// Add tracking to WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', trackWhatsAppClick);
});

/* ========================================
   ACCESSIBILITY
   ======================================== */

// Ensure keyboard navigation works
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

/* ========================================
   INITIALIZATION
   ======================================== */

// Load AOS library for animations (optional - using data-aos attributes)
if (document.querySelector('[data-aos]')) {
    loadAOSLibrary();
}

console.log('Hoperite Fast Food - Website loaded successfully');
