import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface FrameworkMethod {
  slug: string;
  title: string;
  pillar?: string;
  description?: string;
}

interface FrameworkMethodListProps {
  framework: string;
  methods?: FrameworkMethod[];
}

/**
 * Displays a list of methods within an external framework.
 * If no methods are provided, shows a placeholder.
 */
export default function FrameworkMethodList({
  framework,
  methods = [],
}: FrameworkMethodListProps): React.ReactElement {
  if (methods.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Browse the methods in the sidebar, or check the Methods section below.</p>
      </div>
    );
  }

  // Group methods by pillar if pillars exist
  const pillars = new Map<string, FrameworkMethod[]>();
  const ungrouped: FrameworkMethod[] = [];

  methods.forEach((method) => {
    if (method.pillar) {
      const existing = pillars.get(method.pillar) || [];
      pillars.set(method.pillar, [...existing, method]);
    } else {
      ungrouped.push(method);
    }
  });

  const renderMethod = (method: FrameworkMethod) => (
    <Link
      key={method.slug}
      to={`/docs/external-frameworks/${framework}/methods/${method.slug}`}
      className={styles.card}
    >
      <strong className={styles.title}>{method.title}</strong>
      {method.description && (
        <p className={styles.description}>{method.description}</p>
      )}
    </Link>
  );

  return (
    <div className={styles.container}>
      {Array.from(pillars.entries()).map(([pillar, pillarMethods]) => (
        <div key={pillar} className={styles.pillarGroup}>
          <h4 className={styles.pillarTitle}>{pillar}</h4>
          <div className={styles.grid}>
            {pillarMethods.map(renderMethod)}
          </div>
        </div>
      ))}
      {ungrouped.length > 0 && (
        <div className={styles.grid}>
          {ungrouped.map(renderMethod)}
        </div>
      )}
    </div>
  );
}
