import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  color: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Optimize for Understanding',
    icon: '🔍',
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
    icon: '⚡',
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
    icon: '🛡️',
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
        <div className={styles.featureIcon}>{icon}</div>
        <div className="padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center" style={{marginBottom: '2rem'}}>
          The Three Optimizations
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
