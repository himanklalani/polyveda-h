'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

type Phase = 'logo' | 'fly' | 'done';

export function Preloader() {
  const { setPreloaderDone, loadProgress } = usePreloader();
  const [phase, setPhase] = useState<Phase>('logo');
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const [isMobile, setIsMobile] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [badgeSize, setBadgeSize] = useState({ w: 166, h: 54 });

  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Track window dimensions and badge size for GPU translation
  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
      if (badgeRef.current) {
        const rect = badgeRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setBadgeSize({ w: rect.width, h: rect.height });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure preloader presentation is visible before flying
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'logo') return;

    // Fast-path for non-homepage routes
    if (pathname !== '/') {
      const timer = setTimeout(() => setPhase('fly'), 300);
      return () => clearTimeout(timer);
    }

    // On homepage: must download ALL hero sequence frames (100%) AND satisfy min presentation time
    if (loadProgress >= 100 && minTimeElapsed) {
      const timer = setTimeout(() => {
        setPhase('fly');
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, minTimeElapsed, phase, pathname]);

  if (phase === 'done') return null;

  // GPU coordinates:
  // Center: Exact dead-center of screen
  // Bottom-Left: 24px margin from left, 24px margin from bottom (16px on mobile)
  const centerX = (viewport.w - badgeSize.w) / 2;
  const centerY = (viewport.h - badgeSize.h) / 2;

  const targetMargin = isMobile ? 16 : 24;
  const targetX = targetMargin;
  const targetY = viewport.h - targetMargin - badgeSize.h;

  return (
    <>
      {/* ── Background Grid & Laser Overlay ── */}
      <motion.div
        className={styles.overlay}
        animate={{ opacity: phase === 'fly' ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: phase === 'fly' ? 'none' : 'all' }}
      >
        {/* Laser coordinate hairlines intersecting at center */}
        <motion.div
          className={styles.laserLineH}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'fly' ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.38, 0.005, 0.215, 1] }}
        />
        <motion.div
          className={styles.laserLineV}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: phase === 'fly' ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.38, 0.005, 0.215, 1] }}
        />

        <AnimatePresence>
          {phase === 'logo' && (
            <>
              {/* Pulsing rings around center */}
              {!shouldReduceMotion && (
                <>
                  <motion.div
                    className={styles.ring}
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: 'easeOut', delay: 0 }}
                  />
                  <motion.div
                    className={styles.ring}
                    initial={{ scale: 0.6, opacity: 0.4 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: 'easeOut', delay: 0.7 }}
                  />
                </>
              )}

              {/* CAD Target Frame around logo */}
              <motion.div
                className={styles.cadFrame}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.25 } }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <span className={styles.cornerTL}>+</span>
                <span className={styles.cornerTR}>+</span>
                <span className={styles.cornerBL}>+</span>
                <span className={styles.cornerBR}>+</span>
                <span className={styles.coordTop}>SYS // PV-IND-2026</span>
                <span className={styles.coordBottom}>LOC // 19.0760° N, 72.8777° E</span>
              </motion.div>

              {/* Loading progress & real asset download counter */}
              <motion.div
                className={styles.loadingMeta}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.loadingText}>
                  <span>INITIALIZING 3D ARCHITECTURE</span>
                  <span className={styles.loadingPercent}>
                    {pathname === '/' ? `${loadProgress}%` : '100%'}
                  </span>
                </div>

                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${pathname === '/' ? loadProgress : 100}%` }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Logo Badge: Starts at Center, Glides to Bottom-Left ── */}
      <motion.div
        ref={badgeRef}
        className={styles.flyingLogoBadge}
        initial={{
          x: centerX,
          y: centerY,
          scale: 1.25,
          opacity: 0,
        }}
        animate={{
          x: phase === 'fly' ? targetX : centerX,
          y: phase === 'fly' ? targetY : centerY,
          scale: phase === 'fly' ? 1.0 : 1.25,
          opacity: 1,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : phase === 'fly'
            ? {
                type: 'spring',
                stiffness: 55,
                damping: 14,
                mass: 0.85,
              }
            : {
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }
        }
        onAnimationComplete={() => {
          if (phase === 'fly') {
            setPreloaderDone(true);
            setPhase('done');
          }
        }}
      >
        <img
          src="/PV_Logo_Blue_Color_wo_Name_Transparent_Final.png"
          alt="Polyveda"
          className={styles.flyingLogoImg}
          draggable={false}
        />
        <span className={styles.flyingLogoText}>Polyveda</span>
      </motion.div>
    </>
  );
}
