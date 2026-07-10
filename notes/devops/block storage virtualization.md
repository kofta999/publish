---
share_link: https://share.note.sx/yld1eij8#DEIa523A5B98smPvOUXj9HP9Hse/ivJVS2iBDZ0Z4r4
share_updated: 2025-12-09T23:20:51+02:00
---
2025-12-09 23:11
Tags: #storage 
##### Content
#### Block-Level Storage Virtualization
Block-level storage virtualization introduces a virtualization layer within the SAN, which abstracts the underlying physical storage and enables flexible provisioning. 

* **Mechanism:**
    * The virtualization layer abstracts block-based storage systems (LUNs).
    * It **aggregates LUNs** from various storage systems to create a **Storage Pool**.
    * **Virtual Volumes** are created from this pool and assigned to compute systems.
    * The virtualization layer transparently **maps I/O requests** from the virtual volume to the appropriate physical LUNs.
* **Benefits:**
    * **Online Expansion:** Enables non-disruptive expansion of virtual volume capacity.
    * **Non-Disruptive Data Migration:** The virtualization layer handles LUN migration (even in a multi-vendor environment) while the virtual volume remains online and accessible to the compute system.

![[Pasted image 20251209231151.png|400]]

---
#### Virtual SAN (VSAN) / Virtual Fabric

A **Virtual SAN (VSAN)** is a group of node ports that communicate using a virtual topology defined on the physical SAN. Multiple VSANs can exist on a single physical SAN.

* **Isolation and Management:** Each VSAN behaves and is managed as an independent fabric, with its own fabric services, configuration, and set of FC addresses. Events causing traffic disruption in one VSAN are contained and not propagated to others.
* **Benefits:** VSANs improve **security** (by isolating sensitive data), **scalability** (by reusing FC addresses in different VSANs), and **manageability** (by allowing configuration changes without recabling).

![[Pasted image 20251209231339.png|500]]

##### VSAN Trunking and Tagging

* **VSAN Trunking:** Allows network traffic from multiple VSANs to traverse a single **Interswitch Link (ISL)**, known as a **trunk link**. This reduces the total number of ISLs required between switches.
* **VSAN Tagging:** A process associated with trunking where a VSAN-specific tag (containing the VSAN ID) is added to the FC frames. This ensures that the frames from different VSANs remain isolated while sharing the trunk link.

**VSAN vs. Zone:** VSANs and Zones both logically segment a fabric, but they are not the same. A VSAN operates at a higher level, having its own independent fabric services, whereas zones are configured independently *within* each VSAN.

##### References
