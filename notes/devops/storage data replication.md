2025-12-10 10:12
Tags: #storage
##### Content
#### Data Replication Overview
**Data Replication** is the process of creating an exact copy (replica) of data to ensure **business continuity** in the event of a local outage or disaster.

- **Goal:** Replicas are used to restore and restart operations if data loss occurs.
- **Locations:** Data can be replicated to one or more locations, including within a data center, between data centers, or to the cloud.
- **Terminology:** The LUN containing the production data is the **source** (or production LUN), and the LUN where the data is copied is the **target** (or replica).

---
#### Primary Uses of Replicas
Replicas are created for multiple business purposes to alleviate the burden on the production system:

- **Fast Recovery and Restart:** Enables quick recovery from data loss or immediate restart of production operations, reducing the RTO (Recovery Time Objective).
- **Alternative Source for Backup:** Replicas can be used as the source for backup operations, removing the I/O workload from the production LUNs.
- **Decision-Support Activities:** Running reports or analytics on the replica reduces the I/O burden on the production device.
- **Testing Platform:** Used for testing new applications or upgrades before implementation in the production environment.
- **Data Migration:** Used as part of the process for migrating data, such as moving from a smaller LUN to a larger one.

---
#### Replica Characteristics and Types

A critical characteristic of any replica is **consistency**, which ensures the replica is usable for both recovery and restart operations.

| **Characteristic**              | **Definition**                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Point-in-Time (PIT) Replica** | The replica is an identical image of the source at a specific time (e.g., Monday 4:00 PM). Results in a **Nonzero RPO**. |
| **Continuous Replica**          | The replica is always in sync with the production data. The objective is a **Near-zero RPO**.                            |

---

#### Types of Replication

Replication is broadly categorized based on location:

| **Type**               | **Location**                                                                    | **Primary Purpose**                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Local Replication**  | Within the same location (e.g., within the same storage system or data center). | Typically used for quick operational restore of data or immediate application restart. |
| **Remote Replication** | To geographically dispersed remote locations.                                   | Mitigates risks associated with regional outages and disasters.                        |

##### Local Replication Techniques

- **VM Snapshot:** Preserves the state and data of a VM at a specific PIT.
    - Creates a **child virtual disk** (delta disk) where all new writes are directed, while the base image (parent disk) remains read-only.
    - Snapshots only hold changed blocks.
	
- **Storage System-Based Snapshot (RoW):** A space-optimal, pointer-based virtual replica.
    - Uses **Redirect on Write (RoW)**: New writes destined for the source LUN are redirected to a reserved LUN in the storage pool. The replica is served by reading untouched data from the source LUN.
    
- **Clone:** Creates a **fully populated PIT copy** of a LUN or an existing VM.
    - Requires an **initial synchronization** (copying all data) between source and clone.
    - VM clones are separate, identical copies often used for rapid deployment of multiple VMs.

##### Remote Replication Techniques
1. **Synchronous Replication** 
    - **Process:** A write must be committed to **both the source and the remote target** before the "write complete" acknowledgment is sent to the compute system.
    - **RPO:** Provides **near-zero RPO** (zero data loss).
    - **Limitation:** Increases application response time because the acknowledgment waits for the remote commit. Typically deployed over short distances (less than 200 km).
	
2. **Asynchronous Replication**
    - **Process:** The write is committed to the source and **immediately acknowledged** to the compute system. Data is buffered at the source and sent to the remote site periodically.
    - **RPO:** Results in a **finite RPO** (replica is behind the source by some amount of time).
    - **Benefit:** Application response time is not dependent on link latency. Enables replication over long distances (thousands of kilometers).
    
3. **Multisite Replication**
    - Data is replicated from a source site to **multiple remote sites**.
    - **Benefit:** Mitigates the risk of a regional disaster taking out both sites in a two-site synchronous setup, ensuring disaster recovery protection is always available.
##### References
Gemini 2.5 Flash
ISM v4