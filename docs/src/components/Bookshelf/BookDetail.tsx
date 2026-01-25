import React, { useEffect } from 'react';
import { Category, BookItem, getCoverUrl } from './data';
import styles from './styles.module.css';

interface BookDetailProps {
  book: BookItem | null;
  category: Category | null;
  onClose: () => void;
}

// External link icon
const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Close icon
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// DORA icon for modal
const DoraIconLarge = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: '70%', height: 'auto' }}>
    <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.15"/>
    <g stroke="white" strokeWidth="3" strokeLinecap="round">
      <rect x="18" y="60" width="12" height="20" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="34" y="48" width="12" height="32" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="50" y="36" width="12" height="44" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="66" y="24" width="12" height="56" rx="2" fill="white" fillOpacity="0.9"/>
    </g>
    <path d="M22 18 L78 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6"/>
    <path d="M70 12 L78 18 L70 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeOpacity="0.6"/>
    <text x="50" y="92" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="700" letterSpacing="2">DORA</text>
  </svg>
);

// Four Keys icon for modal
const FourKeysIconLarge = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: '70%', height: 'auto' }}>
    <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.15"/>
    <g fill="white" fillOpacity="0.9">
      <g transform="translate(20, 22)">
        <circle cx="10" cy="8" r="7" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="8" y="15" width="4" height="14" rx="1"/>
        <rect x="12" y="22" width="6" height="3" rx="1"/>
      </g>
      <g transform="translate(55, 22)">
        <circle cx="10" cy="8" r="7" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="8" y="15" width="4" height="14" rx="1"/>
        <rect x="12" y="22" width="6" height="3" rx="1"/>
      </g>
      <g transform="translate(20, 55)">
        <circle cx="10" cy="8" r="7" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="8" y="15" width="4" height="14" rx="1"/>
        <rect x="12" y="22" width="6" height="3" rx="1"/>
      </g>
      <g transform="translate(55, 55)">
        <circle cx="10" cy="8" r="7" stroke="white" strokeWidth="2" fill="none"/>
        <rect x="8" y="15" width="4" height="14" rx="1"/>
        <rect x="12" y="22" width="6" height="3" rx="1"/>
      </g>
    </g>
    <circle cx="50" cy="50" r="10" fill="white"/>
    <text x="50" y="54" textAnchor="middle" fill="#1e40af" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700">4</text>
  </svg>
);

// Hexagonal Architecture icon for modal
const HexagonalIconLarge = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: '70%', height: 'auto' }}>
    <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.15"/>
    {/* Main hexagon */}
    <polygon 
      points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" 
      stroke="white" 
      strokeWidth="3" 
      fill="white" 
      fillOpacity="0.2"
    />
    {/* Inner hexagon (core) */}
    <polygon 
      points="50,30 65,40 65,60 50,70 35,60 35,40" 
      stroke="white" 
      strokeWidth="2" 
      fill="white" 
      fillOpacity="0.9"
    />
    {/* Ports - small circles on edges */}
    <circle cx="50" cy="15" r="4" fill="white"/>
    <circle cx="80" cy="32.5" r="4" fill="white"/>
    <circle cx="80" cy="67.5" r="4" fill="white"/>
    <circle cx="50" cy="85" r="4" fill="white"/>
    <circle cx="20" cy="67.5" r="4" fill="white"/>
    <circle cx="20" cy="32.5" r="4" fill="white"/>
  </svg>
);

// 12 Factor App icon for modal
const TwelveFactorIconLarge = () => (
  <svg viewBox="0 0 100 100" fill="none" style={{ width: '70%', height: 'auto' }}>
    <circle cx="50" cy="50" r="45" fill="white" fillOpacity="0.15"/>
    {/* 12 factors as a 4x3 grid of circles */}
    <g fill="white" fillOpacity="0.9">
      {/* Row 1 */}
      <circle cx="28" cy="30" r="6"/>
      <circle cx="44" cy="30" r="6"/>
      <circle cx="60" cy="30" r="6"/>
      <circle cx="76" cy="30" r="6"/>
      {/* Row 2 */}
      <circle cx="28" cy="50" r="6"/>
      <circle cx="44" cy="50" r="6"/>
      <circle cx="60" cy="50" r="6"/>
      <circle cx="76" cy="50" r="6"/>
      {/* Row 3 */}
      <circle cx="28" cy="70" r="6"/>
      <circle cx="44" cy="70" r="6"/>
      <circle cx="60" cy="70" r="6"/>
      <circle cx="76" cy="70" r="6"/>
    </g>
    <text x="50" y="92" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="700" letterSpacing="1">12 FACTOR</text>
  </svg>
);

// Get the appropriate icon for a resource
function getResourceIcon(bookId: string) {
  switch (bookId) {
    case 'dora':
      return <DoraIconLarge />;
    case 'four-keys':
      return <FourKeysIconLarge />;
    case 'hexagonal-architecture':
      return <HexagonalIconLarge />;
    case 'twelve-factor':
      return <TwelveFactorIconLarge />;
    default:
      return null;
  }
}

export default function BookDetail({ book, category, onClose }: BookDetailProps) {
  const isVisible = book !== null && category !== null;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isVisible, onClose]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!book || !category) {
    return null;
  }

  const coverSrc = book.coverId 
    ? getCoverUrl(book.coverId, 'L')
    : null;

  const resourceIcon = book.type === 'resource' ? getResourceIcon(book.id) : null;

  return (
    <div 
      className={`${styles.modalOverlay} ${isVisible ? styles.modalOverlayVisible : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        <button 
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        <div className={styles.modalHeader}>
          {resourceIcon ? (
            <div 
              className={styles.modalCover} 
              style={{ 
                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              {resourceIcon}
            </div>
          ) : (
            <img
              src={coverSrc}
              alt={`${book.title} cover`}
              className={styles.modalCover}
            />
          )}
          
          <div className={styles.modalInfo}>
            <h2 id="modal-title" className={styles.modalTitle}>{book.title}</h2>
            <p className={styles.modalAuthor}>{book.author}</p>
            
            <div className={styles.modalMeta}>
              <span className={`${styles.modalBadge} ${styles.modalBadgeType}`}>
                {book.type === 'resource' ? 'Resource' : 'Book'}
              </span>
              <span 
                className={`${styles.modalBadge} ${styles.modalBadgeCategory}`}
                style={{ backgroundColor: category.color }}
              >
                {category.title}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modalSection}>
            <h3 className={styles.modalSectionTitle}>FOE Relevance</h3>
            <p className={styles.modalRelevance}>{book.foeRelevance}</p>
          </div>
        </div>

        <div className={styles.modalActions}>
          <a 
            href={book.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
          >
            <ExternalLinkIcon />
            {book.type === 'resource' ? 'Visit Resource' : 'View on Open Library'}
          </a>
          <button
            onClick={onClose}
            className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
