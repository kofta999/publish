---
share_link: https://share.note.sx/zvlmecbd#T7/7APe9zIHTpEDS1+BKabfi0miWgduu3WqjrK/Osp8
share_updated: 2025-12-09T23:23:53+02:00
---
2025-12-09 23:04
Tags: #storage 
##### Content
#### Fibre Channel (FC) SAN Topologies

FC switches (or directors) can be connected in various ways to form different fabric topologies, each offering distinct benefits.

| Topology | Description | Key Features |
| :--- | :--- | :--- |
| **Single-Switch** | Fabric consists of only one switch/director. Both compute and storage systems connect to the same switch.  | **No ISLs** (Interswitch Links) are required, making every switch port available for node connectivity. Eliminates ISL delays. |
| **Full Mesh** | Every switch is connected to every other switch. Appropriate for a small number of switches (e.g., up to four).  | Requires a maximum of **one ISL/hop** for compute-to-storage traffic. Available node ports decrease as the number of switches increases. |
| **Partial Mesh** | Not all switches are connected to every other switch. Offers more scalability than full mesh.  | **Several ISLs/hops** may be required for traffic to reach its destination. Traffic management can be complex, and ISLs may become overloaded. |
| **Core-Edge** | **Core Tier** (directors) is attached to the **Edge Tier** (switches) via ISLs. Edge switches are not connected to each other. | Increases connectivity while **conserving port utilization** by eliminating edge-to-edge ISLs. All storage systems are typically connected to the high-availability core tier. |
![[Pasted image 20251209230516.png|300]]    
![[Pasted image 20251209230538.png|300]]
![[Pasted image 20251209230601.png|300]]

---
#### Link Aggregation

**Link aggregation** combines two or more parallel **ISLs** into a single logical link, called a **port-channel**.
* **Benefit:** Provides **higher throughput** than a single ISL.
* **Function:** Optimizes fabric performance by distributing network traffic across all ISLs in the port-channel, ensuring **even ISL utilization** and preventing bottlenecks.

![[Pasted image 20251209230622.png|600]]

---
#### Zoning

**Zoning** is a logical private path established between node ports in a fabric.
* **Function:** It provides access control, enabling only members within the same zone to communicate with each other.
* **Restricting RSCN Traffic:** Zoning limits the broadcast of **Registered State Change Notification (RSCN)** messages, sending them only to nodes in the zone where the change occurred, thus reducing fabric management traffic.
* **Hierarchy:** Zoning uses a hierarchy: **Members** (ports/nodes) are grouped into **Zones**, which are grouped into **Zone Sets**. Only one zone set can be active at a time. 
* *Note:* a brand-new SAN Switch will block all traffic by default, until **Zones** are created

##### Types of Zoning

| Zoning Type      | Membership Defined By                                       | Key Advantage                                                                                                                             |
| :--------------- | :---------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **WWN Zoning**   | **World Wide Names (WWN)** of the node ports.               | **Flexibility:** If a node is moved to another switch port, it maintains connectivity because the WWN is static.                          |
| **Port Zoning**  | **Physical Switch Port ID** (Domain ID and port number).    | If a node fails and is replaced, the zoning configuration does not need to change, provided the new device is connected to the same port. |
| **Mixed Zoning** | Combines the qualities of both **WWN** and **Port** zoning. | Enables a specific node port to be tied to the WWN of another node.                                                                       |

![[Pasted image 20251209230811.png|500]]

##### References
Gemini 2.5 Flash
ISM v4