2026-04-02 10:28
Tags: #kubernetes 
##### Content
## Priority Classes

### Summary/Purpose
Priority Classes allow you to define the relative importance of Pods. When the cluster is out of resources, the **kube-scheduler** uses these classes to decide which Pods get scheduled first and, more importantly, which running Pods should be **evicted** (preempted) to make room for higher-priority workloads.

### Core Logic/Mechanism
* **Non-Namespaced:** `PriorityClass` is a cluster-wide resource. A single definition can be used by Pods across all namespaces.
* **The Priority Value:** Defined by an integer in the `value` field. The higher the number, the more important the Pod.
* **Preemption:** If a high-priority Pod cannot be scheduled due to lack of resources, the scheduler looks for nodes running lower-priority Pods. It will evict the lower-priority Pods to free up space.
* **Defaulting:** You can set a `globalDefault: true` on one PriorityClass to ensure all Pods without an explicit class get a baseline priority.

### Key Parameters: Value Ranges

| Range | Usage | Note |
| :--- | :--- | :--- |
| **-2,000,000,000 to 1,000,000,000** | **Applications** | Standard user workloads and non-critical services. |
| **1,000,001,000 to 2,000,000,000** | **System Components** | Reserved for critical cluster addons (e.g., CoreDNS, Calico). |
| **2,000,000,001+** | **System Critical** | Highest possible; reserved for components that *must* run for the cluster to exist (e.g., `system-cluster-critical`). |

### Preemption Policy
The `preemptionPolicy` field (introduced in v1.14+) determines the "aggressiveness" of the priority.

* **`PreemptLowerPriority` (Default):** If a Pod with this class is pending, it will kick out lower-priority Pods to take their place.
* **`Never`:** The Pod will still be placed at the front of the scheduling queue (ahead of lower-priority Pods), but it will **never** evict a running Pod. it will wait until resources become naturally available.

### Usage Patterns/Strategies
* **Production vs. Batch:** Give your user-facing web servers a higher priority than background data-processing jobs. If the node hits a resource limit, the data-processor dies first.
* **Critical Add-ons:** Ensure your CNI and DNS pods have a `system-cluster-critical` priority so they aren't accidentally evicted by a greedy application pod.

### Example Manifest: High-Priority Tier
```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority-apps
value: 1000000
preemptionPolicy: PreemptLowerPriority
globalDefault: false
description: "Used for mission-critical customer-facing services."
---
apiVersion: v1
kind: Pod
metadata:
  name: nginx-critical
spec:
  containers:
  - name: nginx
    image: nginx
  priorityClassName: high-priority-apps # Link to the class above
```

### Technical Note: OS Internals & OOM Score
While PriorityClasses influence the **Scheduler**, they also impact the **Kubelet's** behavior during node-level pressure. Kubernetes calculates an **OOM Score** adjustment for containers based on their QoS class and priority. High-priority Pods are generally less likely to be chosen by the Linux kernel's **OOM Killer** compared to lower-priority Pods when the node's physical memory is exhausted.

##### References
