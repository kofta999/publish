2026-04-02 10:02
Tags: #kubernetes 
##### Content

## Node Affinity

### Summary/Purpose
Node Affinity is a more powerful and flexible evolution of Node Selectors. It allows for complex matching logic (In, NotIn, Exists, DoesNotExist, Gt, Lt) and provides "soft" vs. "hard" requirements.

### Core Logic/Mechanism: The Types
Affinity is split into two parts: how it behaves at **Scheduling** time and how it behaves at **Execution** (runtime).

| Type                                 | Behavior at Scheduling                                                                            | Behavior at Execution                                                                  |
| :----------------------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------- |
| **required...Ignored...**            | **Hard limit:** Pod will stay `Pending` if no node matches.                                       | If labels change on the node later, the Pod **continues to run**.                      |
| **preferred...Ignored...**           | **Soft limit:** The scheduler tries to find a match but will place the Pod elsewhere if it fails. | If labels change on the node later, the Pod **continues to run**.                      |
| **required...Required...** (Planned) | **Hard limit:** Must match at start.                                                              | **Eviction:** If the node's labels change and no longer match, the Pod is **evicted**. |

### Usage Patterns: The "Dedicated Node" Strategy
To truly dedicate a set of nodes to specific pods, you must combine **Taints/Tolerations** with **Node Affinity**:
1.  **Taint the Node:** This keeps other "unwanted" pods off.
2.  **Affinity on the Pod:** This pulls the "wanted" pod specifically to these nodes.
3.  **Toleration on the Pod:** This allows the "wanted" pod to bypass the taint.

### Example Manifest: Comprehensive Node Affinity
This example shows how to require a specific environment while preferring a specific hardware type.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: complex-affinity-pod
spec:
  containers:
  - name: nginx
    image: nginx
  affinity:
    nodeAffinity:
      # HARD REQUIREMENT: Must be in production
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: env
            operator: In
            values:
            - production
          - key: tier
            operator: NotIn
            values:
            - testing
      # SOFT REQUIREMENT: Prefer nodes with SSDs
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1 # Values 1-100; higher weight nodes are prioritized
        preference:
          matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd
```

### Technical Note: OS Internals & Scheduling
The scheduler's "Ranking" phase heavily uses the `weight` parameter in `preferred` affinity. It calculates a score for each node based on how many preferred rules it satisfies. If you have multiple preferences, the weights are summed; the node with the highest score wins. This is handled entirely in the **kube-scheduler** process's memory before the binding request is sent to the API.

##### References
