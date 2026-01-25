import React from 'react';
import Link from '@docusaurus/Link';
import { MaturityLevel, getMaturityConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface Method {
  path: string;
  title: string;
  maturity: MaturityLevel;
}

interface RelatedMethodsProps {
  /**
   * List of methods this experiment supports. If not provided, shows a placeholder message.
   * In the future, this could be auto-populated from frontmatter.
   */
  methods?: Method[];
}

/**
 * Displays a list of methods that an experiment supports.
 * Used on experiment pages to show which methods this evidence applies to.
 */
export default function RelatedMethods({
  methods,
}: RelatedMethodsProps): React.ReactElement {
  // If no methods provided, show placeholder
  if (!methods || methods.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Methods This Supports</h2>
        <p className={styles.empty}>
          No methods linked yet. Update the frontmatter to connect this
          experiment to relevant methods.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Methods This Supports</h2>
      <div className={styles.grid}>
        {methods.map((method) => {
          const maturityConfig = getMaturityConfig(method.maturity);
          return (
            <Link
              key={method.path}
              to={`/docs/field-guides/${method.path}`}
              className={styles.card}
            >
              <div className={styles.cardTitle}>{method.title}</div>
              <div
                className={styles.maturity}
                style={{
                  backgroundColor: maturityConfig.bgColor,
                  color: maturityConfig.color,
                }}
              >
                {maturityConfig.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
