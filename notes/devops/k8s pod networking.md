2026-04-14 11:02
Tags: #kubernetes 
##### Content
### Summary/Purpose
Kubernetes defines a strict **Networking Model** that ensures every Pod can behave like a VM on a traditional network. This "Flat Network" architecture simplifies application development because developers don't need to worry about mapping container ports to host ports or dealing with complex Network Address Translation (NAT) between services.

### Core Logic: The "Big Three" Requirements
Since Kubernetes does not provide a native networking implementation, it relies on **CNI Plugins** to satisfy these three mandatory requirements:

1.  **Unique IP per Pod:** Every Pod gets its own IP address that is unique across the entire cluster. This allows Pods to be treated like physical hosts or VMs.
2.  **Intra-Node Communication:** Any Pod on a specific node must be able to communicate with all other Pods on that same node without a gateway.
3.  **Inter-Node Communication:** Any Pod on a node must be able to communicate with any Pod on any *other* node **without NAT**. The source IP the receiving Pod sees must be the actual IP of the sending Pod.

---

### IP Address Management (IPAM)
Allocating and tracking these unique IP addresses is the job of **IPAM plugins**. When the Container Runtime calls a CNI plugin to "ADD" a network to a Pod, the CNI plugin usually delegates the IP assignment to an IPAM-specific plugin.

#### Common IPAM Plugins:
* **host-local:** The most common plugin for simple clusters. It manages a set of IP addresses locally on each node. The cluster CIDR is split into smaller subnets (e.g., `/24`), and each node is assigned one of those subnets to hand out to its local Pods.
* **DHCP:** Allows Pods to acquire IPs from an existing DHCP server on the network.
* **Static:** Used for assigning specific, fixed IP addresses to containers (rare in standard K8s).

---

### Key Parameters: CIDR Ranges
In a healthy cluster, you will typically manage two distinct IP ranges:
* **Pod CIDR:** The range from which Pod IPs are assigned (e.g., `10.244.0.0/16`).
* **Service CIDR:** A separate range used for [[k8s services|Services]] (virtual IPs), usually not routable outside the cluster (e.g., `10.96.0.0/12`).

---

### Usage Patterns: The Network Workflow
1.  **Node Join:** When a node joins the cluster, it is assigned a **PodCIDR** (e.g., `10.244.1.0/24`).
2.  **Pod Creation:** The kubelet starts a Pod and calls the CNI plugin.
3.  **IP Allocation:** The CNI plugin calls `host-local` to pick an available IP from the `10.244.1.0/24` range.
4.  **Interface Setup:** The CNI plugin creates a virtual interface and assigns that IP.

### Technical Note: OS Internals & Routing
On the **OS Internals** level, the "No NAT" requirement is usually handled in one of two ways:
* **Overlay Networks (VXLAN/UDP):** The CNI encapsulates the Pod-to-Pod packet inside a Host-to-Host packet. To the physical network, it looks like node traffic; to the Pods, it looks like a direct connection.
* **Direct Routing (BGP):** The CNI (like Calico) acts as a BGP speaker and tells the physical network routers exactly where each Pod IP is located. This is much faster as it removes the encapsulation overhead.

##### References
