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
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = useState({ w: 140, h: 38 });

  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Track viewport dimensions and logo size
  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth <= 768);
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setLogoSize({ w: rect.width, h: rect.height });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure center preloader state is visible
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

    // Must download ALL hero images (100%) AND satisfy min presentation time
    if (loadProgress >= 100 && minTimeElapsed) {
      const timer = setTimeout(() => {
        setPhase('fly');
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, minTimeElapsed, phase, pathname]);

  if (phase === 'done') return null;

  // Center coordinates (for naked logo in the middle of preloader)
  const centerX = (viewport.w - logoSize.w) / 2;
  const centerY = (viewport.h - logoSize.h) / 2;

  // Target coordinates: Inside the white box that already exists in the bottom-left
  // Desktop: box is at left: 24px, bottom: 24px (padding: 8px 20px 8px 12px) -> logo at x: 36, y: viewport.h - 70
  // Mobile:  box is at left: 16px, bottom: 16px (padding: 6px 16px 6px 10px) -> logo at x: 26, y: viewport.h - 56
  const targetX = isMobile ? 16 + 10 : 24 + 12;
  const targetY = isMobile
    ? viewport.h - 16 - 6 - 34
    : viewport.h - 24 - 8 - 38;

  return (
    <>
      {/* ── Background Grid & Laser Overlay ── */}
      <motion.div
        className={styles.overlay}
        animate={{ opacity: phase === 'fly' ? 0 : 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: phase === 'fly' ? 'none' : 'all' }}
      >
        {/* Laser coordinate hairlines intersecting in center */}
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
              {/* Subtle pulsing rings behind center logo */}
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

              {/* Loading progress & real asset download counter */}
              <motion.div
                className={styles.loadingMeta}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.loadingText}>
                  <span>LOADING</span>
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

      {/* ── The White Box that Already Exists in Bottom-Left ── */}
      <motion.div
        className={styles.whiteBoxDock}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />

      {/* ── Logo Itself (Without any container or background) ── */}
      <motion.div
        ref={logoRef}
        className={styles.nakedLogo}
        initial={{
          x: centerX,
          y: centerY,
          scale: 1.35,
          opacity: 0,
        }}
        animate={{
          x: phase === 'fly' ? targetX : centerX,
          y: phase === 'fly' ? targetY : centerY,
          scale: phase === 'fly' ? 1.0 : 1.35,
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
          className={styles.nakedLogoImg}
          draggable={false}
        />
        <span className={styles.nakedLogoText}>Polyveda</span>
      </motion.div>
    </>
  );
}
