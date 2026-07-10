2025-12-24 18:24
Tags: #cloud/azure 
##### Content
### Blob Storage and Data Lakes

Blob (Binary Large Object) storage is optimized for storing massive amounts of unstructured data.

### Blob Types
- **Block Blobs:** Standard files (docs, images, video). Flat structure but supports "Virtual Folders."
- **Append Blobs:** Optimized for logging; data is only added to the end.
- **Page Blobs:** Optimized for random Read/Write (VHDs for VMs).

### Access Tiers
- **Hot:** Frequent access, lowest access cost, highest storage cost.
- **Cool/Cold:** Infrequent access (30/90 days), lower storage cost, higher access cost.
- **Archive:** Offline. Lowest storage cost, but highest access cost and requires **Rehydration** (hours/days) to become readable.

### Azure Data Lake Storage (ADLS) Gen2
- Enabled by turning on **Hierarchical Namespace** on a GPv2 account.
- **Benefits:** True directory structure (rename/move folders is fast), POSIX-compliant ACLs, and supports high-speed analytics (Hadoop/DFS).
- **Exam Trap:** You cannot turn off Hierarchical Namespace once enabled without recreating the account.

##### References
[[storage]]