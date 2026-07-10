2025-12-24 18:32
Tags: #cloud/azure
##### Content
### Managed Disks and VM Storage

Managed Disks abstract the complexity of Storage Accounts, treating disks as individual ARM resources.

### Disk SKUs
- **Standard HDD/SSD:** For dev/test and light workloads.
- **Premium SSD v1:** High performance. Performance is tied to **Disk Size** (e.g., a P30 disk has fixed IOPS).
- **Premium SSD v2:** Performance (IOPS/Throughput) can be configured independently of size.
- **Ultra Disk:** Sub-millisecond latency. Can change performance while the disk is attached.

### Ephemeral vs. Persistent
- **Ephemeral:** Uses the local temp storage of the VM host. Data is lost if the VM is deallocated.
- **Persistent:** Managed disks stored in Azure Storage. Data survives deallocation.

### Exam Trap: Throughput Bottlenecks
- A VM has a max IOPS limit (e.g., 1000).
- A Disk has a max IOPS limit (e.g., 5000).
- If you attach that disk to that VM, you will be capped at **1000 IOPS** (The VM is the bottleneck).

##### References
[[storage]]