// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Sticky Navbar Scroll Effect
window.onscroll = function() {
    const nav = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        nav.style.padding = "10px 0";
        nav.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
        nav.style.padding = "15px 0";
        nav.style.background = "#fff";
    }
};

// Mobile Menu Toggle (Simple logic)
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = '#fff';
    navLinks.style.padding = '20px';
});

// Menu Filtering Logic
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.tab-btn');

    // Update buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
