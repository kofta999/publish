---
share_link: https://share.note.sx/8kfglq7z#aIGyZYdn0Z6rYOPtHaMso4TmVg92Q3nVMYq+evYmaKA
share_updated: 2025-12-09T23:19:56+02:00
---
2025-12-09 18:16
Tags: #storage 
##### Content

#### Fault Tolerance (FT)
**Fault Tolerance (FT)** is the ability of an IT system to continue functioning in the event of a failure, ensuring a single fault does not make an entire system or service unavailable.

* **Goal:** To protect a system against various types of unavailability, including transient, intermittent, and permanent outages.
* **Cost:** The closer an organization gets to 100% FT, the more costly the infrastructure becomes.
* **Causes of Faults:** Hardware failure, software issues, and administrator/user errors.

---

#### Key Requirements for Fault Tolerance

1.  **Eliminating Single Points of Failure (SPOF)**
    * **SPOF Definition:** Any individual component whose failure can make the entire system or service unavailable.
    * **Mitigation:** Provide redundant components for each resource. Implement redundancy at the component level (Compute, Network, Storage) and the site level (Data Center).
    * **N+1 Redundancy:** A common FT mechanism where a set of N components has at least one standby component (Active/Passive or Active/Active).
	
	![[Pasted image 20251209181501.png|500]]

2.  **Fault Isolation**
    * **Definition:** Limits the scope of a fault to a local area so other system areas are not impacted by the failure.
    * **Mechanism:** Requires fault detection and a contained system design (like a sandbox). For example, isolating a failed I/O path and redirecting I/Os to the live path.
	
	![[Pasted image 20251209181423.png|500]]

---

#### Component-Level FT Techniques

| Component   | Technique                                      | Description                                                                                                                           |
| :---------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Compute** | **Clustering** (Active/Active, Active/Passive) | Two or more compute systems work together to provide high availability and load balancing; services failover upon node failure.       |
|             | **Hypervisor Clustering**                      | Creates a synchronized **Primary VM** and **Secondary VM** on different systems, enabling immediate, transparent failover.            |
| **Network** | **Multipathing**                               | Enables a compute system to use multiple paths to a LUN, providing automated failover and load balancing across active paths.         |
|             | **Link Aggregation/NIC Teaming**               | Groups multiple links or NICs to provide network traffic failover and load distribution.                                              |
| **Storage** | **RAID / Erasure Coding**                      | Provides data protection against one or multiple drive failures.                                                                      |
|             | **Dynamic Disk Sparing**                       | Automatically replaces a failed or failing drive with a spare drive to protect against data loss.                                     |
|             | **Storage Virtualization**                     | Creates a mirrored **Virtual Volume** across LUNs on different storage systems for continuous availability, even if one system fails. |

---

#### Site-Level FT Techniques

* **Availability Zones (AZs):** Isolated locations (data centers or parts of a data center) with their own resources. Failure in one zone does not impact others.
* **Stretched Cluster:** A cluster with compute systems located in different remote locations to provide active/active zones for high availability and disaster recovery (DR) capability.

##### References
Gemini 2.5 Flash
ISM v4