# Portfolio Images

This directory contains images for portfolio pages organized by category.

## Folder Structure

- **cfhd/** - CrossFire HD project images
- **deltaForce/** - Delta Force project images
- **characters/** - Character models and designs
- **creatures/** - Creature designs and models
- **props/** - Props and environmental assets
- **vehicles/** - Vehicle models (civilian and military)
- **weapons/** - Weapon models
- **stylised/** - Stylised and artistic 3D assets
- **conceptArt/** - Concept art illustrations
- **texturesMaterials/** - Texture and material work
- **photogrammetry/** - Photogrammetry-based assets

## How to Add Images

1. Place your images in the appropriate folder
2. Update the corresponding array in `/js/portfolio-loader.js` with the image filenames
3. Images will be automatically loaded and displayed on the portfolio pages

Example for adding images to the Characters portfolio:
```javascript
'characters': [
    'character1.jpg',
    'character2.jpg',
    'character3.jpg'
]
```

## Supported Formats

- JPG/JPEG
- PNG
- WebP

## Recommended Image Specifications

- Resolution: 1920x1080 or higher
- Aspect Ratio: 16:9 recommended
- File size: Optimized for web (< 2MB per image)

