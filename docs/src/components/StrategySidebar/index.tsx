import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import type { Owner } from '../AccordionSection';
import styles from './styles.module.css';

interface Section {
  id: string;
  number: number;
  title: string;
  owner?: Owner;
}

interface StrategySidebarProps {
  sections: Section[];
  topContent?: ReactNode;
}

const ownerIcons: Record<Owner, ReactNode> = {
  ric: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  prima: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  shared: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

export default function StrategySidebar({ sections, topContent }: StrategySidebarProps): ReactNode {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [isOpen, setIsOpen] = useState(false);

  // Scroll spy - detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(id);
      }
    },
    [scrollToSection]
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
        type="button"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
        <span>Sections</span>
      </button>

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Strategy Sections</span>
        </div>
        {topContent && (
          <div className={styles.topContent}>
            {topContent}
          </div>
        )}
        <ul className={styles.sectionList}>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={`${styles.sectionLink} ${
                  activeSection === section.id ? styles.sectionLinkActive : ''
                }`}
                onClick={() => scrollToSection(section.id)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
                type="button"
              >
                <span className={styles.sectionNumber}>
                  {section.number.toString().padStart(2, '0')}
                </span>
                <span className={styles.sectionTitle}>{section.title}</span>
                {section.owner && (
                  <span className={styles.sectionOwner}>{ownerIcons[section.owner]}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendTitle}>Ownership</span>
          <div className={styles.legendItems}>
            <span className={styles.legendItem}>
              {ownerIcons.ric}
              <span>Enablement</span>
            </span>
            <span className={styles.legendItem}>
              {ownerIcons.prima}
              <span>Prima</span>
            </span>
            <span className={styles.legendItem}>
              {ownerIcons.shared}
              <span>Shared</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
