# Transformation Phases Timeline

## Description
A horizontal timeline showing the six transformation phases with special callouts for the bottleneck and dependencies.

## Visual Elements
- Six connected boxes/nodes in a horizontal flow:
  - **Phase 0**: On-Prem (red/coral #fee2e2)
  - **Phase 1**: Lift & Shift (orange #fef3c7)
  - **Phase 2**: Awkward Middle (yellow #fef9c3)
  - **Phase 3**: Cloud Native Infrastructure (green #dcfce7) - HIGHLIGHTED
  - **Phase 4**: Agentic Coding (blue #dbeafe)
  - **Phase 5**: Cloud Native Code (purple #ede9fe)
- Arrows connecting each phase
- Special callout between Phase 2 and 3: "THE BOTTLENECK (Discipline Gap)"
- Special callout between Phase 3 and 4: "DEPENDENCY (Can't skip)"
- Phase 3 should be visually emphasized (larger, border, glow)

## Context
Used in: `docs/docs/transformation-model/overview.md`

This illustrates that organizations evolve through distinct phases, with Phase 3 being the critical bottleneck where most organizations stall.

## ASCII Reference
```
Phase 0    Phase 1      Phase 2         Phase 3              Phase 4         Phase 5
[On-Prem]-->[Lift &]-->[Awkward]-->[Cloud Native]-->[Agentic]-->[Cloud Native]
            [Shift ]    [Middle ]   [   Infra   ]    [Coding]    [   Code   ]
                              |           |              |
                        BOTTLENECK    DEPENDENCY
```

## Suggested Style
- Clean timeline with phase badges
- Use phase colors consistently
- Clear visual indication of bottleneck (warning icon, barrier graphic)
- Phase 3 should stand out visually
