# UX Review: Demand Shift Page

**Page:** `http://localhost:3000/flow-optimized-engineering/demand-shift`  
**Files:** `docs/src/pages/demand-shift.tsx`, `docs/src/pages/demand-shift.module.css`, `docs/src/components/DemandShift/`  
**Date:** 2026-01-26

## Overview

The Demand Shift page is a scrolling narrative visualization that explains how AI changes government's needs from code production to verification/evidence capabilities. It uses intersection observers for scroll-triggered animations and multiple data visualizations.

---

## High Priority Issues

### 1. Brand Color Misalignment

Like the presentation before the overhaul, this page uses generic colors instead of eSimplicity brand:

| Current | Should Be | Usage |
|---------|-----------|-------|
| `#3B82F6` (blue) | `#3223BD` | Primary, product domain |
| `#8B5CF6` (purple) | `#CC8BFA` | Systems domain, spine |
| `#10B981` (green) | `#3EC5BB` | Education domain |
| `#F59E0B`, `#EF4444` | Keep or adjust | Warning/danger states |

**Files affected:** 
- `docs/src/components/DemandShift/demandShiftData.ts:422-432`
- `docs/src/pages/demand-shift.module.css` (multiple locations)
- Inline styles in `docs/src/pages/demand-shift.tsx`

### 2. Typography Not Using Brand Font

Page uses Docusaurus defaults instead of Nunito Sans. Need to:
- Import Nunito Sans in CSS
- Apply to headings and body text

### 3. Missing `prefers-reduced-motion` Support

Several animations run without respecting user preferences:

| Animation | Location |
|-----------|----------|
| Hero wheel cycles every 3s | `demand-shift.tsx:55-58` |
| Scroll indicator bounce | `demand-shift.module.css:158-161` |
| Flood bar pulse | `demand-shift.module.css:332-335` |
| Section fade-in transitions | `demand-shift.module.css:15-18` |

### 4. SVG Accessibility Gaps

The genome wheel SVG (`demand-shift.tsx:79-107`) lacks:
- `role="img"` attribute
- `<title>` and `<desc>` elements
- `aria-label` describing the visualization
- `aria-live` region for phase label changes

The heatmap arrow and pipeline flow arrows also lack ARIA labels.

### 5. Heatmap Keyboard Inaccessibility

Gene cells (`demand-shift.tsx:353-365`, `389-404`) are clickable divs:
- No `tabIndex` for keyboard focus
- No keyboard event handlers
- `title` attribute tooltips not accessible to screen readers
- Should use `role="button"` or convert to actual buttons

---

## Medium Priority Issues

### 6. Confusing Heatmap Interaction Model

- Cell click sets `selectedGene` state but doesn't visually show selection
- "Click any gene to see why demand changed" text suggests clicking cells reveals details
- But details are actually in AccordionGroup below, not connected to cell clicks
- The `selectedGene` state is set but never used meaningfully

**Recommendation:** Either wire up cell selection to scroll/highlight the relevant accordion, or remove the click functionality and simplify the prompt.

### 7. Pipeline Auto-Animation Confusion

The permission pipeline (`demand-shift.tsx:452-459`) auto-switches after 2 seconds:
- No user control to toggle between states
- Users may miss the first state
- No indication that more content will appear

**Recommendation:** Add manual toggle buttons or at minimum an indicator that views will change.

### 8. Vertical Text Readability

The "Evidence + Outcomes" label in PersonasSection (`demand-shift.module.css:679-682`):

```css
writing-mode: vertical-rl;
text-orientation: mixed;
transform: rotate(180deg);
```

This is difficult to read and may cause accessibility issues.

### 9. Hardcoded Colors Throughout

Inline styles contain many hardcoded hex values:

| Location | Color |
|----------|-------|
| `demand-shift.tsx:99` | `fill="#6B7280"` |
| `demand-shift.tsx:490` | `background: '#EF4444'` |
| `demand-shift.tsx:504` | `background: '#F59E0B'` |
| `demand-shift.tsx:536` | `background: '#10B981'` |
| `demand-shift.tsx:550` | `background: '#10B981'` |

Should use CSS custom properties for maintainability.

### 10. CTA Links to Potentially Missing Page

The final CTA links to `/genome-game`:

```tsx
<Link to="/genome-game" className={styles.ctaButton}>
```

Should verify this page exists and is functional.

---

## Low Priority Issues

### 11. Data Model Inconsistency

In `demandShiftData.ts`:
- Line 21 comment says `isEvidenceEngine`
- But properties on lines 26-41 use `isSpine`
- Type definition missing the property entirely

### 12. Legend Below Visualization

Hero legend takes vertical space below the wheel. Could be positioned to the side on larger screens.

### 13. Section Title Inconsistency

Some sections have subtitles, some don't. The visual hierarchy could be more consistent.

### 14. Mobile Grid Layouts

Several 3-column grids collapse to single column on mobile but the breakpoint (`768px`) may be too aggressive for tablets.

---

## Recommendations Summary

| Priority | Task | Files |
|----------|------|-------|
| High | Align colors with eSimplicity brand (#3223BD, #3EC5BB, #CC8BFA) | `demandShiftData.ts`, `demand-shift.tsx`, `demand-shift.module.css` |
| High | Add Nunito Sans typography | `demand-shift.module.css` |
| High | Add `prefers-reduced-motion` support | `demand-shift.module.css` |
| High | Add SVG accessibility (role, title, desc, aria-labels) | `demand-shift.tsx` |
| High | Make heatmap cells keyboard accessible | `demand-shift.tsx` |
| Medium | Fix heatmap cell selection logic or remove | `demand-shift.tsx` |
| Medium | Add manual toggle for pipeline visualization | `demand-shift.tsx` |
| Medium | Improve vertical text in personas section | `demand-shift.module.css` |
| Medium | Extract hardcoded colors to CSS variables | Multiple files |
| Low | Fix `isSpine` vs `isEvidenceEngine` inconsistency | `demandShiftData.ts` |
| Low | Verify `/genome-game` CTA destination | N/A |

---

## Implementation Order

1. **Phase 1: Brand & Accessibility (High Priority)**
   - Align color palette with eSimplicity brand colors
   - Add Nunito Sans font import
   - Add `prefers-reduced-motion` media queries
   - Add ARIA labels to all SVG visualizations
   - Improve color contrast on legend and secondary text
   - Add keyboard navigation for heatmap cells

2. **Phase 2: UX Polish (Medium Priority)**
   - Make pipeline visualization interactive (toggle states)
   - Improve heatmap cell discoverability and interaction
   - Simplify personas section layout
   - Add section navigation or progress indicator

3. **Phase 3: Content & Details (Low Priority)**
   - Review and fix TypeScript data inconsistency
   - Extract hardcoded colors to CSS variables
   - Add loading states for intersection observer animations
   - Verify `/genome-game` CTA destination exists
