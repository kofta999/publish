2025-12-24 18:34
Tags: #cloud/azure
##### Content
### Storage Account Redundancy and Object Replication

Azure Storage ensures durability by maintaining multiple copies of data.

### Standard Redundancy
- **LRS/ZRS:** Local or Zonal (1 region).
- **GRS/GZRS:** Cross-region (Primary + Secondary region).
- **Exam Trap:** In GRS, you do not control the failover unless you use **Customer-Managed Failover**. Otherwise, Microsoft decides when to fail over the entire region.

### Object-Level Replication
- **Definition:** Asynchronous block blob replication between a source and destination storage account.
- **Granularity:** Works at the **Container** level. You can use filters (prefixes) to replicate only specific blobs.
- **Flexibility:** Unlike GRS, source and destination accounts do not have to be in paired regions.
- **Tiers:** Source and destination containers can have different access tiers (e.g., Hot to Cool).
- **Requirements:** Requires Change Feed and Blob Versioning to be enabled on the source.
- **Exam Trap:** This is used for "Copying" data for specific app requirements, whereas GRS is for "Total Region Disaster Recovery."

![[Pasted image 20251224144627.png|500]]

##### References
[[storage]]