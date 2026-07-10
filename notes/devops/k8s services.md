2026-02-28 02:37
Tags: #kubernetes 
##### Content
Kubernetes Services provide a stable network abstraction for a group of ephemeral Pods. While Pod IPs are temporary, a Service provides a **Fixed IP (ClusterIP)** and a **DNS name** that remains constant.

### Key Problems Solved
* **Ephemeral IPs:** Prevents connection failures when Pods are rescheduled and assigned new IPs.
* **Service Discovery:** Provides a predictable DNS name for internal communication.
* **Load Balancing:** Acts as a Layer 4 (TCP/UDP) load balancer. By default, it uses **Round Robin** (implemented via `kube-proxy` using `iptables` or `IPVS`).


---

### Service Manifest Anatomy
The connection between a Service and its Pods is defined by **Labels**.
* **`name`:** Defines the DNS entry.
* **`port`:** The port the Service listens on inside the cluster.
* **`targetPort`:** The port on the Pod/Container where traffic is sent. This can be a number or a **named port** defined in the Pod spec.
* **`selector`:** Matches the labels on the target Pods.

---
### Service Types

| Type               | Accessibility            | Use Case                                                                                                                               |
| :----------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **`ClusterIP`**    | Internal only.           | Standard for database/backend internal traffic.                                                                                        |
| **`NodePort`**     | External (via Node IP).  | Exposes a port (30000-327**67**) on **every** Node. Useful for quick testing.                                                          |
| **`LoadBalancer`** | External (via Cloud LB). | Uses the [[k8s cluster components#Cluster Components#Components\|Cloud Control Manager]] to provision a provider LB (AWS ELB, GCP LB). |
| **`ExternalName`** | Internal alias.          | Maps a Service to a DNS name (e.g., `my.db.com`) rather than a selector.                                                               |

#### Load Balancing On-Premise
Since bare-metal clusters don't have a cloud provider to spin up a LoadBalancer, you typically use:
* **MetalLB:** A controller that simulates a Load Balancer using Layer 2 (ARP) or Layer 3 (BGP).
* **NodePort + External Proxy:** Manually configuring an external HAProxy or Nginx to point to the Node IPs and the NodePort.


---

### DNS and Service Discovery
Kubernetes runs a cluster-internal DNS service (typically **CoreDNS**, formerly kube-dns).

* **Local Lookup:** Pods in the same namespace can reach a service using just `<service-name>`.
* **Fully Qualified Domain Name (FQDN):** Used for cross-namespace communication.
    * **Format:** `<service-name>.<namespace>.svc.cluster.local`

---

### Backend Implementation
The actual tracking of Pod IPs and health states is handled by secondary resources. `kube-proxy` watches these to update node routing rules.

* **Detailed Reference:** See [[k8s endpoints and endpoint slices|Endpoints and EndpointSlices]] for information on how Kubernetes manages backend IP lists and manual external service configurations.

---

### Connecting to External Services
* **Via ExternalName:** Acts as a simple CNAME record. No proxying or health checks occur; the client Pod simply gets the external DNS name back from the DNS server.
* **Via Custom Backends:** For complex external routing with fixed IPs, see the [[k8s endpoints and endpoint slices#Manual Configuration Connecting to External Services|Manual Configuration section in the Endpoints note]].

```yaml
kind: Service
apiVersion: v1
metadata:
  name: external-database
spec:
  type: ExternalName
  externalName: prod-db.aws.com
```

### Example Service Manifest
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-backend-service
  namespace: prod
spec:
  # Type can be ClusterIP (default), NodePort, or LoadBalancer
  type: ClusterIP 
  
  # Selection criteria: targets any Pod with these labels
  selector:
    app: my-app
    tier: backend

  ports:
    - name: http
      protocol: TCP
      targetPort: 8080 # The port on the Container/Pod where traffic is forwarded
      port: 80 # The port the Service itself listens on (Fixed Cluster IP)
      # nodePort: 30005 # Only applicable/required if type is NodePort
```

##### References
