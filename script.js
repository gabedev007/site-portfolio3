// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
                // Add fade-in animation
                item.classList.add('fade-in');
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100);
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    });
});

// Contact Form Handler - WhatsApp Redirect
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !message) {
            alert('Por favor, preencha pelo menos seu nome e descreva seu projeto.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `Olá! Meu nome é ${name}.${email ? ` Meu email é ${email}.` : ''}${phone ? ` Meu telefone é ${phone}.` : ''} Gostaria de falar sobre meu projeto: ${message}`;
        
        // WhatsApp number (remove non-digits and add country code if needed)
        const whatsappNumber = '557991086530'; // 79 9108-6530 com código do Brasil
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show loading message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Redirecionando para WhatsApp...';
        submitBtn.disabled = true;
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            // Reset button after a delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Optional: show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <h3>Redirecionando para WhatsApp!</h3>
                    <p>Você será redirecionado para conversar diretamente com o designer.</p>
                `;
                successMessage.style.cssText = `
                    background: linear-gradient(135deg, #D4AF37, #B8860B);
                    color: #000;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                    font-weight: 600;
                    margin-top: 15px;
                `;
                
                // Insert success message after form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 5000);
            }, 1000);
        }, 500);
        
        // Log for debugging
        console.log('WhatsApp Message:', whatsappMessage);
        console.log('WhatsApp URL:', whatsappUrl);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add fade-in class to portfolio items and sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    portfolioItems.forEach(item => {
        item.classList.add('fade-in');
    });
    
    // Re-observe after adding classes
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for mobile menu animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 2rem;
        border-bottom: 1px solid #D4AF37;
    }
    
    .nav-menu.active li {
        margin: 1rem 0;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);
