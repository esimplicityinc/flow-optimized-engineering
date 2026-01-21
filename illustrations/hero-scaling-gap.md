# Hero Scaling Gap

## Description
A line graph showing how systems grow faster than hero capacity, creating an ever-widening gap.

## Visual Elements
- X-axis: Time (arrow pointing right)
- Y-axis: Capacity/Complexity
- Two lines:
  - **Systems line**: Steep upward curve (labeled "Systems: Growing (linear or faster)")
  - **Heroes line**: Flat or slight growth (labeled "Heroes: Flat (can't hire/transfer fast enough)")
- Shaded area between the lines labeled "Gap: Widening"
- The gap area could use a warning/danger color (orange/red gradient)

## Context
Used in: `docs/docs/transformation-model/why-phase-3-is-the-bottleneck.md`

This illustrates why the heroic engineer model cannot cross Phase 3: you cannot hire heroes fast enough, and you cannot transfer heroic knowledge fast enough. The gap always widens.

## ASCII Reference
```
Organization Growth:
-------------------------> Time

Systems: -----------------> Growing (Linear or faster)
                            [steep upward line]

Heroes:  ------> Flat
                 (Can't hire fast enough,
                  can't transfer knowledge)

Gap:     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Widening
```

## Suggested Style
- Clean line chart aesthetic
- Systems line in blue, Heroes line in gray
- Gap area with gradient fill showing danger/warning
- Clear annotations explaining the dynamic
