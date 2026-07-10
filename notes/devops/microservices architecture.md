2025-04-17 13:14
Tags: #system-design
##### Content
Single purpose functions, separately deployed as separate units with each unit owning its own data and does one thing **very well**.
Consider each microservice owning like its own tables 

##### Bounded Context (share nothing architecture)
- A context bounding the microservice with its own data
- So each service **owns** the data, it cannot access any other service's data and no service can access its data
- Means I can change my data without affecting any other services

#### When to use
- When feature time to market is critical
- When agility / elasticity is of need
- When the application should be highly fault-tolerant
- When using cloud-based deployments

#### When not to use
- When we have tightly-coupled, relational data that we can't break apart
- When we have tight time and budget constraints
- When we have teams divided by technical layers (frontend, backend, etc..)
- When we have highly semantically coupled functionality, like if doing one thing calls a lot of services

#### Characteristics (1~5)
- cost 1
- simplicity 1
- maintainability 5
- testability 5
- deployability 5
- elasticity 4
- scalability 5
- fault-tolerance 5
- evolvability 5
- performance 2

##### References