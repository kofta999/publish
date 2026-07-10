2026-04-08 16:03
Tags: #kubernetes 
##### Content
### Summary/Purpose
Kubernetes follows **Semantic Versioning (vX.Y.Z)**. Because a cluster is a distributed system, different components can run on different versions temporarily. Understanding the **Version Skew Policy** is critical to ensuring cluster stability during upgrades and maintaining compatibility between the "brain" (Control Plane) and the "nodes" (Data Plane).

---

### Core Logic: Version Skew Policy
The **kube-apiserver** is the pivot point. All other components are measured relative to its version.

| Component              | Allowed Skew   | Example (API is v1.30) |
| :--------------------- | :------------- | :--------------------- |
| **kube-apiserver**     | **Latest (X)** | v1.30                  |
| **controller-manager** | X or X-1       | v1.30 or v1.29         |
| **kube-scheduler**     | X or X-1       | v1.30 or v1.29         |
| **kubelet**            | X, X-1, or X-2 | v1.30, v1.29, or v1.28 |
| **kube-proxy**         | X, X-1, or X-2 | v1.30, v1.29, or v1.28 |
| **kubectl**            | X+1, X, or X-1 | v1.31, v1.30, or v1.29 |

### Maintenance Lifecycle
Kubernetes officially supports the **3 most recent minor versions**. Updates are released roughly every 4 months, meaning a version is supported for approximately one year. It is highly recommended to **upgrade one minor version at a time** (e.g., 1.28 -> 1.29) to avoid skipping critical API deprecations or migrations.


##### References
