---
share_link: https://share.note.sx/wt6f504e#hID5ncrB94QojybDDf+UaO6csWpr7VOccl0gtZlEEv0
share_updated: 2025-04-09T17:15:25+02:00
---
2025-04-07 13:26
Tags: #system-design
##### Content
Described as a single deployment unit, with functionality grouped by technical categories. Layers go up to down

Example:
- presentation layer: UI / API endpoints + integration testing
- business layer: business logic + unit testing / mocking
- services layer
- persistence layer
- database layer: interface to interact directly with the database + unit test db queries

Each layer can either be open (can be ignored, business -> persistence for example) or closed (business -> services -> persistence)

#### When to use
- When tight on budget and cost
- When a single layer changes but the others are static

#### When not to use
- When features need to get to the market ASAP
- When your changes are domain-based

#### Characteristics (1~5)
- cost 5
- simplicity 5
- maintainability 1
- testability 2
- deployability 1
- elasticity 1
- scalability 1
- fault-tolerance 1
- evolvability 1
- performance 3

##### References
https://youtu.be/Y9bKZCYxFuI
https://www.youtube.com/watch?v=xJC7ItRoEbw