'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './IndustryGrid.module.css';
import { motion, useInView, useMotionValue, animate, useTransform, MotionValue } from 'framer-motion';
import { HardHat, Briefcase, Car, ShoppingCart, Cpu, ShieldPlus } from 'lucide-react';

const industries = [
  { id: 'automotive',   title: 'Automotive',       desc: 'Returnable packaging for just-in-time delivery systems.',            icon: Car },
  { id: 'ecommerce',    title: 'E-Commerce',        desc: 'Lightweight shipping containers reducing freight costs.',             icon: ShoppingCart },
  { id: 'electronics',  title: 'Electronics',       desc: 'ESD-safe conductive PP boxes and anti-static trays.',                icon: Cpu },
  { id: 'healthcare',   title: 'Healthcare',        desc: 'Food-grade PP boxes with water-resistant surfaces.',                 icon: ShieldPlus },
  { id: 'construction', title: 'Construction',      desc: 'Heavy-duty impact resistant corrugated sheets for site protection.', icon: HardHat },
  { id: 'logistics',    title: 'Business Workflow', desc: 'Streamlined B2B logistics and automated returnable supply chains.',  icon: Briefcase },
];

const TOTAL = industries.length;

// 3D Isometric CAD Drafting Vector Schematics
const industryIllustrations: Record<string, React.ReactNode> = {
  automotive: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,16 168,54 100,92 32,54" className={styles.schematicPath} opacity="0.9" />
      <polygon points="100,20 162,54 100,88 38,54" opacity="0.4" strokeDasharray="3 3" />
      <polyline points="32,54 32,84 100,118 168,84 168,54" className={styles.schematicPath} opacity="0.9" />
      <line x1="100" y1="92" x2="100" y2="118" className={styles.schematicPath} opacity="0.9" />
      <line x1="66" y1="35" x2="134" y2="73" opacity="0.75" />
      <line x1="134" y1="35" x2="66" y2="73" opacity="0.75" />
      <ellipse cx="100" cy="42" rx="10" ry="5.5" opacity="0.85" />
      <line x1="90" y1="42" x2="90" y2="52" opacity="0.85" />
      <line x1="110" y1="42" x2="110" y2="52" opacity="0.85" />
      <path d="M 90 52 A 10 5.5 0 0 0 110 52" opacity="0.85" />
      <ellipse cx="68" cy="58" rx="8" ry="4.5" opacity="0.85" />
      <line x1="60" y1="58" x2="60" y2="68" opacity="0.85" />
      <line x1="76" y1="58" x2="76" y2="68" opacity="0.85" />
      <path d="M 60 68 A 8 4.5 0 0 0 76 68" opacity="0.85" />
      <line x1="100" y1="32" x2="100" y2="65" strokeDasharray="2 3" opacity="0.4" />
      <line x1="68" y1="50" x2="68" y2="78" strokeDasharray="2 3" opacity="0.4" />
      <polyline points="30,82 30,90 38,94" strokeWidth="1.8" />
      <polyline points="170,82 170,90 162,94" strokeWidth="1.8" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,32 158,64 100,98 42,64" className={styles.schematicPath} opacity="0.9" />
      <polyline points="42,64 42,92 100,120 158,92 158,64" className={styles.schematicPath} opacity="0.9" />
      <line x1="100" y1="98" x2="100" y2="120" className={styles.schematicPath} opacity="0.9" />
      <polyline points="42,64 24,42 82,10 100,32" opacity="0.8" />
      <polyline points="100,32 118,10 176,42 158,64" opacity="0.8" />
      <line x1="24" y1="42" x2="38" y2="49" opacity="0.5" strokeDasharray="2 2" />
      <line x1="176" y1="42" x2="162" y2="49" opacity="0.5" strokeDasharray="2 2" />
      <path d="M 96,12 L 100,8 L 104,12" strokeWidth="1.8" />
      <line x1="42" y1="64" x2="100" y2="32" strokeDasharray="3 3" opacity="0.5" />
      <line x1="158" y1="64" x2="100" y2="32" strokeDasharray="3 3" opacity="0.5" />
      <line x1="58" y1="78" x2="86" y2="92" strokeWidth="1.2" opacity="0.7" />
      <line x1="60" y1="83" x2="84" y2="95" strokeWidth="1.2" opacity="0.7" />
      <line x1="62" y1="88" x2="80" y2="97" strokeWidth="1.2" opacity="0.7" />
      <path d="M 125,72 L 145,82 M 140,78 L 145,82 L 140,86" opacity="0.6" strokeWidth="1.2" />
    </svg>
  ),
  electronics: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,14 174,54 100,96 26,54" className={styles.schematicPath} opacity="0.9" />
      <polyline points="26,54 26,68 100,108 174,68 174,54" className={styles.schematicPath} opacity="0.9" />
      <line x1="100" y1="96" x2="100" y2="108" className={styles.schematicPath} opacity="0.9" />
      <polygon points="100,24 162,58 100,90 38,58" opacity="0.4" strokeDasharray="2 2" />
      <polygon points="76,40 92,49 84,54 68,45" opacity="0.85" />
      <polyline points="68,45 68,49 84,58 92,53" opacity="0.85" />
      <polygon points="108,40 124,49 116,54 100,45" opacity="0.85" />
      <polyline points="100,45 100,49 116,58 124,53" opacity="0.85" />
      <polygon points="84,58 100,67 92,72 76,63" opacity="0.85" />
      <polyline points="76,63 76,67 92,76 100,71" opacity="0.85" />
      <polygon points="116,58 132,67 124,72 108,63" opacity="0.85" />
      <polyline points="108,63 108,67 124,76 132,71" opacity="0.85" />
      <circle cx="50" cy="76" r="8" opacity="0.6" />
      <path d="M 48,72 L 52,76 L 47,76 L 51,80" strokeWidth="1.4" opacity="0.9" />
      <line x1="50" y1="84" x2="50" y2="94" strokeDasharray="2 2" opacity="0.7" />
      <line x1="44" y1="94" x2="56" y2="94" strokeWidth="1.2" opacity="0.7" />
    </svg>
  ),
  healthcare: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,16 166,52 100,90 34,52" className={styles.schematicPath} opacity="0.9" />
      <polyline points="34,52 34,80 100,116 166,80 166,52" className={styles.schematicPath} opacity="0.9" />
      <line x1="100" y1="90" x2="100" y2="116" className={styles.schematicPath} opacity="0.9" />
      <polygon points="100,24 156,54 100,84 44,54" opacity="0.5" strokeDasharray="3 2" />
      <ellipse cx="80" cy="52" rx="7" ry="4" opacity="0.85" />
      <line x1="73" y1="52" x2="73" y2="66" opacity="0.85" />
      <line x1="87" y1="52" x2="87" y2="66" opacity="0.85" />
      <path d="M 73 66 A 7 4 0 0 0 87 66" opacity="0.85" />
      <ellipse cx="106" cy="52" rx="7" ry="4" opacity="0.85" />
      <line x1="99" y1="52" x2="99" y2="66" opacity="0.85" />
      <line x1="113" y1="52" x2="113" y2="66" opacity="0.85" />
      <path d="M 99 66 A 7 4 0 0 0 113 66" opacity="0.85" />
      <polyline points="38,54 100,88 162,54" strokeWidth="1.8" opacity="0.75" />
      <circle cx="132" cy="72" r="9" opacity="0.7" />
      <text x="132" y="75" fontSize="6" fontFamily="var(--font-base)" textAnchor="middle" fill="#0047BB" stroke="none" fontWeight="600">-20°C</text>
      <path d="M 52,38 Q 50,30 54,26 Q 58,30 56,38 Z" opacity="0.75" />
    </svg>
  ),
  construction: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,16 172,56 100,98 28,56" className={styles.schematicPath} opacity="0.9" strokeWidth="1.6" />
      <polyline points="28,74 100,116 172,74" className={styles.schematicPath} opacity="0.9" strokeWidth="1.6" />
      <line x1="28" y1="56" x2="28" y2="74" opacity="0.9" />
      <line x1="172" y1="56" x2="172" y2="74" opacity="0.9" />
      <line x1="100" y1="98" x2="100" y2="116" opacity="0.9" />
      <line x1="42" y1="64" x2="42" y2="82" opacity="0.75" />
      <line x1="56" y1="72" x2="56" y2="90" opacity="0.75" />
      <line x1="70" y1="80" x2="70" y2="98" opacity="0.75" />
      <line x1="84" y1="88" x2="84" y2="106" opacity="0.75" />
      <line x1="116" y1="91" x2="116" y2="109" opacity="0.75" />
      <line x1="130" y1="83" x2="130" y2="101" opacity="0.75" />
      <line x1="144" y1="75" x2="144" y2="93" opacity="0.75" />
      <line x1="158" y1="67" x2="158" y2="85" opacity="0.75" />
      <path d="M 100,32 L 100,48 M 96,44 L 100,48 L 104,44" strokeWidth="1.8" opacity="0.85" />
      <path d="M 76,46 L 76,58 M 73,55 L 76,58 L 79,55" opacity="0.6" />
      <path d="M 124,46 L 124,58 M 121,55 L 124,58 L 127,55" opacity="0.6" />
      <path d="M 60,38 Q 100,60 140,38" strokeDasharray="3 3" opacity="0.45" />
    </svg>
  ),
  logistics: (
    <svg viewBox="0 0 200 120" className={styles.schematicSvg} fill="none" stroke="#0047BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="100,16 168,54 100,92 32,54" className={styles.schematicPath} opacity="0.9" />
      <polyline points="32,54 32,82 100,118 168,82 168,54" className={styles.schematicPath} opacity="0.9" />
      <line x1="100" y1="92" x2="100" y2="118" className={styles.schematicPath} opacity="0.9" />
      <polygon points="100,22 162,56 100,90 38,56" opacity="0.35" strokeDasharray="2 2" />
      <path d="M 52,65 Q 60,61 68,65 Q 60,69 52,65 Z" opacity="0.85" />
      <path d="M 132,65 Q 140,61 148,65 Q 140,69 132,65 Z" opacity="0.85" />
      <line x1="42" y1="87" x2="42" y2="92" strokeWidth="2" opacity="0.85" />
      <line x1="58" y1="96" x2="58" y2="101" strokeWidth="2" opacity="0.85" />
      <line x1="74" y1="105" x2="74" y2="110" strokeWidth="2" opacity="0.85" />
      <line x1="126" y1="110" x2="126" y2="105" strokeWidth="2" opacity="0.85" />
      <line x1="142" y1="101" x2="142" y2="96" strokeWidth="2" opacity="0.85" />
      <line x1="158" y1="92" x2="158" y2="87" strokeWidth="2" opacity="0.85" />
      <line x1="84" y1="84" x2="116" y2="102" strokeWidth="1.8" opacity="0.8" />
      <line x1="87" y1="89" x2="113" y2="104" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  )
};

// Cover Flow Mathematics
const TILT_DEG = 42;
const CENTER_GAP = 240; 
const OVERLAP = 110; 

// The individual 3D Card component
function CoverFlowCard({ 
  absIndex, 
  rawActive, 
  ind, 
  realIndex,
  isDragging,
  onClick,
  isActive
}: { 
  absIndex: number, 
  rawActive: MotionValue<number>, 
  ind: typeof industries[0], 
  realIndex: number,
  isDragging: React.MutableRefObject<boolean>,
  onClick: () => void,
  isActive: boolean
}) {
  const Icon = ind.icon;
  const indexStr = String(realIndex + 1).padStart(2, '0');

  // Continuous offset calculation
  const offsetValue = useTransform(rawActive, (currentActive) => absIndex - currentActive);

  // X Translation: center gap for the first card, then smaller overlap for subsequent cards
  const x = useTransform(offsetValue, (offset) => {
    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset);
    let dist = 0;
    if (absOffset <= 1) {
      dist = absOffset * CENTER_GAP;
    } else {
      dist = CENTER_GAP + (absOffset - 1) * OVERLAP;
    }
    return sign * dist;
  });

  // Y-Rotation: fold inwards
  const rotateY = useTransform(offsetValue, (offset) => {
    const sign = Math.sign(offset);
    const clamped = Math.min(Math.abs(offset), 1);
    return -sign * clamped * TILT_DEG;
  });

  // Scale: Active is 1, inactive shrinks to 0.75
  const scale = useTransform(offsetValue, (offset) => {
    const clamped = Math.min(Math.abs(offset), 1);
    return 1 - (clamped * 0.25);
  });
  
  // Z-Index: Highest in the center
  const zIndex = useTransform(offsetValue, (offset) => {
    return 50 - Math.round(Math.abs(offset) * 10);
  });

  // Opacity: Fully opaque for the center and immediate sides, fade out at the edges
  const opacity = useTransform(offsetValue, (offset) => {
    const abs = Math.abs(offset);
    if (abs <= 2) return 1;
    return Math.max(0, 1 - (abs - 2)); // Fades out between offset 2 and 3
  });

  // Derive an active state boolean strictly for styling the gradient vs translucent glass
  const [isActiveState, setIsActiveState] = useState(false);
  useEffect(() => {
    return offsetValue.on("change", (v) => {
      setIsActiveState(Math.abs(v) < 0.5);
    });
  }, [offsetValue]);

  return (
    <motion.div
      className={`${styles.card3d} ${isActiveState ? styles.cardActive : styles.cardInactive}`}
      style={{ x, rotateY, scale, zIndex, opacity }}
      onClick={() => {
        if (!isDragging.current && !isActive) {
          onClick();
        }
      }}
    >
      <div
        className={styles.cardInner}
      >
        <span className={styles.ghostIndex} aria-hidden>{indexStr}</span>

        <div className={styles.cardTop}>
          <div className={styles.iconWrapper}>
            <Icon size={22} strokeWidth={1.5} className={styles.vectorIcon} />
          </div>
          <span className={styles.indexLabel}>{indexStr}</span>
        </div>

        <div className={styles.cardSchematic}>
          {industryIllustrations[ind.id]}
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{ind.title}</h3>
          <p className={styles.cardDesc}>{ind.desc}</p>
        </div>

        <div className={styles.accentLine} aria-hidden />
      </div>
    </motion.div>
  );
}


export function IndustryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Infinite Loop logic: Start at a high multiple of TOTAL
  const START_INDEX = 1000 * TOTAL;
  const [active, setActive] = useState(START_INDEX);
  
  // Spring drives the fluid drag and snap animations
  const rawActive = useMotionValue(START_INDEX);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const goTo = useCallback((newActive: number) => {
    setActive(newActive);
    animate(rawActive, newActive, { type: 'spring', stiffness: 180, damping: 24, mass: 0.8 });
  }, [rawActive]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 5) {
      hasDragged.current = true; // Mark as dragged if moved more than 5px
    }
    // Fluid 1:1 drag tracking (1 card per 150px)
    rawActive.set(active - deltaX / 150);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - dragStartX.current;
    const swipeThreshold = 40;
    
    if (deltaX < -swipeThreshold) {
      goTo(active + 1);
    } else if (deltaX > swipeThreshold) {
      goTo(active - 1);
    } else {
      goTo(active); // Snap back to current if threshold not met
    }
  };

  // Generate a rendering window around the active card (e.g., -3 to +3)
  const visibleIndices = Array.from({ length: 7 }, (_, i) => active - 3 + i);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Industry Applications</span>
          <h2 className={styles.heading}>Built for the sectors<br />that can't afford failure.</h2>
        </motion.div>

        {/* 3D Cover Flow Stage */}
        <motion.div
          className={styles.carouselTrack}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          {visibleIndices.map(absIndex => {
            const realIndex = ((absIndex % TOTAL) + TOTAL) % TOTAL;
            const ind = industries[realIndex];
            
            return (
              <CoverFlowCard
                key={absIndex}
                absIndex={absIndex}
                rawActive={rawActive}
                ind={ind}
                realIndex={realIndex}
                isDragging={hasDragged} // Pass hasDragged to the card instead of isDragging
                onClick={() => goTo(absIndex)}
                isActive={active === absIndex}
              />
            );
          })}
        </motion.div>

        {/* Pagination dots */}
        <motion.div
          className={styles.dots}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {industries.map((_, i) => {
            const currentRealActive = ((active % TOTAL) + TOTAL) % TOTAL;
            return (
              <button
                key={i}
                className={`${styles.dot} ${i === currentRealActive ? styles.dotActive : ''}`}
                onClick={() => {
                  // Calculate shortest path to the clicked dot
                  let diff = i - currentRealActive;
                  if (diff > TOTAL / 2) diff -= TOTAL;
                  if (diff < -TOTAL / 2) diff += TOTAL;
                  goTo(active + diff);
                }}
                aria-label={`Go to ${industries[i].title}`}
              />
            );
          })}
        </motion.div>

        {/* Global CTA for Industries */}
        <motion.div
          className={styles.globalCta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link href="/industries">
            <Button variant="outline">View All Industries</Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
