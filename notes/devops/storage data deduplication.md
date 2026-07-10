2025-12-12 19:56
Tags: #storage 
##### Content
#### Data Deduplication Overview
**Data Deduplication** is the process of detecting and identifying unique data segments within a dataset to **eliminate redundancy**. 

* **Process:** Data is first **chunked** into segments, duplicate chunks are identified (usually via hash values/digital signatures), and then redundant chunks are eliminated and replaced with a **pointer** to the original unique chunk.
* **Deployment:** Can be performed in both **backup** and **production** (primary storage) environments.
* **Effectiveness:** Expressed as a **deduplication ratio** (e.g., 10:1), which is the ratio of data before deduplication to the unique data remaining after deduplication.

---
#### Drivers and Affecting Factors

##### Drivers for Deduplication
Deduplication addresses key challenges in the modern data center, particularly in backup environments:

* **Limited Backup Window:** Reduces the backup time required for 24x7 service availability.
* **Network Bandwidth Constraint:** Reduces the amount of redundant data sent across the network, especially for remote/DR replication.
* **Limited Budget/Capacity:** Reduces storage cost by lowering capacity requirements.
* **Longer Retention Period:** Helps comply with regulations demanding long-term data preservation.

##### Factors Affecting Deduplication Ratio

| Factor                       | Effect on Ratio                                                                                                   |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Retention period**         | Longer periods increase the chance of identical data, yielding a **greater** ratio.                               |
| **Frequency of full backup** | More frequent full backups increase the amount of the same data being backed up, resulting in a **higher** ratio. |
| **Change rate**              | Fewer changes between backups result in **greater** efficiency.                                                   |
| **Data type**                | Data like text/emails yields good ratios; highly unique data like audio/video yields **poor** ratios.             |
| **Deduplication method**     | **Variable-length, sub-file deduplication** discovers the highest amount of deduplication.                        |

---

#### Deduplication Granularity
The level at which data is checked for duplicates affects the efficiency.

1.  **File-Level Deduplication (Single Instance Storage)**
    * **Action:** Detects and removes redundant copies of **identical files**.
    * **Limitation:** Does not address duplicate content *inside* files; a minor file change results in storing the entire file again.
2.  **Sub-File Level Deduplication**
    * **Action:** Breaks files down into smaller blocks/segments to detect redundancy **within and across** files.
    * **Methods:**
        * **Fixed-length block:** Simple, but a minor data change can shift block boundaries, causing all subsequent blocks to appear as changed.
        * **Variable-length block:** Adjusts the block boundary only for the changed segment, leaving the rest unchanged. This yields the **greatest granularity** and highest savings.

---

#### Deduplication Methods

| Method                         | Location of Deduplication                                                                                           | Key Characteristics                                                                                                                                            |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source-Based**               | At the **source** (backup client or proxy server) before transmission.                                              | **Reduced Network Bandwidth:** Sends only new, unique segments across the network. Recommended for **remote/ROBO** (Remote Office/Branch Office) environments. |
| **Target-Based**               | At the **target** (backup device/appliance).                                                                        | **Offloads Client:** Eliminates performance impact on the backup client. Requires sufficient network bandwidth for the full dataset transfer.                  |
| **Target-Based: Inline**       | Deduplication occurs **immediately** as data is received.                                                           | Requires less storage space but may slow down the backup process.                                                                                              |
| **Target-Based: Post-Process** | Backup data is stored first, and deduplication occurs **after the backup is complete** (outside the backup window). | Requires adequate storage capacity for the full backup dataset.                                                                                                |

##### References
