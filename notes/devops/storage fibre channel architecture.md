---
share_link: https://share.note.sx/nwn4gfei#XJIwJZ6vAMbXqLdY+nvxffg79dwyp9wu2ZcJFuSjVns
share_updated: 2025-12-09T23:23:38+02:00
---
2025-12-09 22:58
Tags: #storage 
##### Content
#### Fibre Channel (FC) Architecture Overview

FC architecture integrates the benefits of both channel (high performance, low overhead) and network (high scalability, long distance) technologies.

* **Mechanism:** It implements **SCSI over FC network**, encapsulating and transporting SCSI data within FC frames.
* **Result:** Storage devices attached to the FC SAN appear as if they are **locally attached** to the compute system's Operating System (OS) or hypervisor.

---
#### FC Protocol Stack
The FC protocol defines five layers (FC-0 through FC-4), though FC-3 is not implemented.

| FC Layer | Function              | Details/Examples                                                                      |
| :------- | :-------------------- | :------------------------------------------------------------------------------------ |
| **FC-4** | Mapping interface     | Maps Upper Layer Protocols (ULPs) like **SCSI**, IP, or ESCON to the lower FC layers. |
| **FC-3** | Common services       | **Not implemented**.                                                                  |
| **FC-2** | Routing, flow control | Defines frame structure, FC addressing, flow control, and fabric services.            |
| **FC-1** | Encode/decode         | Defines **8b/10b** or **64b/66b** encoding/decoding and bit/frame synchronization.    |
| **FC-0** | Physical layer        | Defines the physical interface, media, cables, and connectors for transmission.       |

![[Pasted image 20251209225907.png|500]]

---

#### FC Addressing and Naming

| Name/Address              | Type                       | Format/Purpose                                                                                                                                                 |
| :------------------------ | :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **World Wide Name (WWN)** | Static, 64-bit identifier. | Similar to a MAC address, it is burned into hardware. **WWNN** identifies the adapter (node), and **WWPN** identifies the adapter port.                        |
| **FC Address**            | Dynamic, 24-bit address.   | Assigned during fabric login and used for **routing data** through the fabric. Format: **Domain ID** (switch) + **Area ID** (port group) + **Port ID** (port). |

---
#### FC Data Structure
Data is organized hierarchically for transfer:

1.  **Exchange:** Manages a set of **information units** (ULP-specific information) and is composed of one or more sequences.
2.  **Sequence:** A contiguous set of frames that corresponds to an information unit.
3.  **Frame:** The fundamental unit of data transfer at the FC-2 layer.
    * **Structure:** Consists of five parts: **SOF** (Start of Frame), **Frame Header** (24 bytes, contains addressing), **Data Field** (0-2112 bytes, carries SCSI data), **CRC** (error detection), and **EOF** (End of Frame).

---
#### Fabric Login Types (In Switched Fabric)
Three types of login are defined for nodes (N\_Ports) to communicate:

1.  **Fabric Login (FLOGI):** Occurs between an **N\_Port** and an **F\_Port** (on the switch). The node sends its WWN to the Fabric Login Server and receives its dynamic **FC address** from the switch. Immediately registers with the Name Server.
2.  **Port Login (PLOGI):** Occurs between two **N\_Ports** to establish a session and exchange service parameters.
3.  **Process Login (PRLI):** Occurs between two **N\_Ports** to exchange Upper Layer Protocol (ULP) related parameters (e.g., SCSI parameters).

##### References
