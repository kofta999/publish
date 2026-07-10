2026-04-08 15:00
Tags: #kubernetes 
##### Content

### Summary/Purpose
Autoscaling in Kubernetes is divided into two layers: the **Cluster** (Nodes) and the **Workloads** (Pods). It ensures that the infrastructure expands during traffic spikes to maintain performance and shrinks during idle periods to reduce costs.

---
### 1. Cluster-Level Autoscaling
Manages the number of physical or virtual machines in the Data Plane.

* **Horizontal (Cluster Autoscaler):** Automatically adds or removes Nodes from the cluster. It triggers when Pods are `Pending` due to insufficient resources or when Nodes are consistently underutilized.
* **Vertical:** Generally **not recommended**. Increasing the CPU/RAM of an existing physical host is complex and usually requires a reboot, leading to downtime.

---
### 2. Pod-Level Autoscaling

| Dimension              | Manual Method   | Automated Method                    |
| :--------------------- | :-------------- | :---------------------------------- |
| **Horizontal (Count)** | `kubectl scale` | **HPA** (Horizontal Pod Autoscaler) |
| **Vertical (Size)**    | `kubectl edit`  | **VPA** (Vertical Pod Autoscaler)   |

#### Horizontal Pod Autoscaler (HPA)
The HPA scales the number of replicas in a Deployment or ReplicaSet based on observed CPU/Memory utilization.
* **Command:** `kubectl autoscale deployment <name> --cpu-percent=50 --min=1 --max=10`
* **Requirement:** Requires **Metrics Server** to function.
* **Sources:** 
	* *Internal:* Metrics Server -> Custom Metrics Adapter.
    * *External:* DataDog/Dynatrace adapters (for scaling based on things like HTTP request rate).

---

### 3. Vertical Pod Autoscaler (VPA)
The VPA is not built-in; it must be installed as a set of custom controllers. It adjusts the `requests` and `limits` of your containers automatically.

#### Core Components:
1.  **Recommender:** Watches historical and real-time resource usage to suggest the "optimal" CPU and Memory values.
2.  **Updater:** Decides which Pods need to be updated. If a Pod's current resources are far from the recommendation, it **evicts** the Pod so it can be recreated with the new values.
3.  **Admission Controller:** A mutating webhook that intercepts Pod creation requests to inject the Recommender’s suggested resource values.

#### Update Policy Modes:
* **Off:** Only provides recommendations (viewable via `kubectl describe vpa`).
* **Initial:** Assigns recommended resources only when the Pod is first created.
* **Recreate:** Evicts running Pods if their current usage deviates too far from the recommendation.
* **Auto:** Combines Recreate logic with **In-place Update** (if supported by the cluster version).

---

### 4. In-Place Resource Resizing (K8s 1.35 Stable)
Modern Kubernetes allows changing container resources without restarting the Pod.
* **`resizePolicy`:** Defines if a container should be restarted (`RestartContainer`) or not (`NotRequired`) when CPU/Memory is adjusted.
* **OS Mechanism:** Uses `cgroup` updates to change `cpu.shares` or `memory.limit_in_bytes` on the fly.

#### Limitations:
* **QoS Class:** You cannot change the Pod’s Quality of Service class (e.g., from Burstable to Guaranteed) during a resize.
* **Stateful Constraints:** If you try to lower memory below current usage, the resize stays `InProgress` until the application releases memory.
* **Platform:** Not supported for Windows Pods or for Init/Ephemeral containers.
* **Immutable Fields:** Once set, resource requests/limits cannot be completely removed, only modified.

### Example Manifest: VPA
```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Auto" # Evicts and recreates or updates in-place
  resourcePolicy:
    containerPolicies:
      - containerName: '*'
        minAllowed:
          cpu: 100m
          memory: 128Mi
        maxAllowed:
          cpu: 1
          memory: 1Gi
```

### Technical Note: VPA vs. HPA Conflict
**Do not use HPA and VPA on the same resource for CPU or Memory.** They will fight each other: VPA will increase the Pod size while HPA increases the Pod count, leading to a "spiral" of resource over-allocation. If you must use both, set HPA to scale on custom metrics (like RPS) and VPA to scale on CPU/Memory.

##### References
