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
 * Extended adopted method with display info
 */
interface AdoptedMethodDisplay extends AdoptedMethod {
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
   * List of native methods to display.
   */
  methods?: Method[];
  /**
   * List of adopted methods from external frameworks.
   */
  adoptedMethods?: AdoptedMethodDisplay[];
}

/**
 * Displays methods grouped by maturity (Established vs Emerging).
 * Established = validated or proven
 * Emerging = hypothesized or experimenting
 * 
 * Includes both native methods and adopted methods from external frameworks.
 */
export default function MethodList({
  guideId,
  methods = [],
  adoptedMethods = [],
}: MethodListProps): React.ReactElement {
  const hasAnyMethods = methods.length > 0 || adoptedMethods.length > 0;
  
  if (!hasAnyMethods) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>No methods available yet.</p>
      </div>
    );
  }

  // Separate native methods by maturity
  const establishedNative = methods.filter(
    (m) => m.maturity === 'validated' || m.maturity === 'proven'
  );
  const emergingNative = methods.filter(
    (m) => m.maturity === 'hypothesized' || m.maturity === 'experimenting'
  );

  // Separate adopted methods by FOE maturity
  const establishedAdopted = adoptedMethods.filter(
    (m) => m.foe_maturity === 'validated' || m.foe_maturity === 'proven'
  );
  const emergingAdopted = adoptedMethods.filter(
    (m) => m.foe_maturity === 'hypothesized' || m.foe_maturity === 'experimenting'
  );

  const renderNativeMethodCard = (method: Method, section: 'established' | 'emerging') => {
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

  const renderAdoptedMethodCard = (adopted: AdoptedMethodDisplay) => {
    const config = getMaturityConfig(adopted.foe_maturity);
    const path = `/docs/external-frameworks/${adopted.framework}/methods/${adopted.method}`;
    const key = `${adopted.framework}/${adopted.method}`;

    return (
      <Link key={key} to={path} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>{adopted.title}</span>
          <div className={styles.badges}>
            <FrameworkBadge 
              framework={adopted.framework} 
              frameworkTitle={adopted.frameworkTitle}
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
        {adopted.description && (
          <p className={styles.cardDescription}>{adopted.description}</p>
        )}
        {adopted.experiments && adopted.experiments.length > 0 && (
          <div className={styles.cardMeta}>
            {adopted.experiments.length} experiment
            {adopted.experiments.length !== 1 ? 's' : ''}
          </div>
        )}
      </Link>
    );
  };

  const hasEstablished = establishedNative.length > 0 || establishedAdopted.length > 0;
  const hasEmerging = emergingNative.length > 0 || emergingAdopted.length > 0;

  return (
    <div className={styles.container}>
      {hasEstablished && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Established Methods</h2>
          <p className={styles.sectionDescription}>
            Methods with strong supporting evidence (Validated or Proven).
          </p>
          <div className={styles.grid}>
            {establishedNative.map((m) => renderNativeMethodCard(m, 'established'))}
            {establishedAdopted.map(renderAdoptedMethodCard)}
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
            {emergingNative.map((m) => renderNativeMethodCard(m, 'emerging'))}
            {emergingAdopted.map(renderAdoptedMethodCard)}
          </div>
        </section>
      )}
    </div>
  );
}
