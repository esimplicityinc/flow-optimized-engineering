import React from 'react';
import { Category, BookItem, getCoverUrl } from './data';
import styles from './styles.module.css';

interface BookShelfProps {
  categories: Category[];
  onShowDetail: (book: BookItem, category: Category) => void;
}

// External link icon
const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// DORA icon - small version for shelf
const DoraIconSmall = () => (
  <svg viewBox="0 0 100 100" fill="none" className={styles.resourceIconShelf}>
    <g stroke="white" strokeWidth="4" strokeLinecap="round">
      <rect x="15" y="55" width="15" height="25" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="35" y="40" width="15" height="40" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="55" y="25" width="15" height="55" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="75" y="10" width="15" height="70" rx="2" fill="white" fillOpacity="0.9"/>
    </g>
  </svg>
);

// Four Keys icon - small version for shelf  
const FourKeysIconSmall = () => (
  <svg viewBox="0 0 100 100" fill="none" className={styles.resourceIconShelf}>
    <circle cx="50" cy="50" r="35" fill="white" fillOpacity="0.2"/>
    <circle cx="50" cy="50" r="18" fill="white"/>
    <text x="50" y="57" textAnchor="middle" fill="#1e40af" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="700">4</text>
  </svg>
);

// Get the appropriate icon for a resource
function getResourceIcon(bookId: string) {
  switch (bookId) {
    case 'dora':
      return <DoraIconSmall />;
    case 'four-keys':
      return <FourKeysIconSmall />;
    default:
      return null;
  }
}

interface ShelfBookProps {
  book: BookItem;
  category: Category;
  onShowDetail: (book: BookItem, category: Category) => void;
}

function ShelfBook({ book, category, onShowDetail }: ShelfBookProps) {
  const coverSrc = book.coverId 
    ? getCoverUrl(book.coverId, 'M')
    : null;

  const handleDetailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowDetail(book, category);
  };

  const resourceIcon = book.type === 'resource' ? getResourceIcon(book.id) : null;

  return (
    <div className={styles.shelfBook}>
      <div 
        className={styles.shelfBookSpine}
        style={resourceIcon ? { background: category.color } : {}}
      >
        {resourceIcon ? (
          <div className={styles.resourceCoverShelf}>
            {resourceIcon}
          </div>
        ) : (
          <img
            src={coverSrc}
            alt={`${book.title} cover`}
            className={styles.shelfBookCover}
            loading="lazy"
          />
        )}
        <span className={styles.shelfBookTitle}>
          {book.title.length > 30 ? book.title.substring(0, 27) + '...' : book.title}
        </span>
      </div>
      
      {/* Tooltip on hover */}
      <div className={styles.shelfTooltip}>
        <h4 className={styles.shelfTooltipTitle}>{book.title}</h4>
        <p className={styles.shelfTooltipAuthor}>{book.author}</p>
        <div className={styles.shelfTooltipActions}>
          <a 
            href={book.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shelfTooltipButton} ${styles.shelfTooltipButtonPrimary}`}
          >
            Open <ExternalLinkIcon />
          </a>
          <button
            onClick={handleDetailClick}
            className={`${styles.shelfTooltipButton} ${styles.shelfTooltipButtonSecondary}`}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookShelf({ categories, onShowDetail }: BookShelfProps) {
  return (
    <div className={styles.shelfContainer}>
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
          
          <div className={styles.shelf}>
            <div className={styles.shelfBooks}>
              {category.items.map((book) => (
                <ShelfBook
                  key={book.id}
                  book={book}
                  category={category}
                  onShowDetail={onShowDetail}
                />
              ))}
            </div>
            <div className={styles.shelfWood} />
          </div>
        </section>
      ))}
    </div>
  );
}
