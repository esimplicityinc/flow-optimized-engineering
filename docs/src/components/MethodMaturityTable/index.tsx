import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import { MaturityLevel, MATURITY_LEVELS, getMaturityConfig } from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

// =============================================================================
// Types
// =============================================================================

interface MethodEntry {
  id: string;
  title: string;
  maturity: MaturityLevel;
  description?: string;
  /** For internal methods: slug for the path */
  slug?: string;
  /** For external methods: framework identifier */
  framework?: string;
  /** Display name for the framework */
  frameworkTitle?: string;
  /** Explicit link override (for methods not adopted into this guide) */
  href?: string;
}

interface MethodMaturityTableProps {
  /** The guide ID (folder name) for building links */
  guideId: string;
  /** All methods to display in the table */
  methods: MethodEntry[];
}

// =============================================================================
// Sort helpers
// =============================================================================

type SortField = 'title' | 'maturity' | 'source';
type SortDir = 'asc' | 'desc';

const MATURITY_ORDER: Record<MaturityLevel, number> = {
  proven: 4,
  validated: 3,
  observing: 2,
  hypothesized: 1,
};

function compareMethods(
  a: MethodEntry,
  b: MethodEntry,
  field: SortField,
  dir: SortDir,
): number {
  let cmp = 0;

  switch (field) {
    case 'title':
      cmp = a.title.localeCompare(b.title);
      break;
    case 'maturity':
      cmp = MATURITY_ORDER[a.maturity] - MATURITY_ORDER[b.maturity];
      break;
    case 'source': {
      const aSource = a.framework ? a.frameworkTitle || a.framework : 'Internal';
      const bSource = b.framework ? b.frameworkTitle || b.framework : 'Internal';
      cmp = aSource.localeCompare(bSource);
      break;
    }
  }

  return dir === 'desc' ? -cmp : cmp;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Compact, sortable table showing all methods in a guide with their maturity levels.
 * Designed to be placed near the top of each field guide overview page for quick scanning.
 */
export default function MethodMaturityTable({
  guideId,
  methods,
}: MethodMaturityTableProps): React.ReactElement {
  const [sortField, setSortField] = useState<SortField>('maturity');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(
    () => [...methods].sort((a, b) => compareMethods(a, b, sortField, sortDir)),
    [methods, sortField, sortDir],
  );

  if (methods.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No methods documented yet.</p>
      </div>
    );
  }

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir(field === 'maturity' ? 'desc' : 'asc');
    }
  }

  function renderSortIndicator(field: SortField) {
    const active = sortField === field;
    const arrow = active ? (sortDir === 'asc' ? '\u25B2' : '\u25BC') : '\u25BC';
    return (
      <span
        className={`${styles.sortIndicator} ${active ? styles.sortIndicatorActive : ''}`}
      >
        {arrow}
      </span>
    );
  }

  function buildMethodPath(method: MethodEntry): string {
    if (method.href) {
      return method.href;
    }
    const isEstablished =
      method.maturity === 'validated' || method.maturity === 'proven';
    const section = isEstablished ? 'established' : 'emerging';
    const pathSlug = method.slug
      ? `${method.id}-${method.slug}`
      : `${method.id}-${method.framework ? method.framework : method.title.toLowerCase().replace(/\s+/g, '-')}`;
    return `/docs/field-guides/${guideId}/methods/${section}/${pathSlug}`;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>
              Method{renderSortIndicator('title')}
            </th>
            <th onClick={() => handleSort('maturity')}>
              Maturity{renderSortIndicator('maturity')}
            </th>
            <th onClick={() => handleSort('source')}>
              Source{renderSortIndicator('source')}
            </th>
            <th className={styles.descriptionCol}>Description</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((method) => {
            const config = getMaturityConfig(method.maturity);
            const path = buildMethodPath(method);
            const isInternal = !method.framework;

            return (
              <tr key={method.id}>
                <td>
                  <Link to={path} className={styles.methodLink}>
                    {method.title}
                  </Link>
                </td>
                <td className={styles.maturityCell}>
                  <span
                    className={styles.maturityDot}
                    style={{ backgroundColor: config.color }}
                  />
                  <span className={styles.maturityLabel} style={{ color: config.color }}>
                    {config.label}
                  </span>
                </td>
                <td className={styles.sourceCell}>
                  {isInternal ? (
                    <span className={styles.internalTag}>Internal</span>
                  ) : (
                    <span className={styles.frameworkTag}>
                      {method.frameworkTitle || method.framework}
                    </span>
                  )}
                </td>
                <td className={styles.descriptionCol}>
                  {method.description && (
                    <span className={styles.description}>{method.description}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
