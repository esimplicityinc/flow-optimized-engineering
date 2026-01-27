/**
 * InsightPanel - Dynamic bottleneck detection and delivery mode insights
 */

import React from 'react';
import type { InsightPanelProps } from './types';
import { DELIVERY_MODE_COLORS } from './types';
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
      
      {/* Delivery mode legend */}
      <div className={styles.statusLegend}>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: DELIVERY_MODE_COLORS.human }} />
          <span>Human Service</span>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: DELIVERY_MODE_COLORS.hybrid }} />
          <span>Hybrid</span>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: DELIVERY_MODE_COLORS.system }} />
          <span>System/Product</span>
        </div>
      </div>
      
      {/* Demand status legend */}
      <div className={styles.statusLegend}>
        <span className={styles.legendLabel}>Border = Demand Status:</span>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.critical}`} />
          <span>Critical</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.statusDot} ${styles.warning}`} />
          <span>Warning</span>
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

// Generate insight based on circuit state with delivery mode context
export function generateInsight(
  aiFactor: number,
  spineStrength: number,
  permission: number,
  risk: number,
): string {
  // High AI without spine - need to shift to system delivery
  if (aiFactor > 0.6 && spineStrength < 0.4) {
    return `High AI capacity (${Math.round(aiFactor * 100)}%) requires shifting spine genes ` +
      `to system delivery. Constraints, Verification, Operability, and Governance can't scale ` +
      `as human services at this demand level. Productize evidence generation to unlock permission.`;
  }
  
  // High AI with weak verification - system delivery needed
  if (aiFactor > 0.5 && spineStrength < 0.5) {
    return `The demand for evidence exceeds human delivery capacity. ` +
      `Verification and Governance need to shift from consulting services to automated systems. ` +
      `Build the "proof pipeline" that scales with AI output.`;
  }
  
  // Balanced high-AI state - system delivery working
  if (aiFactor > 0.6 && spineStrength > 0.6 && permission > 60) {
    return `Strong configuration. Spine genes have shifted to system delivery, enabling ` +
      `evidence to scale with AI capacity. Product and Education genes can remain ` +
      `human-intensive because the evidence bottleneck is resolved.`;
  }
  
  // Low AI but strong spine (pre-adaptation)
  if (aiFactor < 0.3 && spineStrength > 0.6) {
    return `Pre-AI posture with systems foundation ready. At low demand, human delivery ` +
      `is still viable for most genes. As AI adoption increases, watch for genes that need ` +
      `to shift from human (orange) to system (green) delivery.`;
  }
  
  // High risk state
  if (risk > 50) {
    return `Risk is elevated because demand exceeds delivery capacity. ` +
      `Genes showing orange (human) under high AI load need to productize. ` +
      `You can't scale assurance through consulting alone.`;
  }
  
  // Low permission despite effort
  if (permission < 40 && aiFactor > 0.3) {
    return `Permission is bottlenecked. Look for genes with red/orange borders (demand gap) ` +
      `and orange interior (human delivery) - these need to shift toward system delivery ` +
      `to meet the AI-era demand curve.`;
  }
  
  // Default balanced state
  return `Gene colors show delivery mode: orange = human service, amber = hybrid, ` +
    `green = system/product. Border colors show demand gap. As AI factor increases, ` +
    `genes must shift from human to system delivery to scale.`;
}

export default InsightPanel;
