'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import styles from './ScrollSyncedText.module.css';

const items = [
  {
    word: "durability",
    desc: "Engineered for heavy loads and 50+ transit cycles.",
    badge: "30° AXONOMETRIC // COMPRESSION",
    coord: "AXIS [Z: -5kN]",
    illustration: (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric Base Datum Grid */}
        <path d="M100 155 L35 117 L100 80 L165 117 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        {/* Dual Stacked 3D Containers */}
        <path d="M48 108 L100 138 L152 108 M48 82 L48 108 M100 112 L100 138 M152 82 L152 108" stroke="currentColor" strokeWidth="1.6" />
        <path d="M48 82 L100 112 L152 82 L100 52 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M48 74 L100 104 L152 74 M48 48 L48 74 M100 78 L100 104 M152 48 L152 74" stroke="currentColor" strokeWidth="1.6" />
        <path d="M48 48 L100 78 L152 48 L100 18 Z" stroke="currentColor" strokeWidth="1.6" />
        {/* Downward Hydraulic Force Vector Plate */}
        <path d="M42 38 L100 71 L158 38 L100 5 Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M100 16 L100 42" stroke="currentColor" strokeWidth="2.2" />
        <path d="M96 34 L100 42 L104 34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M72 32 L72 58" stroke="currentColor" strokeWidth="1.6" />
        <path d="M69 52 L72 58 L75 52" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M128 32 L128 58" stroke="currentColor" strokeWidth="1.6" />
        <path d="M125 52 L128 58 L131 52" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        {/* Vertical Structural Stress Lines */}
        <line x1="65" y1="58" x2="65" y2="92" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <line x1="83" y1="68" x2="83" y2="102" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <line x1="117" y1="68" x2="117" y2="102" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        <line x1="135" y1="58" x2="135" y2="92" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      </svg>
    )
  },
  {
    word: "sustainability",
    desc: "100% recyclable PP material replacing single-use waste.",
    badge: "CLOSED-LOOP // 100% CIRCULAR",
    coord: "CATEGORY 5 [PP]",
    illustration: (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circular Life-Cycle Track in Isometric Space */}
        <ellipse cx="100" cy="98" rx="76" ry="42" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.4" />
        {/* Directional Flow Arcs */}
        <path d="M24 98 C24 122 58 140 100 140 C142 140 176 122 176 98" stroke="currentColor" strokeWidth="1.8" />
        <path d="M170 103 L176 98 L178 106" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M176 98 C176 74 142 56 100 56 C58 56 24 74 24 98" stroke="currentColor" strokeWidth="1.8" />
        <path d="M30 93 L24 98 L22 90" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Central Isometric Polyveda Cube */}
        <path d="M72 90 L100 106 L128 90 L100 74 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M72 90 L72 108 L100 124 L100 106 M128 90 L128 108 L100 124" stroke="currentColor" strokeWidth="1.6" />
        {/* Flute Grain Direction */}
        <line x1="81" y1="95" x2="81" y2="113" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        <line x1="91" y1="101" x2="91" y2="119" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        <line x1="109" y1="101" x2="109" y2="119" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        <line x1="119" y1="95" x2="119" y2="113" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
        {/* Recycling Tri-Arrow Symbol */}
        <path d="M100 32 L112 52 L88 52 Z" stroke="currentColor" strokeWidth="1.4" opacity="0.75" />
        <circle cx="100" cy="98" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
      </svg>
    )
  },
  {
    word: "efficiency",
    desc: "Collapsible designs saving up to 75% in return logistics.",
    badge: "VOLUME RATIO // 1:4 COLLAPSED",
    coord: "VOL [-75% FREIGHT]",
    illustration: (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Erect Container (Left) */}
        <g transform="translate(-20, -10)">
          <path d="M46 95 L84 116 L122 95 M46 60 L46 95 M84 81 L84 116 M122 60 L122 95" stroke="currentColor" strokeWidth="1.5" />
          <path d="M46 60 L84 81 L122 60 L84 39 Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M46 60 L36 48 L74 64 L84 81" stroke="currentColor" strokeWidth="1.3" />
          <path d="M84 81 L94 64 L132 48 L122 60" stroke="currentColor" strokeWidth="1.3" />
        </g>
        {/* Collapse Vector Dynamics Arrow */}
        <path d="M106 75 C116 75 128 85 136 102" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
        <path d="M132 102 L136 102 L138 98" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        {/* Collapsed Flat Pack (Right Floor) */}
        <g transform="translate(40, 20)">
          <path d="M50 96 L90 118 L130 96 L90 74 Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M50 102 L90 124 L130 102" stroke="currentColor" strokeWidth="1.8" />
          <path d="M50 96 L50 102 M90 118 L90 124 M130 96 L130 102" stroke="currentColor" strokeWidth="1.8" />
          <line x1="70" y1="85" x2="110" y2="107" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
          <line x1="110" y1="85" x2="70" y2="107" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
        </g>
        {/* Height Comparison Datum Caliper */}
        <line x1="22" y1="29" x2="22" y2="106" stroke="currentColor" strokeWidth="1.1" strokeDasharray="2 2" opacity="0.5" />
        <line x1="18" y1="29" x2="26" y2="29" stroke="currentColor" strokeWidth="1.3" />
        <line x1="18" y1="106" x2="26" y2="106" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    )
  },
  {
    word: "protection",
    desc: "Moisture-proof and impact-resistant for sensitive goods.",
    badge: "HERMETIC // FLUTE BARRIER",
    coord: "SEAL [0.00% H2O]",
    illustration: (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Multi-Wall Flute Cross-Section */}
        <path d="M30 95 L100 135 L170 95 L100 55 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M30 110 L100 150 L170 110 L100 70 Z" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
        <path d="M30 95 L30 110 M100 135 L100 150 M170 95 L170 110" stroke="currentColor" strokeWidth="1.6" />
        {/* Core Vertical Flute Struts */}
        <line x1="44" y1="103" x2="44" y2="118" stroke="currentColor" strokeWidth="1.3" />
        <line x1="58" y1="111" x2="58" y2="126" stroke="currentColor" strokeWidth="1.3" />
        <line x1="72" y1="119" x2="72" y2="134" stroke="currentColor" strokeWidth="1.3" />
        <line x1="86" y1="127" x2="86" y2="142" stroke="currentColor" strokeWidth="1.3" />
        <line x1="114" y1="127" x2="114" y2="142" stroke="currentColor" strokeWidth="1.3" />
        <line x1="128" y1="119" x2="128" y2="134" stroke="currentColor" strokeWidth="1.3" />
        <line x1="142" y1="111" x2="142" y2="126" stroke="currentColor" strokeWidth="1.3" />
        <line x1="156" y1="103" x2="156" y2="118" stroke="currentColor" strokeWidth="1.3" />
        {/* Hydrophobic Droplet Physics Deflection */}
        <path d="M100 55 C93 68 88 75 88 82 C88 89 93 94 100 94 C107 94 112 89 112 82 C112 75 107 68 100 55 Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M82 89 C86 86 93 88 100 88 C107 88 114 86 118 89" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
        <path d="M78 78 L68 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M122 78 L132 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Impact Wave Rings */}
        <ellipse cx="100" cy="95" rx="55" ry="24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
      </svg>
    )
  },
  {
    word: "performance",
    desc: "Custom cavities ensuring zero movement during transit.",
    badge: "CNC TOLERANCE // ±0.5MM",
    coord: "DOCKING [ZERO VIBE]",
    illustration: (
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric CNC Cavity Nest Component */}
        <path d="M25 65 L75 94 L175 36 L125 8 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M25 82 L75 111 L175 53" stroke="currentColor" strokeWidth="1.6" />
        <path d="M25 65 L25 82 M75 94 L75 111 M175 36 L175 53" stroke="currentColor" strokeWidth="1.6" />
        {/* Deep CNC Internal Component Well */}
        <path d="M55 68 L85 85 L145 50 L115 33 Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M55 78 L85 95 L145 60 L115 43 Z" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        <path d="M55 68 L55 78 M85 85 L85 95 M145 50 L145 60 M115 33 L115 43" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        {/* Precision Laser Crosshairs */}
        <circle cx="100" cy="64" r="16" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.6" />
        <line x1="100" y1="44" x2="100" y2="84" stroke="currentColor" strokeWidth="1.3" />
        <line x1="80" y1="64" x2="120" y2="64" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="100" cy="64" r="3" fill="currentColor" />
        {/* Micron Metric Calibration Marks */}
        <line x1="35" y1="71" x2="35" y2="76" stroke="currentColor" strokeWidth="1.2" />
        <line x1="45" y1="77" x2="45" y2="82" stroke="currentColor" strokeWidth="1.2" />
        <line x1="55" y1="83" x2="55" y2="88" stroke="currentColor" strokeWidth="1.2" />
        <line x1="65" y1="89" x2="65" y2="94" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  }
];

export function ScrollSyncedText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Discrete slot machine index mapping
  const targetY = `-${activeIndex * (100 / items.length)}%`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segment = 0.8 / items.length;
    let index = Math.floor(latest / segment);
    if (index >= items.length) index = items.length - 1;
    if (index < 0) index = 0;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  const currentItem = items[activeIndex];

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.gridBackground} />
      <div className={styles.ambientSpotlight} />

      <div className={styles.stickyContainer}>
        <div className={styles.contentWrapper}>
          
          {/* Left Column: Typographic Slot Machine & Microcopy */}
          <div className={styles.textColumn}>
            <h2 className={styles.heading}>
              <span className={styles.prefix}>We engineer </span>
              <div className={styles.wordWindow}>
                <motion.ul 
                  className={styles.wordList} 
                  animate={{ y: targetY }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {items.map((item, i) => (
                    <li key={i} className={styles.wordItem}>{item.word}.</li>
                  ))}
                </motion.ul>
              </div>
            </h2>

            <div className={styles.microCopyContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={styles.microCopy}
                >
                  <div className={styles.specLabel}>{(activeIndex + 1).toString().padStart(2, '0')}</div>
                  <p>{currentItem.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Interactive 3D Axonometric Blueprint Drafting Stage */}
          <div className={styles.blueprintStage}>
            <div className={styles.stageReticle} />
            <div className={styles.stageCornerTL} />
            <div className={styles.stageCornerBR} />
            <div className={styles.stageBadge}>{currentItem.badge}</div>
            <div className={styles.stageCoordinate}>{currentItem.coord}</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.88, rotateX: 12 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.08, rotateX: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={styles.blueprintSvgContainer}
              >
                {currentItem.illustration}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
