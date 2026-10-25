# Polyveda Design System Specification

## 1. Design Ideology & Aesthetic Foundations
The Polyveda web experience is built on **Swiss Industrial Grid Modernism** and **Layered Scroll Choreography**. It draws direct inspiration from high-craft European industrial engineering (e.g., Qualitair), precision CAD blueprints, and architectural layouts.

### Core Tenets:
1. **Physical Depth over Flat Sheets:** Sections are treated as independent physical panels with distinct z-indexes, velocities, and solid opaque backdrops rather than a single flat scroll canvas.
2. **Exposed Structural Hairlines:** Continuous `1px solid` grid borders divide the viewport into modular architectural cells.
3. **High-Contrast Editorial Typography:** Monolithic, tall, condensed display headlines paired with clean geometric body copy.
4. **Zero-Pill Restraint:** No rounded pill badges, floating oval chips, or generic multi-color neon gradients. All geometry adheres to sharp CAD corners (`2px`–`4px` border-radius).

---

## 2. Color Architecture

All colors are declared in `src/app/globals.css` and accessed via CSS custom properties:

| Token | Hex / Value | Role & Usage |
| :--- | :--- | :--- |
| `--color-bg-light` | `#FFFFFF` | Primary canvas background. Crisp, airy, sterile white. |
| `--color-bg-subtle` | `#F8FAFC` | Subtle porcelain surface for technical wells and alternate rows. |
| `--color-bg-dark` | `#031433` | Deep structural navy for grounded footers and dark hero backgrounds. |
| `--color-text-dark` | `#031D4D` | Deep Cobalt Navy for high-contrast headlines and editorial body ink. |
| `--color-text-light` | `#F8FAFC` | Crisp white typography on dark surfaces. |
| `--color-text-muted-dark` | `#475569` | Balanced slate for secondary technical copy and descriptions. |
| `--color-primary` | `#0066FA` | Electric Cobalt. Primary interactive accent, active indicators, and links. |
| `--color-secondary` | `#032C77` | Deep Brand Anchor Navy. Display headlines and dark card substrate. |
| `--color-grid-hairline`| `#E2E6EC` | Exposed 1px Swiss structural grid borders on light surfaces. |
| `--color-grid` | `rgba(3, 44, 119, 0.045)` | Subtle 48px x 48px blueprint background grid. |
| `--color-highlight` | `#FFD100` | High-visibility Industrial Signal Yellow. Used for hover underlines and arrows. |

---

## 3. Structural Grid Architecture

### Exposed Hairlines:
Every major section boundary, card grid, and navigation partition uses visible 1px hairlines:
```css
/* Swiss 1px Grid Hairline */
border: 1px solid var(--color-grid-hairline);
```

### The Architectural Curtain Panel:
Between the Hero and subsequent content, the interface uses an opaque curtain barrier with a solid `#FFFFFF` background and higher z-index:
* **Base Layer (`z-index: 1`):** The Hero sticky canvas sequence.
* **Curtain Layer (`z-index: 10`):** The full-width Category Ticker Bar (`border-top: 1px solid var(--color-grid-hairline)`) and Product Catalogue, sliding vertically up and over the hero text like a physical guillotine panel.

---

## 4. Component Design Patterns

### 4.1 Curtain Category Ticker Bar
* **Location:** Top boundary of `src/components/sections/ProductsShowcase.tsx`.
* **Design:** Continuous full-width bar with 1px top and bottom hairlines, divided into modular cells.
* **Typography:** `font-family: var(--font-heading); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;`.
* **Micro-Interaction:** Hovering a cell triggers a subtle cobalt wash (`rgba(0, 102, 250, 0.04)`), shifts text color to `--color-primary`, and translates the diagonal arrow (`↗`) `2px` up and right.

### 4.2 Product Cards (`ProductsShowcase.tsx`)
* **Substrate:** Frosted glass white (`rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(14px)`).
* **Grid:** 3-column CSS Grid with `gap: 1px; background-color: rgba(3, 44, 119, 0.08);` producing automatic 1px exposed borders.
* **Card Header:** Unboxed CAD coordinate index (`PV-CAD // 01`) in Electric Cobalt + uppercase category label in muted slate.
* **Title Hover Reveal:** Product titles contain an active Signal Yellow underline (`--color-highlight`) that expands from `scaleX(0)` to `scaleX(1)` with `--ease-out-smooth`.
* **Spec Tags:** Rectangular CAD tags (`border-radius: 2px; border: 1px solid rgba(11, 18, 21, 0.08);`).

### 4.3 Action Buttons (`Button.tsx`)
* **Geometry:** Sharp rectangular CAD corners (`border-radius: 4px;`).
* **Physics:** Two-layer sliding curtain background:
  * Rest: Background sits at `translateY(101%)`.
  * Hover: Background glides to `translateY(0%)` with `cubic-bezier(0.215, 0.61, 0.355, 1)`. Text color inverts with zero jump.

### 4.4 Morphed Menu Navigation (`Navbar.tsx`)
* **Trigger:** Floating CAD button (`border-radius: 4px; border: 1px solid rgba(3, 44, 119, 0.12)`).
* **Expanded State:** Framed with a 1px structural hairline (`#E2E6EC`), featuring an internal CAD directory coordinate (`PV-SYS // 01 · DIRECTORY`), animated SVG diagonal arrows, and Signal Yellow (`#FFD100`) hover underlines.

---

## 5. Animation Physics & Easings

Declared in `globals.css`:
* `--ease-spring: cubic-bezier(0.32, 0.72, 0, 1)`: Used for layout transitions and dimensional expansion.
* `--ease-architectural: cubic-bezier(0.38, 0.005, 0.215, 1)`: Sharp initial acceleration with long, gliding deceleration tail.
* `--ease-out-smooth: cubic-bezier(0.215, 0.61, 0.355, 1)`: High-precision deceleration for hovers, underlines, and sliding curtains.

---

## 6. Strict Anti-Patterns & Prohibitions
1. **NO Generic Pills:** Never wrap section tags, categories, or indicators in oval pills (`border-radius: 9999px`). Use clean text labels with uppercase tracking.
2. **NO Blurry Gradient Blobs:** Never add random floating cyan/purple radial gradient orbs behind cards.
3. **NO Global `overflow-x: hidden` on Root:** Never put `overflow-x: hidden` on `html`, `body`, or top-level containers; it completely disables `position: sticky` on the Hero sequence.
4. **NO Tailwind CSS:** All styling must remain in bespoke CSS Modules and global CSS variables.
