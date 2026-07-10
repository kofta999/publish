2026-02-24 19:05
Tags: #os #kubernetes
##### Content

In Kubernetes, CPU is a **compressible** resource, meaning the system can throttle a process's execution speed without killing it. While we define this in "millicores," under the hood, Kubernetes translates these human-readable units into **Linux Control Groups (cgroups)** parameters.

### 1. The Millicore Abstraction
Kubernetes defines $1000m$ (millicores) as equivalent to **1 vCPU/Core** of time. 
* This is an **absolute** unit of time, not a percentage of the host's total power. 
* On a 2-core machine, you have $2000m$ available. 
* On a 64-core machine, $1000m$ still represents the same "quantity" of processing time (one core's worth).
---

### 2. CPU Requests: `cpu.shares` (The Floor)
When you set a `request: 500m`, Kubernetes converts this into `cpu.shares`.
* **The Mapping:** $1000m = 1024$ shares. So, $500m \approx 512$ shares.
* **Mechanism:** This uses a **Proportional-Share Scheduler**. It does not limit a container if the CPU is idle.
* **The OS Reality:** If your Pod is the only thing running on a 32-core node, it can consume all 32 cores even if its request is only $100m$. The "shares" only matter during **Contention** (when the sum of demand $> 100\%$). At that point, the kernel ensures your Pod gets its weighted fair share ($100/32000$) of the cycles.

---
### 3. CPU Limits: `cfs_quota_us` (The Ceiling)
When you set a `limit: 200m`, Kubernetes uses the **Completely Fair Scheduler (CFS) Bandwidth Control** to enforce a hard wall.
* **The Period (`cfs_period_us`):** Usually fixed at **100ms**.
* **The Quota (`cfs_quota_us`):** Calculated as $\text{Limit} \times \text{Period}$.
    * For a $200m$ limit ($0.2$ cores): $0.2 \times 100ms = 20ms$.
* **Enforcement:** Your Pod is allowed to run for **20ms** out of every **100ms** window. Once it uses those 20ms, the kernel **throttles** (deschedules) the processes until the next 100ms period begins.
---
### 4. The Multi-core Trap (Parallel Execution)
The CFS quota tracks **cumulative** time across all threads in the container.
* **The Scenario:** You have a Pod with `limit: 1000m` (1 core) running on a **16-core node**.
* **The Math:** Your quota is $100ms$ of CPU time per $100ms$ period.
* **The Trap:** If your application spawns **10 threads** that all work simultaneously, they will consume that $100ms$ quota in just **10ms** of real-world time ($10 \text{ threads} \times 10ms = 100ms \text{ quota}$).
* **The Result:** Your app runs for 10ms and is then **frozen/throttled** for the remaining 90ms of the period. This causes massive tail latency ($P99$) spikes, even if the "average" CPU usage looks low.

---
### Summary Table

| K8s Concept  | OS Mechanism   | Behavioral Type     | Impact of Exceeding                |
| :----------- | :------------- | :------------------ | :--------------------------------- |
| **Requests** | `cpu.shares`   | Work-Conserving     | None (unless node is at 100% load) |
| **Limits**   | `cfs_quota_us` | Non-Work-Conserving | **Throttling** (Latency spikes)    |
##### References
[[linux control groups v2]]
