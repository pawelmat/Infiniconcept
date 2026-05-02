# Infiniconcept website — agent guide

## Purpose

**Infiniconcept** is an independent games developer. The public site is intended to live at **https://www.infiniconcept.com**.

## Published pages (whitelist)

Only root-level HTML files are part of the live site. **Do not** add navigation, footer links, or sitemap entries to any other `.html` path (e.g. files that exist only under `backup/`).

## Layout system

- Each page has empty `<header id="header">` and `<footer id="footer">` and starts with `body` hidden until **[assets/js/hfloader.js](assets/js/hfloader.js)** fetches `header.html`, parses `#header_eng` and `#footer_eng`, clones them to `#header` / `#footer`, shows the body, and fires `headerFooterLoaded`.
- **[assets/js/main.js](assets/js/main.js)**: mobile nav, GLightbox, Typed.js (`.typed`), scroll helpers, nav scrollspy. No bilingual logic, no footer background music.

## Branding and assets

- Favicons / PWA: **`assets/icons/`** (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`, `icon_256.png`).
- **[site.webmanifest](site.webmanifest)** uses those icon paths.

