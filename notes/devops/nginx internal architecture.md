2026-04-20 12:47
Tags: #nginx 
##### Content

### Process Roles
* **Master Process:** The orchestrator. It performs privileged tasks (reading config, binding to ports) and manages the lifecycle of child processes. It does not handle client requests.
* **Worker Processes:** The functional "workhorses."
    * **Count:** Ideally matches the number of CPU cores (or 2x if Hyperthreading).
    * **Pinning:** Using `worker_cpu_affinity` locks each worker to a specific core. This eliminates **Context Switching** overhead, ensuring the CPU's L1/L2 cache stays "hot" with TLS session keys and request parsing logic.
* **Cache Processes:**
    * **Cache Manager:** Periodically checks the cache state and removes expired data to keep it within the configured `max_size`.
    * **Cache Loader:** Runs only at startup to load metadata from the disk-based cache into shared memory.

---

### The Kernel Connection Lifecycle
The journey of a request from the wire to an Nginx worker involves two primary kernel-level queues:

1.  **SYN Queue (Incomplete):** The kernel stores the initial TCP SYN packet here while waiting for the client's ACK to complete the **3-way handshake**.
2.  **Accept Queue (Complete):** Once the handshake is finished, the connection moves here. It stays in the kernel until an Nginx worker "pulls" it using the `accept()` system call.

### Connection Distribution Logic
How a worker picks a connection depends on the Nginx configuration and the Linux kernel version:

* **Legacy Mode (`accept_mutex`):** Workers compete for a mutex lock. Only the worker with the lock can accept new connections. This prevents the "Thundering Herd" problem (all workers waking up for one request) but can be slow.
* **Modern Mode (Standard):** On Linux 4.5+, the kernel uses **`EPOLLEXCLUSIVE`**, which naturally wakes up only one worker process, effectively load-balancing between them without the need for a mutex.
* **Socket Sharding (`reuseport`):** 
	* If `listen 80 reuseport;` is set, the kernel creates multiple listening sockets (one for each worker).
    * The **Kernel itself** performs the load balancing, assigning incoming connections to specific workers' queues. This results in the highest performance and lowest latency.

---

### I/O Execution: The Bottleneck Shift
Nginx is asynchronous, but the operations it performs are often constrained by hardware:

| Operation | Constraint | Technical Logic |
| :--- | :--- | :--- |
| **TLS/SSL Handshake** | **CPU Bound** | Requires heavy mathematical computation (RSA/ECDHE). This is the primary reason for core pinning. |
| **Static File Serving** | **I/O Bound (Disk)** | Uses `sendfile` to move data. If the disk is slow, workers can stall unless **Thread Pools** are used. |
| **Reverse Proxying** | **I/O Bound (Network)** | Dependent on the latency between Nginx and the Upstream. Nginx uses an event loop to handle thousands of these "waiting" states simultaneously. |

### Technical Note: `somaxconn`
On the **OS Internals** level, if your Nginx is under heavy load, the kernel **Accept Queue** might fill up. You must tune the Linux kernel parameter `net.core.somaxconn` (System Max Connections) to match the `backlog` parameter in your Nginx `listen` directive. If the queue overflows, the kernel will drop new connections before Nginx even knows they exist.

##### References
