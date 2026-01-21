import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Flow Optimized Engineering',
  tagline: 'Speed with Coherence: A Delivery Doctrine for the Agentic Era',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true,
      },
    ],
  ],

  url: 'https://esimplicityinc.github.io',
  baseUrl: '/flow-optimized-engineering/',

  organizationName: 'esimplicityinc',
  projectName: 'flow-optimized-engineering',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/foe-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Flow Optimized Engineering',
      logo: {
        alt: 'FOE Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/intro/what-is-foe',
          label: 'Get Started',
          position: 'left',
        },
        {
          to: '/docs/playbook/overview',
          label: 'Playbook',
          position: 'left',
        },
        {
          to: '/docs/maturity-model/overview',
          label: 'Maturity Model',
          position: 'left',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/esimplicityinc/flow-optimized-engineering',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'What is FOE?',
              to: '/docs/intro/what-is-foe',
            },
            {
              label: 'Core Principles',
              to: '/docs/principles/overview',
            },
            {
              label: 'Transformation Model',
              to: '/docs/transformation-model/overview',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'For Executives',
              to: '/docs/stakeholder-guides/for-executives',
            },
            {
              label: 'For Engineers',
              to: '/docs/stakeholder-guides/for-engineers',
            },
            {
              label: 'For Government Customers',
              to: '/docs/stakeholder-guides/for-government-customers',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Playbook',
              to: '/docs/playbook/overview',
            },
            {
              label: 'Maturity Model',
              to: '/docs/maturity-model/overview',
            },
            {
              label: 'Implementation Guide',
              to: '/docs/implementation/getting-started',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Flow Optimized Engineering. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
