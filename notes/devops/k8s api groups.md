2026-04-12 13:21
Tags: #kubernetes 
##### Content
### Summary/Purpose
To remain scalable and organized, the Kubernetes API is partitioned into **API Groups**. This categorization allows different functional areas (like networking, storage, or core compute) to evolve independently with their own versioning lifecycles without requiring a global API version bump.

---

### Core Logic/Mechanism
The API is exposed via a hierarchical URI structure. When you perform a `kubectl` command, the client is essentially making a REST call to one of these paths.

#### 1. The Core Group (`/api/v1`)
Often referred to as the "legacy" or "core" group. It contains the most fundamental objects that existed at the cluster's inception.
* **Path:** `/api/v1`
* **Resources:** `Pods`, `Services`, `Nodes`, `Namespaces`, `ConfigMaps`, `Secrets`.

#### 2. Named Groups (`/apis/GROUP_NAME/VERSION`)
Newer resources are added to specific groups. 
* **Path:** `/apis/<group>/<version>`
* **Examples:**
    * `/apis/apps/v1` (Deployments, ReplicaSets, StatefulSets)
    * `/apis/networking.k8s.io/v1` (Ingress, NetworkPolicies)
    * `/apis/storage.k8s.io/v1` (StorageClasses)



---

### Accessing the API directly
Since the API server requires [[tls and public key infrastructure|TLS & PKI]] authentication, you cannot simply `curl` it from your terminal.

#### The `kubectl proxy` Tool
`kubectl proxy` creates a local HTTP proxy on your machine (usually `localhost:8001`). 
* **Mechanism:** It handles the authentication and encryption (using your [[k8s kubeconfig file|Kubeconfig]] credentials) and presents an unauthenticated HTTP endpoint.
* **Security Warning:** This exposes your cluster's API without further auth checks. It should only be used for local debugging or exploring the API structure.

**Example Usage:**
```bash
# Start the proxy in one terminal
kubectl proxy

# Explore the API from another
curl http://localhost:8001/apis/apps/v1/namespaces/default/deployments
```

---

### Key Parameters: API Discovery

| Command                      | Purpose                                                                        |
| :--------------------------- | :----------------------------------------------------------------------------- |
| `kubectl api-resources`      | Lists all resources, their shortnames, API groups, and if they are Namespaced. |
| `kubectl api-versions`       | Lists all enabled API versions on the cluster.                                 |
| `kubectl explain <resource>` | Shows the documentation for a specific resource and its API group/version.     |

---

### Usage Patterns/Strategies
* **Shortnames:** Use `kubectl get po` (core) vs `kubectl get deploy` (apps) for faster CLI interaction.
* **CRDs (Custom Resource Definitions):** When you install a tool like Istio or Prometheus, they add their own named groups (e.g., `/apis/monitoring.coreos.com/v1`).

### Technical Note: OS Internals & The API Server
The **kube-apiserver** binary acts as a gateway. When a request hits `/apis/apps/v1`, the server looks up the internal registry for that group. If it's a valid request, it retrieves the data from **etcd**. On the **OS Internals** level, the API server uses a "Discovery" mechanism where it caches the available groups in memory to quickly route incoming HTTP requests to the correct internal handler.
##### References
