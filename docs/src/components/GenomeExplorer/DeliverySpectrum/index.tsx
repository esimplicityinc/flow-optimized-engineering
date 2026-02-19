/**
 * DeliverySpectrum
 * 
 * Bridge section explaining the human-to-system delivery concept.
 * Shows how each capability gene can be delivered manually (slow) or
 * automatically (fast), and how FOE maturity drives the shift.
 * 
 * Designed to appear before the Permission Circuit so users
 * understand what the hexagon border colors mean.
 */

import React from 'react';
import styles from './styles.module.css';

const SPECTRUM_COLUMNS = [
  {
    id: 'manual',
    label: 'Manual Delivery',
    color: '#F59E0B',
    speed: 'Days to weeks',
    scales: 'No — every cycle needs a person',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    color: '#84CC16',
    speed: 'Hours to days',
    scales: 'Partially — systems assist humans',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'automated',
    label: 'Automated Delivery',
    color: '#06B6D4',
    speed: 'Minutes to hours',
    scales: 'Yes — evidence generated on every commit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
];

const DOMAIN_EXAMPLES = [
  {
    domain: 'Product',
    color: '#3B82F6',
    gene: 'Discovery',
    manual: 'Stakeholder interviews distilled into slide decks over weeks',
    automated: 'Usage telemetry and hypothesis validation pipelines producing insight continuously',
  },
  {
    domain: 'Education',
    color: '#10B981',
    gene: 'Communication',
    manual: 'Weekly status meetings and hand-written reports',
    automated: 'Living dashboards generated from CI data, updated on every merge',
  },
  {
    domain: 'Systems',
    color: '#8B5CF6',
    gene: 'Verification',
    manual: 'QA team manually executes test plans before each release',
    automated: 'CI pipeline generates compliance evidence on every commit',
  },
];

function DeliverySpectrum(): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>How Capabilities Are Delivered</h2>
        <p className={styles.subtitle}>
          Every capability gene is delivered by humans, systems, or a blend of both.
          FOE maturity shifts delivery from slow manual processes toward fast automated evidence.
        </p>
      </div>

      {/* Spectrum columns */}
      <div className={styles.spectrum}>
        {SPECTRUM_COLUMNS.map((col) => (
          <div key={col.id} className={styles.spectrumCard}>
            <div className={styles.spectrumIcon} style={{ color: col.color }}>
              {col.icon}
            </div>
            <h3 className={styles.spectrumLabel} style={{ color: col.color }}>
              {col.label}
            </h3>
            <div className={styles.spectrumDetail}>
              <span className={styles.detailLabel}>Cycle time</span>
              <span className={styles.detailValue}>{col.speed}</span>
            </div>
            <div className={styles.spectrumDetail}>
              <span className={styles.detailLabel}>Scales with AI?</span>
              <span className={styles.detailValue}>{col.scales}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient bar */}
      <div className={styles.gradientBarWrapper}>
        <div className={styles.gradientBar} />
        <div className={styles.gradientLabels}>
          <span style={{ color: '#F59E0B' }}>Slow</span>
          <span className={styles.gradientCenter}>FOE maturity drives the shift</span>
          <span style={{ color: '#06B6D4' }}>Fast</span>
        </div>
      </div>

      {/* Domain examples */}
      <div className={styles.examples}>
        <h3 className={styles.examplesTitle}>What the shift looks like in practice</h3>
        {DOMAIN_EXAMPLES.map((ex) => (
          <div key={ex.gene} className={styles.exampleRow}>
            <div className={styles.exampleDomain}>
              <span className={styles.domainDot} style={{ background: ex.color }} />
              <span className={styles.domainName}>{ex.gene}</span>
              <span className={styles.domainTag}>{ex.domain}</span>
            </div>
            <div className={styles.exampleComparison}>
              <div className={styles.exampleSide}>
                <span className={styles.exampleModeLabel} style={{ color: '#F59E0B' }}>Manual</span>
                <p className={styles.exampleText}>{ex.manual}</p>
              </div>
              <div className={styles.exampleArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div className={styles.exampleSide}>
                <span className={styles.exampleModeLabel} style={{ color: '#06B6D4' }}>Automated</span>
                <p className={styles.exampleText}>{ex.automated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Callout linking to the circuit below */}
      <div className={styles.callout}>
        <p>
          In the circuit below, gene border colors show where each gene sits on this spectrum.
          Slide <strong>FOE Maturity</strong> to watch delivery shift from
          <span className={styles.manualHighlight}> orange</span> (manual) to
          <span className={styles.autoHighlight}> cyan</span> (automated).
        </p>
      </div>
    </div>
  );
}

export default DeliverySpectrum;
export { DeliverySpectrum };
