2025-12-24 18:28
Tags: #cloud/azure
##### Content
### Azure Files and Azure File Sync

Azure Files provides fully managed file shares in the cloud accessible via SMB or NFS protocols.

### Protocols and Tiers
- **SMB (2.1, 3.0, 3.1.1):** Standard for Windows/Linux. Supported on Standard and Premium.
- **NFS (4.1):** Requires **Premium** File Storage and a specific network setup.
- **Exam Trap:** Standard Files use a "Pay-as-you-go" model; Premium Files use a "Provisioned" model (you pay for the GBs you allocate, regardless of usage).

### Azure File Sync
- **Purpose:** Caches Azure File shares on an on-premises Windows Server.
- **Cloud Tiering:** Keeps frequently accessed files on the local server and "tiers" (moves) older files to Azure Files to save local disk space.
- **Sync Group:** Defines the relationship between the **Cloud Endpoint** (Azure Share) and the **Server Endpoint** (Local path).
- **Exam Trap:** Antivirus or backup software on the local server can accidentally trigger "Full Recall" of all tiered files if they try to scan the whole drive.

##### References
[[storage]]