'use client';

import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import styles from './TcoCalculator.module.css';

interface PricingTier {
  id: string;
  label: string;
  cardboardCost: number;
  polyvedaCost: number;
}

const pricingTiers: PricingTier[] = [
  { id: 'small', label: 'Small Box (3-Ply)', cardboardCost: 15, polyvedaCost: 120 },
  { id: 'medium', label: 'Medium Box (5-Ply)', cardboardCost: 45, polyvedaCost: 350 },
  { id: 'large', label: 'Large Box (7-Ply)', cardboardCost: 150, polyvedaCost: 900 },
];

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1], // Custom spring-like ease
      onUpdate: (v) => setDisplayValue(Math.round(v))
    });
    return controls.stop;
  }, [value]);
  
  return <>{displayValue.toLocaleString('en-IN')}</>;
}

export function TcoCalculator() {
  const [selectedTierId, setSelectedTierId] = useState<string>('medium');
  const [trips, setTrips] = useState<number>(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedTier = pricingTiers.find((t) => t.id === selectedTierId) || pricingTiers[1];
  
  const totalCardboard = selectedTier.cardboardCost * trips;
  const totalPolyveda = selectedTier.polyvedaCost; // Flat cost because it survives 50+ trips

  return (
    <section className={styles.calculatorSection}>
      <div className={styles.container}>
        
        {/* Left Column: Typography */}
        <div className={styles.leftCol}>
          <span className={styles.eyebrow}>[ TCO Analysis ]</span>
          <h2 className={styles.heading}>Stop Repurchasing. Start Reusing.</h2>
          <p className={styles.description}>
            Cardboard seems cheap until you realize you're paying for it every single trip. 
            Polyveda PP Corrugated boxes are engineered for 50+ logistics cycles, drastically reducing your Total Cost of Ownership.
          </p>
        </div>

        {/* Right Column: Double-Bezel Interactive Widget */}
        <div className={styles.rightCol}>
          <div className={styles.calculatorCard}>
            
            {/* Controls */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Box Type / Size</span>
              </div>
              <div className={styles.customSelectWrapper}>
                <button 
                  type="button" 
                  className={`${styles.selectInput} ${isDropdownOpen ? styles.selectInputActive : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
                >
                  <span style={{textAlign: 'left'}}>{selectedTier.label}</span>
                  <svg className={`${styles.selectArrow} ${isDropdownOpen ? styles.arrowOpen : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className={`${styles.dropdownOptions} ${isDropdownOpen ? styles.dropdownOpen : ''}`}>
                  {pricingTiers.map(tier => (
                    <div 
                      key={tier.id} 
                      className={`${styles.dropdownOption} ${tier.id === selectedTierId ? styles.dropdownOptionSelected : ''}`}
                      onClick={() => {
                        setSelectedTierId(tier.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {tier.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <span className={styles.label}>Number of Trips</span>
                <span className={styles.valueDisplay}>{trips} Trips</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={trips} 
                onChange={(e) => setTrips(parseInt(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Results Grid */}
            <div className={styles.resultsGrid}>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>Cardboard Total Cost</span>
                <span className={styles.resultPrice}>
                  ₹<AnimatedNumber value={totalCardboard} />
                </span>
              </div>
              
              <div className={`${styles.resultCard} ${styles.polyvedaResult}`}>
                <span className={styles.resultLabel}>Polyveda PP Cost</span>
                <span className={styles.resultPrice}>
                  ₹<AnimatedNumber value={totalPolyveda} />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
