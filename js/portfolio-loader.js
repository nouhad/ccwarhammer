// Portfolio Gallery Image Loader
// This script dynamically loads all images for portfolio gallery pages

// Image list for each portfolio
const portfolioImages = {
    'cfhd': [
        '00.jpg', '00_1.jpg', '00_2.jpg', '00_3.jpg', '01.jpg', '02.jpg', '03.jpg', '04.jpg', 
        '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '010.jpg', '011.jpg', '012.jpg', 
        '013.jpg', '014.jpg', '015.jpg', '016.jpg', '017.jpg', '018.jpg', '019.jpg', '020.jpg', 
        '021.jpg', '022.jpg', '023.jpg', '024.jpg', '025.jpg', '026.jpg', '027.jpg', '028.jpg', 
        '029.jpg', '029.9jpg.jpg', '030.jpg', '031.jpg', '032.jpg', '033.jpg', '034.jpg', '035.jpg', 
        '036.jpg', '037.jpg', '038.jpg', '039.jpg', '040.jpg', '041.jpg', '042.jpg', '043.jpg', 
        '044.jpg', '045.jpg', '046.jpg', '047.jpg', '048.jpg', '049.jpg', '050.jpg', '051.jpg'
    ],
    'deltaForce': [
        '三角洲02.jpg', '三角洲03.jpg', '三角洲04.jpg', '三角洲05.jpg', '三角洲06.jpg', '三角洲07.jpg',
        '三角洲08.jpg', '三角洲09.jpg', '三角洲10.jpg', '三角洲11.jpg', '三角洲12.jpg', '三角洲13.jpg',
        '三角洲14.jpg', '三角洲15.jpg', '三角洲16.jpg', '三角洲17.jpg', '三角洲18.jpg', '三角洲19.jpg',
        '三角洲20.jpg'
    ],
    'characters': [
        '040.jpg', '041.jpg', '050.jpg', '051.jpg', '052.jpg'
    ],
    'creatures': [
        '0024 (1).jpg', '0024 (2).jpg', '0024 (3).jpg', '0024 (5).jpg', 
        '0024 (6).jpg', '0024 (7).jpg', '0024 (8).jpg', '0024 (9).jpg'
    ],
    'props': [
        '061.jpg', '062.jpg', 'Stormforged Studios50.jpg', 
        'Stormforged Studios51.jpg', 'Stormforged Studios52.jpg'
    ],
    'vehicles': [
        '050.jpg', '051.jpg'
    ],
    'weapons': [
        'BOSS_MUN_WEAPON_h.jpg', 'dfssfdf.jpg', 'dfssfsdfdf.jpg'
    ],
    'stylised': [
        '032.jpg', '033.jpg', '034.jpg', '074.jpg', '075.jpg', '076.jpg', '077.jpg'
    ],
    'conceptArt': [],
    'texturesMaterials': [],
    'photogrammetry': []
};

// Portfolio display names
const portfolioNames = {
    'cfhd': 'CrossFire HD',
    'deltaForce': 'Delta Force',
    'characters': 'Characters',
    'creatures': 'Creatures',
    'props': 'Props',
    'vehicles': 'Vehicles',
    'weapons': 'Weapons',
    'stylised': 'Stylised',
    'conceptArt': 'Concept Art',
    'texturesMaterials': 'Textures and Materials',
    'photogrammetry': 'Photogrammetry'
};

// Load portfolio images dynamically when page loads
document.addEventListener('DOMContentLoaded', function() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const portfolioType = document.body.getAttribute('data-portfolio');
    
    if (!portfolioGrid || !portfolioType) {
        console.warn('Portfolio grid or portfolio type not found');
        return;
    }
    
    const images = portfolioImages[portfolioType];
    
    if (!images || images.length === 0) {
        console.warn('No images found for portfolio:', portfolioType);
        return;
    }
    
    // Clear existing items
    portfolioGrid.innerHTML = '';
    
    // Add all images to the grid
    images.forEach((imageName, index) => {
        const imagePath = `images/portfolio/${portfolioType}/${imageName}`;
        const gridItem = document.createElement('div');
        gridItem.className = 'portfolio-grid-item';
        gridItem.setAttribute('data-image', imagePath);
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${portfolioNames[portfolioType] || portfolioType} Asset ${index + 1}`;
        img.loading = 'lazy'; // Enable lazy loading for better performance
        
        gridItem.appendChild(img);
        portfolioGrid.appendChild(gridItem);
    });
    
    console.log(`Loaded ${images.length} images for ${portfolioType} portfolio`);
    
    // Initialize lightbox for dynamically added items
    initializePortfolioLightbox();
});

// Close lightbox function - using the same name as in script.js for compatibility
function closePortfolioLightbox() {
    const portfolioLightbox = document.getElementById('portfolio-lightbox');
    if (portfolioLightbox) {
        portfolioLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize lightbox for portfolio grid items
function initializePortfolioLightbox() {
    const portfolioLightbox = document.getElementById('portfolio-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
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
}
