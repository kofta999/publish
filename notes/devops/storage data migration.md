2025-12-12 20:05
Tags: #storage 
##### Content
**Data Migration** involves the transfer of data between hosts (physical or virtual), storage devices, or formats.

* **Goal:** IT organizations require **non-disruptive live migration** solutions to meet required Service Level Agreements (SLAs).
* **Reasons for Deployment:**
    * Data center maintenance without downtime.
    * Disaster avoidance.
    * Technology refresh.
    * Data center migration or consolidation.
    * Workload balancing across data centers (multiple sites).

---

#### Data Migration Methods

##### 1. Storage System-Based Migration
Moves data between heterogeneous storage systems, independent of applications and server operating systems.

* **Control Storage System:** The storage system that performs and manages the migration operations.
* **Operation Types:**
    * **Push:** Data is moved *from* the control storage system *to* the remote storage system.
    * **Pull:** Data is moved *from* the remote storage system *to* the control storage system.
* **Consistency:** **Hot** operations keep the control device online during migration, and the control system tracks changes to ensure data integrity. **Cold** operations require the control device to be inaccessible, guaranteeing data consistency because both devices are offline.

![[Pasted image 20251212200634.png|500]]

##### 2. Virtualization Appliance-Based Migration
Migration is handled by a **virtualization appliance** (translation layer) located in the SAN, between compute and storage systems.

* **Mechanism:** The appliance abstracts LUNs into a storage pool and provisions **virtual volumes** to the compute system.
* **Key Benefit:** Supports non-disruptive data migration between **multivendor heterogeneous storage systems**. LUNs remain online and accessible during migration because the compute system continues to point to the same virtual volume.

![[Pasted image 20251212200741.png|500]]

##### 3. Hypervisor-Based Migration
This method uses the virtualization platform to move compute resources and storage files.

* **VM Migration (Live Migration):** The running VM and its entire active state (memory, etc.) are moved from one physical compute system to another, within or across data centers, **without any downtime**.
    * **Uses:** Scheduled maintenance, VM load balancing, and moving applications closer to consumers (using stretched cluster). 
	
	![[Pasted image 20251212200830.png|500]]

* **VM Storage Migration:** Migrates the VM files (disk, configuration, swap files) from one storage system to another, potentially across dissimilar storage systems, **without service disruption**.
    * **Uses:** Simplifies array migration/storage upgrades, dynamically optimizes storage I/O performance, and enables tiered storage capacity management.
	
	![[Pasted image 20251212200905.png|500]]

---
#### Disaster Recovery as a Service (DRaaS)
DRaaS is a cloud-based solution that enables organizations to have a disaster recovery (DR) site in the cloud, provided by a service provider.

* **Model:** Uses a **pay-as-you-go** pricing model and automated virtual platforms, leading to cost reduction and faster recovery time.
* **Operation:** During normal production, data is replicated from the consumer's data center to the cloud. If a disaster occurs, business operations **failover** to the provider's infrastructure.
##### References
