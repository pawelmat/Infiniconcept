# CSS Guide — `assets/css/main.css`

> **For agents:** Read this file before editing `main.css` or any HTML page.  
> It maps every surviving CSS section to the HTML elements and pages that use it,  
> and notes JS-driven class interactions. Only classes listed here are active in the site.

---

## File stats (after cleanup, May 2026)
- **~31 KB / ~1 340 lines** (reduced from ~103 KB; 32 unused sections removed)
- Bootstrap utilities (`d-flex`, `col-*`, etc.) live in **`assets/vendor/bootstrap/css/`** — NOT in `main.css`
- Bootstrap Icons font lives in **`assets/vendor/bootstrap/css/bootstrap-icons.css`**
- GLightbox styles live in **`assets/vendor/glightbox/css/glightbox.css`**; `main.css` only adds overrides

---

## Section map (file order)

### 1. Font & Color Variables — `:root`
**Selectors:** `:root` (×4 blocks), `.light-background`, `.dark-background`

| Variable | Value | Role |
|---|---|---|
| `--default-font` | "Roboto", system-ui … | Body text |
| `--heading-font` | "Mulish" | All headings |
| `--nav-font` | "Raleway" | Nav links |
| `--background-color` | `#141414` | Page background |
| `--default-color` | `#d9d9d9` | Body text |
| `--heading-color` | `#ededed` | Headings |
| `--accent-color` | `#3b82f6` | Brand blue — buttons, links, highlights |
| `--icon-accent-color` | `#ff4d4f` | Red highlight for Bootstrap Icon wrappers (company-logo, social-links hover, scroll-top, portfolio-actions) |
| `--surface-color` | `#1c1c1c` | Card / box backgrounds |
| `--contrast-color` | `#ffffff` | Text on colored backgrounds |
| `--nav-color` | `#d9d9d9` | Nav link default |
| `--nav-hover-color` | `#3b82f6` | Nav link hover/active |
| `--nav-mobile-background-color` | `#2e2e2e` | Mobile nav panel |
| `--nav-dropdown-background-color` | `#2e2e2e` | Dropdown panel |
| `--nav-dropdown-color` | `#d9d9d9` | Dropdown link |
| `--nav-dropdown-hover-color` | `#3b82f6` | Dropdown hover |

**`.light-background`** — not used in any current HTML (kept for potential future use)  
**`.dark-background`** — applied to `<section#home class="hero ... dark-background">` in **`index.html`**

---

### 2. General Styling & Shared Classes
**Selectors:** `body`, `a`, `a:hover`, `h1–h6`, `.hero-title-light-blue`

| Selector | HTML usage |
|---|---|
| `body` | All pages — sets font, background, text color from CSS vars |
| `a` / `a:hover` | All pages — global link color = accent, no underline |
| `h1–h6` | All pages — heading font and color |
| `.hero-title-light-blue` | `index.html` `<h2 class="hero-title-light-blue">` in hero section |

---

### 3. Global Header
**Selectors:** `.header`, `.header .logo`, `.header .logo img`, `.header .logo img.logo-wordmark`, `.header .logo h1`, `.scrolled .header` (×2), `.index-page .header`, `.index-page.scrolled .header`  
**Responsive:** `@media (max-width: 992px)` — logo/navmenu ordering

**HTML usage:** All pages — `<header id="header">` is empty in each page; **`hfloader.js`** clones `#header_eng` from **`header.html`** into it at load time.

| Selector | Purpose |
|---|---|
| `.header` | Fixed top bar, background, padding, z-index |
| `.header .logo` / `.logo img` | Logo container and favicon-sized img |
| `.header .logo img.logo-wordmark` | Wide wordmark image (responsive max-width cap) |
| `.header .logo h1` | Text-only fallback logo (not used in current header.html) |
| `.scrolled .header` | Adds box-shadow + semi-transparent background when `body.scrolled` is set by JS |
| `.index-page .header` | Transparent background on hero pages |
| `.index-page.scrolled .header` | Semi-transparent on scroll for index page |

**JS interaction:**  
- `main.js` adds `body.scrolled` when `scrollY > 100` if header has `fixed-top`, `sticky-top`, or `scroll-up-sticky`  
- `body.scrolled` → `.scrolled .header` → `--background-color` override fires

---

### 4. Navigation Menu — Desktop
**Block:** `@media (min-width: 992px) { .navmenu ... }`

| Selector | Purpose |
|---|---|
| `.navmenu` / `.navmenu ul` / `.navmenu li` | Horizontal flex nav |
| `.navmenu a` / `.navmenu a:focus` | Link styles — Raleway font, padding, color |
| `.navmenu a i` | Chevron icon inside nav links |
| `.navmenu li:last-child a` | Removes right padding on last item |
| `.navmenu li:hover>a` / `.navmenu .active` / `.navmenu .active:focus` | Hover and active link color |
| `.navmenu .dropdown ul` | Dropdown panel — hidden by default, absolutely positioned |
| `.navmenu .dropdown ul li` / `a` / `a:hover` | Dropdown items |
| `.navmenu .dropdown:hover>ul` | Show dropdown on hover (opacity/visibility transition) |
| `.navmenu .dropdown .dropdown ul` | Second-level dropdown (left-aligned) |

**HTML usage:** `<nav id="navmenu" class="navmenu">` in **`header.html`** (`#header_eng`)  
Dropdown `<li class="dropdown">` items: Versions, Projects

**JS interaction:**  
- `main.js` adds `.active` to `<a>` tags matching the visible section via scrollspy  
- `.navmenu .toggle-dropdown` click toggles `.active` on parent `<li>` and `.dropdown-active` on sibling `<ul>`

---

### 5. Navigation Menu — Mobile
**Block:** `@media (max-width: 991px) { .mobile-nav-toggle, .navmenu ..., .mobile-nav-active ... }`

| Selector | Purpose |
|---|---|
| `.mobile-nav-toggle` | Hamburger icon — hidden on desktop |
| `.navmenu` / `.navmenu ul` | Full-screen overlay panel |
| `.navmenu a` / `a:hover` / `.active` | Mobile link styles |
| `.navmenu a i` | Circular chevron button per item |
| `.navmenu .dropdown ul` | Static (non-absolute) dropdown |
| `.navmenu .dropdown>.dropdown-active` | Show sub-menu when toggled |
| `.mobile-nav-active` | On `<body>` — disables page scroll |
| `.mobile-nav-active .mobile-nav-toggle` | Positions close (×) button |
| `.mobile-nav-active .navmenu` | Fixed overlay background |
| `.mobile-nav-active .navmenu>ul` | Reveals the nav list |

**HTML usage:** `<i class="mobile-nav-toggle d-lg-none bi bi-list">` in **`header.html`**

**JS interaction:**  
- `main.js` toggles `body.mobile-nav-active` and swaps `.bi-list` / `.bi-x` on `.mobile-nav-toggle`

---

### 6. Global Footer
**Selectors:** `.footer`, `.footer .copyright`, `.footer .copyright p`, `.footer .credits`

| Selector | Purpose |
|---|---|
| `.footer` | Background color, font size, bottom padding |
| `.footer .copyright` | Copyright bar with subtle top background |
| `.footer .copyright p` | Copyright text (no margin) |
| `.footer .credits` | Small credits line below copyright |

**HTML usage:** `<footer id="footer_eng" class="footer">` in **`header.html`** — cloned into `<footer id="footer">` by `hfloader.js`.  
All pages have `<footer id="footer"></footer>` as the injection target.

Footer contains: `<div class="container copyright text-center mt-4">` with `<strong class="px-1 sitename">` and `<div class="credits">`.

---

### 7. Preloader
**Selectors:** `#preloader`, `#preloader:before`, `@keyframes animate-preloader`

All pages have `<div id="preloader"></div>`. `hfloader.js` removes it after load.  
`#preloader` covers the viewport; `#preloader:before` renders a spinning ring using `--accent-color`.

---

### 8. Scroll Top Button
**Selectors:** `.scroll-top`, `.scroll-top i`, `.scroll-top:hover`, `.scroll-top.active`

All pages have `<a id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">`.

**JS interaction:** `main.js` adds `.active` when `scrollY > 100`, making it visible.

---

### 9. AOS Mobile Override
**Block:** `@media screen and (max-width: 768px) { [data-aos-delay] { transition-delay: 0 !important; } }`

Disables AOS (Animate on Scroll) delays on mobile. All pages use `data-aos` / `data-aos-delay` attributes.

---

### 10. Global Sections
**Selectors:** `section, .section`, `@media (max-width: 1199px) section, .section`

Sets padding (`60px 0`), background color from vars, and `scroll-margin-top` (90px desktop / 66px tablet) for anchor navigation.

**HTML usage:** Every `<section>` element on every page.

---

### 11. Global Section Titles
**Selectors:** `.section-title`, `.section-title h2`, `.section-title .subtitle`, `.section-title .subtitle::after`, `.section-title p`  
**Responsive:** `@media (max-width: 768px)` — `.section-title h2` font-size

| Selector | Purpose |
|---|---|
| `.section-title` | Centered, padded title container |
| `.section-title h2` | Large light-weight heading (3.5rem) |
| `.section-title .subtitle` | Accent-colored uppercase label above h2; `::after` adds underline bar |
| `.section-title p` | Subtitle paragraph — muted, max-width 900px |

**HTML usage:**  
- `<div class="container section-title">` in **`index.html`** (news section)  
- `<div class="container section-title about">` in **`play.html`** and **`projects.html`** — the `.about` modifier applies additional background radial gradient via the About Section rules (§12)

---

### 12. About Section (modifier only)
**Selectors:** `.about`, `.about::before`

`.about` sets `overflow: hidden; position: relative;`  
`.about::before` renders a radial gradient accent glow behind the section content.

**HTML usage:** `.about` is used as a **modifier class** on the section-title div:  
- `<div class="container section-title about">` in **`play.html`** and **`projects.html`**

There is no standalone About page. The class merely triggers the decorative glow background.

---

### 13. Hero Section
**Selectors:** `.hero`, `.hero img`, `.hero:before`, `.hero .container`, `.hero h2`, `.hero p`, `.hero p span`, `.hero .social-links`, `.hero .social-links a`, `.hero .social-links a:hover`  
**Responsive:** `@media (max-width: 768px)` — h2 / p font sizes

| Selector | Purpose |
|---|---|
| `.hero` | Full-viewport flex section, `min-height: 100vh` |
| `.hero img` | Absolutely positioned background image |
| `.hero:before` | Dark overlay over background image |
| `.hero .container` | z-index 3 — above overlay |
| `.hero h2` | Main hero title (48px) |
| `.hero p` | Hero subtitle |
| `.hero p span` | Accent-colored typed text (Typed.js target) |
| `.hero .social-links` | Flex row of social icon circles |
| `.hero .social-links a` | Icon button — translucent circle |
| `.hero .social-links a:hover` | Accent background + lift on hover |

**HTML usage:** `<section id="home" class="hero section dark-background">` in **`index.html`**  
- Background image: `<img data-aos="fade-in">`  
- Typed.js target: `<span class="typed" data-typed-items="Infinite..., ...Ideas">`  
- Social icons: `<div class="social-links">` with `<i class="bi bi-steam">` etc.

**JS interaction:** `main.js` initialises Typed.js on `.typed`; `data-typed-items` drives the animation.

---

### 14. Resume Section — Experience Cards
**Selectors:** `.resume .experience-section .experience-cards`, `.exp-card`, `exp-card::before/hover/featured`, `.card-header`, `.company-logo`, `.period-badge`, `.card-body h3`, `.card-body .description`  
**Responsive:** `@media (max-width: 992px)`, `(max-width: 768px)`, `(max-width: 576px)`

| Selector | Purpose |
|---|---|
| `.experience-section .experience-cards` | Flex column gap layout |
| `.exp-card` | Dark surface card, rounded, border, hover lift |
| `.exp-card::before` | Gradient accent bar that slides in on hover |
| `.exp-card.featured` | Accent border + subtle tinted gradient background |
| `.card-header` | Flex row — logo + period badge |
| `.company-logo` | 50×50 gradient square with Bootstrap icon |
| `.company-logo i` | Icon inside logo box |
| `.period-badge` | Accent pill with dates |
| `.card-body h3` | Card title |
| `.card-body .description` | Body text, muted |

**HTML usage:**  
- **`index.html`** `<section id="news" class="resume section">` — 3 featured cards  
- **`play.html`** `<div class="container resume">` — 6 cards for game mechanics  
- **`projects.html`** `<div class="container resume">` — 1 card for Axion game info

Elements in HTML: `<div class="experience-section">` → `<div class="experience-cards">` → `<div class="exp-card [featured]">` → `<div class="card-header">` (with `.company-logo` and `.period-badge`) → `<div class="card-body">` (with `h3` or `h4` titles and `.description`)

---

### 15. Portfolio Section
**Selectors:** `.portfolio .portfolio-card`, `.portfolio-image-container`, `.portfolio-image-container img`, `.portfolio-overlay`, `.portfolio-overlay .portfolio-actions`, `.portfolio-actions a/a:hover`, `.portfolio-card:hover .portfolio-image-container img`, `.portfolio-card:hover ... .portfolio-overlay`  
**Plus:** `.btn.btn-accent`, `.btn.btn-accent:hover`

| Selector | Purpose |
|---|---|
| `.portfolio-card` | Card wrapper, `margin-bottom: 30px` |
| `.portfolio-image-container` | Overflow-hidden, 4:3 aspect ratio |
| `.portfolio-image-container img` | Cover-fit image, scale on hover |
| `.portfolio-overlay` | Dark gradient overlay, opacity 0→1 on hover |
| `.portfolio-overlay .portfolio-actions` | Bottom-right icon buttons (lightbox trigger) |
| `.portfolio-actions a` | White circle button |
| `.portfolio-actions a:hover` | Accent fill + scale |
| `.btn.btn-accent` | Red CTA button (display, padding, radius, color) |
| `.btn.btn-accent:hover` | Darken + lift on hover |

**HTML usage:** `<section id="play" class="portfolio section">` in **`projects.html`**  
Structure: `<div class="isotope-layout">` → `<div class="row gy-4 isotope-container">` → `<div class="col-lg-4 col-md-6 portfolio-item isotope-item">` → `<div class="portfolio-card">` → `<div class="portfolio-image-container">` → `<img class="img-fluid">` + `<div class="portfolio-overlay">` → `<div class="portfolio-actions">` → `<a class="glightbox portfolio-link">`

**`.btn.btn-accent`** is also used in **`play.html`**: `<a class="btn btn-accent">Start Game</a>`

**JS interaction:** GLightbox is initialised on `.glightbox` elements in `main.js`.

---

### 16. Terms of Service Section
**Selectors:** `.terms-of-service .tos-header`, `.tos-header .last-updated`, `.tos-header h2/p`, `.tos-content .content-section`, `.content-section:last-child`, `.content-section h3/p/p:last-child`, `.info-box`, `.info-box i/p`, `.list-items`, `.list-items li`, `.list-items li::before`, `.alert-box`, `.alert-box i/.alert-content`, `.prohibited-list`, `.prohibited-item`, `.disclaimer-box`, `.notice-box`, `.terms-of-service .tos-contact`, `.contact-box`, `.contact-icon`, `.contact-content`, `.contact-link`  
**Responsive:** `@media (max-width: 576px)` — `.prohibited-list`, `.contact-box`  
**Print:** `@media print` — hides `.tos-contact`, sets `page-break-inside: avoid` on `.content-section`

**HTML usage:** **`terms.html`** only  
Two `<section class="terms-of-service section">` blocks: Terms of Service and Privacy Policy  
Structure: `<div class="tos-header">` → `<div class="tos-content">` → multiple `<div class="content-section" id="...">` → various `.info-box`, `.alert-box`, `.prohibited-list`, `.disclaimer-box`, `.notice-box`  
Contact box at bottom: `<div class="tos-contact">` → `<div class="contact-box">` → `.contact-icon` + `.contact-content` (with `.contact-link`)

---

### 17. Privacy / Versions Section
**Selectors:** `.privacy`, `.privacy .row`, `.privacy .policy-sidebar`, `.policy-sidebar h3`, `.policy-sidebar .policy-nav`, `.policy-nav .nav-link`, `.nav-link:hover`, `.nav-link.active`, `.privacy .policy-main`, `.privacy .policy-hero`  
**Responsive:** `@media (max-width: 991px)` — sidebar unsticky, policy-main padding; `@media (max-width: 767px)` — padding/hero margin

| Selector | Purpose |
|---|---|
| `.privacy` | Section padding + slightly lightened background |
| `.privacy .row` | `position: relative` for sticky sidebar |
| `.policy-sidebar` | Sticky sidebar (top: 100px), surface background card |
| `.policy-sidebar h3` | "Versions" label — uppercase, small |
| `.policy-nav` | Flex column nav list |
| `.nav-link` | Sidebar nav item — left border indicator on active/hover |
| `.nav-link.active` | Accent background + bold |
| `.policy-main` | Main content area — surface card, 50px padding |
| `.policy-hero` | Version article container, `margin-bottom: 60px` |

**HTML usage:** **`versions.html`** only  
`<section id="privacy" class="privacy section">` → two-column layout: `<div class="col-lg-3">` (sidebar) + `<div class="col-lg-9">` (content)  
Sidebar: `<div class="policy-sidebar">` → `<nav class="policy-nav">` → `<a class="nav-link [active]">`  
Content: `<div class="policy-main">` → 7× `<div id="original|remonstered|..." class="policy-hero">` each with h2/h3 (inline-styled `color: #ff6b6b`), tables, images

**JS interaction:** Inline `<script>` at bottom of `versions.html` tracks scroll and adds/removes `.nav-link.active` + `aria-current="page"` on sidebar links.

---

### 18. GLightbox Overrides
**Selectors:** `.glightbox-clean .gdesc-inner`, `.glightbox-clean .gslide-title`, `.glightbox-mobile .glightbox-container.glightbox-clean .gslide-title`

Tightens padding in the GLightbox description panel and styles the title in accent red, centered.

**HTML usage:** `<a class="glightbox portfolio-link" data-gallery="...">` in **`projects.html`** (6 gallery images).  
`glightbox-clean` / `glightbox-mobile` are vendor-added classes injected by GLightbox JS.

---

## JS-driven classes (not in HTML source)

| Class | Added to | Trigger | CSS rules |
|---|---|---|---|
| `scrolled` | `<body>` | `scrollY > 100` | `.scrolled .header` (shadow + bg) |
| `mobile-nav-active` | `<body>` | `.mobile-nav-toggle` click | Mobile nav overlay rules |
| `active` | `.navmenu a` | Scrollspy in viewport | `.navmenu .active` link colour |
| `active` | `.nav-link` (versions sidebar) | Inline scroll script | `.nav-link.active` background |
| `active` | `.scroll-top` | `scrollY > 100` | `.scroll-top.active` visibility |
| `bi-x` / `bi-list` | `.mobile-nav-toggle` | Toggle click | Bootstrap icon switch |
| `active` | `.navmenu li.dropdown` | `.toggle-dropdown` click | (structural — no direct CSS rule) |
| `dropdown-active` | `li.dropdown` next `<ul>` | `.toggle-dropdown` click | `.navmenu .dropdown>.dropdown-active` display |

---

## Key HTML element → CSS class cross-reference

| HTML element / id | Page(s) | CSS class(es) |
|---|---|---|
| `<header id="header">` | All | `.header`, `.d-flex`, `.align-items-center`, `.fixed-top` |
| `<nav id="navmenu">` | header.html | `.navmenu` |
| `<li class="dropdown">` | header.html | `.dropdown`, (JS: `.active`, `.dropdown-active`) |
| `<i class="mobile-nav-toggle">` | header.html | `.mobile-nav-toggle`, `.bi-list`/`.bi-x` |
| `<footer id="footer">` | All | `.footer` |
| `<div class="copyright">` | header.html | `.footer .copyright` |
| `<div class="credits">` | header.html | `.footer .credits` |
| `<div id="preloader">` | All | `#preloader` |
| `<a id="scroll-top">` | All | `.scroll-top`, (JS: `.active`) |
| `<section class="hero dark-background">` | index.html | `.hero`, `.dark-background` |
| `<span class="typed">` | index.html | (Typed.js target — no CSS rule; cursor styled by vendor) |
| `<div class="social-links">` | index.html | `.hero .social-links` |
| `<h2 class="hero-title-light-blue">` | index.html | `.hero-title-light-blue` |
| `<section class="resume section">` | index.html | `section`, `.section` |
| `<div class="section-title">` | index.html, play.html, projects.html | `.section-title` + sub-rules |
| `<div class="section-title about">` | play.html, projects.html | `.about`, `.about::before` |
| `<span class="subtitle">` | All section-title blocks | `.section-title .subtitle` |
| `<div class="experience-section">` | index, play, projects | Resume card layout rules |
| `<div class="exp-card featured">` | index.html | `.exp-card.featured` |
| `<div class="exp-card">` | play, projects | `.exp-card` |
| `<div class="card-header">` | index, play, projects | `.exp-card .card-header` |
| `<div class="company-logo">` | All exp-cards | `.company-logo` / `.company-logo i` |
| `<div class="period-badge">` | All exp-cards | `.period-badge` |
| `<div class="card-body">` | All exp-cards | `.card-body h3` / `.description` |
| `<section class="portfolio section">` | projects.html | `section` |
| `<div class="portfolio-card">` | projects.html | `.portfolio-card` + sub-rules |
| `<a class="glightbox portfolio-link">` | projects.html | `.portfolio-actions a` + GLightbox |
| `<a class="btn btn-accent">` | play.html | `.btn.btn-accent` |
| `<section class="terms-of-service section">` | terms.html | `.terms-of-service` rules |
| `<div class="content-section">` | terms.html | `.terms-of-service .tos-content .content-section` |
| `<section class="privacy section">` | versions.html | `.privacy` rules |
| `<div class="policy-sidebar">` | versions.html | `.privacy .policy-sidebar` |
| `<a class="nav-link">` | versions.html | `.privacy .policy-nav .nav-link` |
| `<div class="policy-hero">` | versions.html | `.privacy .policy-hero` |

---

## What is NOT in `main.css`

The following classes appear in HTML but are styled **only by Bootstrap vendor CSS**, not by `main.css`:

`d-flex` · `align-items-center` · `justify-content-center` · `fixed-top` · `container` · `container-fluid` · `container-xl` · `position-relative` · `me-auto` · `row` · `col-lg-*` · `col-md-*` · `col-12` · `text-center` · `text-muted` · `mt-4` · `mb-*` · `px-1` · `gy-4` · `my-4` · `img-fluid` · `float-start` · `float-end` · `me-3` · `ms-3` · `table` · `table-dark` · `table-striped` · `table-bordered` · `d-lg-none`

Bootstrap Icon classes (`bi`, `bi-*`) are font ligatures defined in `bootstrap-icons.css`.
