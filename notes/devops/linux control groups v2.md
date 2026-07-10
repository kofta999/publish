2026-02-04 13:35
Tags: #containers 
##### Content
### cgroups v2: The Unified Hierarchy
Cgroups v2 (introduced in Linux 4.5) replaces the multiple, disjointed trees of v1 with a single, unified hierarchy. This ensures that a process’s relationship with its resources is consistent and predictable.

#### 1. The Unified Tree Structure
In v1, you had to manage `/sys/fs/cgroup/memory` and `/sys/fs/cgroup/cpu` separately. In v2, everything lives under `/sys/fs/cgroup/`.

* **Single Hierarchy:** If you create a group `user.slice`, that group exists for all controllers (Memory, CPU, IO, etc.) simultaneously.
* **The "No Internal Process" Rule:** This is the most important rule in v2. A non-root group cannot both contain processes **and** have child groups. 
    * *Why?* It prevents the "ambiguous resource" problem where a parent process competes with its own child groups for the same CPU cycles.
    * *Effect:* Processes must live in "leaf" nodes (the bottom-most groups).

#### 2. Navigating the Filesystem 
You can explore v2 by looking into `/sys/fs/cgroup`. Unlike v1, the file names are standardized:

* **`cgroup.controllers`**: (Read-only) Shows which controllers are available to this group (e.g., `cpu memory io pids`).
* **`cgroup.subtree_control`**: (Writable) Controls which controllers are **enabled** for the *children* of this group. 
    * Example: Writing `+memory +cpu` to this file enables those features for sub-groups.
* **`cgroup.procs`**: Lists the PIDs of processes belonging to this group. To move a process, you simply write its PID into this file in the destination group.
* **`cgroup.events`**: Contains the `populated` field, which tells you if the group (or its children) has any active processes.

#### 3. New Controller Features
* **Memory Domain:** v2 introduces `memory.high` (a "throttling" limit that slows down allocations) in addition to `memory.max` (the hard limit that triggers the OOM killer).
* **Unified I/O:** Because the hierarchy is unified, the I/O controller now knows which process in the memory cgroup is triggering "page cache writes," allowing for accurate write-back throttling—something v1 couldn't do.
* **Pressure Stall Information (PSI):** Files like `io.pressure`, `memory.pressure`, and `cpu.pressure` provide a "pressure" percentage. This tells you if your app is slowing down because it's actually *waiting* for resources, not just using them.

#### 4. How to check your system
**Check Version:** Run `mount -t cgroup2`. If you see a mount point at `/sys/fs/cgroup`, you are using v2.

##### References
