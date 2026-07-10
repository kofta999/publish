2025-12-26 22:10
Tags: #cloud/azure
##### Content
### ExpressRoute Architecture and Resiliency

ExpressRoute provides a private, high-bandwidth connection between on-premises and Azure, bypassing the public internet.

### How it Works
1. **The Circuit:** A logical connection between your on-premise infrastructure and Azure through a connectivity provider.
2. **Peering Locations:** The "Meet-me" point where the provider's routers connect to Microsoft's routers (MSEE - Microsoft Enterprise Edge).
3. **Gateways:** An "ExpressRoute Gateway" is required in the VNet to route traffic from the circuit into the VNet.

### SKUs and Pricing
- **Local:** Cheapest. Includes unlimited data egress but only connects to regions in the same local peering location.
- **Standard:** Connects to all regions in a geo-political area (e.g., all of North America). Egress is charged by the GB.
- **Premium:** Global connectivity (connect to a VNet in Europe from a circuit in the US) and increased route limits.

### Advanced Features
- **FastPath:** Traffic skips the ExpressRoute Gateway and goes directly to the VMs in the VNet. Reduces latency and gateway CPU load.
- **Global Reach:** Connects two on-premise locations together via the Microsoft Backbone using two different ExpressRoute circuits.
- **ExpressRoute Metro:** Provides high availability within a single city by using two different peering points (Meet-me locations) to protect against a site-wide disaster.

### Resiliency Summary
- **Standard:** One circuit, two connections (primary/secondary) to one peering location.
- **Resilient:** Two circuits at two different peering locations (e.g., Silicon Valley and Seattle).

##### References
[[networking]]