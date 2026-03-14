import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MaturityBadge from '@site/src/components/MaturityBadge';
import PriorityBadge from '@site/src/components/PriorityBadge';
import { MaturityLevel, PriorityLevel, DEFAULT_PRIORITY } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

/**
 * Header component for internal (FOE-originated) method pages.
 * Displays FOE branding, maturity badge, priority badge, and early stage notice if applicable.
 * 
 * Reads `maturity` and `priority` from the page's frontmatter.
 */
export default function InternalMethodHeader(): React.ReactElement | null {
  const { frontMatter } = useDoc();
  
  const maturity = (frontMatter.maturity || 'hypothesized') as MaturityLevel;
  const priority = (frontMatter.priority || DEFAULT_PRIORITY) as PriorityLevel;
  const isEarlyStage = maturity === 'hypothesized' || maturity === 'observing';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.source}>
          <span className={styles.sourceLabel}>FOE</span>
          <span className={styles.methodType}>Original Method</span>
        </div>
        <div className={styles.badges}>
          <PriorityBadge priority={priority} />
          <MaturityBadge maturity={maturity} />
        </div>
      </div>
      
      {isEarlyStage && (
        <p className={styles.earlyStage}>
          This method is still being validated through observations. Results may vary 
          and the approach may evolve as we learn more.
        </p>
      )}
    </div>
  );
}
