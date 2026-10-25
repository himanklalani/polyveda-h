# Polyveda Typography & Font Theme Specification

## 1. Font Architecture & Loading Strategy
Polyveda utilizes Google Fonts loaded natively via Next.js `next/font/google` in `src/app/layout.tsx`. This eliminates layout shift (CLS: 0), embeds zero-render-blocking font assets, and automatically configures CSS custom properties.

| Font Family | CSS Variable | Fallback Stack | Role in System |
| :--- | :--- | :--- | :--- |
| **Outfit** | `--font-display` | `sans-serif` | Display headlines, monolithic titles, CAD indices, and button labels. |
| **Plus Jakarta Sans** | `--font-body` | `sans-serif` | Technical copy, specifications, forms, and paragraphs. |

Mapped in `src/app/globals.css`:
```css
--font-heading: var(--font-display), sans-serif;
--font-base: var(--font-body), sans-serif;
```

---

## 2. Typographic Scale & Hierarchy

### 2.1 Hero Monolithic Title
* **Font Family:** `var(--font-heading)` (`Outfit`)
* **Size:** `clamp(38px, 6vw, 90px)`
* **Weight:** `700` (Bold)
* **Line Height:** `1.0` (Monolithic, tight block spacing)
* **Letter Spacing:** `-2px`
* **Text Shadow:** `0 4px 16px rgba(0, 0, 0, 0.8)` (Optimized for mobile GPUs)
* **Color:** Pure White (`#FFFFFF`) with Accent highlight in Electric Cobalt (`#0066FA`)

### 2.2 Section Headlines (e.g., Products Showcase, Problem Solution)
* **Font Family:** `var(--font-heading)` (`Outfit`)
* **Size:** `clamp(32px, 5vw, 72px)`
* **Weight:** `600` / `700`
* **Line Height:** `1.08` to `1.1`
* **Letter Spacing:** `-1.5px` to `-2px`
* **Color:** Deep Cobalt Navy (`#031D4D`) on light backgrounds; Crisp White (`#F8FAFC`) on dark backgrounds

### 2.3 Card Headings & Product Titles
* **Font Family:** `var(--font-heading)` (`Outfit`)
* **Size:** `22px` to `26px`
* **Weight:** `600`
* **Line Height:** `1.2`
* **Letter Spacing:** `-0.5px`
* **Interactive State:** Contains an active Signal Yellow (`#FFD100`) underline reveal on hover.

### 2.4 Technical Copy & Paragraphs
* **Font Family:** `var(--font-base)` (`Plus Jakarta Sans`)
* **Size:** `14px` (Card descriptions), `15px`–`16px` (Standard body), `18px` (Subheadings)
* **Weight:** `400` (Regular) / `500` (Medium)
* **Line Height:** `1.6` to `1.7` (Generous line height for small technical descriptions)
* **Color:** Slate (`#475569`) on light surfaces; Muted White (`rgba(248, 250, 252, 0.72)`) on dark surfaces

### 2.5 Architectural CAD Indices & Coordinate Labels
* **Font Family:** `var(--font-heading)` (`Outfit`)
* **Size:** `10px` to `12px`
* **Weight:** `600`
* **Letter Spacing:** `2px` to `3.5px`
* **Transform:** `uppercase`
* **Format Examples:** `PV-CAD // 01`, `PV-SYS // 01 · DIRECTORY`, `SCROLL TO EXPLORE`

### 2.6 Category Ticker Bar & Micro-Navigation
* **Font Family:** `var(--font-heading)` (`Outfit`)
* **Size:** `11px` to `12px`
* **Weight:** `600`
* **Letter Spacing:** `0.12em` (Tracked out)
* **Transform:** `uppercase`
* **Affordance:** Paired with diagonal directional arrows (`↗`, `↘`)

---

## 3. Typographic Rules & Best Practices
1. **Never use generic browser sans-serifs:** Always reference `var(--font-heading)` or `var(--font-base)`.
2. **Monolithic tight tracking for headers:** All display headlines must use negative tracking (`-1px` to `-2px`) and tight line-heights (`1.0` to `1.1`) to achieve that solid Swiss block feeling.
3. **Generous tracking for technical coordinates:** Sub-labels, indices, and category tags must be uppercase with expanded letter-spacing (`2px`–`4px`).
4. **Contrast Harmony:** Headlines on white surfaces use Deep Industrial Navy (`#031D4D`), never plain black or washed-out grays.
