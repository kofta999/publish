2026-04-30 14:12
Tags: #kubernetes #argocd
##### Content
## Argo CD: Sync Phases & Waves

To manage complex deployments (e.g., ensuring a database schema migration runs before the application starts), Argo CD provides two primary mechanisms: **Phases** and **Waves**.

### Sync Phases
Phases define the high-level lifecycle of a synchronization operation. They are controlled using the `argocd.argoproj.io/hook` annotation.

*   **PreSync:** Executed before any application manifests are applied. Commonly used for database migrations or backing up data.
*   **Sync:** The main phase where the actual application manifests (Deployments, Services, etc.) are applied.
*   **PostSync:** Executed after all manifests in the Sync phase are successfully applied and reach a Healthy state. Used for notifications, integration tests, or clearing caches.
*   **SyncFail:** Executed only if the Sync phase fails. Useful for cleanup or sending "Deployment Failed" alerts.
*   **Skip:** Tells Argo CD to ignore the manifest entirely during the sync process.

> **Atomic Failure:** If a hook in any phase (Pre, Sync, or Post) fails, Argo CD immediately halts and marks the entire Sync operation as **Failed**. This prevents your cluster from entering a partially updated, "broken" state.

---

### Sync Waves
While Phases handle the "When," **Waves** handle the "Order" within those phases. They are controlled via the `argocd.argoproj.io/sync-wave` annotation.

*   **Logic:** Argo CD sorts all resources in a phase by their wave value (integers) and applies them in order from **lowest to highest**.
*   **Default Behavior:** If no wave is specified, the resource is assigned **Wave 0**.
*   **Execution Flow:** Argo CD starts with the lowest wave. It waits for all resources in that wave to reach a **Healthy** state before moving to the next wave.
*   **Negative Waves:** You can use negative integers (e.g., `-1`, `-5`) to ensure specific resources (like a Namespace or a ConfigMap) are created before the default Wave 0 resources.

#### Example: Sequential Deployment
```yaml
# 1. First: The Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: my-app
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
---
# 2. Second: The Database (Default Wave 0)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql
  namespace: my-app
---
# 3. Third: The Application (Wave 1 - waits for MySQL to be Healthy)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
  namespace: my-app
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

---
### Phase vs. Wave Comparison

| Feature | Sync Phase | Sync Wave |
| :--- | :--- | :--- |
| **Annotation** | `argocd.argoproj.io/hook` | `argocd.argoproj.io/sync-wave` |
| **Granularity** | Coarse (Pre, Sync, Post) | Fine (Ordered Integers) |
| **Waiting Logic** | Waits for phase completion | Waits for specific wave "Health" |
| **Usage** | Lifecycle events (Migrations, Tests) | Dependency management (DB before App) |

### OS Internals: The Controller Loop
On the **OS level**, the Argo CD Application Controller is a Go binary running as a Kubernetes Controller. It creates a "reconciliation loop." When you trigger a Sync, the controller builds a **Dependency Graph** based on your Phases and Waves. It then issues `POST/PATCH` requests to the `kube-apiserver`. 

The controller doesn't just "fire and forget"; it actively watches the **Status** field of the objects in the ETCD database. It remains in a "waiting" state (using the `watch` mechanism in the Go client) until the pods report `Ready` in their container status, ensuring that Wave 1 strictly follows the successful startup of Wave 0.
##### References
