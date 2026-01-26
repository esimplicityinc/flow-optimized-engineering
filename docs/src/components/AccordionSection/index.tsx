import type { ReactNode } from 'react';
import { useState, useCallback } from 'react';
import styles from './styles.module.css';

export type Owner = 'ric' | 'prima' | 'shared';

interface AccordionSectionProps {
  id: string;
  number: number;
  title: string;
  owner?: Owner;
  executiveSummary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

const ownerIcons: Record<Owner, { icon: ReactNode; label: string }> = {
  ric: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
    label: 'RIC',
  },
  prima: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    label: 'Prima',
  },
  shared: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    label: 'Shared',
  },
};

export default function AccordionSection({
  id,
  number,
  title,
  owner,
  executiveSummary,
  children,
  defaultOpen = false,
}: AccordionSectionProps): ReactNode {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <section id={id} className={styles.section}>
      <div
        className={styles.header}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <div className={styles.headerLeft}>
          <span className={styles.number}>{number.toString().padStart(2, '0')}</span>
          <h2 className={styles.title}>{title}</h2>
          {owner && (
            <span className={styles.ownerBadge} title={ownerIcons[owner].label}>
              {ownerIcons[owner].icon}
            </span>
          )}
        </div>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <div className={styles.summary}>{executiveSummary}</div>

      <div
        id={`${id}-content`}
        className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>

      {!isOpen && (
        <button className={styles.expandButton} onClick={toggle} type="button">
          <span>Expand for details</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </section>
  );
}
