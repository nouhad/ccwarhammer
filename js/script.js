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

    // Portfolio Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Open lightbox when portfolio item is clicked
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.portfolio-overlay span');
            
            if (img && caption) {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxCaption.textContent = caption.textContent;
                
                // Prevent body scroll when lightbox is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox when X is clicked
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            closeLightbox();
        });
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Game Titles Carousel - Continuous Smooth Scrolling
    const carousel = document.querySelector('.game-titles-carousel');
    if (carousel) {
        const wrapper = carousel.querySelector('.game-titles-wrapper');
        const grid = carousel.querySelector('.game-titles-grid');
        const prevBtn = carousel.querySelector('.carousel-arrow-prev');
        const nextBtn = carousel.querySelector('.carousel-arrow-next');
        const items = grid.querySelectorAll('.game-title-item');
        
        // Configuration constants
        const SCROLL_SPEED = 0.5; // pixels per frame - adjust for faster/slower scrolling
        const SCROLL_BOUNDARY_OFFSET = 1; // small offset to handle floating point precision in scroll calculations
        
        let currentIndex = 0;
        let itemsPerView = 4;
        let isHovered = false;
        let animationFrameId = null;
        
        // Calculate items per view based on screen size
        function updateItemsPerView() {
            const width = window.innerWidth;
            if (width <= 480) {
                itemsPerView = 1;
            } else if (width <= 768) {
                itemsPerView = 2;
            } else if (width <= 1024) {
                itemsPerView = 3;
            } else {
                itemsPerView = 4;
            }
            updateButtonStates();
        }
        
        function updateButtonStates() {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            prevBtn.disabled = wrapper.scrollLeft <= 0;
            // Use offset to account for floating point precision in scroll position
            nextBtn.disabled = wrapper.scrollLeft >= maxScroll - SCROLL_BOUNDARY_OFFSET;
        }
        
        function continuousScroll() {
            if (!isHovered) {
                const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
                
                // Scroll continuously at configured speed
                wrapper.scrollLeft += SCROLL_SPEED;
                
                // Loop back to start when reaching the end
                if (wrapper.scrollLeft >= maxScroll) {
                    wrapper.scrollLeft = 0;
                }
                
                updateButtonStates();
            }
            
            // Continue the animation
            animationFrameId = requestAnimationFrame(continuousScroll);
        }
        
        function scrollToItem(index) {
            if (items.length > 0 && index >= 0 && index < items.length) {
                items[index].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest', 
                    inline: 'start' 
                });
                currentIndex = index;
            }
        }
        
        function goToNext() {
            const maxIndex = Math.max(0, items.length - itemsPerView);
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            scrollToItem(currentIndex);
        }
        
        function goToPrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, items.length - itemsPerView);
            }
            scrollToItem(currentIndex);
        }
        
        function startContinuousScroll() {
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(continuousScroll);
            }
        }
        
        function stopContinuousScroll() {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        }
        
        prevBtn.addEventListener('click', () => {
            goToPrev();
        });
        
        nextBtn.addEventListener('click', () => {
            goToNext();
        });
        
        // Pause auto-scroll on hover
        carousel.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isHovered = false;
        });
        
        // Update button states on scroll
        wrapper.addEventListener('scroll', () => {
            updateButtonStates();
        });
        
        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateItemsPerView();
            }, 100);
        });
        
        // Initial setup
        updateItemsPerView();
        startContinuousScroll();
    }

    // Console message for developers
    console.log('CC Warhammer website loaded successfully!');
});
