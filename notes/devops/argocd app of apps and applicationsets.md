2026-04-30 14:13
Tags: #kubernetes #argocd 
##### Content
The **App of Apps** pattern and **ApplicationSets** are the two primary ways to scale Argo CD from managing a single service to managing hundreds of clusters and environments.

### App of Apps Pattern
The "App of Apps" is a structural pattern where a single Argo CD `Application` (the "root") points to a directory in Git containing other `Application` manifests.

*   **Logic:** Instead of manually running `kubectl apply` for every new service, you simply add a new `Application` YAML to the tracked folder. Argo CD sees the new manifest and automatically creates the child application.
*   **Structure:**
    *   **Root App:** Points to `deploy/argo-apps/`.
    *   **Child Apps:** Inside `deploy/argo-apps/`, you have `guestbook-app.yaml`, `mysql-app.yaml`, etc.
    *   **Actual Manifests:** The child apps point to the folders containing the `Deployment` and `Service` YAMLs.

---
### ApplicationSets
While App of Apps is great for organization, **ApplicationSets** (a separate controller integrated into Argo CD) allow you to **automate** the creation of Applications using templates and generators.
#### Generators
Generators tell the ApplicationSet where to look for data to plug into the template.
*   **List Generator:** Hardcoded key-value pairs (e.g., list of clusters or environments).
*   **Git Generator:** Discovers directories in a Git repo. If you add a new folder, Argo CD creates a new App automatically.
*   **Cluster Generator:** Automatically targets all clusters linked to Argo CD.

---

### Manifest Example: List Generator
This example uses a **List Generator** to deploy a specific app to two different environments (Staging and Production) using a single template.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: web-app-set
  namespace: argocd
spec:
  generators:
  - list:
      elements:
        - env: staging
          cluster: https://10.0.0.10:6443
        - env: prod
          cluster: https://kubernetes.default.svc # local cluster
  template:
    metadata:
      name: '{{env}}-web-app' # Generates: staging-web-app and prod-web-app
    spec:
      project: default
      source:
        repoURL: https://github.com/my-org/manifests.git
        targetRevision: HEAD
        path: 'overlays/{{env}}' # Points to the specific Kustomize overlay
      destination:
        server: '{{cluster}}'
        namespace: '{{env}}-ns'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

---

### Key Comparison

| Feature       | App of Apps                    | ApplicationSet                     |
| :------------ | :----------------------------- | :--------------------------------- |
| **Logic**     | Static (Manual YAML per app)   | Dynamic (Template-based)           |
| **Effort**    | Easy to debug/understand       | Highly scalable; "hands-off"       |
| **Mechanism** | Standard `Application` CRD     | `ApplicationSet` Controller        |
| **Best For**  | Organizing a fixed set of apps | Multi-cluster/Multi-tenant scaling |

### OS Internals: The Template Engine
On the **OS level**, the ApplicationSet controller acts as a **Templating Engine** written in Go. When it processes a manifest:
1.  **Generation:** It executes the generator logic (e.g., scanning a Git directory or reading the `elements` list).
2.  **Interpolation:** It performs string substitution on the `{{variables}}` using a logic similar to Go's `text/template` library.
3.  **Creation:** It doesn't create Pods or Services directly. Instead, it creates standard `Application` objects in the Kubernetes API. The main Argo CD controller then sees these new `Application` objects and handles the actual deployment logic. This separation of concerns ensures that even if the ApplicationSet controller crashes, the already-created Applications remain active.

##### References
