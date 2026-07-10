2026-04-14 10:59
Tags: #kubernetes 
##### Content

### Summary/Purpose
The **Container Network Interface (CNI)** is a Cloud Native Computing Foundation (CNCF) project that consists of a specification and a set of libraries for writing plugins to configure network interfaces in Linux containers. Instead of Kubernetes writing code for every possible networking technology (VLAN, VxLAN, BGP), it follows this standard to "offload" the networking logic to external plugins.

### Core Logic: The Runtime/Plugin Contract
Kubernetes (the **Runtime**) does not manage the network directly. Instead, it follows a strict workflow whenever a Pod is created or destroyed:

1.  **Namespace Creation:** The Container Runtime (containerd/CRI-O) creates a new Linux **Network Namespace** for the Pod.
2.  **Plugin Invocation:** The Runtime looks into `/etc/cni/net.d` to find the network configuration (JSON).
3.  **Execution:** The Runtime executes the binary files found in `/opt/cni/bin` with specific environment variables (like `CNI_COMMAND=ADD` or `DEL`) and the JSON config via `stdin`.
4.  **Wiring:** The plugin is responsible for:
    * Creating a **veth pair** (virtual ethernet).
    * Moving one end into the container's namespace.
    * Assigning an **IP address** (usually via an IPAM plugin).
    * Setting up routes and connecting the other end to the host bridge or overlay network.

---

### Kubernetes vs. Docker Networking
A common point of confusion for power users is the difference between how Docker and Kubernetes handle networking.

* **Docker (CNM):** Docker uses the **Container Network Model (CNM)**. It is tightly coupled with the Docker engine.
* **Kubernetes (CNI):** Kubernetes strictly uses **CNI**. This is why, historically, Kubernetes had to use a "bridge" (like `docker0`) or a shim (like `cri-dockerd`) to make Docker work, because Docker doesn't natively speak the CNI language.

---

### Key Components: Filesystem Locations

| Type         | Path             | Description                                                                      |
| :----------- | :--------------- | :------------------------------------------------------------------------------- |
| **Binaries** | `/opt/cni/bin`   | The actual executable plugins (e.g., `bridge`, `loopback`, `flannel`, `calico`). |
| **Config**   | `/etc/cni/net.d` | JSON files defining the network type, IP ranges, and which plugins to trigger.   |

---

### Responsibilities Breakdown

#### What Kubernetes/Runtime handles:
* Creating the isolation boundary (Network Namespace).
* Choosing which network the container should join.
* Calling the plugin at exactly the right time (`ADD` when pod starts, `DEL` when pod terminates).
* Managing the JSON configuration files.

#### What the CNI Plugin handles:
* **Connectivity:** Creating the virtual wires between the host and the container.
* **IPAM (IP Address Management):** Keeping track of which IPs are used and assigning a unique one to the new interface.
* **Routing:** Ensuring the Pod knows how to reach the rest of the cluster.

---

### Popular CNI Plugins

| Plugin                | Mechanism       | Best For                                                                                          |
| :-------------------- | :-------------- | :------------------------------------------------------------------------------------------------ |
| **Flannel**           | VXLAN (Overlay) | Simple setups, very easy to install; does not support [[k8s network policies\|Network Policies]]. |
| **Calico**            | BGP / Layer 3   | High performance, massive scalability, and excellent support for Network Policies.                |
| **Cilium**            | eBPF            | Modern, high-security, high-performance networking and observability.                             |
| **AWS-VPC/Azure-CNI** | Cloud Native    | Assigns real VPC/VNet IPs to Pods for direct integration with cloud firewalls.                    |

### Technical Note: The "Main" and "IPAM" Plugins
Usually, a CNI configuration involves "chaining." A **Main** plugin (like `bridge`) handles the interface creation, while an **IPAM** plugin (like `host-local` or `dhcp`) handles the IP address logic. The Runtime passes the configuration through the chain sequentially.

On the **OS Internals** level, you can see the result of a CNI plugin's work by running `ip netns` on the host to see the container namespaces and `ip addr` to see the virtual interfaces (usually starting with `veth...`) that the plugin bridged to the host.

##### References
