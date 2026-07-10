2026-04-02 09:58
Tags: #kubernetes 
##### Content
## Taints and Tolerations

### Summary/Purpose
Taints and Tolerations work together to ensure that Pods are not scheduled onto inappropriate Nodes. Think of a **Taint** as a "repellent spray" applied to a Node, and a **Toleration** as "protective gear" that allows a Pod to ignore that repellent.

> **CRITICAL NOTE:** Taints and Tolerations do **NOT** tell a Pod to go to a specific Node. They only tell a Node which Pods it should **reject**. To force a Pod onto a specific Node, you must use [[k8s manual scheduling|Manual Scheduling]] or [[k8s node affinity|Node Affinity]].

---

### Core Logic/Mechanism
* **Node Taint:** Applied to the Node object. It signifies that the Node has a specific "condition" (e.g., specialized GPU hardware, dedicated for production, or currently experiencing issues).
* **Pod Toleration:** Applied to the PodSpec. It signifies that the Pod is "okay" with the Node's condition.
* **The Match:** The scheduler will only place a Pod on a Tainted Node if the Pod has a matching Toleration for **every** taint on that Node.

### Taint Effects
The `effect` defines what happens to Pods that do **not** tolerate the taint.

| Effect               | Behavior                                                                                                          |
| :------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **NoSchedule**       | New Pods will never be scheduled on this node. Existing Pods stay running.                                        |
| **PreferNoSchedule** | The scheduler *tries* to avoid the node, but will use it if no other resources are available.                     |
| **NoExecute**        | New Pods are blocked **AND** existing Pods on the node are evicted immediately if they don't have the toleration. |

---
### Key Parameters: CLI Commands

* **To Taint a Node:**
    `kubectl taint nodes <node-name> key=value:taint-effect`
    *Example:* `kubectl taint nodes node1 app=blue:NoSchedule`
* **To Remove a Taint:**
    `kubectl taint nodes <node-name> key=value:taint-effect-` (Note the minus sign at the end).

---

### Usage Patterns/Strategies
* **Dedicated Nodes:** Taint a set of nodes for a specific team or department. Only their Pods (with the toleration) can use them.
* **Special Hardware:** Taint nodes with GPUs so that standard web-server Pods don't "waste" the expensive GPU slots.
* **Node Condition Taints:** The Control Plane automatically adds taints like `node.kubernetes.io/not-ready` or `node.kubernetes.io/out-of-disk` to prevent scheduling on failing hardware.

### Example Manifest: Pod Toleration
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-allowed
spec:
  containers:
  - name: nginx
    image: nginx
  tolerations:
  - key: "app"
    operator: "Equal"
    value: "blue"
    effect: "NoSchedule"
```

### Technical Note: NoExecute & Eviction
When using `NoExecute`, you can add a `tolerationSeconds` field to the Pod. This tells Kubernetes: "I tolerate this taint, but if it appears, only let me stay on the node for X more seconds before evicting me." This is useful for graceful shutdowns during node maintenance.

##### References
