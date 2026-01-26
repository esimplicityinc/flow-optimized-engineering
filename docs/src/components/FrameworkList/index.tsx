import React from 'react';
import Link from '@docusaurus/Link';
import { FrameworkStatus, getFrameworkStatusConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface Framework {
  slug: string;
  title: string;
  description: string;
  status: FrameworkStatus;
  methodCount?: number;
}

interface FrameworkListProps {
  frameworks?: Framework[];
}

/**
 * Displays a grid of available external frameworks.
 * If no frameworks are provided, shows a placeholder message.
 */
export default function FrameworkList({
  frameworks = [],
}: FrameworkListProps): React.ReactElement {
  if (frameworks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No external frameworks have been added yet.</p>
        <p className={styles.hint}>
          Check back soon, or{' '}
          <Link to="/docs/external-frameworks/overview#contributing-frameworks">
            contribute a framework
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {frameworks.map((framework) => {
        const statusConfig = getFrameworkStatusConfig(framework.status);
        return (
          <Link
            key={framework.slug}
            to={`/docs/external-frameworks/${framework.slug}/overview`}
            className={styles.card}
          >
            <div className={styles.header}>
              <strong className={styles.title}>{framework.title}</strong>
              <span
                className={styles.status}
                style={{
                  backgroundColor: statusConfig.bgColor,
                  color: statusConfig.color,
                }}
              >
                {statusConfig.label}
              </span>
            </div>
            <p className={styles.description}>{framework.description}</p>
            {framework.methodCount !== undefined && (
              <span className={styles.methodCount}>
                {framework.methodCount} method{framework.methodCount !== 1 ? 's' : ''}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
