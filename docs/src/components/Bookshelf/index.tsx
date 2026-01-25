import React, { useState } from 'react';
import { categories, totalItemCount, BookItem, Category } from './data';
import BookGrid from './BookGrid';
import BookShelf from './BookShelf';
import BookCards from './BookCards';
import BookDetail from './BookDetail';
import styles from './styles.module.css';

type ViewMode = 'grid' | 'shelf' | 'cards';

// View icons
const GridIcon = () => (
  <svg className={styles.viewButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ShelfIcon = () => (
  <svg className={styles.viewButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19h16" />
    <path d="M4 11h16" />
    <rect x="6" y="12" width="3" height="6" rx="0.5" />
    <rect x="10" y="13" width="3" height="5" rx="0.5" />
    <rect x="14" y="12" width="3" height="6" rx="0.5" />
    <rect x="6" y="4" width="3" height="6" rx="0.5" />
    <rect x="10" y="5" width="3" height="5" rx="0.5" />
    <rect x="14" y="4" width="3" height="6" rx="0.5" />
  </svg>
);

const CardsIcon = () => (
  <svg className={styles.viewButtonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="5" rx="1" />
    <rect x="3" y="11" width="18" height="5" rx="1" />
    <rect x="3" y="18" width="18" height="5" rx="1" />
  </svg>
);

// Book icon for title
const BookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
  </svg>
);

interface BookshelfProps {
  defaultView?: ViewMode;
}

export default function Bookshelf({ defaultView = 'grid' }: BookshelfProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleShowDetail = (book: BookItem, category: Category) => {
    setSelectedBook(book);
    setSelectedCategory(category);
  };

  const handleCloseDetail = () => {
    setSelectedBook(null);
    setSelectedCategory(null);
  };

  const categoryCount = categories.length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h2 className={styles.title}>
              <BookIcon />
              FOE Bookshelf
            </h2>
            <p className={styles.subtitle}>
              Core reference materials that inform Flow Optimized Engineering principles—
              from behavioral economics to DevOps research.
            </p>
          </div>
          
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : ''}`}
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              title="Grid view"
            >
              <GridIcon />
              Grid
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'shelf' ? styles.viewButtonActive : ''}`}
              onClick={() => setViewMode('shelf')}
              aria-pressed={viewMode === 'shelf'}
              title="Shelf view"
            >
              <ShelfIcon />
              Shelf
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'cards' ? styles.viewButtonActive : ''}`}
              onClick={() => setViewMode('cards')}
              aria-pressed={viewMode === 'cards'}
              title="Cards view"
            >
              <CardsIcon />
              Cards
            </button>
          </div>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <span className={styles.statNumber}>{totalItemCount}</span> items
          </span>
          <span className={styles.stat}>
            <span className={styles.statNumber}>{categoryCount}</span> categories
          </span>
          <span className={styles.stat}>
            covering <span className={styles.statNumber}>3</span> FOE pillars
          </span>
        </div>
      </header>

      {viewMode === 'grid' && (
        <BookGrid categories={categories} onShowDetail={handleShowDetail} />
      )}
      
      {viewMode === 'shelf' && (
        <BookShelf categories={categories} onShowDetail={handleShowDetail} />
      )}
      
      {viewMode === 'cards' && (
        <BookCards categories={categories} onShowDetail={handleShowDetail} />
      )}

      <BookDetail
        book={selectedBook}
        category={selectedCategory}
        onClose={handleCloseDetail}
      />
    </div>
  );
}
