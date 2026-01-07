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

        // Close mobile menu when a link is clicked (except dropdown toggle)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't close menu if clicking dropdown toggle
                if (!this.classList.contains('dropdown-toggle')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Dropdown menu functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // On mobile, toggle the dropdown menu visibility
            if (window.innerWidth <= 768) {
                const dropdown = this.closest('.dropdown');
                
                // Toggle active state
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
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

    // Game Titles - Static Display (no carousel functionality needed)

    // Portfolio Gallery Slideshow
    const portfolioRectangles = document.querySelectorAll('.portfolio-rectangle-item');
    const gallerySlideshow = document.getElementById('portfolio-slideshow');
    const galleryMessage = document.getElementById('gallery-message');
    const galleryPrevBtn = document.querySelector('.portfolio-gallery-prev');
    const galleryNextBtn = document.querySelector('.portfolio-gallery-next');
    let currentPortfolio = 'deltaForce';
    let galleryImages = [];
    let currentGallerySlide = 0;
    let galleryInterval = null;

    // Define the images for each portfolio
    const portfolioImageMap = {
        'deltaForce': [
            'images/portfolio/deltaForce/三角洲14.jpg',
            'images/portfolio/deltaForce/三角洲15.jpg'
        ],
        'cfhd': [
            'images/portfolio/cfhd/00_1.jpg',
            'images/portfolio/cfhd/00_2.jpg',
            'images/portfolio/cfhd/01.jpg'
        ]
    };

    // Function to load images from a portfolio folder
    async function loadPortfolioImages(portfolio) {
        // Return the images for the specified portfolio
        const images = portfolioImageMap[portfolio] || [];
        
        // Verify that images exist
        const validImages = [];
        for (const imgPath of images) {
            try {
                const response = await fetch(imgPath, { method: 'HEAD' });
                if (response.ok) {
                    validImages.push(imgPath);
                }
            } catch (e) {
                // Image doesn't exist, continue
            }
        }

        return validImages;
    }

    // Function to initialize gallery with images
    function initializeGallery(images) {
        galleryImages = images;
        currentGallerySlide = 0;

        if (images.length === 0) {
            // Show message if no images
            galleryMessage.classList.add('show');
            gallerySlideshow.style.display = 'none';
            if (galleryPrevBtn) galleryPrevBtn.classList.add('hidden');
            if (galleryNextBtn) galleryNextBtn.classList.add('hidden');
            if (galleryInterval) {
                clearInterval(galleryInterval);
                galleryInterval = null;
            }
            return;
        }

        // Hide message and show slideshow
        galleryMessage.classList.remove('show');
        gallerySlideshow.style.display = 'block';
        
        // Show navigation buttons only if there are multiple images
        if (images.length > 1) {
            if (galleryPrevBtn) galleryPrevBtn.classList.remove('hidden');
            if (galleryNextBtn) galleryNextBtn.classList.remove('hidden');
        } else {
            if (galleryPrevBtn) galleryPrevBtn.classList.add('hidden');
            if (galleryNextBtn) galleryNextBtn.classList.add('hidden');
        }

        // Set background images for the slides
        const slides = gallerySlideshow.querySelectorAll('.portfolio-gallery-slide');
        slides[0].style.backgroundImage = `url('${images[0]}')`;
        if (images.length > 1) {
            slides[1].style.backgroundImage = `url('${images[1]}')`;
        }

        // Start autoplay
        if (galleryInterval) {
            clearInterval(galleryInterval);
        }
        
        if (images.length > 1) {
            galleryInterval = setInterval(nextGallerySlide, 4000);
        }
    }

    // Function to go to next slide
    function nextGallerySlide() {
        if (galleryImages.length <= 1) return;

        const slides = gallerySlideshow.querySelectorAll('.portfolio-gallery-slide');
        const currentSlide = slides[0].classList.contains('active') ? 0 : 1;
        const nextSlide = currentSlide === 0 ? 1 : 0;

        // Update slide index
        currentGallerySlide = (currentGallerySlide + 1) % galleryImages.length;
        const nextImageIndex = (currentGallerySlide + 1) % galleryImages.length;

        // Fade out current, fade in next
        slides[currentSlide].classList.remove('active');
        slides[nextSlide].classList.add('active');

        // Preload next image for smooth transition
        setTimeout(() => {
            slides[currentSlide].style.backgroundImage = `url('${galleryImages[nextImageIndex]}')`;
        }, 1000);
    }

    // Function to go to previous slide
    function prevGallerySlide() {
        if (galleryImages.length <= 1) return;

        const slides = gallerySlideshow.querySelectorAll('.portfolio-gallery-slide');
        const currentSlide = slides[0].classList.contains('active') ? 0 : 1;
        const nextSlide = currentSlide === 0 ? 1 : 0;

        // Update slide index (go backwards)
        currentGallerySlide = (currentGallerySlide - 1 + galleryImages.length) % galleryImages.length;
        const nextImageIndex = (currentGallerySlide + 1) % galleryImages.length;

        // Fade out current, fade in next
        slides[currentSlide].classList.remove('active');
        slides[nextSlide].classList.add('active');

        // Preload next image for smooth transition
        setTimeout(() => {
            slides[currentSlide].style.backgroundImage = `url('${galleryImages[nextImageIndex]}')`;
        }, 1000);
    }

    // Manual navigation button handlers
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', () => {
            nextGallerySlide();
            // Reset autoplay timer when manually navigating
            if (galleryInterval) {
                clearInterval(galleryInterval);
                if (galleryImages.length > 1) {
                    galleryInterval = setInterval(nextGallerySlide, 4000);
                }
            }
        });
    }

    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', () => {
            prevGallerySlide();
            // Reset autoplay timer when manually navigating
            if (galleryInterval) {
                clearInterval(galleryInterval);
                if (galleryImages.length > 1) {
                    galleryInterval = setInterval(nextGallerySlide, 4000);
                }
            }
        });
    }

    // Handle portfolio rectangle clicks
    portfolioRectangles.forEach(rectangle => {
        rectangle.addEventListener('click', async function() {
            // Update active state
            portfolioRectangles.forEach(r => r.classList.remove('active'));
            this.classList.add('active');

            // Get portfolio type
            const portfolio = this.getAttribute('data-portfolio');
            if (portfolio === currentPortfolio) return;

            currentPortfolio = portfolio;

            // Load images for the selected portfolio
            const images = await loadPortfolioImages(portfolio);
            initializeGallery(images);
        });
    });

    // Initialize with default portfolio (deltaForce)
    (async () => {
        const images = await loadPortfolioImages(currentPortfolio);
        initializeGallery(images);
    })();

    // Portfolio Grid Lightbox
    const portfolioLightbox = document.getElementById('portfolio-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCloseBtn = document.querySelector('.lightbox-close');
    const portfolioGridItems = document.querySelectorAll('.portfolio-grid-item');

    // Open lightbox when grid item is clicked
    portfolioGridItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            if (imageSrc && portfolioLightbox && lightboxImage) {
                lightboxImage.src = imageSrc;
                portfolioLightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox when X is clicked
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', function() {
            closePortfolioLightbox();
        });
    }

    // Close lightbox when clicking outside the image
    if (portfolioLightbox) {
        portfolioLightbox.addEventListener('click', function(e) {
            if (e.target === portfolioLightbox) {
                closePortfolioLightbox();
            }
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && portfolioLightbox && portfolioLightbox.classList.contains('active')) {
            closePortfolioLightbox();
        }
    });

    function closePortfolioLightbox() {
        if (portfolioLightbox) {
            portfolioLightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Console message for developers
    console.log('CC Warhammer website loaded successfully!');
});
