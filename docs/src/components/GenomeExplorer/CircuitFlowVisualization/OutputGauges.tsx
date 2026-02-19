/**
 * OutputGauges - Display multiple output meters
 * Permission is rendered separately via PermissionGauge.
 * This component shows: Risk, Evidence, Outcomes, Throughput
 */

import React from 'react';
import type { OutputGaugesProps } from './types';
import styles from './styles.module.css';

// Color functions
function getPermissionColor(value: number): string {
  if (value < 30) return '#EF4444'; // Red
  if (value < 60) return '#F59E0B'; // Orange
  return '#10B981'; // Green
}

function getRiskColor(value: number): string {
  // Inverse: high risk = bad (red)
  if (value > 60) return '#EF4444'; // Red
  if (value > 30) return '#F59E0B'; // Orange
  return '#10B981'; // Green
}

/**
 * Standalone Permission gauge for placement alongside Client Needs
 */
function PermissionGauge({ value }: { value: number }): React.ReactElement {
  const color = getPermissionColor(value);
  return (
    <div className={styles.permissionStandalone}>
      <div 
        className={`${styles.gauge} ${styles.primary}`}
        style={{ '--gauge-color': color } as React.CSSProperties}
      >
        <div className={styles.gaugeHeader}>
          <span className={styles.gaugeLabel}>Permission</span>
          <span className={styles.gaugeValue}>
            {Math.round(value)}%
          </span>
        </div>
        <div className={styles.gaugeBar}>
          <div 
            className={styles.gaugeBarFill}
            style={{ 
              width: `${Math.min(100, value)}%`,
              background: color,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function OutputGauges({
  permission,
  risk,
  evidenceYield,
  outcomes,
  throughput,
  animated = true,
}: OutputGaugesProps): React.ReactElement {
  
  const gauges = [
    {
      id: 'risk',
      label: 'Risk',
      value: risk,
      color: getRiskColor(risk),
      inverse: true,
    },
    {
      id: 'evidence',
      label: 'Evidence',
      value: evidenceYield,
      color: '#8B5CF6',
    },
    {
      id: 'outcomes',
      label: 'Outcomes',
      value: outcomes,
      color: '#10B981',
    },
    {
      id: 'throughput',
      label: 'Throughput',
      value: throughput,
      color: '#3B82F6',
    },
  ];
  
  return (
    <div className={styles.outputPanel}>
      <div className={styles.outputPanelTitle}>Outputs</div>
      
      {gauges.map((gauge) => (
        <div 
          key={gauge.id}
          className={styles.gauge}
          style={{ '--gauge-color': gauge.color } as React.CSSProperties}
        >
          <div className={styles.gaugeHeader}>
            <span className={styles.gaugeLabel}>{gauge.label}</span>
            <span className={styles.gaugeValue}>
              {Math.round(gauge.value)}%
            </span>
          </div>
          <div className={styles.gaugeBar}>
            <div 
              className={styles.gaugeBarFill}
              style={{ 
                width: `${Math.min(100, gauge.value)}%`,
                background: gauge.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OutputGauges;
export { PermissionGauge };
