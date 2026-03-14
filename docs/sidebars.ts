import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  fieldGuideSidebar: [
    {
      type: 'html',
      value: '<a href="/flow-optimized-engineering/docs/intro" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; margin: 0 0 0.5rem 0; color: var(--ifm-color-primary); font-size: 0.875rem; text-decoration: none; border-radius: 4px; background: var(--ifm-color-emphasis-100);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Back to Main Docs</a>',
    },
    {
      type: 'doc',
      id: 'field-guides/overview',
      label: 'Field Guides Overview',
    },
    {
      type: 'html',
      value: '<div style="margin: 1rem 0 0.5rem 0.75rem; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ifm-color-emphasis-600);">Guides</div>',
    },
    {
      type: 'category',
      label: 'Agentic Coding',
      className: 'sidebar-icon-agentic',
      link: {
        type: 'doc',
        id: 'field-guides/agentic-coding/overview',
      },
      items: [
        {
          type: 'category',
          label: 'Internal',
          collapsed: true,
          items: [
            'field-guides/agentic-coding/methods/established/M158-agentx-constrained-autonomy',
            'field-guides/agentic-coding/methods/established/M154-conceptual-debt-prevention',
            'field-guides/agentic-coding/methods/emerging/M146-early-feedback-loop-investment',
            'field-guides/agentic-coding/methods/emerging/M147-knowledge-distribution-as-reliability',
            'field-guides/agentic-coding/methods/established/M155-verification-before-completion',
            'field-guides/agentic-coding/methods/emerging/M152-test-driven-agent-development',
            'field-guides/agentic-coding/methods/emerging/M159-use-governed-ai-coding-agents',
            'field-guides/agentic-coding/methods/emerging/M160-plan-mode-first',
            'field-guides/agentic-coding/methods/emerging/M161-explicit-mcp-version-control',
            'field-guides/agentic-coding/methods/emerging/M162-worktree-based-agent-isolation',
            'field-guides/agentic-coding/methods/emerging/M156-agent-mediated-access',
            'field-guides/agentic-coding/methods/emerging/M148-persistent-planning-state',
            'field-guides/agentic-coding/methods/emerging/M149-root-cause-first-debugging',
          ],
        },
        {
          type: 'category',
          label: 'BDD',
          collapsed: true,
          items: [
            'field-guides/agentic-coding/methods/established/M121-executable-specifications',
            'field-guides/agentic-coding/methods/established/M127-given-when-then',
            'field-guides/agentic-coding/methods/emerging/M126-gherkin',
          ],
        },
        {
          type: 'category',
          label: 'DORA',
          collapsed: true,
          items: [
            'field-guides/agentic-coding/methods/emerging/M111-deployment-frequency',
            'field-guides/agentic-coding/methods/emerging/M130-lead-time-for-changes',
          ],
        },
        {
          type: 'category',
          label: 'Team Topologies',
          collapsed: true,
          items: [
            'field-guides/agentic-coding/methods/emerging/M124-fast-flow',
            'field-guides/agentic-coding/methods/emerging/M118-enabling-team',
            'field-guides/agentic-coding/methods/emerging/M136-team-cognitive-load',
          ],
        },
        {
          type: 'category',
          label: 'Continuous Delivery',
          collapsed: true,
          items: [
            'field-guides/agentic-coding/methods/emerging/M112-deployment-pipeline',
            'field-guides/agentic-coding/methods/emerging/M140-trunk-based-development',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'System Architecture',
      className: 'sidebar-icon-architecture',
      link: {
        type: 'doc',
        id: 'field-guides/system-architecture/overview',
      },
      items: [
        {
          type: 'category',
          label: 'Internal',
          collapsed: true,
          items: [
            'field-guides/system-architecture/methods/established/M153-true-microservices',
            'field-guides/system-architecture/methods/established/M145-consumer-contract-testing',
            'field-guides/system-architecture/methods/emerging/M151-system-over-individuals',
            'field-guides/system-architecture/methods/emerging/M150-service-boundary-extraction',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Software Architecture',
      className: 'sidebar-icon-software-architecture',
      link: {
        type: 'doc',
        id: 'field-guides/software-architecture/overview',
      },
      items: [
        {
          type: 'category',
          label: 'Layered Architecture',
          collapsed: true,
          items: [
            'field-guides/software-architecture/methods/established/M209-layer-responsibility-definition',
            'field-guides/software-architecture/methods/established/M210-dependency-direction-enforcement',
            'field-guides/software-architecture/methods/established/M211-inter-layer-interface-design',
            'field-guides/software-architecture/methods/established/M212-data-transfer-object-pattern',
            'field-guides/software-architecture/methods/established/M213-repository-pattern',
            'field-guides/software-architecture/methods/established/M214-service-layer-pattern',
            'field-guides/software-architecture/methods/established/M215-layer-isolation-testing',
          ],
        },
        {
          type: 'category',
          label: 'DDD',
          collapsed: true,
          items: [
            'field-guides/software-architecture/methods/emerging/M103-bounded-context',
            'field-guides/software-architecture/methods/emerging/M108-context-mapping',
            'field-guides/software-architecture/methods/emerging/M134-subdomains',
            'field-guides/software-architecture/methods/emerging/M100-aggregate',
            'field-guides/software-architecture/methods/emerging/M119-entity',
            'field-guides/software-architecture/methods/emerging/M143-value-object',
            'field-guides/software-architecture/methods/emerging/M132-repository',
            'field-guides/software-architecture/methods/emerging/M101-application-service',
            'field-guides/software-architecture/methods/emerging/M117-domain-service',
            'field-guides/software-architecture/methods/emerging/M116-domain-event',
          ],
        },
        {
          type: 'category',
          label: 'Event Sourcing',
          collapsed: true,
          items: [
            'field-guides/software-architecture/methods/emerging/M240-domain-event-modeling',
            'field-guides/software-architecture/methods/emerging/M241-event-stream-storage',
            'field-guides/software-architecture/methods/emerging/M242-state-reconstruction',
            'field-guides/software-architecture/methods/emerging/M243-projection-building',
            'field-guides/software-architecture/methods/emerging/M244-snapshotting',
            'field-guides/software-architecture/methods/emerging/M245-event-versioning',
            'field-guides/software-architecture/methods/emerging/M246-temporal-queries',
            'field-guides/software-architecture/methods/emerging/M247-event-replay',
            'field-guides/software-architecture/methods/emerging/M248-cqrs-integration',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      className: 'sidebar-icon-testing',
      link: {
        type: 'doc',
        id: 'field-guides/testing/overview',
      },
      items: [
        {
          type: 'category',
          label: 'TDD',
          collapsed: true,
          items: [
            'field-guides/testing/methods/emerging/M163-red-green-refactor',
            'field-guides/testing/methods/emerging/M164-test-pyramid',
            'field-guides/testing/methods/emerging/M165-test-list',
          ],
        },
        {
          type: 'category',
          label: 'BDD',
          collapsed: true,
          items: [
            'field-guides/testing/methods/emerging/M121-executable-specifications',
            'field-guides/testing/methods/established/M127-given-when-then',
            'field-guides/testing/methods/emerging/M126-gherkin',
          ],
        },
        {
          type: 'category',
          label: 'Continuous Delivery',
          collapsed: true,
          items: [
            'field-guides/testing/methods/emerging/M112-deployment-pipeline',
          ],
        },
        {
          type: 'category',
          label: 'DORA',
          collapsed: true,
          items: [
            'field-guides/testing/methods/emerging/M105-change-failure-rate',
            'field-guides/testing/methods/emerging/M139-time-to-restore-service',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Product Specification',
      className: 'sidebar-icon-product-specification',
      link: {
        type: 'doc',
        id: 'field-guides/product-specification/overview',
      },
      items: [
        {
          type: 'category',
          label: 'BDD',
          collapsed: true,
          items: [
            'field-guides/product-specification/methods/emerging/M115-discovery-workshops',
            'field-guides/product-specification/methods/emerging/M138-three-amigos',
            'field-guides/product-specification/methods/emerging/M120-example-mapping',
            'field-guides/product-specification/methods/emerging/M142-user-story-template',
            'field-guides/product-specification/methods/established/M127-given-when-then',
            'field-guides/product-specification/methods/emerging/M126-gherkin',
            'field-guides/product-specification/methods/emerging/M121-executable-specifications',
          ],
        },
        {
          type: 'category',
          label: 'DDD',
          collapsed: true,
          items: [
            'field-guides/product-specification/methods/emerging/M141-ubiquitous-language',
            'field-guides/product-specification/methods/emerging/M103-bounded-context',
          ],
        },
        {
          type: 'category',
          label: 'Double Diamond',
          collapsed: true,
          items: [
            'field-guides/product-specification/methods/emerging/M114-discover-phase',
            'field-guides/product-specification/methods/emerging/M109-define-phase',
            'field-guides/product-specification/methods/emerging/M113-develop-phase',
            'field-guides/product-specification/methods/emerging/M110-deliver-phase',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<div style="margin: 1rem 0 0.5rem 0.75rem; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ifm-color-emphasis-600);">Evidence</div>',
    },
    {
      type: 'category',
      label: 'Observations',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Internal Observations',
          collapsed: true,
          link: {
            type: 'generated-index',
            title: 'Internal Observations',
            description: 'Observations documented by our teams, capturing what we tried and what we learned.',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'field-guides/observations/internal',
            },
          ],
        },
        {
          type: 'category',
          label: 'External Observations',
          collapsed: true,
          link: {
            type: 'generated-index',
            title: 'External Observations',
            description: 'Published research and case studies that provide external evidence for FOE methods.',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'field-guides/observations/external',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'External Frameworks',
      collapsed: true,
      link: {
        type: 'doc',
        id: 'external-frameworks/overview',
      },
      items: [
        {
          type: 'category',
          label: 'BDD',
          link: {
            type: 'doc',
            id: 'external-frameworks/bdd/overview',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'external-frameworks/bdd/methods',
            },
          ],
        },
        {
          type: 'category',
          label: 'DORA',
          link: {
            type: 'doc',
            id: 'external-frameworks/dora/overview',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'external-frameworks/dora/methods',
            },
          ],
        },
        {
          type: 'category',
          label: 'Domain-Driven Design',
          link: {
            type: 'doc',
            id: 'external-frameworks/domain-driven-design/overview',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'external-frameworks/domain-driven-design/methods',
            },
          ],
        },
        {
          type: 'category',
          label: 'Continuous Delivery',
          items: [
            {
              type: 'autogenerated',
              dirName: 'external-frameworks/continuous-delivery/methods',
            },
          ],
        },
        {
          type: 'category',
          label: 'TDD',
          link: {
            type: 'doc',
            id: 'external-frameworks/tdd/overview',
          },
          items: [
            {
              type: 'autogenerated',
              dirName: 'external-frameworks/tdd/methods',
            },
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<div style="margin: 1rem 0 0.5rem 0.75rem; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ifm-color-emphasis-600);">About</div>',
    },
    {
      type: 'category',
      label: 'About Field Guides',
      collapsed: true,
      items: [
        'field-guides/for-leadership',
        'field-guides/contributing-observations',
        'field-guides/using-ai-agents',
        'field-guides/contributing-implementation',
      ],
    },
  ],
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      link: {
        type: 'generated-index',
        title: 'Introduction to FOE',
        description: 'Learn what Flow Optimized Engineering is and why it matters.',
        slug: '/intro',
      },
      items: [
        'intro/what-is-foe',
        'intro/why-foe-exists',
        'intro/central-thesis',
        'intro/foe-vs-alternatives',
      ],
    },
    {
      type: 'category',
      label: 'Core Principles',
      link: {
        type: 'doc',
        id: 'principles/overview',
      },
      items: [
        'principles/optimize-for-understanding',
        'principles/optimize-for-fast-feedback',
        'principles/optimize-for-confidence',
        'principles/cognitive-triangle',
      ],
    },
    {
      type: 'category',
      label: 'Stakeholder Guides',
      link: {
        type: 'generated-index',
        title: 'Stakeholder Guides',
        description: 'FOE guidance tailored for your role.',
        slug: '/stakeholder-guides',
      },
      items: [
        'stakeholder-guides/for-executives',
        'stakeholder-guides/for-engineering-leaders',
        'stakeholder-guides/for-engineers',
        'stakeholder-guides/for-government-customers',
        'stakeholder-guides/for-capture-teams',
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      link: {
        type: 'generated-index',
        title: 'Resources',
        description: 'Playbooks, models, and implementation guides for FOE.',
        slug: '/resources',
      },
      collapsed: true,
      items: [
        'implementation/esimplicity-ecosystem',
        {
          type: 'category',
          label: 'Implementation',
          link: {
            type: 'doc',
            id: 'implementation/getting-started',
          },
          items: [
            'implementation/assessing-your-phase',
            'implementation/building-institutions',
            'implementation/metrics-that-matter',
            'implementation/organizational-engagement',
            'implementation/common-pitfalls',
          ],
        },
        {
          type: 'category',
          label: 'The FOE Playbook',
          link: {
            type: 'doc',
            id: 'playbook/overview',
          },
          items: [
            'playbook/how-we-think-about-speed',
            'playbook/how-we-manage-risk',
            'playbook/how-work-moves',
            'playbook/how-we-learn',
            'playbook/how-we-decide',
            'playbook/expectations-for-leaders',
            'playbook/expectations-for-engineers',
            'playbook/talking-to-government',
          ],
        },
        {
          type: 'category',
          label: 'Maturity Model',
          link: {
            type: 'doc',
            id: 'maturity-model/overview',
          },
          items: [
            'maturity-model/level-0-fragile',
            'maturity-model/level-1-visible',
            'maturity-model/level-2-repeatable',
            'maturity-model/level-3-flowing',
            'maturity-model/level-4-adaptive',
            'maturity-model/using-the-model',
            'maturity-model/self-assessment',
          ],
        },
        {
          type: 'category',
          label: 'Transformation Model',
          link: {
            type: 'doc',
            id: 'transformation-model/overview',
          },
          items: [
            'transformation-model/phase-0-on-prem',
            'transformation-model/phase-1-lift-and-shift',
            'transformation-model/phase-2-awkward-middle',
            'transformation-model/phase-3-cloud-native-infrastructure',
            'transformation-model/phase-4-agentic-coding',
            'transformation-model/phase-5-cloud-native-code',
            'transformation-model/why-phase-3-is-the-bottleneck',
          ],
        },
        {
          type: 'category',
          label: 'Katalyst Implementation',
          link: {
            type: 'doc',
            id: 'katalyst/overview',
          },
          items: [
            'katalyst/overview',
            'katalyst/getting-started',
            'katalyst/agentic-coding',
            'katalyst/case-studies',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Research',
      link: {
        type: 'doc',
        id: 'research/overview',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Agentic Trends',
          items: [
            {
              type: 'autogenerated',
              dirName: 'research/agentic-trends',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Going Deeper',
      link: {
        type: 'generated-index',
        title: 'Going Deeper',
        description: 'Advanced topics, detailed guides, and theoretical foundations.',
        slug: '/going-deeper',
      },
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'The FOE Triad',
          link: {
            type: 'doc',
            id: 'triad/overview',
          },
          items: [
            'triad/people-changes',
            'triad/process-changes',
            'triad/technology-changes',
            'triad/coherence-across-levels',
          ],
        },
        {
          type: 'category',
          label: 'Developer Experience',
          link: {
            type: 'doc',
            id: 'devx/overview',
          },
          items: [
            'devx/devx-for-understanding',
            'devx/devx-for-fast-feedback',
            'devx/devx-for-confidence',
            'devx/devx-maturity-model',
          ],
        },
        {
          type: 'category',
          label: 'Psychological Foundations',
          link: {
            type: 'doc',
            id: 'psychological-foundations/overview',
          },
          items: [
            'psychological-foundations/sensemaking-under-complexity',
            'psychological-foundations/learning-and-calibration',
            'psychological-foundations/agency-and-risk-tolerance',
            'psychological-foundations/hidden-dimensions',
          ],
        },
        {
          type: 'category',
          label: 'Reference',
          link: {
            type: 'generated-index',
            title: 'Reference',
            description: 'Glossary, patterns, and additional resources.',
            slug: '/reference',
          },
          items: [
            'reference/glossary',
            'reference/key-metaphors',
            'reference/anti-patterns',
            'reference/pattern-library',
            'reference/technology-reference',
            'reference/bookshelf',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
