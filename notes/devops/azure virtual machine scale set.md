2025-12-28 19:09
Tags: #cloud/azure
##### Content
### VMSS: Orchestration Modes (Uniform vs. Flexible)

Virtual Machine Scale Sets (VMSS) provide the "Horizontal Scaling" (Scale-out) capability for Azure. Choosing the right Orchestration mode is a critical "Day 0" decision.

| Feature | Uniform (Legacy/Standard) | Flexible (Recommended) |
| :--- | :--- | :--- |
| **Model** | Defined by a single "VM Profile." | Can mix VM sizes and types. |
| **Visibility** | VMs are "instances" inside the set. | VMs are visible as standard Azure VMs. |
| **Compatibility** | Limited with standard Backup/ASR. | Works with Azure Backup, ASR, and RBAC. |
| **Scale** | Up to 1000 (if Marketplace image). | Up to 1000 (with full VM management). |
| **Spot/On-Demand** | Choose one for the whole set. | Can mix Spot and On-Demand in one set. |

### Operational Logic
* **Fault Domains:** Flexible mode allows you to specify the number of fault domains (1-3) to ensure high availability even for non-identical workloads.
* **Scale-in Policy:** You can define which VM is deleted first (e.g., `OldestVM`, `NewestVM`, or `Balanced`).
* **Instance Repair:** If enabled, Azure monitors the health of the application. If an instance becomes "Unhealthy," VMSS automatically deletes it and creates a new one.

##### References
[[compute]]