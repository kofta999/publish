2025-12-28 18:42
Tags: #cloud/azure
##### Content
### Specialized Hosting: "Only Child" Compute Options

Beyond standard multi-tenant VMs, Azure offers five distinct specialized hosting models for isolation, compliance, or hybrid requirements.

| Option                 | Core Concept           | Key Technical Detail                                                                                                                                |
| :--------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Isolated VMs**       | Single-tenant hardware | The VM size is so large it consumes the entire physical host. Guaranteed physical isolation.                                                        |
| **Dedicated Host**     | Physical Server Rental | You buy the "box." Allows you to place multiple VMs of the same series on it. Best for **Azure Hybrid Benefit** (core-based licensing).             |
| **Azure Local**        | Edge Infrastructure    | (Formerly Azure Stack HCI). Hyperconverged infrastructure (HCI) software running on validated partner hardware at your site. Managed via Azure Arc. |
| **Azure Arc**          | Hybrid Control Plane   | Extends Azure management (RBAC, Policy, Defender) to VMs running *outside* Azure (on-prem, AWS, Google Cloud).                                      |
| **Azure VMware (AVS)** | VMware on Azure        | Dedicated bare-metal nodes running VMware ESXi. Managed via vCenter. Connects to Azure VNets via **ExpressRoute Global Reach**.                     |

### Admin Note: Bare-Metal Infrastructure
Used for massive workloads that cannot be virtualized (e.g., SAP HANA Large Instances). 
* **Control:** You get root access to the OS on the physical hardware.
* **Connectivity:** Requires a consultation and ExpressRoute to connect to your Azure VNet.

##### References
[[compute]]