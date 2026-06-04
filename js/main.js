/**
 * Hoperite Fast Food - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENU TAB SWITCHING LOGIC
    // This makes the Plates, Meat Only, and Wings buttons work
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryGroups = document.querySelectorAll('.category-group');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the category from the button text or a data attribute
            // In our case, we'll check the text content or use the function logic
            const category = button.innerText.toLowerCase().replace(" ", "");

            // Remove 'active' class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to clicked button
            button.classList.add('active');

            // Hide all menu groups
            categoryGroups.forEach(group => {
                group.style.display = 'none';
                group.style.opacity = '0';
            });

            // Show the specific group
            const activeGroup = document.querySelector(`.category-group.${category}`);
            if (activeGroup) {
                activeGroup.style.display = 'block';
                // Add a small fade-in effect
                setTimeout(() => {
                    activeGroup.style.opacity = '1';
                    activeGroup.style.transition = 'opacity 0.4s ease';
                }, 10);
            }
        });
    });

    // 2. SMOOTH SCROLLING
    // Makes the "Menu" and "Visit Us" links slide smoothly down the page
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. STICKY NAVBAR EFFECT
    // Changes the navbar background color when you scroll down
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '5px 0';
            navbar.style.backgroundColor = '#001A42'; // Darker blue on scroll
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = '#002D72'; // Original blue
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. AUTOMATIC WHATSAPP MESSAGE LOGIC
    // (Optional) Logs when an order is attempted
    const orderButtons = document.querySelectorAll('.btn-card, .btn-whatsapp, .btn-order-nav');
    orderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Order button clicked. Redirecting to WhatsApp...");
        });
    });

});

// Function to handle category switching via inline onclick (if used in HTML)
function showCategory(cat) {
    const groups = document.querySelectorAll('.category-group');
    const buttons = document.querySelectorAll('.tab-btn');

    groups.forEach(group => group.style.display = 'none');
    buttons.forEach(btn => btn.classList.remove('active'));

    const selectedGroup = document.querySelector('.' + cat);
    if (selectedGroup) {
        selectedGroup.style.display = 'block';
    }
    
    // Find the button that matches the category and make it active
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(cat.slice(0, 3))) {
            btn.classList.add('active');
        }
    });
}
