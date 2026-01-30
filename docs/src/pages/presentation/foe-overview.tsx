import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * FOE Overview Presentation
 * 
 * A 40-slide presentation explaining Flow Optimized Engineering
 * at progressively deeper levels.
 * 
 * Keyboard shortcuts:
 * - Arrow keys: Navigate slides
 * - Space: Next slide
 * - S: Open speaker notes
 * - O: Overview mode
 * - F: Fullscreen
 * - Esc: Exit overview/fullscreen
 * - ?: Show help
 */

// ============================================
// PAGE COMPONENT
// ============================================

export default function FOEOverviewPresentation() {
  return (
    <Layout
      title="FOE Presentation"
      description="A comprehensive presentation explaining Flow Optimized Engineering"
    >
      <Head>
        <meta name="robots" content="noindex" />
        <style>{`
          .footer, .theme-doc-sidebar-container, .pagination-nav {
            display: none !important;
          }
          .main-wrapper {
            padding: 0 !important;
            margin: 0 !important;
          }
        `}</style>
      </Head>
      <BrowserOnly fallback={<div style={{ minHeight: '100vh', background: '#0F172A' }} />}>
        {() => {
          const { Presentation } = require('../../components/Presentation');
          return <Presentation />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
