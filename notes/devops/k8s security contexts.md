2026-04-13 11:03
Tags: #kubernetes 
##### Content
### Summary/Purpose
A **Security Context** defines the privilege and access control settings for a Pod or Container. It allows you to move beyond simple Kubernetes-level permissions and into **OS-level hardening**, such as restricting which user the process runs as, preventing root access, or granting specific Linux kernels capabilities.

---

### Core Logic/Mechanism: Pod vs. Container Level
Security contexts can be applied at two levels. If a setting is defined in both, the **container-level** setting takes precedence.

* **Pod-Level:** Applies to all containers within the Pod. Useful for setting a shared user ID or filesystem group.
* **Container-Level:** Applies only to the specific container. Certain settings, like **Linux Capabilities**, can *only* be set at the container level.

---

### Key Parameters: Security Settings

| Setting                    | Level     | Description                                                                          |
| :------------------------- | :-------- | :----------------------------------------------------------------------------------- |
| **runAsUser**              | Both      | Specifies the UID the process runs as.                                               |
| **runAsGroup**             | Both      | Specifies the GID the process runs as.                                               |
| **runAsNonRoot**           | Both      | If `true`, Kubelet validates the image at runtime to ensure it doesn't run as UID 0. |
| **capabilities**           | Container | Allows granting/dropping specific Linux kernel privileges (e.g., `NET_ADMIN`).       |
| **privileged**             | Container | Runs the container as root on the host, bypassing almost all security boundaries.    |
| **readOnlyRootFilesystem** | Container | Mounts the container's root filesysem as read-only.                                  |

---

### Linux Capabilities
Standard Linux divides the privileges traditionally associated with the "root" user into distinct units called **Capabilities**. This allows you to follow the **Principle of Least Privilege**—giving a container just enough power to do its job without making it a full root user.

* **Common Capabilities:**
    * `NET_BIND_SERVICE`: Allow binding to ports < 1024.
    * `SYS_TIME`: Allow modifying the system clock.
    * `CHOWN`: Allow changing file ownership.


---

### Usage Patterns/Strategies
* **Hardening:** Use `allowPrivilegeEscalation: false` to prevent a process from gaining more privileges than its parent.
* **Storage Access:** Use `fsGroup` (Pod-level) to ensure that all containers in a Pod can read/write to a shared volume by giving them a common group ID.

### Example Manifest: Hardened Pod
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hardened-nginx
spec:
  securityContext:
    runAsUser: 1000        # Pod-wide user
    fsGroup: 2000          # All volumes owned by this GID
  containers:
  - name: nginx
    image: nginx
    securityContext:
      runAsUser: 2000      # Overwrites Pod-level 1000
      allowPrivilegeEscalation: false
      capabilities:
        add: ["NET_BIND_SERVICE"] # Allows binding to port 80
        drop: ["ALL"]             # Drops all other root-like perms
```

### Technical Note: OS Internals & Kernel Enforcement
On the **OS Internals** level, the [[k8s cluster components#1. kubelet|kubelet]] translates these Security Context settings into system calls for the **Container Runtime** (containerd/CRI-O).
* **UID/GID:** Maps directly to the `setuid` and `setgid` kernel calls for the process.
* **Capabilities:** Are enforced via the `capset` system call.
* **Privileged:** Disables the **Seccomp**, **AppArmor**, and **SELinux** profiles that normally isolate the container from the host kernel, giving the process direct access to `/dev` and host resources.

##### References
