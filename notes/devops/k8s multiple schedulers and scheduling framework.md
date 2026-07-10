2026-04-03 17:17
Tags: #kubernetes 
##### Content
## Multiple Schedulers & Scheduling Framework

### Summary/Purpose
Kubernetes allows you to run multiple schedulers simultaneously. While the `default-scheduler` handles most workloads, you can deploy **Custom Schedulers** for specialized needs (e.g., high-throughput batch processing or hardware-aware placement). Each Pod can then explicitly request which scheduler should handle its placement.

---
### Core Logic/Mechanism
* **The Scheduler Loop:** Each scheduler watches the API server for Pods where `spec.schedulerName` matches its own name and where `spec.nodeName` is empty.
* **Coexistence:** Multiple schedulers do not "fight" because each only picks up the Pods assigned to it. However, they must all be aware of the same cluster state to avoid resource over-commitment.
* **Leader Election:** When running multiple instances of the *same* custom scheduler for High Availability (HA), **Leader Election** must be enabled in the configuration. This ensures only one instance is actively making decisions, while others remain in standby.

### The Scheduling Framework & Plugins
The modern scheduler is a compiled binary made of a "Framework" that executes **Plugins** at specific **Extension Points**. You can customize a scheduler by enabling, disabling, or reordering these plugins.

#### Extension Points & Key Plugins:
1.  **QueueSort:** Defines the order of Pods in the scheduling queue.
    * *Plugin:* `PrioritySort` (Uses [[k8s priority classes|Priority Classes]]).
2.  **Filter:** Filters out nodes that cannot run the Pod.
    * *Plugins:* `NodeResourcesFit`, `NodeName`, `NodeUnschedulable`.
3.  **Score:** Ranks the remaining nodes to find the "best" fit.
    * *Plugins:* `NodeResourcesFit` (favoring least/most allocated), `ImageLocality` (favoring nodes that already have the container image).
4.  **Bind:** Finalizes the decision by linking the Pod to a Node in the API.
    * *Plugin:* `DefaultBinder`.

---
### Multiple Scheduler Profiles
Instead of running separate binaries for every small change, a single scheduler binary can support **Multiple Profiles**. Each profile acts like an independent scheduler with its own name and plugin configuration.

| Feature            | Description                                                              |
| :----------------- | :----------------------------------------------------------------------- |
| **schedulerName**  | The unique identifier the Pod uses to target this profile.               |
| **plugins**        | The list of enabled/disabled extension point behaviors.                  |
| **leaderElection** | Configuration to ensure only one active scheduler instance in HA setups. |

### Usage Patterns/Strategies
* **Custom Batch Scheduling:** Create a profile that disables `ImageLocality` and prioritizes `NodeResourcesFit` to pack as many batch jobs as possible onto the fewest nodes.
* **Hardware-Specific:** A profile that uses custom plugins to account for NVMe wear-leveling or specific FPGA availability before scoring nodes.

### Example Manifest: Scheduler Configuration
This YAML represents a `KubeSchedulerConfiguration` file used to define profiles.

```yaml
apiVersion: kubescheduler.config.k8s.io/v1
kind: KubeSchedulerConfiguration
leaderElection:
  leaderElect: true # Active-Passive HA setup
profiles:
  - schedulerName: default-scheduler
  - schedulerName: my-custom-scheduler
    plugins:
      filter:
        enabled:
        - name: NodeResourcesFit
        disabled:
        - name: TaintToleration # Example: Ignore taints for this scheduler
      score:
        disabled:
        - name: ImageLocality
```

### Example: Pod Requesting Custom Scheduler
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: special-pod
spec:
  schedulerName: my-custom-scheduler # Matches the profile name above
  containers:
  - name: nginx
    image: nginx
```

### Technical Note: OS Internals (Race Conditions)
When running multiple schedulers, a race condition can occur where two schedulers try to bind two different Pods to the same remaining resources on a Node. The **kube-apiserver** handles this via **Optimistic Concurrency Control**. The first binding request to reach `etcd` wins; the second will receive a "Conflict" error, and that scheduler must then retry the scheduling cycle for its Pod.

##### References
