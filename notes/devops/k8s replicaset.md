2026-03-01 11:36
Tags: #kubernetes 
##### Content
A **ReplicaSet** is a controller whose primary purpose is to maintain a stable set of replica Pods running at any given time. It guarantees the availability of a specified number of identical pods.
### Core Functions
- **Pod Templates:** Uses a template (defined in the spec) to create new Pods when the current count is lower than desired.
- **Self-Healing:** If a Pod crashes, is deleted, or the node it resides on fails, the ReplicaSet automatically creates a replacement.
- **Scaling:** Scaling is as simple as updating the `replicas` field; the ReplicaSet will create or terminate Pods to match the new number.


---
### The Reconciliation Loop
All Kubernetes controllers, including ReplicaSets, operate on a **Reconciliation Loop** (or Control Loop).

1.  **Observe:** Look at the **current state** (how many Pods are actually running with matching labels).
2.  **Diff:** Compare the current state to the **desired state** (the `replicas` count in the manifest).
3.  **Act:** Perform operations to close the gap (create or delete Pods).

This loop ensures the cluster is "self-healing." It doesn't just run a command once; it constantly monitors to ensure the state remains correct.


---

### Loose Coupling via Selectors
ReplicaSets do not "own" Pods via direct links; they use **Label Selectors**. This loose coupling allows for powerful operational flexibility:

* **Quarantining Pods:** If a Pod is behaving strangely, you can change its labels manually. The ReplicaSet will see that its "observed count" has dropped by one and spin up a fresh Pod to replace it. Meanwhile, the original Pod remains running (as an "orphan") for you to debug without affecting production traffic.
* **Adopting Pods:** If you create a Pod manually that happens to match the ReplicaSet's selector, the ReplicaSet will "adopt" it into its count. If this puts the count over the limit, the ReplicaSet will immediately delete one of the Pods to maintain the desired state.

### Example Manifest
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google_samples/gb-frontend:v3
```

##### References
