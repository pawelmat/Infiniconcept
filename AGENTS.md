# Infiniconcept website — agent guide

## Purpose

**Infiniconcept** is an independent games developer. The public site is intended to live at **https://www.infiniconcept.com**.

## Published pages (whitelist)

Only these root-level HTML files are part of the live site. **Do not** add navigation, footer links, or sitemap entries to any other `.html` path (e.g. files that exist only under `backup/`).

| File | Role |
|------|------|
| [index.html](index.html) | Home, hero, about, `#news` |
| [play.html](play.html) | WebGL Citadel playthrough, `#controls`, links to `game/` |
| [versions.html](versions.html) | Citadel editions: `#original`, `#remonstered`, `#evacuation`, `#opengl`, `#a500mini`, `#evercade`, `#webgl` |
| [projects.html](projects.html) | Studio projects, e.g. `#axion` |
| [terms.html](terms.html) | `#terms-of-service`, `#privacy-policy` |

Shared chrome is loaded from **[header.html](header.html)** (not a standalone page).

## Layout system

- Each page has empty `<header id="header">` and `<footer id="footer">` and starts with `body` hidden until **[assets/js/hfloader.js](assets/js/hfloader.js)** fetches `header.html`, parses `#header_eng` and `#footer_eng`, clones them to `#header` / `#footer`, shows the body, and fires `headerFooterLoaded`.
- **[assets/js/main.js](assets/js/main.js)**: mobile nav, GLightbox, Typed.js (`.typed`), scroll helpers, nav scrollspy. No bilingual logic, no footer background music.

## Branding and assets

- Header/footer logo: **`assets/img/logo_300_40.png`** (wordmark).
- Favicons / PWA: **`assets/icons/`** (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`, `icon_256.png`).
- **[site.webmanifest](site.webmanifest)** uses those icon paths.

## Conventions

- **English only** — no `lang="pol"` or Polish alternate blocks on root pages.
- **No** PayPal donation or Reddit links on the public site.
- **Google Analytics**: the gtag snippet may appear in each root page’s `<head>` **inside HTML comments** until the site owner uncomments it and sets a Measurement ID.
- **`backup/`** is reference-only: **do not edit** or link to it from production HTML.

## What not to restore

- Footer background music player and related JS/CSS.
- Bilingual (PL/EN) header/footer clones.
- Nav items pointing outside the whitelist (e.g. Extras → story, gallery, maps unless those pages are promoted to the repo root).
