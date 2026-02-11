---
methodId: M245
displayed_sidebar: fieldGuideSidebar
sidebar_position: 25
title: "Event Versioning"
sidebar_label: "Event Versioning"
description: "Managing schema evolution of events over time"
external_method:
  framework: event-sourcing
  method: event-versioning
  id: M245
foe_maturity: hypothesized
observations: []
---

import ExternalMethodHeader from '@site/src/components/ExternalMethodHeader';

# Event Versioning

<ExternalMethodHeader />

## Why This Matters for Software Architecture

Events are stored forever. As requirements change, event schemas must evolve without breaking existing event streams. Proper versioning enables long-term system evolution.

**Architecture Benefits:**
- Long-term schema evolution
- Backward compatibility
- System longevity
- Migration path for changes

**FOE Alignment:**
- **Understanding** - Explicit versioning makes changes visible
- **Confidence** - Old events remain readable
- **Fast Feedback** - Upcasters enable rapid schema changes

## Adaptations for Software Architecture

### Upcasting Pattern

```typescript
interface EventUpcaster {
  canUpcast(event: EventEnvelope): boolean;
  upcast(event: EventEnvelope): DomainEvent;
}

class OrderCreatedUpcaster implements EventUpcaster {
  canUpcast(event: EventEnvelope): boolean {
    return event.type === 'OrderCreated' && event.version === 1;
  }
  
  upcast(event: EventEnvelope): DomainEvent {
    const oldData = event.data;
    return new OrderCreated({
      orderId: oldData.orderId,
      customerId: oldData.customerId,
      orderTotal: null,  // New field with default
      currency: 'USD'
    });
  }
}
```

### Versioning Best Practices

1. **Prefer additive changes** - Add fields rather than renaming
2. **Use optional fields** - New fields should have defaults
3. **Test old events** - Maintain test fixtures with old formats
4. **Version metadata** - Include schema version in event envelope

## Questions We're Exploring

- When should we use upcasting vs event migration?
- How do we handle breaking changes that can't be upcasted?
- What are the long-term maintenance costs of upcasters?

## Supporting Evidence

