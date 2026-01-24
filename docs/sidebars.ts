import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
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
          ],
        },
      ],
    },
  ],
};

export default sidebars;
