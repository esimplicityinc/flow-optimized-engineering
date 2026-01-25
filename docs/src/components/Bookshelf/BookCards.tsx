import React from 'react';
import { Category, BookItem, getCoverUrl } from './data';
import styles from './styles.module.css';

interface BookCardsProps {
  categories: Category[];
  onShowDetail: (book: BookItem, category: Category) => void;
}

// External link icon
const ExternalLinkIcon = () => (
  <svg className={styles.cardButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Info icon
const InfoIcon = () => (
  <svg className={styles.cardButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// DORA icon - metrics/chart visualization
const DoraIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className={styles.resourceIcon}>
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

// Four Keys icon - 4 keys in grid
const FourKeysIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className={styles.resourceIcon}>
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
    <g stroke="white" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 2">
      <line x1="38" y1="30" x2="55" y2="30"/>
      <line x1="38" y1="63" x2="55" y2="63"/>
      <line x1="30" y1="44" x2="30" y2="55"/>
      <line x1="65" y1="44" x2="65" y2="55"/>
    </g>
    <circle cx="50" cy="50" r="10" fill="white"/>
    <text x="50" y="54" textAnchor="middle" fill="#1e40af" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700">4</text>
  </svg>
);

interface BookCardProps {
  book: BookItem;
  category: Category;
  onShowDetail: (book: BookItem, category: Category) => void;
}

// Get the appropriate icon for a resource
function getResourceIcon(bookId: string) {
  switch (bookId) {
    case 'dora':
      return <DoraIcon />;
    case 'four-keys':
      return <FourKeysIcon />;
    default:
      return null;
  }
}

function BookCard({ book, category, onShowDetail }: BookCardProps) {
  const coverSrc = book.coverId 
    ? getCoverUrl(book.coverId, 'M')
    : null;

  const handleDetailClick = () => {
    onShowDetail(book, category);
  };

  const resourceIcon = book.type === 'resource' ? getResourceIcon(book.id) : null;

  return (
    <article className={styles.card}>
      <div className={styles.cardCoverWrapper}>
        {resourceIcon ? (
          <div className={styles.resourceCover} style={{ background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)` }}>
            {resourceIcon}
          </div>
        ) : (
          <img
            src={coverSrc}
            alt={`${book.title} cover`}
            className={styles.cardCover}
            loading="lazy"
          />
        )}
      </div>
      
      <div className={styles.cardContent}>
        <header className={styles.cardHeader}>
          <div>
            <h4 className={styles.cardTitle}>{book.title}</h4>
            <p className={styles.cardAuthor}>{book.author}</p>
          </div>
          <span className={styles.cardTypeBadge}>
            {book.type === 'resource' ? 'Resource' : 'Book'}
          </span>
        </header>
        
        <p className={styles.cardRelevance}>{book.foeRelevance}</p>
        
        <div className={styles.cardActions}>
          <a 
            href={book.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
          >
            <ExternalLinkIcon />
            Open
          </a>
          <button
            onClick={handleDetailClick}
            className={`${styles.cardButton} ${styles.cardButtonSecondary}`}
          >
            <InfoIcon />
            Full Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function BookCards({ categories, onShowDetail }: BookCardsProps) {
  return (
    <>
      {categories.map((category) => (
        <section key={category.id} className={styles.category}>
          <header className={styles.categoryHeader}>
            <h3 className={styles.categoryTitle}>
              <span 
                className={styles.categoryDot} 
                style={{ backgroundColor: category.color }}
              />
              {category.title}
            </h3>
            <p className={styles.categorySubtitle}>{category.subtitle}</p>
          </header>
          
          <div className={styles.cards}>
            {category.items.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                category={category}
                onShowDetail={onShowDetail}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
