2026-02-04 14:30
Tags: #containers
##### Content
### Namespaces: The Isolation Layer

While **cgroups** limit *how much* a process can use, **namespaces** limit *what* a process can see. Namespaces are the core of "Container Isolation," creating the illusion for a process that it has its own dedicated system.

#### 1. Common Namespaces

* **PID (Process ID):** Provides a private set of PIDs. The first process in the namespace becomes **PID 1** (the init process). It cannot see or kill processes in other namespaces.
* **NET (Network):** Provides isolated network interfaces, IP addresses, routing tables, and firewall rules. This allows multiple containers to use port 80 on the same host.
* **MNT (Mount):** Provides a private list of mount points. A process can mount/unmount filesystems without affecting the host. This is how containers get their own root `/` filesystem.
* **UTS (UNIX Timesharing System):** Allows a process to have its own **Hostname** and **Domain name**.
* **IPC (Inter-Process Communication):** Isolates System V IPC objects and POSIX message queues, preventing processes in different namespaces from communicating via shared memory.
* **USER:** Maps user/group IDs within a namespace to different IDs on the host. A process can have **root privileges (UID 0)** inside the container but be a **non-privileged user** on the host, significantly increasing security.

#### 2. Technical Implementation

* **Creation:** Namespaces are created using the `clone()` syscall (to start a new process in a new namespace) or `unshare()` (to move the current process into a new namespace).
* **Entering:** The `setns()` syscall allows a process to "join" an existing namespace.
* **Persistence:** Namespaces are materialized as pseudo-files in `/proc/<pid>/ns/`. If you hold an open file descriptor to one of these files, the namespace stays alive even if all processes inside it exit.

#### 3. Crucial Details Often Missed

* **PID Namespace Hierarchy:** PID namespaces are nested. A process in a parent namespace can see processes in child namespaces (with different PIDs), but a child cannot see "up" into the parent.
* **Mount Propagation:** In the **MNT** namespace, you can define "Shared," "Private," or "Slave" propagation. This determines if a mount made on the host should automatically appear inside the container.
* **Network Veth Pairs:** Since a **NET** namespace is isolated, it usually connects to the host via a **veth pair** (a virtual "patch cable") where one end stays in the host's bridge and the other appears as `eth0` inside the container.

#### 4. Practical Checklist

To see the namespaces of your current shell, run:

```bash
ls -l /proc/self/ns
```

To run a command in a new namespace for testing (e.g., a private hostname):

```bash
sudo unshare --uts bash
```

##### References
