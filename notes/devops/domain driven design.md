2025-05-12 22:00
Tags: #system-design
##### Content
A strategy aimed at improving the quality of software by aligning it more closely with the business needs it serves, focusing on the business domains.
Collaboration between devs and domain experts.

### Stages

#### Strategic Design
Dealing with "Problem Space"

- Value: What's the value from our app
- Knowledge Discovery
	- Domain Experts: Identifying who are they
	- Event Storming: A crucial part, similar to brainstorming but we focus on business events, commands, and policies
- Communication
	- Ubiquitous Language: Devs and domain experts agree on the same terms, like using "delivery ways" or "delivery methods"
- Domain Analysis: Need to identify
	- Core Subdomains: Core business logic that's written by our devs
	- Supporting Subdomains: May be our code or external services
	- Generic Subdomains: Totally external services, Salesforce etc


#### Tactical Design
Deals with "Solution Space"

- Bounded Context
- Entities
	- Unique (has an ID)
	- Attributes may change over time
	- May span multiple bounded contexts
- Value Objects
	- Has no ID
	- Immutable
	- Basic building blocks of the Domain Model
- Aggregates
	- Clusters one or more entities into a consistency boundary
	- Has 1 root entity
	- All other child Entities are referenced by the root
	- Usually bound to a transaction scope
- Domain Events
	- Facilitate async messaging between bounded contexts / microservices
- Services
	- Has no state
	- Encapsulate domain logic


#### Anemic Model
Uses primitives for entity props

#### Rich Model
Uses interfaces for entity props
Moves validation logic to entities

##### References
https://youtu.be/o-ym035R1eY