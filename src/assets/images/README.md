# Logo Setup Instructions

To add your custom logo to TraceAndTrust:

## 1. Add Your Logo File

Place your logo image file in:
```
src/assets/images/logo.png
```

**Recommended specifications:**
- Format: PNG (with transparency) or SVG
- Size: 40x40px minimum (will be displayed at this size)
- Aspect ratio: Square (1:1) works best
- Background: Transparent preferred

## 2. Logo Display

The logo appears in the header navigation bar.
If no logo.png is found, a fallback gradient icon with "T" will display.

## 3. Alternative Formats

You can also use:
- `logo.svg` - Update the `src` in header.component.html
- `logo.webp` - For better compression

## 4. Customization

To change the logo size or behavior, edit:
```
src/app/core/layout/header/header.component.html
```

Look for the `<img src="assets/images/logo.png">` element.
