2025-12-12 19:36
Tags: #storage 
##### Content
#### Continuous Data Protection (CDP)

**Continuous Data Protection (CDP)** is a network-based replication solution that tracks all changes to production volumes to provide the ability to restore data and Virtual Machines (VMs) to **any previous Point-in-Time (PIT)**.

* **Recovery:** Unlike traditional methods with limited restore points, CDP's tracking capabilities allow rollback to *any* moment.
* **Support:** Supports both local and remote replication (including multisite) and heterogeneous compute/storage platforms.
* **Efficiency:** Uses WAN optimization techniques (like deduplication and compression) to reduce bandwidth requirements.

---

#### Key CDP Components

| Component          | Function                                                                                                                      | Implementation                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **CDP Appliance**  | Intelligent platform (hardware or virtual) that runs the CDP software and manages the local and remote replication processes. |                                                                                       |
| **Write Splitter** | Intercepts writes from the compute system to the production volume and **splits each write into two copies**.                 | Can be implemented at the compute system, fabric, or storage system.                  |
| **Journal Volume** | Stores all the **changed data** and **metadata** from the production volume since the replication session started.            | The size of the journal determines how far back the available recovery points can go. |

---

#### CDP Operations (Local and Remote Replication)

1.  **Splitting:** The **Write Splitter** intercepts a write I/O and sends one copy to the production volume and the other copy to the local **CDP Appliance**.
2.  **Local Replication:** The local appliance writes the data to the **Journal Volume**, and the data is then copied to the local **Replica**. The local journal enables recovery to any PIT.
3.  **Remote Replication:** The local appliance sends the write I/O (often sequenced and compressed) to the remote CDP appliance. The remote appliance writes the data to the remote Journal Volume, which then copies the data to the remote **Replica** at predefined intervals.
4.  **Modes:** CDP can operate in **synchronous** mode (application waits for remote acknowledgment) or **asynchronous** mode (local appliance acknowledges write immediately).

![[Pasted image 20251212193738.png]]


**Hypervisor-based CDP** is a deployment variation where the specialized hardware appliance is replaced by a **virtual appliance** running on the hypervisor, and the **write splitter is embedded in the hypervisor** itself.
##### References
