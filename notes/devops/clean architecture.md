2025-05-06 18:20
Tags: #system-design
##### Content
An architecture concerned with separating business logic from other layers,
similar to [[hexagonal architecture]] it puts the domain at the core and presentation / data access (called infrastructure) at the outside, and communication happens through well-defined interfaces

![[Pasted image 20250506184619.png|500]]

### Layers
- **Entities:** Business objects.
- **Use Cases:** Business rules specific to the application.
- **Interface Adapters:** Adapters between use cases and external systems.
- **Frameworks and Drivers:** External frameworks and tools.
##### References
https://www.youtube.com/watch?v=1OLSE6tX71Y
https://www.youtube.com/watch?v=JubdZIdLQ4M