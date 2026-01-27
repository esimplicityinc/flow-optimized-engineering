/**
 * Legend - Color/shape key for the ecosystem diagram
 */

import React from 'react';
import { legendItems, COLORS } from './data';
import styles from './EcosystemDiagram.module.css';

interface LegendProps {
  compact?: boolean;
}

export default function Legend({ compact = false }: LegendProps) {
  return (
    <div className={`${styles.legend} ${compact ? styles.legendCompact : ''}`}>
      <div className={styles.legendTitle}>Legend</div>
      <div className={styles.legendItems}>
        {legendItems.map((item) => (
          <div key={item.label} className={styles.legendItem}>
            {item.shape === 'line' ? (
              <span 
                className={styles.legendLine}
                style={{ backgroundColor: item.color }}
              />
            ) : (
              <span 
                className={`${styles.legendDot} ${item.shape === 'circle' ? styles.legendCircle : ''}`}
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className={styles.legendLabel}>{item.label}</span>
          </div>
        ))}
        <div className={styles.legendItem}>
          <span className={styles.legendLineDashed} />
          <span className={styles.legendLabel}>Assessed / Informs</span>
        </div>
      </div>
    </div>
  );
}
