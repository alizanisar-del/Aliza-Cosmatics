document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active'); // You can add animation to the hamburger here if needed
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
    }));

    // Add to Cart Functionality
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = 0;

    if (cartButtons.length === 0) {
        console.warn('No add-to-cart buttons found');
    }

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            console.log('Add to cart clicked');
            const btn = e.currentTarget;
            const productName = btn.getAttribute('data-name');
            const productPrice = btn.getAttribute('data-price');

            if (!productName || !productPrice) {
                console.error('Product data missing');
                return;
            }

            // Cart Logic
            cartCount++;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;

                // Cart Animation
                cartCountElement.classList.remove('bump'); // Reset animation
                void cartCountElement.offsetWidth; // Trigger reflow
                cartCountElement.classList.add('bump');
            } else {
                console.error('Cart count element not found');
            }

            // Simple Notification
            showNotification(`Added ${productName} to cart! - $${productPrice}`);
        });
    });

    // Notification System
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;

        // Append to body
        document.body.appendChild(notification);

        // Add styles dynamically
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#2c2c2c',
            color: '#fff',
            padding: '15px 25px',
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            transform: 'translateY(100px)',
            transition: 'transform 0.3s ease',
            zIndex: '10000' // Increased z-index to ensure visibility
        });

        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                notification.style.transform = 'translateY(0)';
            });
        });

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.addEventListener('transitionend', () => {
                notification.remove();
            });
        }, 3000);
    }

    // Scroll Animation (Fade In Elements)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .offer-card, .review-card, .contact-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .bump {
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(style);
});
