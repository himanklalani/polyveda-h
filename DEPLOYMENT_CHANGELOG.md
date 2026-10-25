# Polyveda Deployment & Release Changelog

## Current Release: `v1.2.0-swiss-grid`
* **Release Date:** October 25, 2026
* **Build Engine:** Next.js 16.2.9 (Turbopack)
* **TypeScript Compilation:** Passed (0 errors, strict mode)
* **Production Build Output:** 26 static & dynamic routes prerendered cleanly
* **Target Environment:** Vercel / Node.js Production Server

---

## 1. Executive Summary
This release transitions the Polyveda digital experience into an editorial Swiss industrial grid design system inspired by precision CAD engineering and layered kinetic typography (Qualitair-grade interaction system). All generic gradients, pill containers, and glowing orbs have been replaced with exposed 1px structural grid lines, architectural curtain scroll overlap, high-contrast typography, and high-visibility Signal Yellow interactive accents.

---

## 2. Detailed Changelog of Changes

### 2.1 Hero Section Stabilization & Sticky Pinning Fix
* **Root Cause Identified & Fixed:** An ancestor `overflow-x: hidden` was previously added to `html, body` and `.page`, which violates standard CSS specifications for `position: sticky` and prevented the 400vh canvas image sequence from pinning to the viewport.
* **Resolution:** Removed global `overflow-x: hidden` from `html, body` and `.page`. Scoped all horizontal overflow containment strictly to individual wide sections.
* **Refinement:** Unboxed and simplified the hero frame reticle label to `SCROLL TO EXPLORE`. The 400vh canvas sequence scrubs with weighted spring inertia (`useSpring` mass: 0.4, stiffness: 150, damping: 50).

### 2.2 The "Curtain Overlap" Architectural Divider Bar
* **Component:** `src/components/sections/ProductsShowcase.tsx` and `.module.css`
* **Implementation:** Added a full-width horizontal category ticker bar at the leading edge of the Products Showcase section.
* **Physics & Depth Layering:** The Hero section sits on a lower depth plane (`z-index: 1`), while the Products Showcase section sits on an opaque `#FFFFFF` plane (`z-index: 10`). As the user scrolls, this category bar acts as a physical sliding architectural panel / guillotine, smoothly masking the bottom of the hero.
* **Structure:** Continuous 1px exposed hairlines (`#E2E6EC`) dividing 5 interactive cells:
  1. `01 PP CORRUGATED BOXES ↗`
  2. `02 CUSTOM CNC TRAYS ↗`
  3. `03 HEAVY-DUTY TRUNKS ↗`
  4. `04 FLOOR SHEETS ↗`
  5. `05 SIGNAGE & POS ↗`
* **Watermark Ring:** Added a subtle geometric CAD watermark ring breaking across the right side of the grid at 4.5% opacity, strictly bounded within section overflow.

### 2.3 Color Architecture & Tokens
* **Updated in `src/app/globals.css`:**
  * **Primary Canvas Background:** Crisp Alabaster / Pure Ice White (`#FFFFFF` / `#F8FAFC`).
  * **Primary Brand Accent:** Electric Cobalt Blue (`#0066FA` / `#0047BB`) for active states, link arrows, and primary CTAs.
  * **Deep Anchor Navy:** Midnight Industrial Navy (`#032C77` / `#071833`) for high-contrast typography, display headings, and dark substrates.
  * **Exposed Grid Hairlines:** `--color-grid-hairline: #E2E6EC` (and `rgba(3, 44, 119, 0.08)`).
  * **Interactive Highlight:** `--color-highlight: #FFD100` (High-visibility Industrial Signal Yellow).

### 2.4 Zero-Pill CAD Geometry & Micro-Interactions
* **Purged Pill Containers:** Completely removed oval pills, floating badges, and 1–2 word boxed containers across `ProductsShowcase`, `KineticFlow`, `SectionHeader`, and `TcoCalculator`.
* **CAD Coordinate Headings:** Replaced boxed category badges with unboxed, architectural coordinate indices (`PV-CAD // 01`, `PV-CAD // 02`, etc.).
* **Signal Yellow Active Underlines:** Added smooth hover underline reveals on product titles (`transform: scaleX(0) → scaleX(1)` with `cubic-bezier(0.215, 0.61, 0.355, 1)`).
* **Sliding Curtain Buttons (`Button.tsx`):** Implemented sliding curtain backgrounds (`translateY(101%) → translateY(0%)`) with sharp 4px CAD corner radii.

### 2.5 Navigation Menu Refinement (`Navbar.tsx`)
* Framed the open floating morphed menu with a 1px structural hairline border (`#E2E6EC`).
* Added an unboxed CAD coordinate header: `PV-SYS // 01 · DIRECTORY`.
* Added a 1px hairline divider between the primary links and footer utilities.
* Interactive footer hover lines illuminate in Signal Yellow (`#FFD100`).
* Menu toggle button styled with a 4px CAD corner and precision 1px border.

### 2.6 Full Legal, Compliance, and Admin Portal
* Legal & Policy hubs: `/privacy-policy`, `/terms`, `/cookies-policy`, `/quality`, `/sustainability`.
* Admin CMS & Lead Capture: `/portal-x8f2/leads` and `/portal-x8f2/posts` with MongoDB Mongoose connection and Cloudinary image upload handling.

---

## 3. Fast-Start Instructions for Another Laptop

To resume development on a new laptop, execute the following steps:

```bash
# 1. Clone the repository (or pull latest changes if already cloned)
git clone https://github.com/himanklalani/polyveda-h.git
cd polyveda-h/polyveda-web

# 2. Ensure both Git remotes are configured
git remote -v
# If missing client remote, add it:
# git remote add client https://github.com/polyveda/polyveda.git

# 3. Pull latest main branch from origin
git pull origin main

# 4. Install dependencies (Node 18+ recommended)
npm install

# 5. Create local environment configuration
cp .env.example .env.local
# Edit .env.local with MONGODB_URI and CLOUDINARY credentials

# 6. Launch local development server
npm run dev
# Site will be running at http://localhost:3000

# 7. Verify production build
npm run build
```

---

## 4. Git Synchronization Workflow
This project utilizes a dual-remote Git setup:
* **`origin`**: Development fork (`https://github.com/himanklalani/polyveda-h.git`)
* **`client`**: Client production repository (`https://github.com/polyveda/polyveda.git`)

### How to Push:
```bash
# Push to development fork:
git push origin main

# Push to client production repository:
git push client main
```
