/**
 * VoltagePanel - Displays the 4 client needs
 * 
 * When AI is high but spine is weak, Accountability and Safety
 * decrease to show these client needs are NOT being met.
 */

import React from 'react';
import type { VoltagePanelProps } from './types';
import styles from './styles.module.css';

// Client need definitions
const CLIENT_NEEDS = [
  {
    id: 'mission',
    name: 'Mission Capability',
    description: 'Core mission delivery requirements',
    baseLevel: 0.9,
    behavior: 'static', // Doesn't depend on spine - AI always helps here
    color: '#34D399',
  },
  {
    id: 'transparency',
    name: 'Transparency',
    description: 'Visibility into what AI is doing and why',
    baseLevel: 0.3, // Starts LOW
    behavior: 'spine-rocket', // Drops without spine, rockets to FULL with spine
    rocketMultiplier: 3.0, // Hits 100% at balanced
    color: '#60A5FA',
  },
  {
    id: 'safety',
    name: 'Safety',
    description: 'Operational continuity requirements',
    baseLevel: 0.35, // Starts LOW
    behavior: 'spine-rocket', // Drops without spine, rockets to FULL with spine
    rocketMultiplier: 2.8, // Hits 100% at balanced
    color: '#FBBF24',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    description: 'Career advancement signals',
    baseLevel: 0.3, // Starts LOW
    behavior: 'spine-rocket', // Drops without spine, rockets to FULL with spine
    rocketMultiplier: 3.0, // Hits 100% at balanced
    color: '#A78BFA',
  },
];

function VoltagePanel({ aiFactor, spineStrength, animated = true }: VoltagePanelProps): React.ReactElement {
  return (
    <div className={styles.voltagePanel}>
      <div className={styles.voltagePanelTitle}>Client Needs</div>
      
      {CLIENT_NEEDS.map((need) => {
        let effectiveLevel = need.baseLevel;
        
        if (need.behavior === 'spine-rocket' && 'rocketMultiplier' in need) {
          // Rocket mode:
          // - Spine below 0.55 = penalty (bars drop)
          // - Spine above 0.55 = bonus (bars rise)
          // - Effect scales with AI factor (no AI = no movement)
          
          const threshold = 0.55; // "Balanced" is above this
          const spineRelative = spineStrength - threshold;
          const effect = spineRelative * need.rocketMultiplier * aiFactor;
          
          effectiveLevel = need.baseLevel + effect;
        }
        // 'static' behavior: effectiveLevel stays at baseLevel
        
        // Normalize to 0-1 for display
        const displayLevel = Math.min(1, Math.max(0.1, effectiveLevel));
        const isUnderserved = effectiveLevel < need.baseLevel * 0.8; // Dropped more than 20%
        const isExceeding = effectiveLevel > need.baseLevel * 1.3; // Gained more than 30%
        
        return (
          <div 
            key={need.id} 
            className={styles.voltageSource}
            title={need.description}
          >
            <div 
              className={styles.voltageIcon}
              style={{ '--voltage-color': need.color } as React.CSSProperties}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            
            <div className={styles.voltageInfo}>
              <span className={styles.voltageName}>
                {need.name}
                {isUnderserved && ' ⚠'}
                {isExceeding && ' ✓'}
              </span>
              <div className={styles.voltageBar}>
                <div 
                  className={styles.voltageBarFill}
                  style={{ 
                    width: `${displayLevel * 100}%`,
                    '--voltage-color': need.color,
                    background: need.color,
                  } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VoltagePanel;
