/**
 * VoltagePanel - Displays the 4 client needs using the Chaos Model
 * 
 * Core dynamics:
 * - chaos = aiFactor × (1 - spineStrength)  // Uncontrolled velocity
 * - control = spineStrength × aiFactor      // Harnessed velocity
 * 
 * Mission: Medium baseline, slight AI boost, then collapses with chaos
 * Transparency/Safety: Low baseline, crash with chaos, rocket with control
 * Prestige: Follows the others (career outcome of mission success)
 */

import React from 'react';
import type { VoltagePanelProps } from './types';
import styles from './styles.module.css';

/**
 * Logarithmic curve for spine effects
 * Gradual change near the middle, accelerates at extremes
 */
function logCurve(value: number, center: number = 0.5): number {
  const centered = value - center;
  const sign = centered >= 0 ? 1 : -1;
  // Power of 1.5 gives gradual-then-steep curve
  const magnitude = Math.pow(Math.abs(centered) * 2, 1.5);
  return sign * magnitude;
}

/**
 * Compute chaos and control from inputs
 */
function computeDynamics(aiFactor: number, spineStrength: number) {
  const chaos = aiFactor * (1 - spineStrength);
  const control = spineStrength * aiFactor;
  const netEffect = control - chaos; // Positive = control wins, negative = chaos wins
  return { chaos, control, netEffect };
}

// Client need computation functions
// Target: At full AI (1.0) + full FOE (1.0, spine=0.9), all should hit ~100%
// At full AI + low FOE (spine=0.27), all should crash
const CLIENT_NEEDS = [
  {
    id: 'mission',
    name: 'Mission Capability',
    description: 'Ability to deliver on core mission requirements',
    color: '#34D399',
    compute: (aiFactor: number, spineStrength: number, _others: Record<string, number>) => {
      // Mission: Medium baseline, AI boost, collapses with chaos, soars with control
      const base = 0.5;
      const { chaos, control } = computeDynamics(aiFactor, spineStrength);
      
      // Direct spine bonus (FOE maturity helps regardless of AI)
      const directSpineBonus = spineStrength * 0.2;
      
      // AI provides boost
      const aiBoost = aiFactor * 0.15;
      
      // Chaos takes it away
      const chaosPenalty = Math.pow(chaos, 0.7) * 0.6;
      
      // Control provides major lift
      const controlBonus = Math.pow(control, 0.7) * 0.5;
      
      return base + directSpineBonus + aiBoost - chaosPenalty + controlBonus;
    },
  },
  {
    id: 'transparency',
    name: 'Transparency',
    description: 'Visibility into what AI is doing and why',
    color: '#60A5FA',
    compute: (aiFactor: number, spineStrength: number, _others: Record<string, number>) => {
      // Transparency: Low baseline, crashes with chaos, rockets with control
      const base = 0.25;
      const { chaos, control } = computeDynamics(aiFactor, spineStrength);
      
      // Direct spine bonus
      const directSpineBonus = spineStrength * 0.25;
      
      // Logarithmic spine effect (AI-amplified)
      const spineEffect = logCurve(spineStrength, 0.5) * aiFactor * 0.6;
      
      // Chaos penalty
      const chaosPenalty = Math.pow(chaos, 0.6) * 0.5;
      
      // Control bonus - this is where transparency rockets
      const controlBonus = Math.pow(control, 0.6) * 0.7;
      
      return base + directSpineBonus + spineEffect - chaosPenalty + controlBonus;
    },
  },
  {
    id: 'safety',
    name: 'Safety',
    description: 'Operational continuity and risk management',
    color: '#FBBF24',
    compute: (aiFactor: number, spineStrength: number, _others: Record<string, number>) => {
      // Safety: rises with FOE maturity, crashes with chaos, rockets with control
      const base = 0.2;
      const { chaos, control } = computeDynamics(aiFactor, spineStrength);
      
      // DIRECT spine effect - safety improves with FOE maturity
      const directSpineBonus = spineStrength * 0.35;
      
      // Logarithmic spine effect (AI-dependent)
      const spineEffect = logCurve(spineStrength, 0.5) * aiFactor * 0.5;
      
      // Chaos penalty (safety is very sensitive)
      const chaosPenalty = Math.pow(chaos, 0.5) * 0.6;
      
      // Control bonus
      const controlBonus = Math.pow(control, 0.6) * 0.6;
      
      return base + directSpineBonus + spineEffect - chaosPenalty + controlBonus;
    },
  },
  {
    id: 'prestige',
    name: 'Prestige',
    description: 'Career advancement and recognition',
    color: '#A78BFA',
    compute: (aiFactor: number, spineStrength: number, others: Record<string, number>) => {
      // Prestige: Follows the others + direct FOE maturity effect
      const base = 0.15;
      
      // DIRECT spine effect - FOE maturity builds reputation
      const directSpineBonus = spineStrength * 0.3;
      
      // Prestige follows other needs (career outcome)
      const missionEffect = Math.max(0, others.mission - 0.4) * 0.35;
      const transparencyEffect = Math.max(0, others.transparency - 0.2) * 0.3;
      const safetyEffect = Math.max(0, others.safety - 0.2) * 0.3;
      
      // AI-amplified effect
      const { control, chaos } = computeDynamics(aiFactor, spineStrength);
      const aiEffect = (control - chaos) * 0.3;
      
      return base + directSpineBonus + missionEffect + transparencyEffect + safetyEffect + aiEffect;
    },
  },
];

function VoltagePanel({ aiFactor, spineStrength, animated = true }: VoltagePanelProps): React.ReactElement {
  // Compute all needs (some depend on others, so compute in order)
  const computedLevels: Record<string, number> = {};
  
  for (const need of CLIENT_NEEDS) {
    computedLevels[need.id] = need.compute(aiFactor, spineStrength, computedLevels);
  }
  
  return (
    <div className={styles.voltagePanel}>
      <div className={styles.voltagePanelTitle}>Client Needs</div>
      
      {CLIENT_NEEDS.map((need) => {
        const effectiveLevel = computedLevels[need.id];
        
        // Normalize to 0-1 for display
        const displayLevel = Math.min(1, Math.max(0.08, effectiveLevel));
        
        // Determine status indicators
        const baseLevel = need.id === 'mission' ? 0.55 : 0.3;
        const isUnderserved = effectiveLevel < baseLevel * 0.7;
        const isExceeding = effectiveLevel > 0.75;
        
        return (
          <div 
            key={need.id} 
            className={styles.voltageSource}
            title={`${need.description}\n${Math.round(effectiveLevel * 100)}%`}
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
