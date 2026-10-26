'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import styles from './KineticFlow.module.css';

// ─── Data: 6 Key Cardboard Vulnerabilities vs Polyveda PP Solutions ─────────────
interface CardData {
  eyebrow: string;
  number: string;
  title: string;
  desc: string;
  tag: string;
  icon: React.ReactNode;
}

const CARDS: CardData[] = [
  {
    eyebrow: 'Material',
    number: '50×',
    title: 'Zero Landfill',
    desc: 'Category 5 PP corrugated designed for 50+ reuse cycles. At end of life, it becomes new product — not waste.',
    tag: '50+ Turn Trips',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    eyebrow: 'Compliance',
    number: '0%',
    title: 'No ISPM-15',
    desc: 'Export globally without heat treatment or quarantine delays. Eliminates cross-border friction entirely.',
    tag: 'Frictionless Customs',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    eyebrow: 'Resilience',
    number: '0%',
    title: 'Moisture Proof',
    desc: 'Maintains 100% structural integrity in cold-chain and humid dock conditions. Cardboard absorbs up to 30% its weight in water.',
    tag: '100% Water & Oil Proof',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    eyebrow: 'Sanitation',
    number: '100%',
    title: 'Washdown Ready',
    desc: 'Survives aggressive chemical sanitization and industrial high-heat steam cycles. Built for pharma and food grade.',
    tag: 'Pharma / Food Sterile',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  {
    eyebrow: 'Cleanroom',
    number: '0',
    title: 'Zero Particulate',
    desc: 'Sealed edge designs generate no cellulose or fibre particles — fully compatible with Class 7 clean environments.',
    tag: 'Class 7 Ready',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      </svg>
    ),
  },
  {
    eyebrow: 'Engineering',
    number: '80%',
    title: 'Collapsed Volume',
    desc: 'Returnable Transit Packaging collapses flat for return freight, cutting backhaul costs by up to 80%.',
    tag: '80% Backhaul Reduction',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 14 10 14 10 20" />
        <polyline points="20 10 14 10 14 4" />
        <line x1="14" y1="10" x2="21" y2="3" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
    ),
  },
];

// ─── Utility: Text scramble hook ─────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&';
function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(0);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) { setDisplay(target); return; }
    iterRef.current = 0;
    const totalFrames = target.length * 3;
    const run = () => {
      setDisplay(
        target.split('').map((char, i) => {
          if (i < iterRef.current / 3) return char;
          return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iterRef.current += 1;
      if (iterRef.current < totalFrames + 8) {
        frameRef.current = requestAnimationFrame(run);
      } else {
        setDisplay(target);
      }
    };
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, target]);

  return display;
}

// ─── Single Card Component (with iOS Liquid Glass + 3D Tilt) ────────────────
function KineticCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position relative to card center
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ['8deg', '-8deg']), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ['-8deg', '8deg']), springConfig);
  
  // Spotlight position as percentage strings for reactive motion style
  const glowXPct = useSpring(useTransform(mx, [-0.5, 0.5], ['0%', '100%']), { stiffness: 120, damping: 20 });
  const glowYPct = useSpring(useTransform(my, [-0.5, 0.5], ['0%', '100%']), { stiffness: 120, damping: 20 });

  const scrambledTitle = useScramble(card.title, hovered);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx);
    my.set(ny);
  }, [mx, my]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: (index % CARDS.length) * 0.08,
        type: 'spring',
        stiffness: 80,
        damping: 18,
      }}
    >
      <div className={styles.cardInner}>
        {/* Top Meta Row: Technical CAD Badge + Crisp Numeric Metric */}
        <div className={styles.cardMeta}>
          <div className={styles.cardEyebrowBadge}>
            <span className={styles.eyebrowIcon}>{card.icon}</span>
            <span>{card.eyebrow}</span>
          </div>
          
          <motion.span
            className={styles.cardNumber}
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            {card.number}
          </motion.span>
        </div>

        {/* Card Title with live character scramble on hover */}
        <h3 className={styles.cardTitle}>{scrambledTitle}</h3>
        <p className={styles.cardDesc}>{card.desc}</p>

        {/* Bottom Architectural CAD Feature Badge */}
        <div className={styles.cardTag}>
          <span className={styles.checkIcon}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span>{card.tag}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export function KineticFlow() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '-15%' });
  const [setWidth, setSetWidth] = useState(2400);

  // Global mouse parallax state for liquid background refraction
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 22 });

  const headerX = useTransform(springX, [0, 1], [-10, 10]);
  const headerY = useTransform(springY, [0, 1], [-5, 5]);

  // Measure one loop's width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      const gap = window.innerWidth < 768 ? 16 : 28;
      let w = 0;
      for (let i = 0; i < CARDS.length; i++) {
        if (children[i]) w += children[i].offsetWidth + gap;
      }
      if (w > 0) setSetWidth(w);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Global mouse tracking for fluid section parallax
  const handleSectionMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  // Auto-scroll with gentle sinusoidal speed variation (organic fluid glide)
  const timeRef = useRef(0);
  useAnimationFrame((t, delta) => {
    timeRef.current += delta;
    if (!isDragging && isInView && setWidth > 0) {
      // Speed varies smoothly between 0.45 and 0.85 px/frame
      const speed = 0.55 + 0.20 * Math.sin(timeRef.current / 3200);
      const current = x.get();
      let next = current - speed * (delta / 16);
      if (next <= -setWidth) next += setWidth;
      x.set(next);
    }
  });

  // Handle wrap seamlessly during user drag
  const handleUpdate = useCallback((latest: Record<string, number | string>) => {
    if (isDragging && setWidth > 0) {
      const cx = parseFloat(String(latest.x));
      if (cx <= -setWidth) x.set(cx + setWidth);
      else if (cx >= 0) x.set(cx - setWidth);
    }
  }, [isDragging, setWidth, x]);

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleSectionMouseMove}
    >
      {/* Precision CAD Blueprint Hairline Grid */}
      <div className={styles.gridOverlay} />

      {/* Header with mouse parallax */}
      <motion.div
        className={styles.header}
        style={{ x: headerX, y: headerY }}
      >

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.15 }}
        >
          Six reasons cardboard<br />
          <span className={styles.titleAccent}>is the wrong choice.</span>
        </motion.h2>

        {/* Liquid Drag Controller */}
        <motion.div
          className={styles.dragHint}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <span className={`${styles.dragArrow} ${styles.dragArrowLeft}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </span>
          <span>Drag to explore</span>
          <span className={`${styles.dragArrow} ${styles.dragArrowRight}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </motion.div>
      </motion.div>

      {/* Kinetic draggable viewport */}
      <div className={styles.viewport}>
        <motion.div
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -99999, right: 99999 }}
          dragElastic={0}
          dragMomentum={true}
          dragTransition={{ power: 0.16, timeConstant: 280 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onUpdate={handleUpdate}
          whileTap={{ cursor: 'grabbing' }}
        >
          {[...CARDS, ...CARDS, ...CARDS].map((card, i) => (
            <KineticCard key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
