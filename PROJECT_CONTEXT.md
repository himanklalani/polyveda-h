# Polyveda Master Project Context & Onboarding Guide

## 1. Document Purpose
This document is the **Primary Source of Truth** for the Polyveda codebase. Read this file before making modifications or starting work on another laptop. It contains the business context, architectural layout, directory map, design rules, and setup instructions.

---

## 2. Fast-Start Guide (New Laptop Setup)

```bash
# 1. Clone repository
git clone https://github.com/himanklalani/polyveda-h.git
cd polyveda-h/polyveda-web

# 2. Add client remote (for dual-remote workflow)
git remote add client https://github.com/polyveda/polyveda.git

# 3. Pull latest changes
git pull origin main

# 4. Install dependencies
npm install

# 5. Environment configuration
cp .env.example .env.local
# Edit .env.local with MONGODB_URI and Cloudinary credentials

# 6. Start development server
npm run dev
# Live at http://localhost:3000

# 7. Production build test
npm run build
```

---

## 3. Business Context & Positioning
* **Company:** Polyveda
* **Industry:** Heavy-Duty Returnable Transit Packaging (RTP) & Precision Polypropylene (PP) Corrugated Engineering.
* **Target Audience:** Procurement directors, supply chain heads, warehouse and logistics managers in Automotive, Electronics/Semiconductors, Healthcare/Pharma, and Heavy Manufacturing.
* **Value Proposition:** Replaces fragile single-use cardboard with 50+ cycle reusable PP corrugated solutions. Impervious to moisture, high strength-to-weight ratio, collapsible for compact 4:1 return logistics, drastically reducing Total Cost of Ownership (TCO).

---

## 4. Technical Stack
* **Framework:** Next.js 16.2.9 (App Router, Turbopack)
* **Styling:** Bespoke Vanilla CSS Modules (`.module.css`) + CSS Custom Properties (`src/app/globals.css`). **No Tailwind CSS**.
* **Animation:** Framer Motion (`framer-motion`) for layout transitions, spring physics, and canvas sequence scrubbing.
* **HTML5 Canvas Sequence:** `ScrollSequenceCanvas.tsx` scrubs through 160 frames (desktop) and 175 frames (mobile) during the 400vh Hero scroll.
* **Database & CMS:** MongoDB with Mongoose (`mongoose`) for lead qualification (`Enquiry`) and internal blog management (`Post`).
* **Media Storage:** Cloudinary for CMS blog media uploads with automatic format and quality optimization (`f_auto,q_auto`).

---

## 5. Codebase Directory Map

```text
polyveda-web/
├── public/                     # Static assets, hero sequences, icons, logos
│   ├── hero-sequence-new/      # 160 desktop canvas frame sequence
│   ├── hero-sequence-mobile/   # 175 mobile canvas frame sequence
│   └── *.png / *.jpg           # Logo, branding, OG image
├── src/
│   ├── app/                    # Next.js App Router (26 static & dynamic routes)
│   │   ├── layout.tsx          # Root layout, Google Fonts (Outfit, Plus Jakarta)
│   │   ├── template.tsx        # Swiss PixelReveal staggered page transitions
│   │   ├── globals.css         # Design system tokens, Swiss grid, colors, easings
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About Polyveda
│   │   ├── products/           # Product catalogue & dynamic [id] spec sheets
│   │   ├── industries/         # Vertical industry applications (Automotive, etc.)
│   │   ├── capabilities/       # Engineering & fabrication capabilities
│   │   ├── blog/               # Editorial articles & insights
│   │   ├── contact/            # Lead generation & MultiStepForm
│   │   ├── portal-x8f2/        # Internal Admin CMS (Leads & Blog Posts)
│   │   ├── privacy-policy/     # Legal privacy policy
│   │   ├── terms/              # Terms & conditions
│   │   ├── cookies-policy/     # Cookie compliance
│   │   ├── quality/            # Quality assurance standards
│   │   ├── sustainability/     # Environmental lifecycle hub
│   │   └── api/                # Backend Route Handlers
│   │       ├── enquiry/        # Lead capture endpoint -> MongoDB
│   │       └── portal-x8f2/    # CMS post creation & image uploads
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Floating Morphed Menu with Swiss grid & CAD indices
│   │   │   ├── Preloader.tsx   # Cinematic bloom preloader with layoutId logo flight
│   │   │   ├── Footer.tsx      # High-contrast corporate navy footer
│   │   │   └── ClientLayout.tsx# Client wrapper for global layout providers
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # 400vh sticky canvas sequence container
│   │   │   ├── ProductsShowcase.tsx # Curtain ticker bar & Swiss product matrix
│   │   │   ├── CtaStrip.tsx    # Post-showcase conversion strip
│   │   │   ├── TcoCalculator.tsx    # Interactive ROI & lifecycle cost calculator
│   │   │   ├── ScrollSyncedText.tsx # Slot-machine style typography reveal
│   │   │   ├── ScrollZoomReveal.tsx # Expanding zoom reveal card
│   │   │   ├── ProblemSolution.tsx  # Cardboard failure vs PP corrugated strength
│   │   │   └── IndustryGrid.tsx     # Automotive, pharma, electronics pillars
│   │   └── ui/
│   │       ├── Button.tsx      # Zero-pill button with sliding curtain physics
│   │       ├── ScrollSequenceCanvas.tsx # High-performance HTML5 canvas player
│   │       ├── KineticFlow.tsx # Physics-driven 3D interactive gallery
│   │       ├── MultiStepForm.tsx    # Multi-step lead qualification form
│   │       └── FloatingEnquiry.tsx  # Floating quick-enquiry action button
│   ├── context/
│   │   └── PreloaderContext.tsx# Synchronization context for load animation
│   ├── lib/
│   │   ├── db.ts               # Cached MongoDB connection utility
│   │   └── models/             # Mongoose schemas (Enquiry, Post)
│   └── data/
│       ├── products.ts         # Products catalogue data & technical specs
│       └── industries.ts       # Industries applications & metrics
├── .env.example                # Template for environment variables
├── DEPLOYMENT_CHANGELOG.md     # Full version history & changelog
├── DESIGN_SYSTEM.md            # Colors, hairlines, and component guidelines
├── FONT_THEME.md               # Typography stack & hierarchy
└── package.json                # Project dependencies and npm scripts
```

---

## 6. Git Dual-Remote Configuration

Both remotes must be kept in sync when pushing:
* **`origin`**: `https://github.com/himanklalani/polyveda-h.git`
* **`client`**: `https://github.com/polyveda/polyveda.git`

Command:
```bash
git push origin main
git push client main
```
