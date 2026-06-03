// Initialize Animations
AOS.init({
    duration: 1000,
    once: true
});

// Sticky Header Logic
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Mobile Menu Toggle (can be expanded)
const mobileToggle = document.querySelector('.mobile-toggle');
mobileToggle.addEventListener('click', () => {
    alert("Mobile menu would open here in a full production version.");
});