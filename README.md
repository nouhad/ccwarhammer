# CC Warhammer

Professional 3D art studio website with multi-language support (English/Chinese).

## Project Structure

```
ccwarhammer/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── images/
│   └── carousel/       # Background carousel images
└── README.md           # This file
```

## Features

- **Multi-language Support**: English and Chinese language toggle
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Professional dark aesthetic with gold accents
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Contact Form**: Interactive contact form with validation
- **Portfolio Grid**: 6-item portfolio showcase
- **Services Section**: 3 service cards highlighting offerings

## Sections

1. **Hero**: Main landing section with tagline and CTA
2. **About Us**: Company background and experience
3. **Services**: Character & Creature Art, Weapons & Vehicles, Props & Environments
4. **Portfolio**: Visual showcase of work samples
5. **Contact**: Contact form for inquiries

## Getting Started

1. Open `index.html` in a web browser to view the website
2. Edit `index.html` to change content (update both `data-en` and `data-zh` attributes for multi-language)
3. Modify `css/style.css` to customize the styling
4. Update `js/script.js` for custom functionality

## Customizing Carousel Background Images

The homepage features a rotating carousel with 4 background images. To upload and use your own images:

1. **Upload Images**: Place your images in the `images/carousel/` directory
   - Recommended size: 1920x1080 pixels (16:9 aspect ratio)
   - Supported formats: JPG, PNG, or WebP
   - Optimize for web (< 500KB per image recommended)

2. **Update the HTML**: Edit `index.html` and find the hero slideshow section
   - Search for the `hero-slideshow` class or look for `.hero-slide` elements in the hero section
   - Update the `background-image` URL for each `.hero-slide` element
   - Change from placeholder URLs to your image paths

Example:
```html
<div class="hero-slide active" style="background-image: url('images/carousel/slide1.jpg')"></div>
<div class="hero-slide" style="background-image: url('images/carousel/slide2.jpg')"></div>
<div class="hero-slide" style="background-image: url('images/carousel/slide3.jpg')"></div>
<div class="hero-slide" style="background-image: url('images/carousel/slide4.jpg')"></div>
```

3. **Add or Remove Slides**: You can add more slides or remove existing ones by adding/removing `.hero-slide` divs. The carousel automatically cycles through all slides every 5 seconds.

For detailed instructions, see the README in the `images/carousel/` directory.

## Language Support

All text elements support both English and Chinese through data attributes:
- `data-en`: English text
- `data-zh`: Chinese text

Users can toggle between languages using the EN/中文 buttons in the header.

## Deployment

This website is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment is handled by a GitHub Actions workflow (`.github/workflows/deploy-to-pages.yml`) that:
1. Triggers on every push to the `main` branch
2. Uploads the entire repository content as a static site
3. Deploys it to GitHub Pages

To deploy changes:
1. Merge your changes into the `main` branch
2. The workflow will automatically run and deploy the site
3. The site will be available at: `https://nouhad.github.io/ccwarhammer/`

You can also manually trigger the deployment using the "workflow_dispatch" option in the GitHub Actions tab.

## License

This project is open source and available for customization.
