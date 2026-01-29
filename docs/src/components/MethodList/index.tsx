import React from 'react';
import Link from '@docusaurus/Link';
import { MaturityLevel, getMaturityConfig, AdoptedMethod } from '@site/src/lib/fieldGuides';
import FrameworkBadge from '@site/src/components/FrameworkBadge';
import styles from './styles.module.css';

interface Method {
  slug: string;
  title: string;
  maturity: MaturityLevel;
  description?: string;
  experimentCount?: number;
}

/**
 * Extended external method with display info
 */
interface ExternalMethodDisplay extends AdoptedMethod {
  title: string;
  description?: string;
  frameworkTitle?: string;
}

interface MethodListProps {
  /**
   * The guide ID (folder name) for building links.
   */
  guideId: string;
  /**
   * List of internal (FOE-created) methods to display.
   */
  methods?: Method[];
  /**
   * List of external methods from external frameworks.
   */
  externalMethods?: ExternalMethodDisplay[];
}

/**
 * Displays methods grouped by maturity (Established vs Emerging).
 * Established = validated or proven
 * Emerging = hypothesized or experimenting
 * 
 * Includes both internal methods and external methods from frameworks.
 */
export default function MethodList({
  guideId,
  methods = [],
  externalMethods = [],
}: MethodListProps): React.ReactElement {
  const hasAnyMethods = methods.length > 0 || externalMethods.length > 0;
  
  if (!hasAnyMethods) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No methods available yet.</p>
      </div>
    );
  }

  // Separate internal methods by maturity
  const establishedInternal = methods.filter(
    (m) => m.maturity === 'validated' || m.maturity === 'proven'
  );
  const emergingInternal = methods.filter(
    (m) => m.maturity === 'hypothesized' || m.maturity === 'experimenting'
  );

  // Separate external methods by FOE maturity
  const establishedExternal = externalMethods.filter(
    (m) => m.foe_maturity === 'validated' || m.foe_maturity === 'proven'
  );
  const emergingExternal = externalMethods.filter(
    (m) => m.foe_maturity === 'hypothesized' || m.foe_maturity === 'experimenting'
  );

  const renderInternalMethodCard = (method: Method, section: 'established' | 'emerging') => {
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

  const renderExternalMethodCard = (external: AdoptedMethodDisplay) => {
    const config = getMaturityConfig(external.foe_maturity);
    // External methods now live alongside internal methods, organized by maturity
    const section = (external.foe_maturity === 'validated' || external.foe_maturity === 'proven') 
      ? 'established' 
      : 'emerging';
    const path = `/docs/field-guides/${guideId}/methods/${section}/${external.method}`;
    const key = `${external.framework}/${external.method}`;

    return (
      <Link key={key} to={path} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>{external.title}</span>
          <div className={styles.badges}>
            <FrameworkBadge 
              framework={external.framework} 
              frameworkTitle={external.frameworkTitle}
              linkToFramework={false}
              size="small"
            />
            <span
              className={styles.badge}
              style={{ backgroundColor: config.bgColor, color: config.color }}
            >
              {config.label}
            </span>
          </div>
        </div>
        {external.description && (
          <p className={styles.cardDescription}>{external.description}</p>
        )}
        {external.observations && external.observations.length > 0 && (
          <div className={styles.cardMeta}>
            {external.observations.length} observation
            {external.observations.length !== 1 ? 's' : ''}
          </div>
        )}
      </Link>
    );
  };

  const hasEstablished = establishedInternal.length > 0 || establishedExternal.length > 0;
  const hasEmerging = emergingInternal.length > 0 || emergingExternal.length > 0;

  return (
    <div className={styles.container}>
      {hasEstablished && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Established Methods</h2>
          <p className={styles.sectionDescription}>
            Methods with strong supporting evidence (Validated or Proven).
          </p>
          <div className={styles.grid}>
            {establishedInternal.map((m) => renderInternalMethodCard(m, 'established'))}
            {establishedExternal.map(renderExternalMethodCard)}
          </div>
        </section>
      )}

      {hasEmerging && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Emerging Methods</h2>
          <p className={styles.sectionDescription}>
            Methods currently being tested (Hypothesized or Experimenting).
          </p>
          <div className={styles.grid}>
            {emergingInternal.map((m) => renderInternalMethodCard(m, 'emerging'))}
            {emergingExternal.map(renderExternalMethodCard)}
          </div>
        </section>
      )}
    </div>
  );
}
