2025-12-26 22:07
Tags: #azure 
##### Content
### VNet Connectivity: Peering and VPNs

Connecting VNets allows resources to communicate as if they were on the same network.

### VNet Peering
- **Connection:** Uses the Microsoft Global Backbone (traffic never hits the internet).
- **Types:** Regional (same region) and Global (different regions).
- **Constraints:** Address spaces **cannot overlap**.
- **Transitivity:** Peering is **not transitive**. If VNet A is peered to VNet B, and B to C, A cannot talk to C unless you peer A and C directly OR use a Gateway/Virtual WAN.
- **Cost:** Charged for both Ingress and Egress traffic.

### Site-to-Site (S2S) VPN
- **Mechanism:** Encrypted IPsec tunnel over the public internet.
- **Components:** Requires a Virtual Network Gateway (VPN SKU) and a Local Network Gateway (representing the on-prem router).
- **Routing:** Policy-based (Static) or Route-based (Dynamic via BGP). Route-based is required for P2S, S2S co-existence, and multi-site.

### Point-to-Site (P2S) VPN
- **Use Case:** Individual devices (laptop) connecting to an Azure VNet.
- **Authentication:** Azure AD (Entra), Certificates, or RADIUS.

##### References
[[networking]]