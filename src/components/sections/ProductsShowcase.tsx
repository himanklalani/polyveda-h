'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import styles from './ProductsShowcase.module.css';

const products = [
  {
    id: '01',
    slug: 'pp-corrugated-boxes',
    name: 'PP Corrugated Boxes',
    category: 'Packaging',
    tagline: 'Built to outlast cardboard by 50+ cycles.',
    description: 'Custom-designed from premium flute board. Moisture-resistant, superior strength-to-weight ratio, and fully collapsible for return logistics.',
    specs: ['2mm – 20mm Thickness', 'Custom Dimensions', 'Weatherproof'],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric Base Frame */}
        <path d="M70 102 L26 77 L70 52 L114 77 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.35" />
        {/* Box Chassis Vertical Edges */}
        <path d="M26 42 L26 77 M70 67 L70 102 M114 42 L114 77" stroke="currentColor" strokeWidth="1.6" />
        {/* Front Panels Bottom Edges */}
        <path d="M26 77 L70 102 L114 77" stroke="currentColor" strokeWidth="1.6" />
        {/* Upper Body Rim */}
        <path d="M26 42 L70 67 L114 42" stroke="currentColor" strokeWidth="1.6" />
        {/* Transparent Interior Back Walls */}
        <path d="M26 42 L70 17 L114 42" stroke="currentColor" strokeWidth="1.3" opacity="0.45" />
        <path d="M70 17 L70 52" stroke="currentColor" strokeWidth="1.2" opacity="0.3" strokeDasharray="2 2" />
        {/* Open Folding Flaps (30° Isometric Extension) */}
        <path d="M26 42 L14 30 L58 48 L70 67" stroke="currentColor" strokeWidth="1.4" />
        <path d="M70 67 L82 48 L126 30 L114 42" stroke="currentColor" strokeWidth="1.4" />
        <path d="M26 42 L38 23 L70 17" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <path d="M70 17 L102 23 L114 42" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        {/* Structural Flute Corrugation Lines on Front-Right Panel */}
        <path d="M79 72 L79 97 M88 67 L88 92 M97 62 L97 87 M106 57 L106 82" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
        {/* Structural Flute Corrugation Lines on Front-Left Panel */}
        <path d="M61 72 L61 97 M52 67 L52 92 M43 62 L43 87 M34 57 L34 82" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
        {/* Ergonomic Hand Holes */}
        <path d="M44 68 C42 67 40 68 40 70 L40 72 C40 74 42 75 44 76 L52 80 C54 81 56 80 56 78 L56 76 C56 74 54 73 52 72 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M96 68 C98 67 100 68 100 70 L100 72 C100 74 98 75 96 76 L88 80 C86 81 84 80 84 78 L84 76 C84 74 86 73 88 72 Z" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: '02',
    slug: 'custom-pp-trays',
    name: 'Custom PP Trays',
    category: 'Packaging',
    tagline: 'Zero movement. Zero damage.',
    description: 'Precision-engineered with CNC-cut custom cavities to cradle individual components. Available in ESD-safe conductive variants for electronics.',
    specs: ['CNC-Cut Cavities', 'ESD-Safe Options', 'Auto-line Ready'],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Isometric Shallow Tray Walls */}
        <path d="M70 94 L22 66 L70 38 L118 66 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 2" />
        <path d="M22 52 L22 66 M70 80 L70 94 M118 52 L118 66" stroke="currentColor" strokeWidth="1.6" />
        <path d="M22 66 L70 94 L118 66" stroke="currentColor" strokeWidth="1.6" />
        {/* Top Perimeter Lip */}
        <path d="M22 52 L70 80 L118 52 L70 24 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M26 52 L70 77 L114 52 L70 27 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        {/* Center Dividers (Cross Partition) */}
        <path d="M48 66 L92 38 M48 38 L92 66" stroke="currentColor" strokeWidth="1.4" />
        <path d="M70 52 L70 66" stroke="currentColor" strokeWidth="1.3" />
        {/* Cavity 1 (Left): Recess */}
        <path d="M38 52 L48 58 L58 52 L48 46 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M38 52 L38 58 L48 64 L58 58 L58 52" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {/* Cavity 2 (Right): Recess */}
        <path d="M82 52 L92 58 L102 52 L92 46 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M82 52 L82 58 L92 64 L102 58 L102 52" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {/* Cavity 3 (Top): Recess */}
        <path d="M60 39 L70 45 L80 39 L70 33 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M60 39 L60 45 L70 51 L80 45 L80 39" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {/* Cavity 4 (Bottom): Recess */}
        <path d="M60 65 L70 71 L80 65 L70 59 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M60 65 L60 71 L70 77 L80 71 L80 65" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        {/* Stacking Corner Lugs */}
        <path d="M22 50 L26 48 M118 50 L114 48 M70 78 L70 82" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: '03',
    slug: 'pp-trunks-crates',
    name: 'PP Trunks & Crates',
    category: 'Heavy-Duty',
    tagline: 'Industrial strength. Reusable by design.',
    description: 'Collapsible heavy-duty trunks fitted with custom handles, lids, and EVA/EPE foam padding. Built for just-in-time automotive supply chains.',
    specs: ['Load-Bearing', 'Collapsible Design', 'Foam-Padded Interior'],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base Outline */}
        <path d="M24 78 L70 104 L116 78" stroke="currentColor" strokeWidth="1.6" />
        {/* Corner Uprights */}
        <path d="M24 46 L24 78 M70 72 L70 104 M116 46 L116 78" stroke="currentColor" strokeWidth="1.6" />
        {/* Body Top Perimeter */}
        <path d="M24 46 L70 72 L116 46 L70 20 Z" stroke="currentColor" strokeWidth="1.6" />
        {/* Reinforced Corner Caps (Top & Bottom) */}
        <path d="M66 69 L70 71 L74 69 L74 76 L70 78 L66 76 Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="70" cy="74" r="1" fill="currentColor" />
        <path d="M66 97 L70 99 L74 97 L74 104 L70 106 L66 104 Z" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="70" cy="101" r="1" fill="currentColor" />
        <path d="M24 46 L28 48 L28 54 L24 52 Z M24 72 L28 74 L28 80 L24 78 Z" stroke="currentColor" strokeWidth="1.3" />
        <path d="M116 46 L112 48 L112 54 L116 52 Z M116 72 L112 74 L112 80 L116 78 Z" stroke="currentColor" strokeWidth="1.3" />
        {/* Hinged Lid Ajar */}
        <path d="M24 42 L70 66 L116 42 L70 18 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 38 L70 62 L116 38" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
        <path d="M24 38 L24 42 M70 62 L70 66 M116 38 L116 42" stroke="currentColor" strokeWidth="1.3" />
        {/* Dual Mechanical Toggle Clasps */}
        <rect x="44" y="60" width="6" height="10" stroke="currentColor" strokeWidth="1.2" />
        <line x1="44" y1="65" x2="50" y2="65" stroke="currentColor" strokeWidth="1.2" />
        <rect x="90" y="60" width="6" height="10" stroke="currentColor" strokeWidth="1.2" />
        <line x1="90" y1="65" x2="96" y2="65" stroke="currentColor" strokeWidth="1.2" />
        {/* Side Grip Carry Handles */}
        <path d="M30 62 L38 67 L38 71 L30 66 Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M110 62 L102 67 L102 71 L110 66 Z" stroke="currentColor" strokeWidth="1.2" />
        {/* Horizontal Structural Swage Lines */}
        <path d="M24 62 L70 88 L116 62" stroke="currentColor" strokeWidth="1.2" opacity="0.45" strokeDasharray="4 2" />
      </svg>
    ),
  },
  {
    id: '04',
    slug: 'floor-protection-sheets',
    name: 'Floor Protection Sheets',
    category: 'Construction',
    tagline: 'Protect marble, tile & granite during renovation.',
    description: 'High-quality corrugated PP sheets engineered to safeguard floors during heavy-duty construction and renovation. Impermeable to paint and adhesives.',
    specs: ['Impact-Resistant', 'Adhesive-Proof', 'Lightweight'],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stacked Sheet 3 (Bottom Layer) */}
        <path d="M20 78 L66 104 L120 73" stroke="currentColor" strokeWidth="1.3" opacity="0.4" />
        <path d="M20 74 L20 78 M66 100 L66 104 M120 69 L120 73" stroke="currentColor" strokeWidth="1.3" opacity="0.4" />
        {/* Stacked Sheet 2 (Middle Layer) */}
        <path d="M20 70 L66 96 L120 65" stroke="currentColor" strokeWidth="1.4" opacity="0.65" />
        <path d="M20 66 L20 70 M66 92 L66 96 M120 61 L120 65" stroke="currentColor" strokeWidth="1.4" opacity="0.65" />
        {/* Primary Top Sheet with Flute Cross-Section */}
        <path d="M20 58 L66 84 L120 53 L74 27 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 63 L66 89 L120 58" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 58 L20 63 M66 84 L66 89 M120 53 L120 58" stroke="currentColor" strokeWidth="1.6" />
        {/* Exposed Twin-Wall Corrugated Flute Profile (Front-Left Cutaway) */}
        <path d="M26 62 L26 66 M32 65 L32 70 M38 69 L38 73 M44 72 L44 77 M50 76 L50 80 M56 79 L56 84 M62 82 L62 87" stroke="currentColor" strokeWidth="1.3" />
        {/* Exposed Twin-Wall Corrugated Flute Profile (Front-Right Cutaway) */}
        <path d="M72 87 L72 82 M78 84 L78 79 M84 80 L84 76 M90 77 L90 72 M96 73 L96 69 M102 70 L102 65 M108 66 L108 62 M114 63 L114 58" stroke="currentColor" strokeWidth="1.3" />
        {/* Precision Metric Roll Grid Lines Across Surface */}
        <path d="M35 50 L89 79" stroke="currentColor" strokeWidth="1.0" opacity="0.3" strokeDasharray="3 3" />
        <path d="M50 41 L104 70" stroke="currentColor" strokeWidth="1.0" opacity="0.3" strokeDasharray="3 3" />
        <path d="M43 71 L97 40" stroke="currentColor" strokeWidth="1.0" opacity="0.3" strokeDasharray="3 3" />
        <path d="M54 77 L108 46" stroke="currentColor" strokeWidth="1.0" opacity="0.3" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    id: '05',
    slug: 'signage-retail-displays',
    name: 'Signage & Retail Displays',
    category: 'Display & Marketing',
    tagline: 'Printed. Weatherproof. Eye-catching.',
    description: 'Durable, weather-resistant PP signage for indoor and outdoor use. POS & POP display stands, and lightweight customizable exhibition stalls.',
    specs: ['Corona-Treated Print', 'Indoor / Outdoor', 'POS & POP Stands'],
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Modular Retail Display Stand in 3D Isometric View */}
        <path d="M40 98 L70 114 L100 98 L70 82 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M40 102 L70 118 L100 102" stroke="currentColor" strokeWidth="1.6" />
        <path d="M40 98 L40 102 M70 114 L70 118 M100 98 L100 102" stroke="currentColor" strokeWidth="1.6" />
        {/* Vertical Display Tower Main Board */}
        <path d="M52 30 L88 50 L88 100 L52 80 Z" stroke="currentColor" strokeWidth="1.6" />
        {/* Header Branding Crown Panel */}
        <path d="M48 20 L92 44 L88 50 L44 26 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M56 26 L84 41" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        {/* Tier 1 Cantilevered Shelf (Upper) */}
        <path d="M52 56 L38 64 L62 77 L76 69" stroke="currentColor" strokeWidth="1.5" />
        <path d="M38 64 L38 68 L62 81 L76 73 L76 69" stroke="currentColor" strokeWidth="1.4" />
        <path d="M62 77 L62 81" stroke="currentColor" strokeWidth="1.4" />
        {/* Tier 2 Cantilevered Shelf (Lower) */}
        <path d="M52 74 L38 82 L62 95 L76 87" stroke="currentColor" strokeWidth="1.5" />
        <path d="M38 82 L38 86 L62 99 L76 91 L76 87" stroke="currentColor" strokeWidth="1.4" />
        <path d="M62 95 L62 99" stroke="currentColor" strokeWidth="1.4" />
        {/* Structural Rear Easel Kick-Stand Strut */}
        <path d="M88 64 L112 50 L112 56 L94 67" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
        <path d="M88 88 L112 74" stroke="currentColor" strokeWidth="1.3" opacity="0.45" strokeDasharray="3 2" />
        {/* Interlocking Die-Cut Lock Tabs */}
        <rect x="50" y="44" width="4" height="6" stroke="currentColor" strokeWidth="1.2" />
        <rect x="50" y="68" width="4" height="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export function ProductsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* ── Top Architectural Curtain Divider Bar (Qualitair-style Guillotine Panel) ── */}
      <div className={styles.curtainTickerBar}>
        <div className={styles.curtainTickerInner}>
          <div className={styles.tickerCategoryCell}>
            <span className={styles.tickerPrefix}>01</span>
            <Link href="/products/pp-corrugated-boxes" className={styles.tickerLink}>
              PP CORRUGATED BOXES <span className={styles.tickerArrow}>↗</span>
            </Link>
          </div>
          <div className={styles.tickerDivider} />
          <div className={styles.tickerCategoryCell}>
            <span className={styles.tickerPrefix}>02</span>
            <Link href="/products/custom-pp-trays" className={styles.tickerLink}>
              CUSTOM CNC TRAYS <span className={styles.tickerArrow}>↗</span>
            </Link>
          </div>
          <div className={styles.tickerDivider} />
          <div className={styles.tickerCategoryCell}>
            <span className={styles.tickerPrefix}>03</span>
            <Link href="/products/pp-trunks-crates" className={styles.tickerLink}>
              HEAVY-DUTY TRUNKS <span className={styles.tickerArrow}>↗</span>
            </Link>
          </div>
          <div className={styles.tickerDivider} />
          <div className={styles.tickerCategoryCell}>
            <span className={styles.tickerPrefix}>04</span>
            <Link href="/products/floor-protection-sheets" className={styles.tickerLink}>
              FLOOR SHEETS <span className={styles.tickerArrow}>↗</span>
            </Link>
          </div>
          <div className={styles.tickerDivider} />
          <div className={styles.tickerCategoryCell}>
            <span className={styles.tickerPrefix}>05</span>
            <Link href="/products/signage-retail-displays" className={styles.tickerLink}>
              SIGNAGE & POS <span className={styles.tickerArrow}>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Ultra-Subtle Architectural Watermark Ring ── */}
      <svg className={styles.watermarkRing} viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="300" cy="300" r="240" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="300" r="160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
        <line x1="300" y1="0" x2="300" y2="600" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="300" x2="600" y2="300" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className={styles.gridBackground} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            PRODUCT CATALOGUE
            <span className={styles.labelLine} />
          </div>
          <h2 className={styles.heading}>
            What we <span className={styles.accent}>fabricate.</span>
          </h2>
          <p className={styles.subheading}>
            Every product is custom-engineered to your load requirements, industry standards, and dimensional specifications.
          </p>
        </motion.div>

        {/* Cards Grid with Liquid Glass & CAD Precision */}
        <motion.div
          className={`${styles.grid} ${isInView ? styles.gridVisible : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {products.map((product) => {
            const isActive = activeCardId === product.id;
            return (
              <motion.div
                key={product.id}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                onClick={() => setActiveCardId(prev => prev === product.id ? null : product.id)}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveCardId(prev => prev === product.id ? null : product.id);
                  }
                }}
              >
                {/* Rising Industrial Yellow Curtain Fill (#FEDF0C) */}
                <div className={styles.cardFill} aria-hidden="true" />

                <div className={styles.cardHeader}>
                  <div className={styles.cardNumber}>{product.id}</div>
                  <span className={styles.cardCategoryLabel}>{product.category}</span>
                </div>

                <div className={styles.iconWrapper}>
                  {product.icon}
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.tagline}>{product.tagline}</p>
                  <p className={styles.description}>{product.description}</p>
                </div>

                <div className={styles.specsRow}>
                  {product.specs.map((spec, i) => (
                    <span key={i} className={styles.specTag}>{spec}</span>
                  ))}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.footerLine} />
                  <Link 
                    href={`/products/${product.slug}`} 
                    className={`${styles.learnMore} cad-link`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Spec Sheet ↗
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA with Sliding Curtain Physics */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/products" className={styles.ctaButton}>
            <span className={styles.ctaBg} aria-hidden="true" />
            <span className={styles.ctaLabel}>
              Explore Full Catalogue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
