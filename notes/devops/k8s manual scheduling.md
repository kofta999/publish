2026-04-02 09:47
Tags: #kubernetes 
##### Content
## Manual Scheduling

### Summary/Purpose
Manual scheduling is the process of bypassing the **kube-scheduler** to explicitly assign a Pod to a specific Node. This is useful for troubleshooting, specialized hardware requirements, or when building a custom control plane where the default scheduler is disabled.

### Core Logic/Mechanism
* **The `nodeName` Field:** The presence of the `nodeName` field in a PodSpec is the "source of truth" for assignment. 
* **The Scheduler's Role:** Under normal circumstances, a Pod is created with `nodeName: null`. The scheduler watches for these "unbound" Pods, picks a node, and updates the `nodeName`.
* **Pending State:** If no scheduler is running and no `nodeName` is manually provided, the Pod will remain in a `Pending` state indefinitely because no process is performing the "binding" logic.
* **Immutability:** Once a Pod is created, the `spec.nodeName` field is **immutable**. You cannot simply `kubectl edit` a running Pod to move it to a different node.

---

### The Binding Object (Direct API Injection)
If a Pod already exists and is stuck in `Pending`, you cannot update its `nodeName` via a standard `PUT` or `PATCH` request to the Pod resource. Instead, you must create a **Binding Object** and send a `POST` request to the Pod's binding sub-resource.

#### Flow:
1.  **Identify** the Pod and the target Node.
2.  **Construct** a Binding JSON/YAML object.
3.  **Submit** a `POST` request to `.../pods/$POD_NAME/binding`.


### Key Parameters: Binding Object

| Field | Value | Note |
| :--- | :--- | :--- |
| **apiVersion** | `v1` | Core API group. |
| **kind** | `Binding` | The specific resource type for assignments. |
| **target.kind** | `Node` | Usually always a Node. |
| **target.name** | `node-01` | The hostname of the destination worker. |

---

### Example: Manual Assignment via PodSpec
If you know the node name *before* creation, simply include it in the manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: manual-nginx
spec:
  nodeName: worker-node-02 # Bypasses the scheduler entirely
  containers:
  - name: nginx
    image: nginx
```

### Example: The Binding Request (JSON)
To bind an *existing* pending pod named `nginx-pod` to `node-01`:

```json
{
    "apiVersion": "v1",
    "kind": "Binding",
    "metadata": {
        "name": "nginx-pod"
    },
    "target": {
        "apiVersion": "v1",
        "kind": "Node",
        "name": "node-01"
    }
}
```
*Note: This must be sent via `curl` or a client-go library directly to the API server's binding endpoint, as `kubectl` does not have a direct "bind" command.*

##### References
