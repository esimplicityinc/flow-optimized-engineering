import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface FrameworkBadgeProps {
  framework: string;
  frameworkTitle?: string;
  linkToFramework?: boolean;
  size?: 'small' | 'normal';
}

/**
 * Displays a badge indicating the source external framework.
 * Uses a consistent color scheme to distinguish from maturity badges.
 */
export default function FrameworkBadge({
  framework,
  frameworkTitle,
  linkToFramework = true,
  size = 'normal',
}: FrameworkBadgeProps): React.ReactElement {
  const displayName = frameworkTitle || framework.toUpperCase();
  const frameworkPath = `/docs/external-frameworks/${framework}/overview`;

  const badge = (
    <span
      className={`${styles.badge} ${size === 'small' ? styles.small : ''}`}
      title={`From ${displayName} framework`}
    >
      <span className={styles.icon}>F</span>
      {displayName}
    </span>
  );

  if (linkToFramework) {
    return (
      <Link to={frameworkPath} className={styles.link}>
        {badge}
      </Link>
    );
  }

  return badge;
}
