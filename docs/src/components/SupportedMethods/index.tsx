import React from 'react';
import Link from '@docusaurus/Link';
import { resolveMethod } from '@site/src/data/fieldGuideMetadata';
import { getMaturityConfig } from '@site/src/lib/fieldGuides';
import styles from '../RelatedMethods/styles.module.css'; // Reuse existing styles

interface Props {
  methodRefs: string[];
}

/**
 * Auto-injected component that displays supported methods for observation pages.
 * Reads method references from frontmatter and resolves full metadata.
 */
export default function SupportedMethods({ methodRefs }: Props): React.ReactElement | null {
  const methods = methodRefs
    .map(ref => resolveMethod(ref))
    .filter((method): method is NonNullable<typeof method> => method !== undefined);
  
  if (methods.length === 0) return null;
  
  return (
    <div className={styles.container}>
      <h2>Methods This Supports</h2>
      <div className={styles.grid}>
        {methods.map((method) => {
          const maturityConfig = getMaturityConfig(method.maturity);
          // External framework methods have paths like "external-frameworks/..."
          // Field guide methods have paths like "agentic-coding/methods/..."
          const basePath = method.path.startsWith('external-frameworks') 
            ? '/docs' 
            : '/docs/field-guides';
          return (
            <Link
              key={method.id}
              to={`${basePath}/${method.path}`}
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
