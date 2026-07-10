2025-12-26 22:18
Tags: #cloud/azure
##### Content
### Advanced Network Management: Firewall, vWAN, and vNet Manager

As environments grow, centralized management replaces individual peering and NSG management.

### Azure Firewall
- **Function:** A managed, cloud-based network security service (L3-L7) that protects VNet resources.
- **SKUs:**
    - **Basic:** For SMBs; limited throughput and features.
    - **Standard:** Includes L3-L7 filtering and Threat Intelligence.
    - **Premium:** Includes **IDPS (Intrusion Detection/Prevention)** and **TLS Inspection**.
- **Admin Specifics:** Requires a dedicated subnet named `AzureFirewallSubnet` (at least /26).

### Azure Virtual WAN (vWAN)
- **Function:** A networking service that provides optimized and automated branch connectivity to, and through, Azure.
- **The Hub:** A Microsoft-managed VNet that hosts gateways (VPN, ExpressRoute, Firewall).
- **SKUs:**
    - **Basic:** Site-to-Site VPN only.
    - **Standard:** Full mesh connectivity (ExpressRoute, User VPN, Inter-hub, and Vnet-to-Vnet transitivity).

### Azure Virtual Network Manager (AVNM)
- **Function:** Centralized management for connectivity and security across subscriptions.
- **Connectivity Topologies:**
    - **Mesh:** All VNets in the group are connected to each other (automatic peering).
    - **Hub and Spoke:** Standard star topology.
    - **Direct Connect:** A Hub and Spoke where spokes can also talk directly to other spokes in the same group.
- **Security Admin Rules:** High-priority rules that are evaluated **before** NSGs. Can be used to "Always Allow (skip NSGs)" or "Always Deny" traffic across the entire organization.

##### References
[[networking]]