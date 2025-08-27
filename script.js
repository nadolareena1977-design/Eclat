// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM elements
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');

// Product data
const products = {
    gold: {
        id: 1,
        name: 'Gold Eclat',
        price: 2450,
        image: 'product_images/gold_eclat.PNG',
        category: 'Gold Collection'
    },
    silver: {
        id: 2,
        name: 'Silver Eclat',
        price: 2450,
        image: 'product_images/silver_eclat.PNG',
        category: 'Silver Collection'
    }
};

// Add to cart function
function addToCart(category) {
    const product = products[category];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Update cart display
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6c757d;">Your cart is empty</p>';
        cartTotal = 0;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.cssText = `
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 0;
                border-bottom: 1px solid #f8f9fa;
            `;
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #1a4d2e;">${item.name}</h4>
                    <p style="margin: 0; color: #6c757d;">Rs ${item.price} x ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="background: #d4af37; border: none; color: #1a1a1a; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                    <span style="font-weight: 600;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="background: #d4af37; border: none; color: #1a1a1a; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    cartTotalElement.textContent = `Rs ${cartTotal.toFixed(0)}`;
}

// Update item quantity
function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    } else {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Toggle cart modal
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

// Close cart modal
function closeCart() {
    cartModal.style.display = 'none';
}

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a, .nav-menu-secondary a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4af37;
        color: #1a1a1a;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!');
    this.reset();
});

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Prepare checkout data
    const checkoutData = {
        items: cart,
        total: cartTotal,
        currency: 'INR'
    };
    
    // Store checkout data in sessionStorage for the checkout page
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
});

// Header scroll effect removed - header maintains consistent appearance

// Enhanced Intersection Observer for animations (disabled for now)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    // Observer is currently disabled to prevent hiding content
}, observerOptions);

// Initialize elements on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all elements are visible
    const elements = document.querySelectorAll('.product-card, .feature-card, .about-content, .contact-content, .section-title');
    
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Initialize cart
updateCart();

// Image viewer functionality
let currentViewerCategory = '';
let currentViewerIndex = 0;

function openImageViewer(category, index) {
    currentViewerCategory = category;
    currentViewerIndex = index;
    
    const modal = document.getElementById('imageViewerModal');
    const productName = document.getElementById('viewerProductName');
    const mainImage = document.getElementById('mainViewerImage');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    
    // Set product name
    productName.textContent = category === 'gold' ? 'Gold Eclat Gallery' : 'Silver Eclat Gallery';
    
    // Set main image
    const images = category === 'gold' ? goldImages : silverImages;
    mainImage.src = images[index];
    
    // Create thumbnails
    thumbnailContainer.innerHTML = '';
    images.forEach((img, i) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.className = `thumbnail ${i === index ? 'active' : ''}`;
        thumbnail.onclick = () => goToViewerImage(i);
        thumbnailContainer.appendChild(thumbnail);
    });
    
    modal.style.display = 'flex';
}

function closeImageViewer() {
    document.getElementById('imageViewerModal').style.display = 'none';
}

function changeViewerImage(direction) {
    const images = currentViewerCategory === 'gold' ? goldImages : silverImages;
    currentViewerIndex = (currentViewerIndex + direction + images.length) % images.length;
    updateViewerImage();
}

function goToViewerImage(index) {
    currentViewerIndex = index;
    updateViewerImage();
}

function updateViewerImage() {
    const images = currentViewerCategory === 'gold' ? goldImages : silverImages;
    const mainImage = document.getElementById('mainViewerImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image
    mainImage.src = images[currentViewerIndex];
    
    // Update thumbnails
    thumbnails.forEach((thumb, index) => {
        if (index === currentViewerIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Close image viewer when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('imageViewerModal');
    if (e.target === modal) {
        closeImageViewer();
    }
});

// Smooth scroll to products section
function scrollToProducts() {
    const productSection = document.getElementById('product');
    if (productSection) {
        productSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Image carousel functionality
let currentImageIndex = {
    gold: 0,
    silver: 0
};

const goldImages = [
    'product_images/gold_eclat.PNG',
    'product_images/gold_cafe.PNG',
    'product_images/gold_house.PNG',
    'product_images/gold_workspace.PNG',
    'product_images/gold_nature.PNG'
];

const silverImages = [
    'product_images/silver_eclat.PNG',
    'product_images/silver_cafe.PNG',
    'product_images/silver_house.PNG',
    'product_images/silver_workspace.PNG',
    'product_images/silver_nature.PNG'
];

function changeImage(category, direction) {
    if (category === 'gold') {
        currentImageIndex.gold = (currentImageIndex.gold + direction + goldImages.length) % goldImages.length;
        updateCarousel('gold');
    } else if (category === 'silver') {
        currentImageIndex.silver = (currentImageIndex.silver + direction + silverImages.length) % silverImages.length;
        updateCarousel('silver');
    }
}

function goToImage(category, index) {
    if (category === 'gold') {
        currentImageIndex.gold = index;
        updateCarousel('gold');
    } else if (category === 'silver') {
        currentImageIndex.silver = index;
        updateCarousel('silver');
    }
}

function updateCarousel(category) {
    if (category === 'gold') {
        const carousel = document.getElementById('goldCarousel');
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.parentElement.querySelectorAll('.dot');
        
        // Update images
        images.forEach((img, index) => {
            if (index === currentImageIndex.gold) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentImageIndex.gold) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    } else if (category === 'silver') {
        const carousel = document.getElementById('silverCarousel');
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.parentElement.querySelectorAll('.dot');
        
        // Update images
        images.forEach((img, index) => {
            if (index === currentImageIndex.silver) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentImageIndex.silver) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Mobile-specific improvements
// Touch gesture support for image carousel
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            changeImage(currentViewerCategory, 1);
        } else {
            // Swipe right - previous image
            changeImage(currentViewerCategory, -1);
        }
    }
}

// Add touch support to image viewer
document.addEventListener('DOMContentLoaded', () => {
    const mainImageContainer = document.querySelector('.main-image-container');
    if (mainImageContainer) {
        mainImageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        mainImageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
});

// Mobile performance optimizations
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Optimize scroll performance
        document.body.style.willChange = 'scroll-position';
        
        // Reduce parallax effects on mobile
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundAttachment = 'scroll';
        }
    }
}

// Call optimization function
optimizeForMobile();

// Re-optimize on resize
window.addEventListener('resize', optimizeForMobile);

// Mobile-friendly notification positioning
function showNotification(message) {
    const notification = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '80px' : '100px'};
        ${isMobile ? 'left: 50%; transform: translateX(-50%);' : 'right: 20px;'}
        background: #d4af37;
        color: #1a1a1a;
        padding: ${isMobile ? '0.8rem 1.5rem' : '1rem 2rem'};
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: ${isMobile ? 'translateX(-50%) translateY(-100%)' : 'translateX(100%)'};
        transition: transform 0.3s ease;
        font-weight: 600;
        text-align: center;
        max-width: ${isMobile ? '90vw' : '300px'};
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = isMobile ? 'translateX(-50%) translateY(0)' : 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = isMobile ? 'translateX(-50%) translateY(-100%)' : 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}
