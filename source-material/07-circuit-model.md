# The Gene-Field Circuit Model

An electrical engineering metaphor for understanding organizational supply/demand dynamics.

## Core Concept

Model the organization as an electrical circuit where:
- **Voltage** = Demand pressure
- **Current** = Actual delivery flow
- **Impedance** = Organizational resistance
- **Conductance** = Gene expression levels

---

## Demand Sources (Voltage Sources)

### V_gov_accountability
Government's baseline need for assurance and accountability.
- Steady, always-on voltage
- Doesn't change much with AI

### V_gov_safety
Government's need for operational continuity and safety.
- High impedance path (lots of approval needed)
- Critical for permission

### V_prestige
Personal prestige and career advancement signals.
- Attaches to whatever is currently scarce
- Pre-AI: attaches to service visibility
- Post-AI: attaches to assurance yield

### V_ai_factor
AI shock - the new external pressure.
- Dramatically increases available voltage
- Creates new paths but also new risks
- Amplifies both opportunity and failure modes

---

## Organizational Impedance

### Z_procurement
Procurement rigidity - how hard it is to buy new things.
- High in traditional GovCon
- Slightly lower for existing vendor relationships

### Z_risk_aversion
Organizational risk aversion.
- Amplified by past failures
- Reduced by evidence and trust

### Z_legacy
Legacy architecture burden.
- Technical debt as impedance
- Integration complexity

### Z_skill_gaps
Workforce capability gaps.
- Missing genes = higher impedance for those paths
- Training reduces over time

### Z_trust_deficit
Trust between government and vendors.
- Built through consistent delivery
- Destroyed quickly by failures

---

## The Human Engine

A separate subsystem representing human capacity:

### V_hum (Human Voltage)
- Base capacity of the workforce
- Affected by hiring, training, culture

### Burnout Dynamics
- High sustained current → burnout accumulation
- Burnout increases effective impedance
- Recovery happens during low-demand periods

### Coordination Resistance
- Scales with team size
- Reduced by good Education genes (B1-B4)

---

## Circuit Nodes (State Variables)

### Permission
- Accumulated approval to act
- Increases with evidence and trust
- Decreases with failures and incidents

### Risk State
- Current organizational risk level
- Inverse relationship with permission
- AI can amplify risk if unchecked

### Mission Outcomes
- Actual delivered value
- What government really wants
- Drives future permission and budget

### Change Throughput
- Velocity of delivery
- Limited by minimum of all conductances
- Multiplied by AI (if paths exist)

### Code Output
- Raw production volume
- AI dramatically increases this
- Value depends on other factors

---

## Gene Effects on the Circuit

Each gene affects specific conversions:

| Gene | Affects |
|------|---------|
| A1 Discovery | demand → correct intent |
| A2 Tradeoffs | constraints → decisions |
| A3 Adoption | features → usage |
| A4 Strategy | options → sequence |
| B1 Mental Models | complexity → shared understanding |
| B2 Communication | intent → alignment |
| B3 Enablement | capability → adoption |
| B4 Cognitive Ergonomics | load → clarity |
| C1 Constraints | freedom → guardrails |
| C2 Verification | output → evidence |
| C3 Operability | deployment → observability |
| C4 Governance | change → controlled change |

---

## Key Circuit Equations

### Effective Human Capacity
```
h_eff = V_hum × (1 - burnout) × (1 - coord_resistance)
```

### AI Gain (Code Generation Conductance)
```
G_ai = base_ai × (C1 × C2)^0.5  # Needs constraints and verification
```

### Assurance Converter (Proof Generation)
```
assurance_yield = code_output × (C2 + C3 + C4) / 3
```

### Permission Dynamics
```
delta_permission = k1 × assurance - k2 × risk - k3 × incidents
```

### Mission Outcomes
```
outcomes = permission × change_throughput × mission_gene_avg
```

---

## Simulation Insights

### Pre-AI Equilibrium
- Low voltage, high impedance
- Slow but stable
- Permission limited by evidence generation rate
- Code is the bottleneck

### Post-AI Disequilibrium
- High voltage (AI shock)
- Same impedance (initially)
- Code floods system
- Permission becomes the bottleneck
- Verification/governance become critical paths

### New Equilibrium (If Adapted)
- High voltage with new paths
- Lower impedance through enablement
- Evidence scales with output
- Permission keeps pace with capability
