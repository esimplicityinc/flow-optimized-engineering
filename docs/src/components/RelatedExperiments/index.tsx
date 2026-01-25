import React from 'react';
import Link from '@docusaurus/Link';
import { ExperimentStatus, EXPERIMENT_STATUS } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface Experiment {
  slug: string;
  title: string;
  status: ExperimentStatus;
}

interface RelatedExperimentsProps {
  /**
   * List of experiments to display. If not provided, shows a placeholder message.
   * In the future, this could be auto-populated from frontmatter.
   */
  experiments?: Experiment[];
}

/**
 * Displays a list of experiments that support a method.
 * Used on method pages to show supporting evidence.
 */
export default function RelatedExperiments({
  experiments,
}: RelatedExperimentsProps): React.ReactElement {
  // If no experiments provided, show placeholder
  if (!experiments || experiments.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Supporting Evidence</h2>
        <p className={styles.empty}>
          No experiments linked yet. See{' '}
          <Link to="/docs/field-guides/contributing-experiments">
            Contributing Experiments
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
        {experiments.map((experiment) => {
          const statusConfig = EXPERIMENT_STATUS[experiment.status];
          return (
            <Link
              key={experiment.slug}
              to={`/docs/field-guides/experiments/${experiment.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTitle}>{experiment.title}</div>
              <div
                className={styles.status}
                style={{ color: statusConfig.color }}
              >
                {experiment.status === 'completed' ? '✓' : '○'}{' '}
                {statusConfig.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
