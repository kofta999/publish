2025-12-29 20:51
Tags: #cloud/azure 
##### Content
### Azure Kubernetes Service (AKS) Architecture

AKS is a managed Kubernetes offering where Microsoft manages the Control Plane (Free) and you manage/pay for the nodes.

### AKS Tiers
- **Free**: No management fee. 99.5% SLO for the API server. No support for "Uptime SLA."
- **Standard**: Recommended for production. Includes a **financially backed Uptime SLA** (99.9% or 99.95%). Supports higher scale (up to 5000 nodes).
- **Premium**: Includes everything in Standard plus long-term support for Kubernetes versions and enhanced security features.

### Node Pools
- **System Node Pools**: Must host critical system pods (CoreDNS, etc.). Must be Linux.
- **User Node Pools**: Host your application pods. Can be Linux or Windows.
- **Spot Node Pools**: Can be used for User pools to save costs (up to 90% discount).

### Administrative Features
- **Start/Stop**: You can completely stop an AKS cluster to save costs on compute (nodes) while preserving the cluster configuration.
- **Auto-healing**: AKS monitors node health and automatically replaces failed nodes.
- **Auto-upgrade**: Can be configured to automatically apply Kubernetes version updates.
- **Managed Identity**: AKS uses Managed Identities to interact with Azure resources like Load Balancers and Container Registries (ACR).

![[Pasted image 20251229205259.png]]

##### References
[[modern app services]]