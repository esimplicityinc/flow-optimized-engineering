# Technology Stack Integration Architecture

## Description
A layered architecture diagram showing how FOE technologies integrate from external users down to Git.

## Visual Elements
Vertical stack of layers (top to bottom):

1. **External Users** (cloud icon or user icons)
   |
   v
2. **API Gateway** - "auth, rate limiting"
   |
   v
3. **Service Mesh** - "mTLS, observability"
   - Contains 3 boxes: Service A, Service B, Service C
   |
   v
4. **Kubernetes** - "orchestration, scheduling"
   |
   Branches to three components:
   - **ArgoCD** (GitOps) -> connects to **Git** (Helm + Values)
   - **OPA** (Policy)
   - **OpenTelemetry** (Observability)

## Context
Used in: `docs/docs/triad/technology-changes.md`

This shows how the FOE technology stack layers together, with each layer serving a specific purpose in enabling flow.

## ASCII Reference
```
                [External Users]
                       |
                       v
    [API Gateway (auth, rate limiting)]
                       |
                       v
    [Service Mesh (mTLS, observability)]
    [Service A] [Service B] [Service C]
                       |
                       v
    [Kubernetes (orchestration, scheduling)]
           |           |           |
           v           v           v
       [ArgoCD]      [OPA]    [OpenTelemetry]
       (GitOps)    (Policy)   (Observability)
           |
           v
        [Git]
    (Helm + Values)
```

## Suggested Style
- Clean box/container layout
- Use consistent icons for each technology
- Color coding for different concerns (security, observability, deployment)
- Arrows showing data/request flow
