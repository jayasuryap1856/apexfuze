# Apex Fuze Gym — Website

## Folder Structure

```
apex-fuze-gym/
├── index.html
├── style.css
├── script.js
└── images/
    ├── hero-bg.jpg         (hero section background — dark gym atmosphere)
    ├── gym1.jpg            (gym interior / about section)
    ├── gym2.jpg            (training floor / about section)
    ├── gym3.jpg
    ├── gym4.jpg
    ├── gym5.jpg
    ├── gym6.jpg
    ├── gym7.jpg
    ├── gym8.jpg
    ├── trainer1.jpg
    ├── trainer2.jpg
    ├── trainer3.jpg
    └── trainer4.jpg
```

## Setup

1. Create an `images/` folder next to `index.html`
2. Add your gym photos named as above (or update the `src` attributes in `index.html`)
3. Open `index.html` in a browser — no build step required

## Images Notes

- All `<img>` tags have `onerror` handlers so the site looks clean even without images (shows placeholder glows)
- Images are lazy-loaded for performance
- Replace trainer names/photos in `index.html` under the Trainers section
- For best quality: hero-bg.jpg should be dark, high-contrast gym shot (1920×1080+)

## Customization

- **Prices**: Update in the Membership section of `index.html`
- **Phone**: Currently set to `+91 77602 87575`
- **WhatsApp link**: Pre-configured with membership inquiry message
- **Colors**: Edit CSS variables in `:root` block of `style.css`
- **Trainer names/specs**: Edit in `index.html` under `<!-- TRAINERS -->`

## Features

- ⚡ Cinematic splash screen with lightning bolt flicker & logo split animation
- 🌑 Fixed watermark bolt with scroll parallax
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎠 Auto-advancing testimonial slider with touch/swipe support
- 🖼 Masonry gallery with lightbox (keyboard navigable)
- 🔢 Animated stat counters triggered on scroll
- ✨ Scroll-reveal animations on all sections
- 🖱 Subtle cursor glow effect (desktop)
- 📞 WhatsApp floating button with pulse animation
- 🗺 Embedded Google Maps
- ♿ Accessible (ARIA labels, keyboard navigation, semantic HTML)
