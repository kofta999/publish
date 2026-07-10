2026-04-02 10:16
Tags: #kubernetes 
##### Content
## LimitRange

### Summary/Purpose
While a [[k8s resource quotas|ResourceQuota]] limits the **total** aggregate resources of a namespace, a **LimitRange** enforces constraints on **individual** Pods and Containers. It ensures that no single container is too small to function or too large to monopolize the node, and it provides "safety net" default values for developers who forget to define them.

### Core Logic/Mechanism
* **Admission Control:** Like quotas, the `LimitRange` is enforced by an Admission Controller at the API level. When a Pod is submitted, the controller checks the spec against the LimitRange rules.
* **Defaulting:** If a Pod is submitted without `requests` or `limits`, the LimitRange automatically injects the `default` values into the Pod spec before it is persisted to [[k8s etcd|etcd]].
* **Non-Retroactive:** A LimitRange **does not** affect Pods that are already running. It only evaluates and modifies Pods created or updated *after* the LimitRange object is applied to the namespace.
* **Validation:** If a Pod explicitly defines values that are outside the `min` or `max` boundaries of the LimitRange, the API server will reject the creation request with an error.


### Key Parameters: LimitRange Spec

| Field                    | Description                              | Note                                                           |
| :----------------------- | :--------------------------------------- | :------------------------------------------------------------- |
| **default**              | The default **Limit** for a container.   | Injected if the user leaves "limits" blank.                    |
| **defaultRequest**       | The default **Request** for a container. | Injected if the user leaves "requests" blank.                  |
| **max**                  | The ceiling for any single container.    | Prevents "greedy" containers from over-allocating.             |
| **min**                  | The floor for any single container.      | Ensures containers have enough to actually boot.               |
| **maxLimitRequestRatio** | The maximum allowed "burst" ratio.       | e.g., if set to 2, a limit cannot be more than 2x the request. |

---

### Usage Patterns/Strategies
* **Standardizing Environments:** Use LimitRanges in `development` namespaces to keep container sizes small and uniform, preventing a single leaky app from crashing a shared dev node.
* **Enforcing Best Practices:** By setting a `min` value, you force developers to acknowledge that their application requires a baseline level of resources to remain stable.

### Example Manifest: Namespace Constraints
This example sets hard boundaries and provides fallback defaults for any container created in the namespace.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-mem-limit-range
  namespace: dev-team-alpha
spec:
  limits:
  - default:                # Default Limit
      cpu: 500m
      memory: 512Mi
    defaultRequest:         # Default Request
      cpu: 200m
      memory: 256Mi
    max:                    # Max allowed per container
      cpu: "2"
      memory: 2Gi
    min:                    # Min allowed per container
      cpu: 100m
      memory: 128Mi
    type: Container         # Can also be 'Pod' or 'PersistentVolumeClaim'
```

### Technical Note: OS Internals (OOM & CFS)
When the LimitRange injects these defaults, it directly influences how the Linux kernel manages the process:
* **Memory Default:** Sets the `memory.limit_in_bytes` in cgroups. If the process exceeds this, the kernel's **OOM Killer** will terminate it.
* **CPU Default:** Sets the `cpu.cfs_quota_us`. This limits how many microseconds of CPU time the process can use within a period, preventing it from spiking the node's load.

##### References
