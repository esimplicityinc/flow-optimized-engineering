"""
Gene-Field Organizational Simulation

Models organizational capabilities as an electrical circuit with:
- 12 genes affecting various conversions
- Demand sources (voltage)
- Organizational impedance
- Human capacity with burnout dynamics
- Government capability absorption

This simulation can be used to:
- Predict demand for different capabilities
- Stress-test organizational positioning
- Model scenarios for government contracting
"""

from dataclasses import dataclass, field
from typing import Optional, List, Dict
import math


@dataclass
class DemandSources:
    """Voltage sources representing external demand pressure."""
    v_gov_accountability: float = 1.0  # Baseline accountability need
    v_gov_safety: float = 1.0          # Operational continuity need
    v_prestige: float = 0.5            # Personal prestige signals
    v_ai_factor: float = 0.0           # AI shock (0 = pre-AI, 1 = full AI adoption)


@dataclass
class OrgImpedance:
    """Organizational resistance factors."""
    procurement_rigidity: float = 0.7
    risk_aversion: float = 0.6
    legacy_architecture: float = 0.5
    skill_gaps: float = 0.4
    trust_deficit: float = 0.3
    
    @property
    def total(self) -> float:
        """Combined impedance (geometric mean to avoid zero)."""
        factors = [
            self.procurement_rigidity,
            self.risk_aversion,
            self.legacy_architecture,
            self.skill_gaps,
            self.trust_deficit
        ]
        return math.exp(sum(math.log(max(f, 0.01)) for f in factors) / len(factors))


@dataclass
class HumanEngine:
    """Human capacity subsystem with burnout dynamics."""
    v_hum: float = 1.0           # Base human capacity
    burnout: float = 0.0         # Current burnout level (0-1)
    burnout_sensitivity: float = 0.1  # How fast burnout accumulates
    recovery_rate: float = 0.05  # How fast burnout recovers
    
    def update(self, current_load: float, dt: float = 1.0) -> None:
        """Update burnout based on load."""
        if current_load > 0.7:
            self.burnout = min(1.0, self.burnout + self.burnout_sensitivity * dt)
        else:
            self.burnout = max(0.0, self.burnout - self.recovery_rate * dt)
    
    @property
    def effective_capacity(self) -> float:
        """Capacity after burnout effects."""
        return self.v_hum * (1 - self.burnout)


@dataclass
class GeneVector:
    """The 12 organizational capability genes."""
    # Product genes (A)
    a1_discovery: float = 0.5
    a2_tradeoffs: float = 0.5
    a3_adoption: float = 0.5
    a4_strategy: float = 0.5
    
    # Education genes (B)
    b1_mental_models: float = 0.5
    b2_communication: float = 0.5
    b3_enablement: float = 0.5
    b4_cognitive_ergonomics: float = 0.5
    
    # Systems genes (C)
    c1_constraints: float = 0.5
    c2_verification: float = 0.5
    c3_operability: float = 0.5
    c4_governance: float = 0.5
    
    @property
    def product_avg(self) -> float:
        return (self.a1_discovery + self.a2_tradeoffs + 
                self.a3_adoption + self.a4_strategy) / 4
    
    @property
    def education_avg(self) -> float:
        return (self.b1_mental_models + self.b2_communication + 
                self.b3_enablement + self.b4_cognitive_ergonomics) / 4
    
    @property
    def systems_avg(self) -> float:
        return (self.c1_constraints + self.c2_verification + 
                self.c3_operability + self.c4_governance) / 4
    
    @property
    def mission_profile(self) -> float:
        """Weighted average for mission-oriented work."""
        weights = {
            'a1': 1.0, 'a2': 1.0, 'a3': 0.8, 'a4': 0.6,
            'b1': 0.8, 'b2': 1.0, 'b3': 0.4, 'b4': 0.3,
            'c1': 0.5, 'c2': 0.6, 'c3': 0.3, 'c4': 0.3
        }
        values = [
            self.a1_discovery, self.a2_tradeoffs, self.a3_adoption, self.a4_strategy,
            self.b1_mental_models, self.b2_communication, self.b3_enablement, self.b4_cognitive_ergonomics,
            self.c1_constraints, self.c2_verification, self.c3_operability, self.c4_governance
        ]
        w_list = list(weights.values())
        return sum(v * w for v, w in zip(values, w_list)) / sum(w_list)
    
    @property
    def enablement_profile(self) -> float:
        """Weighted average for enablement-oriented work."""
        weights = {
            'a1': 0.3, 'a2': 0.6, 'a3': 0.7, 'a4': 0.4,
            'b1': 0.6, 'b2': 0.6, 'b3': 1.0, 'b4': 1.0,
            'c1': 1.0, 'c2': 1.0, 'c3': 1.0, 'c4': 1.0
        }
        values = [
            self.a1_discovery, self.a2_tradeoffs, self.a3_adoption, self.a4_strategy,
            self.b1_mental_models, self.b2_communication, self.b3_enablement, self.b4_cognitive_ergonomics,
            self.c1_constraints, self.c2_verification, self.c3_operability, self.c4_governance
        ]
        w_list = list(weights.values())
        return sum(v * w for v, w in zip(values, w_list)) / sum(w_list)


@dataclass
class CircuitState:
    """Current state of the organizational circuit."""
    permission: float = 0.5      # Accumulated approval to act
    risk_state: float = 0.3      # Current risk level
    mission_outcomes: float = 0.0  # Delivered value
    change_throughput: float = 0.5  # Delivery velocity
    code_output: float = 0.0     # Raw production volume
    trust_accumulated: float = 0.5  # Built trust level


@dataclass 
class Scenario:
    """A simulation scenario configuration."""
    name: str
    sources: DemandSources
    agency_impedance: OrgImpedance
    horizon_steps: int = 12
    initial_gov_capability: float = 0.3


@dataclass
class OfferBundle:
    """A product/service offering configuration."""
    name: str
    gene_deltas: GeneVector  # How this offer affects genes
    alpha_service: float     # 0 = pure product, 1 = pure service
    absorption_multiplier: float = 1.0  # How well gov can absorb this
    human_burden: float = 0.5  # Load on human capacity


@dataclass
class Vendor:
    """A vendor organization."""
    name: str
    base_genes: GeneVector
    humans: HumanEngine
    fixed_offer: Optional[OfferBundle] = None


@dataclass
class SimulationOutput:
    """Results from a simulation run."""
    vendor_name: str
    offer_name: str
    final_state: CircuitState
    mission_outcomes_total: float
    permission_trajectory: List[float] = field(default_factory=list)
    risk_trajectory: List[float] = field(default_factory=list)
    burnout_trajectory: List[float] = field(default_factory=list)
    
    @property
    def score(self) -> float:
        """Overall effectiveness score."""
        return (
            self.mission_outcomes_total * 0.4 +
            self.final_state.permission * 0.2 +
            (1 - self.final_state.risk_state) * 0.2 +
            self.final_state.trust_accumulated * 0.1 +
            (1 - self.burnout_trajectory[-1] if self.burnout_trajectory else 0.5) * 0.1
        )


def compute_ai_gain(genes: GeneVector, ai_factor: float) -> float:
    """Calculate AI amplification of code generation."""
    # AI gain requires constraints and verification to be useful
    base_gain = 1.0 + ai_factor * 4.0  # AI can 5x code output
    safety_factor = math.sqrt(genes.c1_constraints * genes.c2_verification)
    return base_gain * safety_factor


def compute_assurance_yield(
    code_output: float, 
    genes: GeneVector
) -> float:
    """How much of code output converts to verifiable assurance."""
    systems_capability = (genes.c2_verification + genes.c3_operability + genes.c4_governance) / 3
    return code_output * systems_capability


def compute_coordination_resistance(team_size: float, genes: GeneVector) -> float:
    """Communication overhead based on team size and education genes."""
    base_resistance = 0.1 * math.log(1 + team_size)
    education_mitigation = genes.education_avg
    return base_resistance * (1 - 0.5 * education_mitigation)


def simulate_step(
    state: CircuitState,
    sources: DemandSources,
    impedance: OrgImpedance,
    genes: GeneVector,
    humans: HumanEngine,
    gov_capability: float,
    dt: float = 1.0
) -> tuple[CircuitState, float]:
    """
    Simulate one time step of the circuit.
    Returns new state and government capability delta.
    """
    # Compute effective demand (voltage)
    total_demand = (
        sources.v_gov_accountability +
        sources.v_gov_safety * 0.8 +
        sources.v_prestige * 0.3 +
        sources.v_ai_factor * 2.0
    )
    
    # Compute effective human capacity
    coord_resistance = compute_coordination_resistance(10.0, genes)  # Assume team of 10
    h_eff = humans.effective_capacity * (1 - coord_resistance)
    
    # AI amplification
    ai_gain = compute_ai_gain(genes, sources.v_ai_factor)
    
    # Code output (current through code path)
    code_conductance = h_eff * ai_gain / impedance.total
    new_code_output = total_demand * code_conductance
    
    # Assurance yield
    assurance = compute_assurance_yield(new_code_output, genes)
    
    # Risk dynamics
    risk_from_speed = new_code_output * 0.1 * (1 - genes.systems_avg)
    risk_mitigation = assurance * 0.2 + state.permission * 0.1
    new_risk = max(0, min(1, state.risk_state + risk_from_speed - risk_mitigation))
    
    # Permission dynamics
    permission_gain = assurance * 0.15 + state.trust_accumulated * 0.05
    permission_loss = new_risk * 0.1 + impedance.risk_aversion * 0.05
    new_permission = max(0, min(1, state.permission + permission_gain - permission_loss))
    
    # Trust dynamics
    trust_gain = assurance * 0.05 * (1 - new_risk)
    trust_loss = new_risk * 0.1
    new_trust = max(0, min(1, state.trust_accumulated + trust_gain - trust_loss))
    
    # Mission outcomes
    mission_conductance = new_permission * genes.mission_profile
    new_outcomes = total_demand * mission_conductance * h_eff
    
    # Change throughput
    new_throughput = min(new_code_output, new_permission * ai_gain * genes.systems_avg)
    
    # Update human burnout
    load = new_code_output / (1 + ai_gain)  # AI reduces human load
    humans.update(load, dt)
    
    # Government capability absorption
    gov_delta = assurance * 0.02 * (1 - gov_capability)
    
    new_state = CircuitState(
        permission=new_permission,
        risk_state=new_risk,
        mission_outcomes=new_outcomes,
        change_throughput=new_throughput,
        code_output=new_code_output,
        trust_accumulated=new_trust
    )
    
    return new_state, gov_delta


def run_simulation(
    scenario: Scenario,
    vendor: Vendor,
    offer: Optional[OfferBundle] = None
) -> SimulationOutput:
    """Run a full simulation for a vendor in a scenario."""
    # Combine base genes with offer deltas
    genes = vendor.base_genes
    if offer:
        genes = GeneVector(
            a1_discovery=min(1, genes.a1_discovery + offer.gene_deltas.a1_discovery * 0.3),
            a2_tradeoffs=min(1, genes.a2_tradeoffs + offer.gene_deltas.a2_tradeoffs * 0.3),
            a3_adoption=min(1, genes.a3_adoption + offer.gene_deltas.a3_adoption * 0.3),
            a4_strategy=min(1, genes.a4_strategy + offer.gene_deltas.a4_strategy * 0.3),
            b1_mental_models=min(1, genes.b1_mental_models + offer.gene_deltas.b1_mental_models * 0.3),
            b2_communication=min(1, genes.b2_communication + offer.gene_deltas.b2_communication * 0.3),
            b3_enablement=min(1, genes.b3_enablement + offer.gene_deltas.b3_enablement * 0.3),
            b4_cognitive_ergonomics=min(1, genes.b4_cognitive_ergonomics + offer.gene_deltas.b4_cognitive_ergonomics * 0.3),
            c1_constraints=min(1, genes.c1_constraints + offer.gene_deltas.c1_constraints * 0.3),
            c2_verification=min(1, genes.c2_verification + offer.gene_deltas.c2_verification * 0.3),
            c3_operability=min(1, genes.c3_operability + offer.gene_deltas.c3_operability * 0.3),
            c4_governance=min(1, genes.c4_governance + offer.gene_deltas.c4_governance * 0.3),
        )
    
    # Initialize state
    state = CircuitState()
    humans = HumanEngine(v_hum=vendor.humans.v_hum)
    gov_capability = scenario.initial_gov_capability
    
    # Track trajectories
    permission_trajectory = [state.permission]
    risk_trajectory = [state.risk_state]
    burnout_trajectory = [humans.burnout]
    total_outcomes = 0.0
    
    # Run simulation
    for _ in range(scenario.horizon_steps):
        state, gov_delta = simulate_step(
            state=state,
            sources=scenario.sources,
            impedance=scenario.agency_impedance,
            genes=genes,
            humans=humans,
            gov_capability=gov_capability
        )
        
        gov_capability = min(1, gov_capability + gov_delta)
        total_outcomes += state.mission_outcomes
        
        permission_trajectory.append(state.permission)
        risk_trajectory.append(state.risk_state)
        burnout_trajectory.append(humans.burnout)
    
    return SimulationOutput(
        vendor_name=vendor.name,
        offer_name=offer.name if offer else "baseline",
        final_state=state,
        mission_outcomes_total=total_outcomes,
        permission_trajectory=permission_trajectory,
        risk_trajectory=risk_trajectory,
        burnout_trajectory=burnout_trajectory
    )


# Example offer library
OFFER_LIBRARY = {
    "evidence_spine": OfferBundle(
        name="Evidence Spine",
        gene_deltas=GeneVector(
            c2_verification=0.8, c3_operability=0.6, c4_governance=0.7
        ),
        alpha_service=0.3,  # Product-heavy
        absorption_multiplier=1.2,
        human_burden=0.3
    ),
    "golden_path_platform": OfferBundle(
        name="Golden Path Platform",
        gene_deltas=GeneVector(
            b3_enablement=0.9, b4_cognitive_ergonomics=0.8,
            c1_constraints=0.7, c2_verification=0.6, c3_operability=0.6, c4_governance=0.5
        ),
        alpha_service=0.2,
        absorption_multiplier=1.3,
        human_burden=0.4
    ),
    "intent_compiler_service": OfferBundle(
        name="Intent Compiler Service",
        gene_deltas=GeneVector(
            a1_discovery=0.8, a2_tradeoffs=0.7,
            b1_mental_models=0.6, b2_communication=0.7,
            c2_verification=0.5
        ),
        alpha_service=0.7,  # Service-heavy
        absorption_multiplier=0.8,
        human_burden=0.7
    ),
    "legacy_reducer": OfferBundle(
        name="Legacy Impedance Reducer",
        gene_deltas=GeneVector(
            b3_enablement=0.5, c1_constraints=0.6, c3_operability=0.8, c4_governance=0.7
        ),
        alpha_service=0.5,
        absorption_multiplier=1.0,
        human_burden=0.5
    ),
    "ai_delivery_factory": OfferBundle(
        name="Assured AI Delivery Factory",
        gene_deltas=GeneVector(
            a1_discovery=0.6, a2_tradeoffs=0.7, a3_adoption=0.5,
            b1_mental_models=0.6, b2_communication=0.5, b3_enablement=0.7,
            c1_constraints=0.8, c2_verification=0.9, c3_operability=0.7, c4_governance=0.8
        ),
        alpha_service=0.4,
        absorption_multiplier=1.4,
        human_burden=0.6
    )
}


def create_pre_ai_scenario() -> Scenario:
    """Traditional GovCon environment."""
    return Scenario(
        name="Pre-AI GovCon",
        sources=DemandSources(
            v_gov_accountability=1.0,
            v_gov_safety=1.0,
            v_prestige=0.6,
            v_ai_factor=0.0
        ),
        agency_impedance=OrgImpedance(
            procurement_rigidity=0.8,
            risk_aversion=0.7,
            legacy_architecture=0.6,
            skill_gaps=0.5,
            trust_deficit=0.4
        ),
        initial_gov_capability=0.3
    )


def create_ai_transition_scenario() -> Scenario:
    """GovCon during AI adoption."""
    return Scenario(
        name="AI Transition",
        sources=DemandSources(
            v_gov_accountability=1.0,
            v_gov_safety=1.2,
            v_prestige=0.4,
            v_ai_factor=0.7
        ),
        agency_impedance=OrgImpedance(
            procurement_rigidity=0.7,
            risk_aversion=0.8,  # Higher during transition
            legacy_architecture=0.6,
            skill_gaps=0.6,
            trust_deficit=0.5
        ),
        initial_gov_capability=0.35
    )


def create_ai_mature_scenario() -> Scenario:
    """GovCon with mature AI adoption."""
    return Scenario(
        name="AI Mature",
        sources=DemandSources(
            v_gov_accountability=1.0,
            v_gov_safety=1.0,
            v_prestige=0.3,
            v_ai_factor=1.0
        ),
        agency_impedance=OrgImpedance(
            procurement_rigidity=0.6,
            risk_aversion=0.5,
            legacy_architecture=0.4,
            skill_gaps=0.4,
            trust_deficit=0.3
        ),
        initial_gov_capability=0.5
    )


def main():
    """Run example simulations."""
    print("=" * 60)
    print("Gene-Field Organizational Simulation")
    print("=" * 60)
    
    # Create a sample vendor
    vendor = Vendor(
        name="Acme GovTech",
        base_genes=GeneVector(
            a1_discovery=0.6, a2_tradeoffs=0.5, a3_adoption=0.4, a4_strategy=0.5,
            b1_mental_models=0.5, b2_communication=0.6, b3_enablement=0.4, b4_cognitive_ergonomics=0.4,
            c1_constraints=0.5, c2_verification=0.5, c3_operability=0.5, c4_governance=0.5
        ),
        humans=HumanEngine(v_hum=1.0)
    )
    
    scenarios = [
        create_pre_ai_scenario(),
        create_ai_transition_scenario(),
        create_ai_mature_scenario()
    ]
    
    print(f"\nVendor: {vendor.name}")
    print(f"Base Mission Profile: {vendor.base_genes.mission_profile:.2f}")
    print(f"Base Enablement Profile: {vendor.base_genes.enablement_profile:.2f}")
    
    for scenario in scenarios:
        print(f"\n{'-' * 40}")
        print(f"Scenario: {scenario.name}")
        print(f"AI Factor: {scenario.sources.v_ai_factor}")
        
        # Run baseline
        baseline = run_simulation(scenario, vendor)
        print(f"\n  Baseline:")
        print(f"    Total Outcomes: {baseline.mission_outcomes_total:.2f}")
        print(f"    Final Permission: {baseline.final_state.permission:.2f}")
        print(f"    Final Risk: {baseline.final_state.risk_state:.2f}")
        print(f"    Score: {baseline.score:.3f}")
        
        # Run with each offer
        print(f"\n  With Offers:")
        results = []
        for offer_key, offer in OFFER_LIBRARY.items():
            result = run_simulation(scenario, vendor, offer)
            results.append(result)
            print(f"    {offer.name}:")
            print(f"      Outcomes: {result.mission_outcomes_total:.2f}, Score: {result.score:.3f}")
        
        # Best offer
        best = max(results, key=lambda r: r.score)
        print(f"\n  Best Offer: {best.offer_name} (score: {best.score:.3f})")


if __name__ == "__main__":
    main()
