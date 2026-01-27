/**
 * VoltagePanel - Displays the 4 voltage/demand sources
 */

import React from 'react';
import type { VoltagePanelProps } from './types';
import styles from './styles.module.css';

// Voltage source definitions
const VOLTAGE_SOURCES = [
  {
    id: 'accountability',
    name: 'Accountability',
    description: 'Government baseline need for assurance',
    baseLevel: 1.0,
    aiEffect: 0, // Doesn't change with AI
    color: '#60A5FA',
  },
  {
    id: 'safety',
    name: 'Safety',
    description: 'Operational continuity requirements',
    baseLevel: 0.8,
    aiEffect: 0.1, // Slightly increases with AI
    color: '#FBBF24',
  },
  {
    id: 'prestige',
    name: 'Prestige',
    description: 'Career advancement signals',
    baseLevel: 0.6,
    aiEffect: -0.4, // Decreases with AI (shifts to assurance)
    color: '#A78BFA',
  },
  {
    id: 'ai-shock',
    name: 'AI Shock',
    description: 'New external pressure from AI capabilities',
    baseLevel: 0,
    aiEffect: 2.0, // Directly scales with AI factor
    color: '#F472B6',
  },
];

function VoltagePanel({ aiFactor, animated = true }: VoltagePanelProps): React.ReactElement {
  return (
    <div className={styles.voltagePanel}>
      <div className={styles.voltagePanelTitle}>Voltage Sources</div>
      
      {VOLTAGE_SOURCES.map((source) => {
        // Calculate effective level based on AI factor
        let effectiveLevel: number;
        if (source.id === 'ai-shock') {
          // AI Shock scales directly with AI factor
          effectiveLevel = source.baseLevel + (source.aiEffect * aiFactor);
        } else if (source.id === 'prestige') {
          // Prestige decreases with AI (shifts to assurance)
          effectiveLevel = Math.max(0.1, source.baseLevel + (source.aiEffect * aiFactor));
        } else {
          // Others slightly increase or stay stable
          effectiveLevel = source.baseLevel + (source.aiEffect * aiFactor);
        }
        
        // Normalize to 0-1 for display (AI shock can go to 2.0)
        const displayLevel = Math.min(1, effectiveLevel);
        const isOverdriven = effectiveLevel > 1;
        const isPulsing = animated && (source.id === 'ai-shock' && aiFactor > 0.5);
        
        return (
          <div 
            key={source.id} 
            className={styles.voltageSource}
            title={source.description}
          >
            <div 
              className={styles.voltageIcon}
              style={{ '--voltage-color': source.color } as React.CSSProperties}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            
            <div className={styles.voltageInfo}>
              <span className={styles.voltageName}>
                {source.name}
                {isOverdriven && ' (!)'}
              </span>
              <div className={styles.voltageBar}>
                <div 
                  className={`${styles.voltageBarFill} ${isPulsing ? styles.pulsing : ''}`}
                  style={{ 
                    width: `${displayLevel * 100}%`,
                    '--voltage-color': source.color,
                    background: source.color,
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
