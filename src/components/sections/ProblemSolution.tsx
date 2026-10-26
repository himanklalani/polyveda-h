'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ProblemSolution.module.css';

interface ProblemCard {
  index: string;
  category: string;
  title: string;
  description: string;
  cadCode: string;
  benchmarks: { label: string; value: string }[];
  illustration: React.ReactNode;
}

const CARDS: ProblemCard[] = [
  {
    index: '01',
    category: 'CRUSH RESISTANCE',
    title: 'Unmatched Compression & Structural Load',
    description: 'Engineered with twin-wall fluted vertical trusses that distribute dynamic downward kinetic force. Stack up to 5 tiers high without sidewall bulge, perimeter deformation, or joint fatigue.',
    cadCode: '4.8 kN PEAK LOAD',
    benchmarks: [
      { label: 'Load Capacity', value: '500+ kg / Unit' },
      { label: 'Stacking Height', value: '5-Tier High Cube' },
      { label: 'Sidewall Bulge', value: '0.0 mm Deflection' },
    ],
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Datum Grid Plane at Base */}
        <path d="M160 200 L40 140 L160 80 L280 140 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
        
        {/* Box 1 (Bottom Tier) */}
        <path d="M60 135 L160 185 L260 135" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 95 L60 135 M160 145 L160 185 M260 95 L260 135" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 95 L160 145 L260 95 L160 45 Z" stroke="currentColor" strokeWidth="1.6" />
        
        {/* Vertical Fluting Corrugations (Bottom Tier) */}
        <line x1="85" y1="110" x2="85" y2="148" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="110" y1="122" x2="110" y2="160" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="135" y1="134" x2="135" y2="172" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="185" y1="134" x2="185" y2="172" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="210" y1="122" x2="210" y2="160" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="235" y1="110" x2="235" y2="148" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />

        {/* Box 2 (Top Tier Stacked Interlocking) */}
        <path d="M60 85 L160 135 L260 85" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 45 L60 85 M160 95 L160 135 M260 45 L260 85" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 45 L160 95 L260 45 L160 5 Z" stroke="currentColor" strokeWidth="1.6" />

        {/* Hydraulic Force Plate (Top Datum) */}
        <path d="M50 38 L160 90 L270 38 L160 -12 Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.5" />

        {/* Hydraulic Compressive Force Vectors */}
        <path d="M160 8 L160 44" stroke="currentColor" strokeWidth="2.4" />
        <path d="M154 34 L160 44 L166 34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M110 30 L110 66" stroke="currentColor" strokeWidth="1.8" />
        <path d="M106 58 L110 66 L114 58" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

        <path d="M210 30 L210 66" stroke="currentColor" strokeWidth="1.8" />
        <path d="M206 58 L210 66 L214 58" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

        {/* Telemetry Gauge & Crosshair */}
        <circle cx="160" cy="115" r="18" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 2" opacity="0.6" />
        <circle cx="160" cy="115" r="3" fill="currentColor" />
        <line x1="160" y1="92" x2="160" y2="138" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="137" y1="115" x2="183" y2="115" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    index: '02',
    category: 'BARRIER INTEGRITY',
    title: '100% Moisture, Oil & Chemical Barrier',
    description: 'High-density Polypropylene exhibits zero hygroscopic absorption. Sonic-sealed flutes eliminate capillary wicking, protecting sensitive cargo in humid monsoon storage, ocean freight, and cold-chain condensation.',
    cadCode: '100% WATERPROOF',
    benchmarks: [
      { label: 'Water Absorption', value: '0.00% (Non-Porous)' },
      { label: 'Thermal Window', value: '-40°C to +80°C' },
      { label: 'Chemical Shield', value: 'Oils, Alkalis, Solvents' },
    ],
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Twin-Wall Flute Cross-Section (Isometric Ribbon) */}
        <path d="M40 120 L160 175 L280 120 L160 65 Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M40 138 L160 193 L280 138 L160 83 Z" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
        <path d="M40 120 L40 138 M160 175 L160 193 M280 120 L280 138" stroke="currentColor" strokeWidth="1.7" />

        {/* Internal Vertical Support Flutes */}
        <line x1="60" y1="130" x2="60" y2="148" stroke="currentColor" strokeWidth="1.3" />
        <line x1="80" y1="140" x2="80" y2="158" stroke="currentColor" strokeWidth="1.3" />
        <line x1="100" y1="150" x2="100" y2="168" stroke="currentColor" strokeWidth="1.3" />
        <line x1="120" y1="160" x2="120" y2="178" stroke="currentColor" strokeWidth="1.3" />
        <line x1="140" y1="168" x2="140" y2="186" stroke="currentColor" strokeWidth="1.3" />
        <line x1="180" y1="168" x2="180" y2="186" stroke="currentColor" strokeWidth="1.3" />
        <line x1="200" y1="160" x2="200" y2="178" stroke="currentColor" strokeWidth="1.3" />
        <line x1="220" y1="150" x2="220" y2="168" stroke="currentColor" strokeWidth="1.3" />
        <line x1="240" y1="140" x2="240" y2="158" stroke="currentColor" strokeWidth="1.3" />
        <line x1="260" y1="130" x2="260" y2="148" stroke="currentColor" strokeWidth="1.3" />

        {/* Sonic-Welded Sealed Edge Bead */}
        <path d="M40 120 C35 125 35 133 40 138" stroke="currentColor" strokeWidth="2.2" />
        <path d="M160 175 C155 180 155 188 160 193" stroke="currentColor" strokeWidth="2.2" />
        <path d="M280 120 C285 125 285 133 280 138" stroke="currentColor" strokeWidth="2.2" />

        {/* Hydrophobic Droplet Physics Deflection */}
        <path d="M160 35 C150 52 142 62 142 72 C142 82 150 90 160 90 C170 90 178 82 178 72 C178 62 170 52 160 35 Z" stroke="currentColor" strokeWidth="2.2" />
        <path d="M135 83 C142 79 152 82 160 82 C168 82 178 79 185 83" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        
        {/* 120° Contact Angle Deflection Arcs */}
        <path d="M130 98 C140 92 180 92 190 98" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2" />
        <path d="M136 70 L122 58" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M184 70 L198 58" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />

        {/* Splash & Surface Tension Rings */}
        <ellipse cx="160" cy="115" rx="70" ry="32" stroke="currentColor" strokeWidth="1.3" strokeDasharray="4 3" opacity="0.4" />
        <ellipse cx="160" cy="115" rx="40" ry="18" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    ),
  },
  {
    index: '03',
    category: 'CIRCULAR LOGISTICS',
    title: 'Closed-Loop Orbit & 75% Flat Backhaul',
    description: 'A single Polyveda container delivers 50+ logistics turns, collapsing flat in seconds for reverse freight. Replaces thousands of single-use corrugated cardboard boxes and slashes recurring operational spend.',
    cadCode: '50+ RETURN CYCLES',
    benchmarks: [
      { label: 'Lifecycle Turns', value: '50 to 80+ Cycles' },
      { label: 'Backhaul Volume', value: '75% Space Reduction' },
      { label: 'Cost Per Trip (CPT)', value: 'Plummets by 70%' },
    ],
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sweeping 50+ Logistics Turn Orbit */}
        <ellipse cx="160" cy="120" rx="120" ry="55" stroke="currentColor" strokeWidth="1.4" strokeDasharray="5 3" opacity="0.4" />
        <path d="M40 120 C40 152 94 175 160 175 C226 175 280 152 280 120" stroke="currentColor" strokeWidth="2" />
        <path d="M272 126 L280 120 L283 130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48 114 L40 120 L37 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* State 1: Rigid Assembled Box (Left) */}
        <g transform="translate(-10, -5)">
          <path d="M70 115 L120 138 L170 115 M70 80 L70 115 M120 103 L120 138 M170 80 L170 115" stroke="currentColor" strokeWidth="1.6" />
          <path d="M70 80 L120 103 L170 80 L120 57 Z" stroke="currentColor" strokeWidth="1.6" />
          {/* Lid Flaps & Handle */}
          <path d="M70 80 L55 68 L105 88 L120 103" stroke="currentColor" strokeWidth="1.3" />
          <path d="M120 103 L135 88 L185 68 L170 80" stroke="currentColor" strokeWidth="1.3" />
          <rect x="110" y="112" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
        </g>

        {/* State 2: 75% Flat Knocked-Down Backhaul Unit (Right) */}
        <g transform="translate(60, 20)">
          <path d="M140 105 L190 128 L250 101 L200 78 Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M140 111 L190 134 L250 107" stroke="currentColor" strokeWidth="1.6" />
          <path d="M140 105 L140 111 M190 128 L190 134 M250 101 L250 107" stroke="currentColor" strokeWidth="1.6" />
          {/* Fold Crease Score Lines */}
          <line x1="165" y1="94" x2="215" y2="117" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
          <line x1="175" y1="89" x2="225" y2="112" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
        </g>

        {/* Backhaul Volume Reduction Indicator */}
        <path d="M175 65 L215 65" stroke="currentColor" strokeWidth="1.4" />
        <path d="M180 61 L175 65 L180 69" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M210 61 L215 65 L210 69" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: '04',
    category: 'PRECISION CNC',
    title: 'Custom Component Nesting & Zero Shift',
    description: 'Sub-millimeter CNC routing creates tailored dunnage cavities lined with high-density cross-linked EVA and EPE foam. Secures precision automotive sub-assemblies, avionics, and sensitive components into zero-movement transit.',
    cadCode: '±0.5MM CNC TOLERANCE',
    benchmarks: [
      { label: 'CNC Tolerance', value: '±0.5 mm Accuracy' },
      { label: 'Dunnage Material', value: 'EVA / EPE / XLPE Foam' },
      { label: 'Vibration Dampening', value: 'Zero Component Shift' },
    ],
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Shallow CNC Tray Chassis */}
        <path d="M50 110 L160 162 L270 110 L160 58 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M50 132 L160 184 L270 132" stroke="currentColor" strokeWidth="1.6" />
        <path d="M50 110 L50 132 M160 162 L160 184 M270 110 L270 132" stroke="currentColor" strokeWidth="1.6" />

        {/* CNC Pocket 1 (Left Component Nest) */}
        <path d="M85 110 L115 124 L145 110 L115 96 Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M85 120 L115 134 L145 120" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        <path d="M85 110 L85 120 M115 124 L115 134 M145 110 L145 120" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />

        {/* CNC Pocket 2 (Right Component Nest) */}
        <path d="M175 110 L205 124 L235 110 L205 96 Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M175 120 L205 134 L235 120" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        <path d="M175 110 L175 120 M205 124 L205 134 M235 110 L235 120" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />

        {/* CNC Pocket 3 (Center Deep Well) */}
        <path d="M130 92 L160 106 L190 92 L160 78 Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M130 106 L160 120 L190 106" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
        <path d="M130 92 L130 106 M160 106 L160 120 M190 92 L190 106" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />

        {/* Laser Calibration Crosshair & Targeting Reticle */}
        <circle cx="160" cy="99" r="24" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.65" />
        <line x1="160" y1="65" x2="160" y2="133" stroke="currentColor" strokeWidth="1.3" />
        <line x1="126" y1="99" x2="194" y2="99" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="160" cy="99" r="3.5" fill="currentColor" />

        {/* Micron Precision Calibration Ticks */}
        <line x1="65" y1="117" x2="65" y2="123" stroke="currentColor" strokeWidth="1.2" />
        <line x1="75" y1="122" x2="75" y2="128" stroke="currentColor" strokeWidth="1.2" />
        <line x1="85" y1="127" x2="85" y2="133" stroke="currentColor" strokeWidth="1.2" />
        <line x1="95" y1="132" x2="95" y2="138" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    index: '05',
    category: 'CLEANROOM COMPLIANCE',
    title: 'Zero Particulate & Anti-Static Dissipation',
    description: 'Unlike cellulose cardboard that continuously sheds dust and paper fibers, our sealed-edge corrugated polypropylene produces zero particulate contamination. Available in carbon-loaded ESD formulations.',
    cadCode: 'CLASS 7 CLEANROOM',
    benchmarks: [
      { label: 'Fiber Shedding', value: 'Zero (No Cellulose)' },
      { label: 'Surface Resistivity', value: '10⁶ to 10⁹ Ω/sq' },
      { label: 'Clean Environment', value: 'Class 7 Ready' },
    ],
    illustration: (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Isometric Container Base */}
        <path d="M60 115 L160 165 L260 115 L160 65 Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 135 L160 185 L260 135" stroke="currentColor" strokeWidth="1.6" />
        <path d="M60 115 L60 135 M160 165 L160 185 M260 115 L260 135" stroke="currentColor" strokeWidth="1.6" />

        {/* ESD Surface Conductive Diamond Grid Matrix */}
        <path d="M85 102 L160 140 L235 102" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 2" opacity="0.45" />
        <path d="M110 90 L160 115 L210 90" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 2" opacity="0.45" />
        <path d="M110 140 L160 115 L210 140" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 2" opacity="0.45" />
        <path d="M85 127 L160 90 L235 127" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 2" opacity="0.45" />

        {/* Sonic Sealed Edge Contour (Zero Cellulose Shedding) */}
        <path d="M56 113 L160 167 L264 113" stroke="currentColor" strokeWidth="2.4" opacity="0.8" />
        <path d="M56 137 L160 191 L264 137" stroke="currentColor" strokeWidth="2.4" opacity="0.8" />

        {/* Cleanroom Downward Laminar Streamlines */}
        <path d="M120 25 C120 45 125 55 125 75" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 2" opacity="0.5" />
        <path d="M160 15 C160 40 160 50 160 70" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
        <path d="M156 62 L160 70 L164 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M200 25 C200 45 195 55 195 75" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 2" opacity="0.5" />

        {/* Electrical Grounding Symbol (ESD Safe) */}
        <g transform="translate(160, 115)">
          <circle cx="0" cy="0" r="14" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.85)" />
          <line x1="0" y1="-8" x2="0" y2="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-6" y1="4" x2="6" y2="4" stroke="currentColor" strokeWidth="1.6" />
          <line x1="-4" y1="7" x2="4" y2="7" stroke="currentColor" strokeWidth="1.4" />
          <line x1="-2" y1="10" x2="2" y2="10" stroke="currentColor" strokeWidth="1.2" />
        </g>
      </svg>
    ),
  },
];

export function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.blueprintGrid} />
      
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>The Polyveda Edge</span>
          <h2>Engineered for extreme demands.</h2>
          <p>
            Traditional single-use cardboard absorbs moisture, sheds particulate dust, and collapses under heavy hydraulic loads. 
            Wood requires ISPM-15 heat treatments and splinters. Explore our 5-pillar technical architecture built for zero failure.
          </p>
        </motion.div>
        
        {/* Sticky Stacking Card Deck */}
        <div className={styles.stackContainer}>
          {CARDS.map((card, index) => (
            <motion.div
              key={card.index}
              className={styles.stackCard}
              style={{
                ['--stack-offset' as any]: `${index * 26}px`,
                zIndex: index + 1,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardInner}>
                {/* Header Tab */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <span className={styles.cardIndexBadge}>{card.index}</span>
                    <span className={styles.cardCategory}>{card.category}</span>
                  </div>
                </div>

                {/* 2-Column Content */}
                <div className={styles.cardContent}>
                  {/* Left Column: Narrative & Benchmark Telemetry */}
                  <div className={styles.narrativeCol}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    
                    <div className={styles.benchmarksList}>
                      {card.benchmarks.map((bm, bIdx) => (
                        <div key={bIdx} className={styles.benchmarkItem}>
                          <div className={styles.bmLabel}>{bm.label}</div>
                          <div className={styles.bmValue}>{bm.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: CAD Wireframe Skeleton Stage */}
                  <div className={styles.skeletonStage}>
                    <div className={styles.stageGrid} />
                    <div className={styles.stageCornerTL} />
                    <div className={styles.stageCornerBR} />
                    <div className={styles.stageBadge}>{card.cadCode}</div>
                    
                    <div className={styles.svgContainer}>
                      {card.illustration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
