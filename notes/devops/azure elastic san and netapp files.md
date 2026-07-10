2025-12-24 18:40
Tags: #cloud/azure
##### Content
### High-Performance Block Storage: Elastic SAN and NetApp Files

When standard Managed Disks aren't enough for enterprise-scale workloads (like SQL clusters or SAP HANA).

### Azure Elastic SAN
- **What it is:** A cloud-native Storage Area Network (SAN) that uses **iSCSI** to connect to multiple VMs.
- **Hierarchy:** Storage Account -> Volume Group (Network/Security boundary) -> Volumes.
- **Scaling:** Performance is managed at the SAN level. You buy "Base Units" and "Capacity Units."
- **Exam Trap:** It is much more cost-effective than attaching hundreds of individual Premium SSDs when you need massive shared block storage.

### Azure NetApp Files (ANF)
- **What it is:** An enterprise-grade file storage service powered by NetApp. 
- **Protocols:** Supports **NFS (v3/v4.1)** and **SMB** concurrently (Dual-protocol).
- **Performance:** Offers "Extreme" throughput levels (up to 128 MiB/s per 1 TiB provisioned).
- **Management:** Managed via "Capacity Pools."
- **Exam Trap:** Use this when an application requires sub-millisecond latency and high-throughput NFS that standard Azure Files cannot provide.

##### References
[[storage]]