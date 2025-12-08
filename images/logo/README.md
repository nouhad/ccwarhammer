# Logo Directory

This directory contains the CC Warhammer logo image used in the website header.

## Upload Your Logo

To add your company logo:

1. **Save your logo file** in this directory (`images/logo/`)
2. **Recommended specifications:**
   - File name: `logo.png` (or `logo.svg` for scalable vector graphics)
   - Format: PNG with transparent background (recommended) or SVG
   - Dimensions: 
     - Width: 150-200 pixels (for PNG)
     - Height: 40-60 pixels (for PNG)
     - OR use SVG for perfect scaling at any size
   - File size: Keep under 100KB for optimal loading

3. **After uploading**, the logo will automatically appear in the header replacing the "CC Warhammer" text

## Current Setup

The website is configured to use: `images/logo/logo.png`

If you prefer a different filename or format:
- Update the `src` attribute in `index.html` (line ~14) to match your file name
- Adjust the logo dimensions in `css/style.css` if needed

## Alternative Formats

- **PNG**: Best for logos with transparency and complex designs
- **SVG**: Best for simple logos that need to scale perfectly (recommended)
- **JPG**: Only if your logo has no transparency (not recommended for logos)
