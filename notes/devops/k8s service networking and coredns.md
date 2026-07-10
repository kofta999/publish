2026-04-14 11:12
Tags: #kubernetes 
##### Content
### Summary/Purpose
Kubernetes provides a stable naming convention for dynamic resources through **CoreDNS**. This ensures that even as Pods are killed and replaced with new IP addresses, the communication between services remains uninterrupted. It is the "glue" that allows for a decoupled, microservices-based architecture.

---

### DNS Naming Hierarchy
Kubernetes creates a stable DNS record for every Service and (optionally) for Pods. The hierarchy follows a strict structure:

#### 1. Service FQDN
**Format:** `<service-name>.<namespace>.svc.cluster.local`

| Scope                 | Requirement      | Example                              |
| :-------------------- | :--------------- | :----------------------------------- |
| **Same Namespace**    | Name only        | `curl app-service`                   |
| **Across Namespaces** | Name + Namespace | `curl app-service.myns`              |
| **Full Path**         | Full FQDN        | `app-service.myns.svc.cluster.local` |

#### 2. Pod FQDN (Not enabled by default)
Pods have a similar mechanism, but it is rarely used directly for standard deployments because Pod IPs are ephemeral.
**Format:** `<ip-using-dashes>.<namespace>.pod.cluster.local`
* **Example:** `10-244-1-5.myns.pod.cluster.local`

---

### Core Logic: How Discovery Works
1.  **The Watcher:** CoreDNS watches the API server for new Services and Endpoints.
2.  **Kubelet Injection:** When a Pod is created, the kubelet configures `/etc/resolv.conf` inside the container to point to the CoreDNS Service IP (typically `10.96.0.10`).
3.  **Search Domains & NDOTS:** The `resolv.conf` includes a `search` list (e.g., `myns.svc.cluster.local`, `svc.cluster.local`). 
    * **ndots:5:** If a query has fewer than 5 dots (like `app-service`), the OS will try appending each search domain before attempting the name as an absolute FQDN.

---

### Configuration: The Corefile
CoreDNS is configured via a **ConfigMap** called `coredns` in the `kube-system` namespace. The configuration logic is defined in a block called the **Corefile**.

**Key Plugins:**
* **kubernetes:** Enables K8s-aware service discovery.
* **forward:** Defines upstream DNS (e.g., `/etc/resolv.conf` of the host) for non-cluster queries like `google.com`.
* **cache:** Reduces load on the API server by caching DNS responses.

### Example: Corefile Snippet
```text
.:53 {
    errors
    health {
       lameduck 5s
    }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {
       pods insecure
       fallthrough in-addr.arpa ip6.arpa
       ttl 30
    }
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
```

---

### Usage Patterns: Troubleshooting
If name resolution fails, follow the chain:
1.  **Internal Check:** Can the Pod reach the CoreDNS Service IP? 
2.  **Config Check:** Does the Pod's `/etc/resolv.conf` point to the correct nameserver?
3.  **Service Check:** Does the target Service actually have **Endpoints**? `kubectl get endpoints <service-name>`. (If there are no endpoints, the DNS record won't be created).

### Technical Note: Headless Services
When you set `clusterIP: None`, the service becomes **Headless**. 
* **Result:** Instead of returning a single Virtual IP, CoreDNS returns the **A records** (IP addresses) of all Pods matching the selector. 
* **StatefulSets:** This is essential for [[k8s statefulsets|StatefulSets]], where Pods need predictable names like `web-0.nginx.default.svc.cluster.local`.
##### References
