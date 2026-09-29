# For Aami

A small, static anniversary scrapbook for Aami from DD. It runs in a browser with no backend, build step, or package installation.

## Open

Open `index.html` in a browser. Keep the `assets` and `song` folders beside the HTML file so the five included photos and soundtrack load correctly. The page requests full-volume autoplay and loops the soundtrack. If the browser blocks autoplay, a start-only music button appears; it disappears once playback begins. Google Fonts are optional; the page uses local serif and sans-serif fallbacks when offline.

The **Add photos** control previews selected images locally for the current visit only. It does not upload or save them.

## Files

- `index.html` contains the page content.
- `styles.css` contains the layout, responsive styling, and animations.
- `script.js` handles local photo previews and falling flowers.
- `assets/` contains the five included couple photos.
- `song/` contains the soundtrack.