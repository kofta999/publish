---
share_link: https://share.note.sx/io2lxyd6#R+k3opxKxVRyQb47qt8Vj1kjfHCiVoUafYqljt0sHG4
share_updated: 2025-05-08T23:27:04+03:00
---
2025-05-03 20:54
Tags: #system-design
##### Content
A type of [[n layered architecture]] but focuses more on two other concepts, ports and adapters.

![[Pasted image 20250503205808.png|500]]

### Port
- An contract for the app to interact with the outside world without knowing what it's interacting with
- For example, to have a read and write method to interact with whatever (files, db etc)

### Adapter
- Where the core logic happens to read / write data
- Abstracts away data access code from core application logic

For both ports and adapters:
Inputs (driving side) -> Outputs (driven side)

#### When to use
- High testability needs
- High maintainability and flexibility, easy to change data access technologies

#### When not to use
- Adds lots of complexity to code
- Hard to run locally when having multiple components
- Not the best performance because of latency between components

##### References
https://youtu.be/bDWApqAUjEI
https://scalastic.io/en/hexagonal-architecture-domain/