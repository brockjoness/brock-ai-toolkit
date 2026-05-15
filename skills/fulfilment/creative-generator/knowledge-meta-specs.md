# Meta Ad Creative Specifications & Safe Zones

## Feed Ads (4:5)

### Dimensions
- Canvas: **1080 x 1350px**
- Aspect ratio: 4:5

### Safe Zones (areas obscured by Meta UI)
- **Top**: ~150px -- profile picture, account name, "Sponsored" label, three-dot menu
- **Bottom**: ~270px -- CTA button row, like/comment/share icons, caption preview, "See more" text
- **Left/Right**: ~40px each side -- edge clipping on some devices

### Usable Creative Area
- **Width**: ~1000px (40px margin each side)
- **Height**: ~930px (150px top + 270px bottom excluded)
- **Position**: Centered, starting 150px from top

### Design Notes
- The image/visual fills the entire 1080x1350 canvas (edge to edge)
- Text overlays and CTAs within the creative itself must stay within the usable area
- The Meta CTA button ("Shop Now", "Learn More") appears BELOW the creative, not on top of it
- Caption text appears below the creative in feed
- Keep primary messaging in the center-to-upper-center area for maximum visibility

---

## Story / Reels Ads (9:16)

### Dimensions
- Canvas: **1080 x 1920px**
- Aspect ratio: 9:16

### Safe Zones (areas obscured by Meta UI)
- **Top**: ~270px -- status bar, camera icon, profile picture, account name, close (X) button, timer bar
- **Bottom**: ~380px -- CTA button/swipe-up prompt, message input, share/react icons, song/audio info, caption text
- **Left/Right**: ~55px each side -- reaction icons, share buttons, edge clipping

### Usable Creative Area
- **Width**: ~970px (55px margin each side)
- **Height**: ~1270px (270px top + 380px bottom excluded)
- **Position**: Centered, starting 270px from top

### Design Notes
- Stories/Reels are full-screen (1080x1920) -- the creative fills the entire viewport
- All text overlays, headlines, and CTAs must stay within the usable area
- The Meta CTA button overlays the BOTTOM of the creative (unlike feed where it's below)
- Most critical content should be in the vertical center of the canvas
- Sound-off assumption: 80%+ of viewers watch without sound -- rely on visual storytelling and text overlays

---

## General Best Practices

### Text Density
- Meta recommends <20% text coverage on ad images (the old 20% rule is no longer enforced but lower text = better delivery)
- Keep headlines to 1 line (max 8 words)
- Body copy max 2 lines
- High contrast between text and background (use text shadows or overlay bars if needed)

### Typography for Ads
- Minimum readable font size: 48px at 1080px width (for headlines)
- Body text: minimum 32px at 1080px width
- Always use bold/semibold for headlines -- regular weight gets lost on scroll
- Prefer sans-serif fonts for readability at speed

### Color & Contrast
- Ensure WCAG AA contrast ratio (4.5:1) for text on backgrounds
- Bright/saturated colors stop scrolls better than muted tones
- Use the agency accent color for CTA buttons and key highlights
- Dark text on light backgrounds or light text on dark/image backgrounds with shadow

### CTA Button Styling
- Pill shape (full border-radius) or rounded rectangle
- Solid fill with accent color
- White or contrasting text
- Minimum touch target: 120px wide, 48px tall (at 1080px canvas)

---

## Future Formats (Not Yet Implemented)

### Carousel Ads
- Individual card: 1080 x 1080px (1:1)
- 2-10 cards per carousel
- Safe zones similar to feed but 1:1 aspect

### Video Ads
- Feed: 1080 x 1350px (4:5) or 1080 x 1080px (1:1)
- Stories/Reels: 1080 x 1920px (9:16)
- Duration: 15s (stories), 15-60s (reels), up to 240s (feed)
- Hook window: first 3 seconds critical
- Caption/subtitle requirements for sound-off viewing
