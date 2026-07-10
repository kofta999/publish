2026-04-29 20:53
Tags: #kubernetes #argocd 
##### Content
Argo CD is the standard tool for **GitOps**, shifting the responsibility of "applying" manifests from an external CI server (like Jenkins) to a specialized controller inside the Kubernetes cluster.

### 1. Architectural Evolution: CI vs. CD
* **Traditional Problem:** Jenkins/GitHub Actions requires `kubectl` access to your cluster. If the CI server is hacked, your cluster is compromised. There is also no way to detect "Configuration Drift" (manual changes in the cluster).
* **GitOps Solution:** Argo CD is "Pull-based." It lives inside the cluster and pulls configuration from Git. It uses a **Three-way Merge** (Git state vs. Live state vs. Previous state) to ensure the cluster matches the source of truth exactly.

---
### 2. Core Configuration Files
Argo CD uses two primary Custom Resource Definitions (CRDs) to manage deployments and security.

#### A. Application
The `Application` resource links a specific Git repository (source) to a Kubernetes cluster and namespace (destination).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default # References the AppProject
  source:
    repoURL: https://github.com/my-org/my-configs.git
    targetRevision: HEAD   # Branch, tag, or commit
    path: overlays/prod    # Directory containing manifests/kustomize
  destination:
    server: https://kubernetes.default.svc # Local or remote cluster URL
    namespace: production
  syncPolicy:
    automated:
      prune: true     # Deletes resources removed from Git
      selfHeal: true  # Overwrites manual cluster changes
```

#### B. AppProject
The `AppProject` provides a logical grouping for applications, enabling multi-tenancy and security boundaries.

* **Source Repos:** Which Git repos this project is allowed to pull from.
* **Destinations:** Which clusters/namespaces this project can deploy to.
* **Whitelists:** Restrict specific resource types (e.g., only allow `Deployments` and `Services`, deny `ClusterRoles`).

---

### 3. Environment Strategy: Branches vs. Kustomize
Managing `Dev`, `Staging`, and `Prod` requires a strategy to handle environment-specific differences (like replica counts or API keys).

| Strategy               | Logic                                                              | Best For                                                                          |
| :--------------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **Branches**           | `main` branch for Prod, `develop` for Dev.                         | Small teams; simple to visualize but prone to merge conflicts.                    |
| **Kustomize Overlays** | A `base/` folder with common YAML + `overlays/prod/` with patches. | **Industry Standard.** Keeps one source of truth with small patches for each env. |
| **Helm Values**        | One Chart + `values-dev.yaml`, `values-prod.yaml`.                 | Complex third-party apps with many parameters.                                    |

---

### 4. Advanced Operational Logic

* **Multi-Cluster Management:** You can add external clusters to a central Argo CD instance using a Secret. Argo CD then manages those clusters remotely using a Service Account with `cluster-admin` permissions.
* **Poll vs. Webhook:**
    * **Default:** Argo CD polls Git every **3 minutes**.
    * **Webhook:** For instant deployment, configure a Git webhook (GitHub/GitLab) to point to `https://<argocd-url>/api/webhook`. This triggers an immediate refresh upon every `git push`.
* **Health Checks:** Argo CD doesn't just check if the YAML is applied; it monitors the **Health Status** of resources (e.g., is the Deployment `Ready`? Is the Ingress assigned an IP?).

##### References
