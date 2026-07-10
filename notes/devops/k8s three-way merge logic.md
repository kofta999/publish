2026-04-01 11:04
Tags: #kubernetes 
##### Content
## Three-Way Merge Logic

### Summary/Purpose
The Three-Way Merge solves the "Lost Update" problem. Unlike `kubectl replace` (which performs a destructive overwrite), `apply` calculates the difference between three distinct sources to determine the final state.

### Core Logic/Mechanism
When you run `kubectl apply -f file.yaml`, Kubernetes looks at:
1.  **Local File:** What you want right now.
2.  **Live Configuration:** What is currently running in the cluster (which might have been modified by the system, e.g., a LoadBalancer IP being assigned).
3.  **Last-Applied-Configuration:** A JSON snapshot stored in the object's **metadata.annotations** from the *previous* apply command.

#### The Decision Matrix:
* **If a field is in Local and Live but NOT in Last-Applied:** It was added manually or by a controller. **Result:** Keep it (don't delete it).
* **If a field is in Last-Applied but NOT in Local:** The user explicitly removed it from the source file. **Result:** Delete it from Live.
* **If a field is in Local and differs from Last-Applied:** The user updated the value. **Result:** Update Live.

### Key Parameters: The Annotation
The "memory" of the last state is stored directly on the object itself under this specific key:
`kubectl.kubernetes.io/last-applied-configuration`

### Usage Patterns/Strategies: Why not `replace`?
* **`kubectl replace` (HTTP PUT):** Replaces the entire spec. If an Autoscaler changed your replica count from 3 to 5, and your file says 3, `replace` will force it back to 3, causing a fight between you and the cluster.
* **`kubectl apply` (HTTP PATCH):** Only updates what you changed in the file. If you didn't define replicas in your file, it leaves the current Live value alone.

### Example: The "Accidental Removal" Scenario
If you have a `tag: v1` in your local file and it exists in the `last-applied` annotation:
1.  You delete the line `tag: v1` from your local file.
2.  You run `apply`.
3.  K8s sees the tag is in **Last-Applied** but missing in **Local**.
4.  K8s concludes: "The user wants this gone," and removes it from **Live**.
5.  **Safety:** If you check the `last-applied` annotation *after* the update, it will now reflect the new state (no tag), but the previous history is often visible in audit logs or via `kubectl rollout history` for certain resources.

---
### Technical Note: OS Internals Connection
While this happens at the API layer, the concept is identical to **Git merge strategies** or **Filesystem Journaling**. The `last-applied-configuration` acts as a "diff base," similar to how a `git merge-base` finds the common ancestor between two branches to decide how to apply a patch without causing a conflict.

##### References
