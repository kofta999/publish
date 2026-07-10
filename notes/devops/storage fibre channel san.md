---
share_link: https://share.note.sx/5njm0a60#C9TTlusaAN0zxlWD75xm88+xGReXad0JSW0TDMxcXrY
share_updated: 2025-12-09T23:23:26+02:00
---
2025-12-09 22:44
Tags: #storage 
##### Content

#### Fibre Channel SAN (FC SAN)

**FC SAN** is a type of SAN that uses the Fibre Channel (FC) protocol for communication. It is a high-speed network technology (with speeds up to 128 Gb/s) running on optical fiber or serial copper cables.

![[Pasted image 20251209224802.png|300]]

##### FC SAN Components

| Component Type               | Examples                                                                                   | Function/Notes                                                                                                                                                                                                                           |
| :--------------------------- | :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Network Adapters** (Nodes) | FC Host Bus Adapters (**HBAs**) in compute systems; Front-end adapters in storage systems. | HBAs encapsulate SCSI I/O into FC frames for transmission.                                                                                                                                                                               |
| **Cables**                   | Copper (short distance); **Optical Fiber** (long distance).                                | **Multimode Fiber (MMF)**: Used for short distances (typically within a data center) due to modal dispersion (cheap). **Single-mode Fiber (SMF)**: Used for long distances (up to 10 km) as it minimizes signal attenuation (expensive). |
| **Interconnecting Devices**  | **Hubs, Switches, and Directors**.                                                         |                                                                                                                                                                                                                                          |

##### FC Interconnecting Devices

* **FC Hub:** Connects nodes in a logical loop (FC-AL) where all nodes **share the loop**. Provides limited connectivity and scalability.
* **FC Switch:** Routes data directly; each node has a **dedicated communication path**. Provides a fixed port count that can be scaled non-disruptively.
* **FC Director:** High-end switch with a higher port count and **modular architecture**. All key components are redundant and hot-swappable, ensuring high availability.

##### FC Interconnectivity Options

1.  **Point-to-Point:** Two nodes connected directly. Provides a dedicated connection but has limited connectivity and scalability (used in DAS environments).
2.  **FC Arbitrated Loop (FC-AL):** Devices attached to a shared loop must **arbitrate** to gain control of the loop. Only one device can perform I/O at a time, resulting in low performance.
3.  **FC Switched Fabric (FC-SW):** Uses one or more FC switches (interconnected by **Interswitch Links - ISLs**). Data transfers through a **dedicated path** between nodes. Provides high scalability and is minimally disruptive when adding/removing nodes. 

##### Port Types in Switched Fabric

| Port                         | Definition                                                                             |
| :--------------------------- | :------------------------------------------------------------------------------------- |
| **N\_Port** (Node Port)      | An endpoint in the fabric, typically a compute system HBA port or storage port.        |
| **E\_Port** (Expansion Port) | Connects two FC switches, forming an **ISL**.                                          |
| **F\_Port** (Fabric Port)    | A port on a switch that connects an **N\_Port**.                                       |
| **G\_Port** (Generic Port)   | Automatically determines its functionality (E\_Port or F\_Port) during initialization. |
![[Pasted image 20251209224705.png|600]]

##### NVMe over Fibre Channel

* This technology is designed to transfer **NVMe-based data** over an FC network.
* **Benefit:** Reduces latency and improves the performance of Solid-State Drives (SSDs).

##### References
Gemini 2.5 Flash
ISM v4
