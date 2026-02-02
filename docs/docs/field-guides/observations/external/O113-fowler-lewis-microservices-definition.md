---
observationId: O113
displayed_sidebar: fieldGuideSidebar
sidebar_position: 11
title: "Microservices Definition (Fowler & Lewis)"
status: completed
source_type: external
source:
  authors: ["James Lewis", "Martin Fowler"]
  organization: "ThoughtWorks / martinfowler.com"
  year: 2014
  url: "https://martinfowler.com/articles/microservices.html"
methods:
  - M153
---


# Microservices Definition (Fowler & Lewis)

> **Source:** Lewis & Fowler (2014) | ThoughtWorks / martinfowler.com

The foundational definition of microservices architecture that established the key characteristics distinguishing true microservices from other architectural patterns. This article defined the industry vocabulary and set expectations for what microservices should achieve.

## Context

**Environment:**
- Organization: ThoughtWorks consultants synthesizing emerging practices
- Timeline: March 2014 (during early microservices adoption wave)
- Sample: Observations from multiple organizations including Netflix, Amazon, and ThoughtWorks clients

**The Problem:**
By 2014, multiple organizations had converged on a similar architectural style, but there was no shared definition or vocabulary. The term "microservices" was gaining traction but meant different things to different people.

**Research Questions:**
- What common characteristics define the microservices architectural style?
- How does this approach differ from traditional SOA?
- What trade-offs does this architecture introduce?

## Hypothesis

> "If services are designed to be independently deployable, organized around business capabilities, and owned by small teams, then organizations will achieve better agility and scalability because each service can evolve, scale, and fail independently."

## Approach

### Methodology
- **Design:** Synthesis of observed practices across multiple organizations
- **Validation:** Based on production systems at Netflix, Amazon, Guardian, and others
- **Framework:** Nine characteristics that define the architectural style

### The Nine Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Componentization via Services** | Services as independently deployable components |
| **Organized around Business Capabilities** | Teams own business capabilities, not technical layers |
| **Products not Projects** | Teams own services long-term, not hand off after delivery |
| **Smart Endpoints and Dumb Pipes** | Business logic in services, simple communication |
| **Decentralized Governance** | Teams choose their own tools and technologies |
| **Decentralized Data Management** | Each service manages its own data |
| **Infrastructure Automation** | Deployment pipelines enable independent release |
| **Design for Failure** | Services handle failure of dependencies gracefully |
| **Evolutionary Design** | Architecture evolves; services can be replaced |

## Results

### Key Finding: Independent Deployability

The central claim of microservices is independent deployability:

> "Services are independently deployable by fully automated deployment machinery."

This is presented as the litmus test for whether you have true microservices:

> "A change to a small part of the application only requires one or a few services to be rebuilt and redeployed."

### Organization Around Business Capabilities

The authors explicitly reference Conway's Law:

> "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."

And recommend using it intentionally:

> "The microservice approach to division is different, splitting up into services organized around business capability."

### Decentralized Data Management

A key distinguishing factor from distributed monoliths:

> "Microservices prefer letting each service manage its own database, either different instances of the same database technology, or entirely different database systems."

This contrasts with the shared-database anti-pattern:

> "The conceptual model of the world will differ between systems... Domain-Driven Design's concept of Bounded Context is useful here."

### Smart Endpoints, Dumb Pipes

Communication should be simple, not smart:

> "Applications built from microservices aim to be as decoupled and as cohesive as possible—they own their own domain logic... using the simpler protocols found in the web (resource request-response) and lightweight messaging."

### Acknowledged Trade-offs

The article honestly acknowledges complexity:

> "Developers have to deal with the additional complexity of creating a distributed system."

> "Implementing use cases that span multiple services without using distributed transactions is difficult."

> "Deploying features that span multiple services requires careful coordination."

## Analysis

### What the Article Establishes

1. **Independent deployability is the defining characteristic** - This is what separates microservices from other architectures
2. **Business capability alignment** - Services map to what the business does, not technical layers
3. **Decentralized data is essential** - Shared databases violate the pattern
4. **Conway's Law applies** - Team structure should match service structure
5. **Trade-offs are real** - Distributed systems complexity is the cost

### The Distributed Monolith Warning

While not using the term "distributed monolith," the article describes the anti-pattern:

> "We've seen many projects run into significant difficulties if they try to split the components into services from the get-go."

And warns:

> "If the components do not compose cleanly into services, then you're just moving complexity from inside a component to the connections between components."

### FOE Insights

**Understanding:**
The nine characteristics provide a clear mental model for what microservices should look like. The business capability alignment principle helps teams reason about where service boundaries belong. The explicit trade-offs help teams make informed decisions.

**Feedback:**
Independent deployability enables fast feedback—teams can release, learn, and iterate without coordinating deployments. The "products not projects" principle ensures teams stay connected to feedback from production.

**Confidence:**
"Design for failure" principles (circuit breakers, graceful degradation) build confidence in system resilience. Automated deployment pipelines provide confidence in the release process. Decentralized data eliminates the risk of database changes affecting multiple services.

## Limitations

- **Opinion synthesis:** Not empirical research; synthesizes observed practices
- **Early days:** Written in 2014 when microservices were emerging; some claims untested at scale
- **Survivorship bias:** Examples are success stories; failures less visible
- **Organizational prerequisites:** Assumes organizational willingness to adopt new structures
- **No metrics:** No quantitative evidence for claims (though DORA research later provided this)

### Authors' Own Caveats

> "We are finding more and more appealing, but we are also humbled by the recognition that we don't know if we are right."

> "Certainly there are reasons why one might expect microservices to mature poorly."

## Conclusion

### Verdict
**Foundational Source** - This article established the vocabulary and expectations for microservices architecture. While not empirical research, it synthesized emerging practices that have since been validated by DORA research and widespread adoption.

### Key Learnings

1. **Independent deployability is the litmus test** - If you can't deploy independently, you don't have microservices
2. **Business capabilities, not technical layers** - Service boundaries follow business functions
3. **Decentralized data ownership** - Each service owns its data
4. **Conway's Law alignment** - Team structure should match service structure
5. **Trade-offs exist** - Distributed systems complexity is real and should be accepted consciously

### FOE Application

This foundational article directly supports the True Microservices method:

| True Microservices Claim | Fowler/Lewis Support |
|--------------------------|---------------------|
| Independent team deployment is the primary flow benefit | "Services are independently deployable" |
| Distributed monoliths inherit complexity without benefits | "Moving complexity from inside a component to connections between components" |
| Service boundaries align with business capabilities | "Organized around business capability" |
| Shared databases are an anti-pattern | "Each service manages its own database" |
| Conway's Law is a tool | Explicit reference to Conway's Law as design principle |

---

## References

- Lewis, J., & Fowler, M. (2014). "Microservices." martinfowler.com. Available at: [martinfowler.com/articles/microservices.html](https://martinfowler.com/articles/microservices.html)
- Related: Fowler, M. (2015). "MonolithFirst." [martinfowler.com/bliki/MonolithFirst.html](https://martinfowler.com/bliki/MonolithFirst.html)
- Related: Fowler, M. (2022). "Conway's Law." [martinfowler.com/bliki/ConwaysLaw.html](https://martinfowler.com/bliki/ConwaysLaw.html)

---

