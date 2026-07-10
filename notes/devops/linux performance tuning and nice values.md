2026-06-18 14:33
Tags: #linux #redhat 
##### Content
## Performance Tuning

RHEL utilizes the `tuned` daemon to adjust `sysctl` parameters, power states, and CPU governor limits dynamically based on active workloads.

* **Static Tuning:** Pre-defined, predictable profiles applied at boot.
* **Dynamic Tuning:** Live kernel parameter modifications responding to real-time resource saturation.
* **Core Profiles:** `virtual-guest`, `throughput-performance`, `aws`, `hpc-compute`.

## The EEVDF CPU Scheduler (RHEL 10 Evolution)

Starting with RHEL 10 (Kernel 6.6+), the legacy **Completely Fair Scheduler (CFS)** has been fully replaced by the **Earliest Eligible Virtual Deadline First (EEVDF)** scheduler.

While CFS optimized purely for fairness by selecting tasks with the lowest `vruntime`, it notoriously struggled with latency for tasks waking up from sleep (e.g., network I/O, audio). EEVDF solves the "fairness vs. latency" tradeoff mathematically without relying on opaque heuristics.
* **Lag:** The difference between a task's mathematically ideal fair share of CPU time and its actual physical execution time.
* **Eligibility:** A task is only allowed to compete for the CPU if its lag is >= 0 (meaning it has not "overspent" its virtual time allocation).
* **Virtual Deadline (VD):** Calculated based on the task's requested time slice.
* **Selection:** The scheduler executes the **eligible** task with the **earliest** virtual deadline.

> **Operational Deep-Dive (OSTEP Context):**
>  Drawing from the Proportional Share chapters in the [[ostep lec 3|OSTEP]] curriculum, CFS achieved proportional fairness using a Red-Black tree to track virtual runtime, but lacked a mechanism for processes to express strict latency requirements. EEVDF introduces a temporal constraint directly into the selection algorithm. When a process with a lower `nice` value (heavier weight) requests a CPU slice, the kernel calculates an earlier virtual deadline. This allows a waking latency-sensitive process to instantly preempt a CPU-bound process without violating the long-term mathematical fairness of the system runqueue.

## Nice Values & Process Priority

Processes under the standard `SCHED_NORMAL` policy (Time Sharing `TS` in process lists) utilize `nice` values to request CPU priority from the EEVDF scheduler.

* **Nice Range:** `-20` (Highest Priority / Highest Weight) to `+19` (Lowest Priority / Lowest Weight). Default is `0`.

| Command / Flag | Execution Behavior |
| --- | --- |
| `nice -n -5 <command>` | Launches a new process with a designated nice value. (Negative values require superuser privileges). |
| `renice -n 10 -p 1234` | Alters the nice value of an existing, running PID directly in memory. |
| `ps -o pid,priority,nice,cls,pcpu,comm` | Exposes the scheduling class (`CLS`) and current nice value (`NI`). |

> **Execution Constraints:** Real-time scheduling classes (`SCHED_FIFO` or `SCHED_RR`) inherently outrank standard processes and entirely ignore `nice` values, displaying a `-` in the `NI` column of `ps`. EEVDF only manages the distribution of cycles among the `SCHED_NORMAL` processes after all real-time queues are completely empty.

##### References
