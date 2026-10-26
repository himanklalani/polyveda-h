'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './CtaStrip.module.css';

export function CtaStrip() {
  return (
    <div className={styles.ctaStrip}>
      <div className={styles.ctaCopy}>
        <span className={styles.ctaEyebrow}>Custom Fabrication Protocol</span>
        <h2>Ready to upgrade your packaging?</h2>
        <p>
          Custom-engineered PP corrugated solutions. From single-unit CNC trays to
          high-volume returnable logistics systems, we build packaging that lasts.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/contact">
            <Button variant="primary">Request Custom Quote</Button>
          </Link>
          <Link href="/capabilities">
            <Button variant="outline">View Capabilities</Button>
          </Link>
        </div>
      </div>

      <div className={styles.stageVisual} aria-hidden>
        <div className={styles.stageDisc} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/products/prod-box.png" 
          alt="Polyveda Returnable Container" 
          className={styles.stageImage} 
        />
        <div className={styles.stageBadge}>50+ REUSE CYCLES</div>
      </div>
    </div>
  );
}
