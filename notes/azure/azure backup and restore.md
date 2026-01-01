2026-01-01 19:25
Tags: #azure 
##### Content
### Azure Backup and Restore

Azure Backup is a PaaS solution for data protection. For the exam, focus on **Vault Types**, **Agent Differences**, and **Restore Scenarios**.

### 1. The Vaults (Where data lives)
* **Recovery Services Vault:** The "Legacy/Standard" vault. Used for VMs (Azure/On-prem), SQL/SAP HANA on Azure VMs, and MARS agent backups.
* **Backup Vault:** The newer vault type. Used for newer workloads like **Azure Blobs**, **Azure Disks**, and **Azure Database for PostgreSQL**.
* **Storage Redundancy:** (Must be set *before* backups start)
    * **LRS:** Local redundancy (cheap, protected against disk failure).
    * **GRS:** Geo-redundancy (default, protected against region failure).
    * **CRR (Cross Region Restore):** Allows you to restore data in a secondary region *anytime*, not just when Azure declares a disaster.

### 2. Backup Methods (How data gets there)
| Method              | Usage                      | Key Tech Detail                                                                                |
| :------------------ | :------------------------- | :--------------------------------------------------------------------------------------------- |
| **Azure VM Backup** | Native Azure VMs           | No agent needed in the OS. Uses VM extensions to take snapshots.                               |
| **MARS Agent**      | Files/Folders/System State | Installed on the machine. Backs up **directly to the Vault**. No local cache.                  |
| **MABS / DPM**      | Apps & Full Servers        | Centralized server. Requires a local disk for **short-term cache** before offloading to Azure. |

### 3. Restore Operations (The "Exam-Traps")
When restoring an **Azure VM**, you have three main choices:
1. **Create New VM:** Standard recovery. Creates a new VM from the disk.
2. **Replace Existing:** Swaps the disk on the current VM. Note: The VM must be **shut down**.
3. **Restore Disk:** Just restores the VHDX/VHD files to a storage account. You manually attach them later.

**File-Level Recovery (The ILR Tool):**
* Azure Backup provides a **downloadable script** (executable for Windows, python for Linux).
* When run, it mounts the recovery point as a **Local Drive** (iSCSI) on the machine where you run the script.
* **Compatibility:** You can run this script on *any* machine with internet access, but the OS must match (e.g., don't run a Linux recovery script on a Windows laptop).

### 4. Policy & Security
* **Backup Policy:** Defines **Frequency** (Daily/Weekly) and **Retention** (How long to keep points).
* **Soft Delete:** Enabled by default. Deleted backup data is kept for **14 days** at no extra cost to prevent accidental/malicious deletion.
* **Multi-User Authorization (MUA):** Adds a "Resource Guard" requirement. An admin needs a second approval to change backup policies or delete backups.

### 5. Exam Quick-Check
* **Does Azure Backup support Linux?** Yes, via VM extensions and MABS (for Hyper-V/VMware), but **MARS** is Windows-only.
* **Can you back up a powered-off VM?** Yes. It will be a "File-consistent" backup rather than "Application-consistent."
* **Minimum nodes for MABS?** MABS is a single server, but for high-scale, you'd use multiple. (Don't confuse with AVS 3-node minimum).

##### References
