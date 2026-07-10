2026-02-04 13:29
Tags: #containers
##### Content
### Control Groups (cgroups) v1
cgroups are a Linux kernel feature used to limit, account for, and isolate the resource usage (CPU, memory, disk I/O, etc.) of a collection of processes.

**Core Architecture**
* **Subsystems (Controllers):** Independent resource modules (CPU, Memory, blkio).
* **Hierarchies:** In v1, each subsystem has its own independent tree hierarchy. A process can be in different nodes in the CPU tree vs. the Memory tree.
* **Nodes:** Each node represents a group of processes. The hierarchy starts at a `root` node.

**Memory Cgroup**
* **Accounting:** Tracks pages used by each group: **File** (disk-backed), **Anonymous** (malloc), and Active/Inactive pages.
* **Charging:** Every page is "charged" to a single group. If pages are shared, only one group is billed.
* **Limits:**
    * **Soft Limit:** Not strictly enforced; pages may be evicted to disk if the system is under memory pressure.
    * **Hard Limit:** Strictly enforced; exceeding this triggers a per-group **OOM (Out of Memory) Killer**.
    * **Scope:** Limits can be set for Physical, Kernel (internal structures), or Total (Physical + Swap) memory.
* **Overhead:** Updating counters every time a page is allocated/deallocated adds overhead; often requires a reboot to enable/disable.

**CPU & CPUset Cgroups**
* **CPU Accounting:** Tracks user/system time and usage per CPU core.
* **CPU Limits (Weights):** Uses weights (1 to 10k, default 100) to distribute CPU time during contention. 
* **CPUset:** Used to "pin" processes to specific physical CPUs.
    * **Use Case:** Avoids processes "bouncing" between CPUs (cache invalidation). Essential for **NUMA** systems and High-Performance Computing (HPC).

**Other Subsystems**
* **blkio:** Throttles I/O per block device (Read/Write, Sync/Async). Note: Buffered writes appear fast because they hit the page cache, but the background flush to disk is throttled.
* **devices:** Controls access to device nodes (`/dev/*`) for reading, writing, or creating (`mknod`).
* **freezer:** Suspends all processes in a group. Unlike `SIGSTOP`, it is **invisible** to the process.

##### References
