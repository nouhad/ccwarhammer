// CC Warhammer JavaScript
// Multi-language support and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Current language state
    let currentLang = 'en';

    // Language Switch functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        
        // Update all elements with data-en, data-zh, and data-ko attributes
        const elements = document.querySelectorAll('[data-en][data-zh][data-ko]');
        elements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = submitBtn.getAttribute(`data-sending-${currentLang}`) || (currentLang === 'en' ? 'Sending...' : '发送中...');
            submitBtn.disabled = true;

            // Simulate async submission (replace with actual API call)
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = formStatus.getAttribute(`data-success-${currentLang}`) || (currentLang === 'en' 
                    ? 'Message sent successfully! We will get back to you soon.' 
                    : '信息已成功发送！我们会尽快回复您。');
                
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.className = 'form-status';
                }, 5000);
            }, 1500);
        });
    }

    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Console message for developers
    console.log('CC Warhammer website loaded successfully!');
});
