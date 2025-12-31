2025-12-22 21:18
Tags: #azure
##### Content
### Identity Fundamentals
Identity is the primary security perimeter in the cloud. The goal is to apply the principle of least privilege to any service, ensuring users and services have only the minimum access required.

### Classic Identity
Requires a central store for identities known as an Identity Provider (IdP). The IdP validates the identity and issues tokens to service providers.

![[Pasted image 20251222183233.png|500]]

### Decentralized Identity (DID)
Puts the user at the center instead of the IdP. The user owns a Decentralized ID (DID) issued by a provider. The user uses this DID to communicate with a verifier that requests information, giving the user control over what data is shared.

![[Pasted image 20251222183343.png|500]]

##### References
[[identity]]