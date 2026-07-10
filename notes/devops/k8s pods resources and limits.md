2026-02-25 12:13
Tags: #kubernetes  
##### Content
## Resources and Limits
Resource management is defined at the **container** level within the Pod spec. Kubernetes uses these values to ensure nodes aren't over-taxed and that critical applications have what they need to run.

### Requests
- **Definition:** The **minimum** amount of CPU or Memory a container is guaranteed to have. 
- **Scheduling:** The **Scheduler** uses the sum of all container requests in a Pod to find a node with enough unallocated capacity. It does *not* look at actual usage, only the "requested" amounts.
- **Over-commitment:** Containers can use more resources than requested if the node has spare capacity. However, if the node runs out of memory, the **OOM (Out of Memory) Killer** will target pods that are using more than their requested amount first.

### Limits
- **Definition:** The **maximum** amount of CPU or Memory a container is allowed to consume.
- **Enforcement:**
    - **Memory:** If a container exceeds its limit, it is typically killed (OOMKilled) because memory cannot be "compressed."
    - **CPU:** If a container hits its CPU limit, it is **throttled** (slowed down) rather than killed, as CPU is a compressible resource.


---

### Units and Measurement

#### Memory (RAM)
Kubernetes accepts both decimal (Base 10) and binary (Base 2) suffixes. **Binary is recommended** to match how most operating systems report memory.

| Type                     | Unit Suffix            | Value (Bytes)   |
| :----------------------- | :--------------------- | :-------------- |
| **Base 2 (Recommended)** | `Ki`, `Mi`, `Gi`, `Ti` | $1 Mi = 1024^2$ |
| **Base 10**              | `k`, `M`, `G`, `T`     | $1 M = 1000^2$  |

#### CPU
CPU is measured in **millicores** (m). 
- $1000m = 1 \text{ vCPU / Core / Hyperthread}$
- $500m = 0.5 \text{ vCPU}$
- It is an absolute unit, not a relative one; $500m$ is the same amount of "power" regardless of whether the node has 2 cores or 64 cores.
- Actual calculation is measured by [[k8s cpu resource limits|CPU Time]]

### Quality of Service (QoS) Classes
Kubernetes automatically assigns a QoS class based on how you set your requests and limits:
1.  **Guaranteed:** Requests == Limits for both CPU and Memory.
2.  **Burstable:** Requests < Limits (or only one is set).
3.  **BestEffort:** No requests or limits are defined.

### Example Manifest

```yaml
spec:
  containers:
  - name: app
    image: my-app
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

##### References
