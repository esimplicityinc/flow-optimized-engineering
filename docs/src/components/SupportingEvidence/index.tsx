import React from 'react';
import Link from '@docusaurus/Link';
import { resolveObservation } from '@site/src/data/fieldGuideMetadata';
import { OBSERVATION_STATUS } from '@site/src/lib/fieldGuides';
import styles from '../RelatedObservations/styles.module.css'; // Reuse existing styles

interface Props {
  observationRefs: string[];
}

/**
 * Auto-injected component that displays supporting observations for method pages.
 * Reads observation references from frontmatter and resolves full metadata.
 */
export default function SupportingEvidence({ observationRefs }: Props): React.ReactElement | null {
  const observations = observationRefs
    .map(ref => resolveObservation(ref))
    .filter((obs): obs is NonNullable<typeof obs> => obs !== undefined);
  
  if (observations.length === 0) return null;
  
  return (
    <div className={styles.container}>
      <h2>Supporting Evidence</h2>
      <div className={styles.grid}>
        {observations.map((obs) => {
          const statusConfig = OBSERVATION_STATUS[obs.status];
          return (
            <Link
              key={obs.id}
              to={`/docs/field-guides/observations/${obs.slug}`}
              className={styles.card}
            >
              <div className={styles.cardTitle}>{obs.title}</div>
              <div className={styles.status} style={{ color: statusConfig.color }}>
                {obs.status === 'completed' ? '✓' : '○'} {statusConfig.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
