2026-06-19 16:42
Tags: #linux #redhat 
##### Content

## Protocol Versions (NFSv3 vs NFSv4)

* **NFSv3:** Relies on the `rpcbind` service to map dynamic RPC ports (like `mountd` and `lockd`), complicating firewall configurations.
* **NFSv4:** Modern implementation that operates entirely over a single, static TCP port (2049). It maintains connection state, supports strong Kerberos cryptographic authentication, and eliminates the need for `rpcbind`.

## Static Mounting Constraints

Defining an NFS share directly in `/etc/fstab` (e.g., `server:/share /mnt/nfs nfs defaults 0 0`) introduces severe stability risks:

* If the network link is dead during system initialization, the boot process will hang indefinitely waiting for the socket timeout.
* Active connections to dead servers induce high system load averages and unkillable process states (State `D` in `ps`).

## Automounter Architecture

Automounters resolve static mount risks by dynamically mounting network shares only at the exact moment a user or process accesses the directory, and automatically unmounting them after a period of inactivity.

* **Method 1: systemd `x-systemd.automount`:** Embedded directly into `/etc/fstab`.
```text
server:/share  /mnt/nfs  nfs  defaults,x-systemd.automount,x-systemd.idle-timeout=1min  0 0
```


*Must execute `systemctl daemon-reload` and `systemctl start mnt-nfs.automount` to engage.*
* **Method 2: `autofs` Service:** Centralized, highly scalable mapping service.

## AutoFS Mapping Implementations

Managed via the primary configuration file: `/etc/auto.master`.

**1. Direct Mapping:** The network share mounts to a specific, permanent, absolute directory path.

* **Master Config Entry:** `/- /etc/auto.direct`
* **Map File Syntax (`/etc/auto.direct`):** `/mnt/static_nfs -rw,sync server:/remote_path`

**2. Indirect Mapping:** The service monitors a parent directory. The actual mount point is dynamically created as a subdirectory *only* when accessed.

* **Master Config Entry:** `/mnt/indirect /etc/auto.indirect`
* **Map File Syntax (`/etc/auto.indirect`):**
`dynamic_folder -rw,sync server:/remote_path`
* **Wildcard Mapping (`*`):** Used to map user home directories dynamically based on the requested folder name.
`* -rw,sync server:/remote_path/&`

> **Note:** Executing `ls` on an empty indirect mount directory (e.g., `/mnt/indirect`) will display nothing, as the daemon requires a specific path access to trigger the mount syscall. You must explicitly execute `ls /mnt/indirect/dynamic_folder` or `cd` into the target directory to force the kernel to fire the network I/O block and instantiate the mount.

##### References
