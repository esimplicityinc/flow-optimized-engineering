import React from 'react';
import {
  MaturityLevel,
  MATURITY_LEVELS,
  calculateAverageMaturity,
  getMaturityLevelFromAverage,
  getMaturityConfig,
  formatMaturityScore,
  calculateMaturityPercentage,
} from '@site/src/lib/fieldGuides';
import styles from './styles.module.css';

interface MethodSummary {
  maturity: MaturityLevel;
}

interface GuideMaturitySummaryProps {
  /**
   * The guide ID (folder name). Currently used for display.
   */
  guideId: string;
  /**
   * List of methods with their maturity levels.
   * In the future, this could be auto-populated based on guideId.
   */
  methods?: MethodSummary[];
}

/**
 * Displays the overall maturity summary for a guide.
 * Shows the calculated maturity level, score, progress bar, and method distribution.
 */
export default function GuideMaturitySummary({
  guideId,
  methods,
}: GuideMaturitySummaryProps): React.ReactElement {
  // If no methods provided, show placeholder
  if (!methods || methods.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Guide Maturity</span>
          <span className={styles.pending}>Pending - No methods yet</span>
        </div>
        <p className={styles.empty}>
          Add methods to this guide to see maturity tracking.
        </p>
      </div>
    );
  }

  const maturityLevels = methods.map((m) => m.maturity);
  const average = calculateAverageMaturity(maturityLevels);
  const overallLevel = getMaturityLevelFromAverage(average);
  const config = getMaturityConfig(overallLevel);
  const percentage = calculateMaturityPercentage(average);

  // Count methods by maturity level
  const distribution = maturityLevels.reduce(
    (acc, level) => {
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    },
    {} as Record<MaturityLevel, number>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>Guide Maturity:</span>
        <span
          className={styles.level}
          style={{ backgroundColor: config.bgColor, color: config.color }}
        >
          {config.label}
        </span>
        <span className={styles.score}>{formatMaturityScore(average)}</span>
      </div>

      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${percentage}%`,
            backgroundColor: config.color,
          }}
        />
      </div>

      <div className={styles.distribution}>
        {(Object.keys(MATURITY_LEVELS) as MaturityLevel[]).map((level) => {
          const levelConfig = MATURITY_LEVELS[level];
          const count = distribution[level] || 0;
          return (
            <div key={level} className={styles.distributionItem}>
              <span
                className={styles.distributionDot}
                style={{ backgroundColor: levelConfig.color }}
              />
              <span className={styles.distributionLabel}>
                {levelConfig.label}
              </span>
              <span className={styles.distributionCount}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
