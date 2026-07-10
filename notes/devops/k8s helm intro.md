2026-04-19 17:06
Tags: #kubernetes 
##### Content
## Helm: The Kubernetes Package Manager

### Summary/Purpose
Helm is the standard tool for managing Kubernetes applications. It solves the "Wall of YAML" problem by allowing you to define, install, and upgrade even the most complex Kubernetes applications using **Charts**. Think of it as `apt`, `npm`, or `pacman` (since you're on EndeavourOS) but for your cluster.

---

### Helm 2 vs. Helm 3: The Great Evolution
The transition to version 3 was primarily a security and architectural overhaul to align with modern Kubernetes standards.

| Feature             | Helm 2                                       | Helm 3                                                |
| :------------------ | :------------------------------------------- | :---------------------------------------------------- |
| **Architecture**    | Client-Server (**Tiller**)                   | Client-Only (CLI)                                     |
| **Security**        | Tiller required high privileges (RBAC risk). | Uses your local `kubeconfig` permissions.             |
| **Update Logic**    | 2-way merge (State vs. Chart).               | **3-way strategic merge** (State vs. Chart vs. Live). |
| **Metadata**        | `apiVersion: v1` in `Chart.yaml`.            | `apiVersion: v2` (required).                          |
| **Release Storage** | ConfigMaps (usually).                        | **Secrets** (by default).                             |

> **Why the 3-way merge matters:** In Helm 2, if you manually patched a deployment via `kubectl`, a Helm upgrade would ignore your manual changes. Helm 3 compares the **Old State**, the **New Chart**, and the **Live State** to ensure manual patches (like a quick image hotfix) aren't accidentally wiped out.

---

### Core Components

* **Chart:** The "package" itself. A directory containing all the template files and metadata.
* **Release:** A specific instance of a chart running in your cluster. You can install the same "PostgreSQL" chart three times with different names (`db-prod`, `db-dev`, `db-test`); each is a separate **Release**.
* **Revision:** Every time you upgrade or rollback a Release, a new revision number is created.
* **Helm Repos:** Servers that host packaged charts. While **ArtifactHub.io** is the central search engine, you add specific repos (like Bitnami) to your local CLI.

---

### Chart Structure
A typical Helm chart looks like this:

| File          | Purpose                                                             |
| :------------ | :------------------------------------------------------------------ |
| `Chart.yaml`  | Metadata (name, version, appVersion).                               |
| `values.yaml` | Default input variables.                                            |
| `templates/`  | YAML manifests with **Go Template** syntax (`{{ .Values.image }}`). |
| `charts/`     | Directory for sub-charts (dependencies).                            |

#### Chart Types:
* **Application:** A standard chart that can be installed.
* **Library:** A helper chart that provides common utilities/templates for other charts but cannot be installed on its own.

---

### Overriding Values
The hierarchy of values follows a "most specific wins" rule:

1.  **Default:** Defined in the chart's `values.yaml`.
2.  **Custom File:** `--values custom-values.yaml` (Overrides defaults).
3.  **Command Line:** `--set key=value` (Overrides everything).

> **Pro Tip:** When using `--set`, you can use dots for nested values: `--set image.tag=latest`.

---

### Key CLI Commands
```bash
# Add a repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Install a release
helm install my-release bitnami/nginx --values my-values.yaml

# List releases
helm list

# Upgrade/Rollback
helm upgrade my-release bitnami/nginx --set service.type=LoadBalancer
helm rollback my-release 1 # Back to revision 1

# Debugging (Shows the generated YAML without installing)
helm install --debug --dry-run my-release ./my-chart
```

### Technical Note: OS Internals & Release Storage
On the **OS Internals** level, Helm 3 stores its state in **Kubernetes Secrets** within the same namespace as the release. These secrets are named `sh.helm.release.v1.<release-name>.v<revision>`. The data inside is base64 encoded and compressed (gzipped) JSON representing the entire release state. This is why Helm no longer needs a "Tiller" database—it uses the cluster's own [[k8s etcd|etcd]] as its storage engine.
##### References
