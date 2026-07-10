2025-12-28 18:34
Tags: #cloud/azure 
##### Content
### VM Sizing: Series and Families

Azure categorizes VMs into "Families" based on the hardware optimization.

| Family | AWS Equivalent | Optimization | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **A-Series** | t2.micro/small | Entry-level | Dev/Test, simple web servers. |
| **B-Series** | T3 / T4g | Burstable | Variable workloads (bursty). |
| **D-Series** | M5 / M6g | General Purpose | Enterprise apps, balanced CPU/RAM. |
| **E-Series** | R5 / R6g | Memory Optimized | In-memory DBs, large caches. |
| **F-Series** | C5 / C6g | Compute Optimized | Batch processing, web servers. |
| **N-Series** | P3 / G4 | GPU Accelerated | ML, Video editing, Rendering. |
| **H-Series** | Hpc6a | High Performance | Scientific modeling (InfiniBand). |

### The Naming Decoder (Exam-Trap)
Azure VM names like `Standard_D2s_v5` contain specific "flags":
* **s**: Supports **Premium Storage** (SSD). If the 's' is missing, you cannot attach Premium SSDs.
* **d**: Includes a **Local Temp Disk** (SSD/NVMe). Newer versions (v5+) often move the temp disk to a separate SKU.
* **a**: Uses **AMD** processors.
* **p**: Uses **ARM** (Ampere) processors.

![[Pasted image 20251228153158.png|500]]

### Administrative Implementation
* **Benchmarking:** Per John Savill, **CoreMark** is no longer the standard. Always test the specific workload on a SKU to measure performance.
* **Constrained vCPU:** For database workloads (SQL/Oracle) where you need high RAM/Storage but want to save on per-core licensing, you can select a size that "hides" cores from the OS.
* **Resizing:** You can resize a VM, but it **requires a reboot**. If the new size isn't available on the current physical hardware cluster, the VM must be **Deallocated** first.

##### References
[[compute]]