2026-05-31 14:06
Tags: #linux #redhat
##### Content
### Core Concept

The system **Load Average** is a metric provided by the Linux kernel that represents the perceived system load over a period of time. It roughly measures how many processes are currently demanding resources (either CPU time or critical I/O) and are waiting for a request to complete.

### Calculation Mechanics

* **Polling Interval:** The kernel collects the load number every **5 seconds**.
* **Process States Counted:** Unlike some operating systems that only count CPU usage, Linux calculates load based on the number of processes in two specific states:
	* **`R` (Runnable):** Processes actively executing on a CPU or queued waiting for a CPU.
	* **`D` (Uninterruptible Sleep):** Processes waiting on critical, uninterruptible disk or network I/O.
* **Reporting:** The metric is reported as an **exponential moving average** over three distinct time windows: the last **1 minute**, **5 minutes**, and **15 minutes**. (Typically viewed via `top`, `htop`, or `uptime`).

### Interpreting the Numbers (The Core Count Rule)

A load average number is essentially meaningless without knowing the hardware's total CPU core count.

* **The Formula:** To determine the actual percentage of system utilization, divide the load average by the number of available logical CPU cores.
* **The "Traffic Light" Analogy (Assuming a 1-Core System):**
	* `0.00` - `0.70`: Healthy. The CPU has idle time.
	* `1.00`: At capacity. The CPU is perfectly utilized with no backlog.
	* `> 1.00`: Overloaded. Processes are forced to wait in the queue, causing noticeable system lag.
* **Multi-Core Scaling:** On a 4-core system, a load average of `4.00` means the system is at exactly 100% capacity. A load of `1.00` on a 4-core system means the system is only at 25% capacity.

### Diagnostics & Troubleshooting

Because Linux includes the `D` (I/O wait) state in its load calculation, high load does not always mean the CPU is maxed out.

* **High Load + High CPU:** The system is computationally bottlenecked. You need more processing power or need to terminate rogue processes.
* **High Load + Low CPU:** The system is experiencing a severe **I/O bottleneck**. Processes are piling up in the `D` state waiting for disk reads/writes or network responses (e.g., a failing hard drive, maxed-out IOPS, or an unresponsive NFS mount).

##### References
