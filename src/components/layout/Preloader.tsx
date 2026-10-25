'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

// Use the full master brand logo
const LOGO_URL = '/Polyveda_Logo_Blue_Color_Transparent_Logo_v2.png';

// Phase machine:
//  logo   → fly  (overlay fades out while logo springs to corner)
//  fly    → done (preloaderDone = true, component unmounts)
type Phase = 'logo' | 'fly' | 'done';

export function Preloader() {
  const { setPreloaderDone, loadProgress } = usePreloader();
  const [phase, setPhase] = useState<Phase>('logo');
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only run the sequence if we are in the initial 'logo' phase.
    // This prevents the preloader from resurrecting and blinking on subsequent route changes.
    if (phase !== 'logo') return;

    // If not on the homepage, just finish quickly
    if (pathname !== '/') {
      const timer = setTimeout(() => {
        setPreloaderDone(true);
        setPhase('fly');
        setTimeout(() => setPhase('done'), 900);
      }, 500);
      return () => clearTimeout(timer);
    }

    // On homepage, wait for loadProgress to hit 100%
    if (loadProgress >= 100) {
      // Add a slight dramatic pause after hitting 100% before flying
      const timer = setTimeout(() => {
        setPreloaderDone(true);
        setPhase('fly');
        setTimeout(() => setPhase('done'), 900);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, phase, pathname, setPreloaderDone]);

  if (phase === 'done') return null;

  const BLUR_ANIM = shouldReduceMotion ? 'blur(0px)' : 'blur(24px)';
  const DURATION = shouldReduceMotion ? 0.01 : 1.1;

  return (
    <motion.div
      className={styles.overlay}
      animate={{ opacity: phase === 'fly' ? 0 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Architectural CAD Laser Coordinate Lines (Qualitair Style) ── */}
      <motion.div
        className={styles.laserLineH}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === 'fly' ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.38, 0.005, 0.215, 1] }}
      />
      <motion.div
        className={styles.laserLineV}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: phase === 'fly' ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.38, 0.005, 0.215, 1] }}
      />

      <AnimatePresence>
        {phase === 'logo' && (
          <>
            {/* Pulsing rings behind the logo */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  className={styles.ring}
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0 }}
                />
                <motion.div
                  className={styles.ring}
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0.8 }}
                />
              </>
            )}

            {/* CAD Target Frame around logo */}
            <motion.div 
              className={styles.cadFrame}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={styles.cornerTL}>+</span>
              <span className={styles.cornerTR}>+</span>
              <span className={styles.cornerBL}>+</span>
              <span className={styles.cornerBR}>+</span>
              <span className={styles.coordTop}>SYS // PV-IND-2026</span>
              <span className={styles.coordBottom}>LOC // 19.0760° N, 72.8777° E</span>
            </motion.div>

            <div className={styles.logoCenter}>
              <motion.img
                src={LOGO_URL}
                alt="Polyveda logo"
                className={styles.logoImg}
                draggable={false}
                initial={{ opacity: 0, scale: 0.85, filter: BLUR_ANIM }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  scale: 1.05,
                  filter: BLUR_ANIM,
                  transition: { duration: 0.45, ease: 'easeInOut' }
                }}
                transition={{
                  duration: DURATION,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className={styles.loadingText}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              INITIALIZING CAD MATRIX...
            </motion.div>
            
            <motion.div 
              className={styles.progressContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div 
                className={styles.progressFill} 
                style={{ width: `${pathname === '/' ? loadProgress : 100}%` }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
