import React from 'react';
import { PriorityLevel, DEFAULT_PRIORITY, getPriorityConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  showDescription?: boolean;
  /** When true, hides the badge if priority is the default (recommended). */
  hideDefault?: boolean;
}

/**
 * Displays a colored badge indicating the priority level of a method.
 * By default, hides the badge for 'recommended' (the default priority)
 * to reduce visual noise -- only 'essential' and 'supplemental' are highlighted.
 */
export default function PriorityBadge({
  priority,
  showDescription = false,
  hideDefault = true,
}: PriorityBadgeProps): React.ReactElement | null {
  if (hideDefault && priority === DEFAULT_PRIORITY) {
    return null;
  }

  const config = getPriorityConfig(priority);

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
      {config.label}
      {showDescription && (
        <span className={styles.description}> - {config.description}</span>
      )}
    </span>
  );
}
