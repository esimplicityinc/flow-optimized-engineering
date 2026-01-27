import React from 'react';
import Link from '@docusaurus/Link';
import { ObservationStatus, OBSERVATION_STATUS } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface Observation {
  slug: string;
  title: string;
  status: ObservationStatus;
}

interface RelatedObservationsProps {
  /**
   * List of observations to display. If not provided, shows a placeholder message.
   * In the future, this could be auto-populated from frontmatter.
   */
  observations?: Observation[];
}

/**
 * Displays a list of observations that support a method.
 * Used on method pages to show supporting evidence.
 */
export default function RelatedObservations({
  observations,
}: RelatedObservationsProps): React.ReactElement {
  // If no observations provided, show placeholder
  if (!observations || observations.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Supporting Evidence</h2>
        <p className={styles.empty}>
          No observations linked yet. See{' '}
          <Link to="/docs/field-guides/contributing-observations">
            Contributing Observations
          </Link>{' '}
          to add supporting evidence for this method.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Supporting Evidence</h2>
      <div className={styles.grid}>
        {observations.map((observation) => {
          const statusConfig = OBSERVATION_STATUS[observation.status];
          return (
            <Link
              key={observation.slug}
              to={`/docs/field-guides/observations/${observation.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTitle}>{observation.title}</div>
              <div
                className={styles.status}
                style={{ color: statusConfig.color }}
              >
                {observation.status === 'completed' ? '✓' : '○'}{' '}
                {statusConfig.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
