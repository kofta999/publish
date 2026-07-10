2025-12-28 19:05
Tags: #cloud/azure
##### Content
### Azure VMware Solution (AVS)

AVS allows you to run VMware workloads natively on Azure bare-metal infrastructure. It is managed as a "Private Cloud" resource within the Azure Portal.

### Architecture & Management
* **The Stack:** Runs VMware vSphere, vCenter, vSAN, and NSX-T.
* **Management:** Microsoft manages the physical hardware and the VMware software lifecycle; you manage the VMs and vCenter settings.
* **Connectivity:** Requires **ExpressRoute Global Reach** to connect your on-premises VMware environment directly to the AVS private cloud.

### Scaling Constraints (Exam-Trap)
* **Node Limits:** A single cluster must have a **minimum of 3 nodes** (for vSAN quorum/redundancy).
    * A single cluster can scale up to a **maximum of 16 nodes**.
* **Private Cloud Scale:**
    * An AVS Private Cloud can contain between **1 to 12 clusters**.
* **Bare Metal:** These are dedicated physical hosts (e.g., AV36 or AV52 SKUs). You do not share the underlying hardware with other Azure customers.

### Use Case
* Rapid "lift and shift" where refactoring to native Azure VMs is too costly or complex.
* Maintaining operational consistency with existing VMware tools and skills.
##### References
[[compute]]