import React from 'react';
import { MaturityLevel, getMaturityConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface MaturityBadgeProps {
  maturity: MaturityLevel;
  showDescription?: boolean;
}

/**
 * Displays a colored badge indicating the maturity level of a method.
 */
export default function MaturityBadge({
  maturity,
  showDescription = false,
}: MaturityBadgeProps): React.ReactElement {
  const config = getMaturityConfig(maturity);

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        borderColor: config.color,
      }}
      title={config.description}
    >
      <span className={styles.dot} style={{ backgroundColor: config.color }} />
      {config.label}
      {showDescription && (
        <span className={styles.description}> - {config.description}</span>
      )}
    </span>
  );
}
