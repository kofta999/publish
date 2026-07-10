2026-05-02 23:04
Tags: #linux #prometheus
##### Content

In the context of monitoring and scaling, understanding CPU modes is critical. Prometheus’s `node_exporter` tracks these by reading `/proc/stat` on Linux. The metric `node_cpu_seconds_total` is a **counter** that represents the cumulative time (in seconds) the CPU has spent in various states.

---

### CPU Modes Explained
These modes are mutually exclusive. At any given nanosecond, a CPU core is in exactly one of these states:

*   **`user`**: Time spent running non-kernel code (your Spring Boot app, Nginx, etc.). High user time usually indicates a **CPU-bound** application.
*   **`system`**: Time spent in the kernel. High values often point to high system call overhead (I/O, context switching, or network stack processing).
*   **`iowait`**: The CPU is idle, but there is an outstanding disk or network I/O request. High `iowait` means your bottleneck is the **Disk or Network**, not the CPU calculation power itself.
*   **`idle`**: The CPU has nothing to do.
*   **`irq` & `softirq`**: Time spent servicing hardware and software interrupts.
*   **`steal`**: Relevant in Virtual Machines (VMs). This is time the physical CPU was busy serving *other* VMs while your VM was ready to run. High steal is a sign of "noisy neighbors" or an oversubscribed hypervisor.
*   **`guest`**: Time spent running a virtual CPU for guest operating systems.

---
### PromQL: Calculating Usage
Since these metrics are counters, a raw value is useless (it only goes up). We must calculate the **rate of change** over time.

#### 1. Per-Second Usage per Mode
To see the actual "load" per mode over the last minute:
```promql
rate(node_cpu_seconds_total{instance="my-server"}[1m])
```

#### 2. Aggregated Machine Usage
To see the total breakdown across all CPU cores for a single machine:
```promql
sum by (mode) (rate(node_cpu_seconds_total{instance="my-server"}[1m]))
```

#### 3. Total CPU Utilization %
A common "Dashboard" metric is the percentage of the CPU that is *not* idle. 
> **Logic:** Since the total of all modes sums to exactly 1 second per second (per core), the percentage used is $1 - idle\_rate$.

```promql
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)
```

---
### Deep Dive: CPU usage in the JVM (Spring Boot)
When you monitor your Spring Boot application, "User" time is your primary focus. However, the JVM introduces specific behaviors:

*   **Garbage Collection (GC):** When a "Stop-the-World" GC event occurs, you will see a spike in **user** time across multiple cores (if using parallel collectors like G1 or ZGC), but your application throughput will drop to zero.
*   **JIT Compilation:** At startup, the JVM's Just-In-Time compiler (C1/C2) will consume significant **user** CPU to optimize bytecode into native machine code.
*   **Context Switching:** If your Spring app has too many threads (exceeding the CPU core count significantly), you will see an increase in **system** time as the kernel spends cycles swapping thread contexts on the processor.

---
### Technical Note: Counters vs. Gauges
On the **OS level**, `/proc/stat` increments these values as "ticks." Node exporter converts these ticks to seconds. In Prometheus, treating these as **Counters** is vital because if a machine reboots, the counter resets to zero. Using the `rate()` function handles these resets (counter leaps) automatically, whereas simple subtraction would result in a massive negative spike.
##### References
