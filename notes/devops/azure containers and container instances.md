2025-12-29 20:47
Tags: #cloud/azure 
##### Content
### Container Fundamentals and ACI

Containers virtualize the Operating System (OS) rather than the hardware, providing a lightweight, immutable execution environment.

### Core Concepts
- **Namespaces & Cgroups**: Linux kernel features used to isolate resources (CPU, memory) and processes.
- **Layers**: Container images are built in layers; if a layer exists locally, it is reused (efficient).
- **containerd**: The industry-standard high-level runtime used by Azure.
- **Hyper-V Containers**: Exclusive to Windows; provides a dedicated kernel for higher isolation between the container and the host.

### Azure Container Instances (ACI)
The fastest way to run a container in Azure without managing servers (CaaS).
- **OS Support**: Linux and Windows.
- **Networking**: Supports Public IPs and **Private IP integration** (VNet injection). Note: VNet integration is currently **Linux only** for ACI.
- **Lifecycle**: Best for task automation, build agents, or simple burst scenarios.
- **Virtual Kubelet**: Allows ACI to act as a "burst" node for AKS, providing "infinite" capacity without managing more VM nodes.

### Exam-Trap: Storage
Containers are ephemeral. To persist data in ACI, you must mount an **Azure File Share**. Standard NFS or local disks will lose data on restart.
![[Pasted image 20251229205032.png]]

##### References
[[modern app services]]