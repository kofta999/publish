2025-12-28 18:40
Tags: #azure
##### Content
### Specialized Compute: HPC and InfiniBand

For high-performance computing (HPC) workloads, standard Ethernet latency is often too high.

### What is InfiniBand?
* A high-bandwidth, low-latency communication link used primarily in **H-series** and **N-series** VMs.
* Provides **RDMA (Remote Direct Memory Access)** capabilities, allowing VMs to communicate nearly memory-to-memory without CPU overhead.

### Administrative Use Case
* **AWS Bridge:** Similar to AWS **Elastic Fabric Adapter (EFA)**.
* Used for computational fluid dynamics, weather forecasting, and massive ML training clusters.
* **Requirement:** To use InfiniBand, VMs must typically be in the same **Proximity Placement Group**.

##### References
[[compute]]