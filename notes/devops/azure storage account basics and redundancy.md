2025-12-24 18:20
Tags: #cloud/azure 
##### Content
### Storage Account Essentials and Redundancy
Azure Storage is a software-defined storage solution using a 3-tier architecture: Front-end (API), Partition (Logic), and Stream (Hardware/Bits).

### Storage Account Basics
- **Namespace:** Provides a unique DNS name (e.g., `mystorage.blob.core.windows.net`).
- **Standard vs. Premium:** Standard uses HDDs/SSDs (GPv2); Premium uses SSDs for low-latency (specific to Blob, File, or Page Blob).

### Redundancy Options
All options maintain at least 3 copies of data.
- **LRS (Locally Redundant):** 3 copies in a single Data Center. Protects against rack failure.
- **ZRS (Zone Redundant):** 3 copies across 3 different Availability Zones in one region. Protects against AZ failure.
- **GRS (Geo-Redundant):** LRS in the primary region + LRS in a paired secondary region (Asynchronous). 
- **GZRS (Geo-Zone Redundant):** ZRS in primary + LRS in secondary. Highest durability.

![[Pasted image 20251224141719.png|500]]

### Exam Traps
- **Secondary Endpoint:** In GRS/GZRS, the secondary region is "invisible" unless you enable **RA-GRS** (Read-Access), which provides a second URL for read-only failover tests.
- **Regional Pairs:** You cannot choose your GRS target; Azure has pre-defined regional pairs (e.g., East US pairs with West US).

##### References
[[storage]]