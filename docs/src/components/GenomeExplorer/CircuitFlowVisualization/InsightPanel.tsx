/**
 * InsightPanel - Dynamic bottleneck detection and delivery mode insights
 * 
 * Reframed around the FOE maturity story:
 * - FOE maturity shifts gene delivery from manual (human) to automated (system)
 * - Without maturity, AI creates a speed mismatch that destroys confidence
 * - With maturity, automated evidence keeps pace with AI velocity
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
  
  if (bottleneckSeverity > 50) {
    bottleneckClass = styles.critical;
  } else if (bottleneckSeverity > 20) {
    bottleneckClass = '';
  } else {
    bottleneckClass = styles.good;
  }
  
  return (
    <div className={styles.insightPanel}>
      {/* Bottleneck indicator */}
      {bottleneck && bottleneck !== 'None detected' && (
        <div className={styles.bottleneckRow}>
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
        <span className={styles.legendLabel}>Gene Delivery Mode:</span>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: DELIVERY_MODE_COLORS.human }} />
          <span>Manual (meetings, artifacts, reviews)</span>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.statusDot} style={{ background: DELIVERY_MODE_COLORS.system }} />
          <span>Automated (pipelines, CI, coded guardrails)</span>
        </div>
      </div>
    </div>
  );
}

// Generate insight based on circuit state with FOE maturity / human-system tension framing
export function generateInsight(
  aiFactor: number,
  spineStrength: number,
  permission: number,
  risk: number,
): string {
  // High AI without FOE maturity - the danger zone
  if (aiFactor > 0.6 && spineStrength < 0.4) {
    return `AI is generating output faster than your manual processes can verify it. ` +
      `Genes are still human-delivered (orange borders) — meetings, manual reviews, and hand-written artifacts ` +
      `can't keep pace. This speed mismatch is why confidence collapses. ` +
      `Increase FOE maturity to shift delivery toward automated evidence.`;
  }
  
  // Moderate AI with weak maturity - early warning
  if (aiFactor > 0.4 && spineStrength < 0.5) {
    return `Evidence generation is falling behind AI velocity. ` +
      `Your genes are mostly human-delivered — every verification step requires a person. ` +
      `As AI adoption grows, this gap will widen. Start shifting Systems genes ` +
      `(Constraints, Verification, Operability, Governance) toward automated delivery.`;
  }
  
  // High AI + high FOE maturity - the sweet spot
  if (aiFactor > 0.6 && spineStrength > 0.6 && permission > 60) {
    return `Strong configuration. FOE maturity has shifted gene delivery toward automated systems (cyan borders). ` +
      `Evidence pipelines keep pace with AI velocity. Product and Education genes retain human judgment ` +
      `where it matters, while Systems genes produce proof automatically.`;
  }
  
  // Low AI but strong FOE maturity (prepared for AI)
  if (aiFactor < 0.3 && spineStrength > 0.6) {
    return `FOE maturity is high — your genes are shifting toward automated delivery even before heavy AI adoption. ` +
      `This foundation means you can increase AI adoption without the confidence collapse that ` +
      `hits teams relying on manual processes.`;
  }
  
  // High risk state
  if (risk > 50) {
    return `Risk is elevated because AI output exceeds your ability to verify it. ` +
      `Genes with orange borders are still manually delivered — people are the bottleneck. ` +
      `Increase FOE maturity to automate evidence generation and close the confidence gap.`;
  }
  
  // Low permission despite effort
  if (permission < 40 && aiFactor > 0.3) {
    return `Permission is bottlenecked by manual delivery. The genes with orange borders ` +
      `represent processes that require human effort for every cycle. ` +
      `Shifting these toward automated delivery (cyan) is how you scale assurance.`;
  }
  
  // Default - explain what the user is seeing
  return `Gene border colors show delivery mode: orange = manual human processes, ` +
    `cyan = automated systems. As FOE maturity increases, genes shift from ` +
    `slow manual delivery to fast automated evidence — the foundation for ` +
    `scaling AI with confidence.`;
}

export default InsightPanel;
