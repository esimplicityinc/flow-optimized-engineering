import React, { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function AccordionItem({ id, title, children, isOpen, onToggle }: AccordionItemProps): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.accordionHeader}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        type="button"
      >
        <span className={styles.accordionIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
        <span className={styles.accordionTitle}>{title}</span>
      </button>
      <div
        id={`accordion-content-${id}`}
        className={styles.accordionContent}
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className={styles.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionGroupProps {
  children: ReactNode;
  allowMultiple?: boolean;
}

export function AccordionGroup({ children, allowMultiple = false }: AccordionGroupProps): ReactNode {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const handleToggle = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  // Clone children and inject isOpen and onToggle props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === AccordionItem) {
      const itemId = (child.props as { id: string }).id;
      return React.cloneElement(child as React.ReactElement<AccordionItemProps>, {
        isOpen: openItems.has(itemId),
        onToggle: handleToggle,
      });
    }
    return child;
  });

  return <div className={styles.accordionGroup}>{enhancedChildren}</div>;
}

// Simple standalone accordion for single items
interface SimpleAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function SimpleAccordion({ title, children, defaultOpen = false }: SimpleAccordionProps): ReactNode {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={`${styles.accordionItem} ${styles.standalone} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.accordionHeader}
        onClick={handleToggle}
        aria-expanded={isOpen}
        type="button"
      >
        <span className={styles.accordionIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
        <span className={styles.accordionTitle}>{title}</span>
      </button>
      <div
        className={styles.accordionContent}
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className={styles.accordionInner}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionGroup;
