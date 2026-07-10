2026-04-13 11:07
Tags: #kubernetes 
##### Content
### Summary/Purpose
By default, Kubernetes follows a "Flat Network" model where every Pod can communicate with every other Pod and Service in the cluster without any gateway or NAT. **Network Policies** act as the cluster's firewall, allowing you to enforce **Least Privilege** at the network layer. 

> **Stateful Nature:** Like [[aws ec2 security groups|AWS Security Groups]], Network Policies are **stateful**. If you allow an ingress request from Pod A to Pod B, the response (egress) from Pod B back to Pod A is automatically allowed.

---

### Core Logic/Mechanism
* **The "Default Allow" Rule:** If no policies exist, all traffic is allowed. 
* **The "Isolation" Trigger:** As soon as a Network Policy selects a Pod, that Pod becomes isolated. It will only accept traffic that matches an explicit "Allow" rule. Anything else is dropped.
* **CNI Support:** Network Policies are a high-level API resource. The actual enforcement is done by the **Network Plugin (CNI)**.
    * **Supports Policies:** Calico, Cilium, Kube-router, Romana.
    * **Does NOT Support:** Flannel (it only handles basic networking, not security).

---

### Selection Logic: Ingress and Egress
You can define rules based on three types of selectors:
1.  **podSelector:** Targets pods within a specific namespace.
2.  **namespaceSelector:** Targets all pods within namespaces that match the label. 
    * *Crucial:* If you want to select pods across ALL namespaces, you must provide an empty selector: `namespaceSelector: {}`.
3.  **ipBlock:** Defines specific IP ranges (CIDR) for traffic coming from or going to external sources (outside the cluster).

#### AND vs. OR Logic
* **OR Logic (List):** If you list multiple selectors as separate items in a list, traffic is allowed if it matches *any* of them.
* **AND Logic (Nested):** If you nest a `podSelector` inside a `namespaceSelector` block, traffic is only allowed if it matches **both**.

---

### Key Parameters: Policy Types

| Type        | Direction | Description                                 |
| :---------- | :-------- | :------------------------------------------ |
| **Ingress** | Incoming  | Controls who can reach the selected Pods.   |
| **Egress**  | Outgoing  | Controls who the selected Pods can talk to. |

---

### Usage Patterns/Strategies
* **Default Deny All:** A common security best practice is to apply a "Deny All" policy to a namespace and then explicitly open ports only for known dependencies.
* **Tiered Isolation:** Only allow the `frontend` pods to talk to the `backend` pods, and only allow `backend` pods to talk to the `database` (on port 5432).

### Example Manifest: Strict Backend Security
This policy isolates pods labeled `role: db` so they only accept traffic from the `backend` namespace on port 5432.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
  namespace: prod
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          project: backend
      podSelector:
        matchLabels:
          app: api
    ports:
    - protocol: TCP
      port: 5432
```

### Technical Note: OS Internals & Iptables
On the **OS Internals** level, when a Network Policy is created, the CNI agent (like `calico-node`) running on each worker node detects the change. It then translates these Kubernetes-level labels into **iptables** or **eBPF** rules on the host's Linux kernel. This ensures that the packet filtering happens as close to the network interface as possible, minimizing latency.

##### References
