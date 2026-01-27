/**
 * InsightPanel - Dynamic bottleneck detection and insights
 */

import React from 'react';
import type { InsightPanelProps } from './types';
import styles from './styles.module.css';

function InsightPanel({
  bottleneck,
  bottleneckSeverity,
  insight,
  aiFactor,
  spineStrength,
}: InsightPanelProps): React.ReactElement {
  
  // Determine bottleneck severity class
  let bottleneckClass = '';
  let bottleneckIcon = '';
  
  if (bottleneckSeverity > 50) {
    bottleneckClass = styles.critical;
    bottleneckIcon = '';
  } else if (bottleneckSeverity > 20) {
    bottleneckClass = '';
    bottleneckIcon = '';
  } else {
    bottleneckClass = styles.good;
    bottleneckIcon = '';
  }
  
  return (
    <div className={styles.insightPanel}>
      {/* Bottleneck indicator */}
      {bottleneck && bottleneck !== 'None detected' && (
        <div className={styles.bottleneckRow}>
          <span className={styles.bottleneckIcon}>{bottleneckIcon}</span>
          <span className={`${styles.bottleneckText} ${bottleneckClass}`}>
            BOTTLENECK: {bottleneck}
          </span>
        </div>
      )}
      
      {/* Dynamic insight */}
      <p className={styles.insightText}>
        {insight}
      </p>
      
      {/* Status legend */}
      <div className={styles.statusLegend}>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.critical}`} />
          <span>Under capacity</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.warning}`} />
          <span>Needs attention</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.balanced}`} />
          <span>Balanced</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.surplus}`} />
          <span>Surplus</span>
        </div>
      </div>
    </div>
  );
}

// Generate insight based on circuit state
export function generateInsight(
  aiFactor: number,
  spineStrength: number,
  permission: number,
  risk: number,
): string {
  // High AI without spine
  if (aiFactor > 0.6 && spineStrength < 0.4) {
    return `High AI capacity (${Math.round(aiFactor * 100)}%) without adequate evidence capability. ` +
      `The Systems genes (Constraints, Verification, Operability, Governance) need investment ` +
      `to convert this capacity into permission. Currently creating risk, not outcomes.`;
  }
  
  // High AI with weak verification specifically
  if (aiFactor > 0.5 && spineStrength < 0.5) {
    return `AI is amplifying output but evidence generation is lagging. ` +
      `Focus on Verification and Governance genes to build the "proof pipeline" ` +
      `that risk owners need before granting permission.`;
  }
  
  // Balanced high-AI state
  if (aiFactor > 0.6 && spineStrength > 0.6 && permission > 60) {
    return `Strong configuration. The Evidence Engine is converting AI capacity into ` +
      `government permission. Evidence scales with output, and permission keeps pace with capability.`;
  }
  
  // Low AI but strong spine (pre-adaptation)
  if (aiFactor < 0.3 && spineStrength > 0.6) {
    return `Pre-AI posture with strong systems foundation. This organization is well-positioned ` +
      `to adopt AI - the evidence infrastructure is already in place. Consider increasing AI adoption.`;
  }
  
  // High risk state
  if (risk > 50) {
    return `Risk levels are elevated. This typically happens when AI output exceeds ` +
      `the organization's ability to verify and govern it. Strengthen the Systems genes ` +
      `to bring risk under control.`;
  }
  
  // Low permission despite effort
  if (permission < 40 && aiFactor > 0.3) {
    return `Permission is constrained despite available capacity. The "voltage" is there ` +
      `but it's not flowing through to outcomes. Check which genes are creating resistance.`;
  }
  
  // Default balanced state
  return `Adjust the AI Factor slider and gene levels to explore different configurations. ` +
    `The hexagon border colors show which genes are under-capacity (red) or balanced (green) ` +
    `for the current AI level.`;
}

export default InsightPanel;
