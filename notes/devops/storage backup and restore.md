2025-12-12 19:48
Tags: #storage 
##### Content
#### Backup and Recovery Overview
A **Backup** is an additional copy of production data created and retained for the sole purpose of recovering lost or corrupted data.

* **Necessity:** Organizations implement backup solutions to protect against accidental deletion, crashes, corruption, and disaster, and to comply with regulatory requirements.
* **Scope:** It is critical to back up both **application data** and **server configurations** (OS, applications, and settings) to ensure a complete system recovery after an outage.

---

#### Backup Architecture
The core components coordinate the movement and tracking of data:

* **Backup Server:** Manages backup operations, schedules, and maintains the **Backup Catalog**, which stores configuration details and backup metadata.
* **Backup Client:** Software installed on application servers/desktops that gathers the data to be backed up and sends it to the Storage Node.
* **Storage Node:** Responsible for organizing the client data and writing it to the Backup Device, sending metadata back to the Backup Server.
* **Backup Device (Target):** The final repository for the data (e.g., tape, disk, cloud).

![[Pasted image 20251212194930.png|500]]

---

#### Backup Operation

1.  The **Backup Server** initiates the scheduled backup, retrieving information from the **Backup Catalog**.
2.  The server instructs the **Storage Node** to load media and instructs the **Backup Client** to send data.
3.  The **Client** sends backup data to the **Storage Node** and tracking information (metadata) to the **Backup Server**.
4.  The **Storage Node** writes data to the **Backup Device** and sends additional metadata (data location, time) to the Backup Server.
5.  The **Backup Server** updates the **Backup Catalog**.

##### Backup State

* **Hot Backup (Online):** Application is running and accessible during backup. Requires an open file agent to handle files in use, which can affect performance.
* **Cold Backup (Offline):** Application (e.g., database) must be shut down during backup, guaranteeing consistency but causing downtime.

---
#### Backup Granularity
Organizations typically use a combination of these methods to balance storage space and recovery time.

| Type                        | Data Copied                                        | Restore Time                                                                                          | Storage Used                                                           |
| :-------------------------- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Full Backup**             | The entire data set.                               | Fastest recovery (only one copy needed).                                                              | Highest (most time and space required).                                |
| **Incremental Backup**      | Data changed **since the last backup** (any type). | Slowest; requires restoring the last full backup plus every subsequent incremental copy.              | Lowest.                                                                |
| **Cumulative/Differential** | Data changed **since the last full backup**.       | Faster than incremental; requires restoring only the last full backup and the latest cumulative copy. | Increases over the week (more than incremental, less than daily full). |

---

#### Backup Targets

| Target                         | Advantages                                                                                                                                | Disadvantages/Notes                                                                                                                                     |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tape Library**               | Portable, suitable for long-term offsite storage.                                                                                         | Sequential access (slow backup/restore), lack of duplicate content recognition, data integrity/recoverability issues, and hidden offsite storage costs. |
| **Disk Library**               | Enhanced backup and recovery **performance**. Purpose-built appliances include deduplication, compression, and replication features.      | No inherent offsite capability; often used as a fast staging area.                                                                                      |
| **Virtual Tape Library (VTL)** | Emulates tape drives using disks; provides better performance and reliability than physical tape without changing legacy backup software. |                                                                                                                                                         |

---

#### Recovery Operations
Recovery restores data to its original state at a specific point in time (PIT).

1.  A **Backup Client** requests a restore from the **Backup Server**.
2.  The **Backup Server** identifies the data, PIT, and receiving client from the **Backup Catalog**.
3.  The **Storage Node** retrieves the data from the **Backup Device** and sends it to the **Backup Client**.
4.  In complex cases (like databases), additional log files must be restored to ensure data consistency, extending the RTO.

---

#### Advanced Backup Techniques

* **Agent-Based Backup:** An agent runs *inside* the VM or server, performing file-level backup. **Disadvantage:** Consumes CPU/memory resources and impacts application performance.
* **Image-Based Backup:** Copies the entire **VM image** (virtual drive and configuration) as a single entity.
    * **Advantage:** No agent required inside the VM. Backup processing is **offloaded to a proxy server** using VM snapshots.
    * **Recovery-in-Place:** A related technique that means running a VM directly from the backup device without transferring the image to primary storage first. This provides **almost instant recovery** (reduced RTO).
* **NDMP-Based Backup:** Uses **Network Data Management Protocol (NDMP)**.
    * **Purpose:** Designed for backup in a **NAS environment**.
    * **Mechanism:** Backup data is sent **directly from the NAS to the backup device**. This eliminates traffic passing through application servers and preserves file system security attributes.
* **Primary Storage-Based Backup:** Data is backed up directly from the primary storage system to the backup target. This isolates backup traffic to the SAN, **eliminating backup impact on application servers** and improving performance.

##### References
Gemini 2.5 Flash
ISM v4
