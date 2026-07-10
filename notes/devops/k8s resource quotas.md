2026-04-01 10:58
Tags: #kubernetes 
##### Content

## Resource Quotas

### Summary/Purpose
Resource Quotas provide constraints that limit aggregate resource consumption per Namespace. This prevents a single team from "starving" others by consuming all available CPU or Memory in the cluster.

### Core Logic/Mechanism
* **Admission Control:** When a user creates or updates a resource, the **ResourceQuota Admission Controller** checks if the request exceeds the defined limits. If it does, the API server rejects the request with a `403 Forbidden`.
* **Enforcement Requirement:** For a ResourceQuota to work effectively on CPU/Memory, every Pod in that namespace **must** have its own `requests` and `limits` defined, or the namespace must have a `LimitRange` to provide defaults. Else, the pod creation will fail with `403 Forbidden` error
* **OS Mechanisms:** Kubernetes maps these quotas down to the Linux kernel via **cgroups**. Specifically, CPU limits are enforced using the **CFS (Completely Fair Scheduler) Quota**, and memory limits are enforced via the memory controller.

### Key Parameters (ResourceQuota)

| Resource | Description | Note |
| :--- | :--- | :--- |
| **requests.cpu** | Total sum of CPU requests. | Enforced at the cluster level. |
| **limits.memory** | Total sum of memory limits. | Triggers **OOM Killer** if exceeded. |
| **pods** | Max number of Pods allowed. | Prevents "fork bomb" style pod creation. |
| **services** | Max number of Service objects. | Limits load balancer/nodeport overhead. |

### Example Manifest:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: engineering
spec:
  hard:
    requests.cpu: "4"         # Total CPU requests allowed
    requests.memory: 8Gi      # Total Memory requests allowed
    limits.cpu: "10"          # Total CPU limits allowed
    limits.memory: 16Gi       # Total Memory limits allowed
    pods: "20"                # Max number of pods in namespace
```


##### References
