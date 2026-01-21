import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
  color: string;
};

// SVG Icons for a more professional look
const SearchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
    <path d="M11 8v6"></path>
    <path d="M8 11h6"></path>
  </svg>
);

const LightningIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const FeatureList: FeatureItem[] = [
  {
    title: 'Optimize for Understanding',
    icon: <SearchIcon />,
    color: '#0891b2',
    description: (
      <>
        Reduce cognitive load so developers can see the system clearly and reason about it 
        accurately. When systems are legible, teams can move with confidence instead of 
        relying on heroics and tribal knowledge.
      </>
    ),
  },
  {
    title: 'Optimize for Fast Feedback',
    icon: <LightningIcon />,
    color: '#7c3aed',
    description: (
      <>
        Shorten the path from change to insight. Fast feedback kills guesswork, enables 
        rapid calibration, and ensures teams stay aligned to reality rather than drifting 
        on assumptions.
      </>
    ),
  },
  {
    title: 'Optimize for Confidence',
    icon: <ShieldIcon />,
    color: '#059669',
    description: (
      <>
        Confidence is what makes speed safe. When risk is bounded, visible, and reversible, 
        teams act decisively. Guardrails—not handcuffs—enable autonomy within a safe frame.
      </>
    ),
  },
];

function Feature({title, icon, description, color}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard} style={{'--feature-color': color} as React.CSSProperties}>
        <div className={styles.featureIconWrapper}>
          <span className={styles.featureIcon}>{icon}</span>
        </div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            The Three Optimizations
          </Heading>
          <p className={styles.sectionSubtitle}>
            Every practice in FOE exists to serve one of these three goals. No exceptions.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
