---
share_link: https://share.note.sx/hysulsu0#x4m7Xy2rAlUbsTIPHrGKGCipLSoD4AXyXDCC874rImw
share_updated: 2025-12-09T23:23:03+02:00
---
2025-12-09 19:10
Tags: #storage 
##### Content
#### Storage Provisioning Overview

**Storage Provisioning** is the process of assigning storage resources to a compute system based on its requirements for capacity, availability, and performance.

* **Methods:** Provisioning can be done in two ways:
    1.  **Traditional Provisioning**
    2.  **Virtual Provisioning** (leverages virtualization technology)

---

#### Logical Unit Number (LUN)

A **LUN** is a unique ID assigned to a logical unit (volume, partition, or device) created from a RAID set.

* **Function:** LUNs hide the organization and composition of the underlying RAID set from the compute systems.
* **Access:** Once assigned, a LUN appears to the host/compute system as an internal physical disk. In virtualized environments, a LUN is often assigned to the hypervisor, which then creates virtual storage drives (files on the hypervisor file system) for the VMs.

---
#### 1. Traditional Provisioning (Thick LUNs)

In traditional provisioning, physical drives are grouped into a **RAID set**.

* **LUN Type:** LUNs created using this method are called **Thick LUNs**.
* **Allocation:** The entire capacity of the LUN is allocated and reserved from the RAID set at the time of creation, regardless of whether the compute system uses it.
* **Characteristics:** The RAID level and drive configuration determine the LUN's availability, capacity, and predictable performance.
* **Suitability:** Suited for applications that require **predictable performance** and where administrators need full control for precise data placement.

![[Pasted image 20251209191125.png|600]]

---

#### 2. Virtual Provisioning (Thin LUNs)

Virtual provisioning leverages a **shared pool** of physical storage drives, which is analogous to a RAID set.

* **LUN Type:** LUNs created using this method are called **Thin LUNs**.
* **Allocation:** Thin LUNs do **not** require their full capacity to be physically allocated at creation. Physical storage is allocated **on-demand** from the shared pool as the compute system writes data.
* **Benefits:**
    * **Over-Provisioning:** Enables presenting more capacity to compute systems than is physically available (oversubscription).
    * **Efficiency:** Significantly improves storage capacity utilization.
    * **Scalability:** Both the shared pool and the thin LUN can be expanded **non-disruptively** as requirements grow. Expansion of the pool requires **rebalancing** (data relocation) to ensure uniform data spread across all drives. 
* **Suitability:** Best for applications that can tolerate performance variations and where **space consumption is difficult to forecast**.

![[Pasted image 20251209191351.png|600]]

---
#### LUN Masking (Access Control)

**LUN Masking** is a process implemented on the storage system that defines which LUNs a compute system can access.

* **Function:** It provides data access control and **prevents unauthorized or accidental use** of LUNs in a shared environment, ensuring data integrity and security.

##### References
Gemini 2.5 Flash
ISM v4
