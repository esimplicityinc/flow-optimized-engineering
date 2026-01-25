import React from 'react';
import Link from '@docusaurus/Link';
import { MaturityLevel, getMaturityConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface Method {
  slug: string;
  title: string;
  maturity: MaturityLevel;
  description?: string;
  experimentCount?: number;
}

interface MethodListProps {
  /**
   * The guide ID (folder name) for building links.
   */
  guideId: string;
  /**
   * List of methods to display.
   */
  methods?: Method[];
}

/**
 * Displays methods grouped by maturity (Established vs Emerging).
 * Established = validated or proven
 * Emerging = hypothesized or experimenting
 */
export default function MethodList({
  guideId,
  methods,
}: MethodListProps): React.ReactElement {
  if (!methods || methods.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No methods available yet.</p>
      </div>
    );
  }

  const established = methods.filter(
    (m) => m.maturity === 'validated' || m.maturity === 'proven'
  );
  const emerging = methods.filter(
    (m) => m.maturity === 'hypothesized' || m.maturity === 'experimenting'
  );

  const renderMethodCard = (method: Method, section: 'established' | 'emerging') => {
    const config = getMaturityConfig(method.maturity);
    const path = `/docs/field-guides/${guideId}/methods/${section}/${method.slug}`;

    return (
      <Link key={method.slug} to={path} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>{method.title}</span>
          <span
            className={styles.badge}
            style={{ backgroundColor: config.bgColor, color: config.color }}
          >
            {config.label}
          </span>
        </div>
        {method.description && (
          <p className={styles.cardDescription}>{method.description}</p>
        )}
        {method.experimentCount !== undefined && (
          <div className={styles.cardMeta}>
            {method.experimentCount} experiment
            {method.experimentCount !== 1 ? 's' : ''}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      {established.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Established Methods</h2>
          <p className={styles.sectionDescription}>
            Methods with strong supporting evidence (Validated or Proven).
          </p>
          <div className={styles.grid}>
            {established.map((m) => renderMethodCard(m, 'established'))}
          </div>
        </section>
      )}

      {emerging.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Emerging Methods</h2>
          <p className={styles.sectionDescription}>
            Methods currently being tested (Hypothesized or Experimenting).
          </p>
          <div className={styles.grid}>
            {emerging.map((m) => renderMethodCard(m, 'emerging'))}
          </div>
        </section>
      )}
    </div>
  );
}
