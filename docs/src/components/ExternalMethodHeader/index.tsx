import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MaturityBadge from '@site/src/components/MaturityBadge';
import PriorityBadge from '@site/src/components/PriorityBadge';
import { MaturityLevel, PriorityLevel, DEFAULT_PRIORITY } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface ExternalMethodInfo {
  framework: string;
  method: string;
  id?: string; // Method ID like M111, used for canonical link
}

// Map framework slugs to display names
const frameworkDisplayNames: Record<string, string> = {
  'dora': 'DORA',
  'bdd': 'BDD',
  'team-topologies': 'Team Topologies',
  'continuous-delivery': 'Continuous Delivery',
  'domain-driven-design': 'Domain-Driven Design',
  'double-diamond': 'Double Diamond',
};

/**
 * Header component for external method pages.
 * Displays a callout linking to the canonical external method
 * and shows the FOE maturity level.
 * 
 * Reads `external_method` and `foe_maturity` from the page's frontmatter.
 */
export default function ExternalMethodHeader(): React.ReactElement | null {
  const { frontMatter } = useDoc();
  
  const externalMethod = frontMatter.external_method as ExternalMethodInfo | undefined;
  const foeMaturiy = (frontMatter.foe_maturity || 'hypothesized') as MaturityLevel;
  const priority = (frontMatter.priority || DEFAULT_PRIORITY) as PriorityLevel;
  
  if (!externalMethod) {
    console.warn('ExternalMethodHeader: No external_method found in frontmatter');
    return null;
  }

  const { framework, method, id } = externalMethod;
  const frameworkName = frameworkDisplayNames[framework] || framework;
  // Path includes ID prefix in filename (e.g., M124-fast-flow)
  const methodSlug = id ? `${id}-${method}` : method;
  const canonicalPath = `/docs/external-frameworks/${framework}/methods/${methodSlug}`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.source}>
          <span className={styles.sourceLabel}>From</span>
          <span className={styles.frameworkName}>{frameworkName}</span>
        </div>
        <div className={styles.badges}>
          <PriorityBadge priority={priority} />
          <MaturityBadge maturity={foeMaturiy} />
        </div>
      </div>
      
      <div className={styles.canonicalLink}>
        <Link to={canonicalPath} className={styles.link}>
          View canonical method definition
          <svg 
            className={styles.linkIcon} 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </Link>
      </div>
      
      <p className={styles.description}>
        This page describes how <strong>{frameworkName}</strong>'s method applies 
        specifically to this Field Guide's context, with FOE-specific observations and adaptations.
      </p>
    </div>
  );
}
