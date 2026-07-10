2026-05-02 13:38
Tags: #kubernetes 
##### Content
### Core Concept: Base vs. Overlays
Kustomize uses a "template-free" approach to customize Kubernetes manifests. Instead of placeholders (like Helm), it uses a base manifest and applies patches layered on top.

*   **`base/`**: Contains the standard, "golden" manifests (Deployment, Service) that are common across all environments.
*   **`overlays/<env>/`**: Contains the `kustomization.yaml` and patch files specific to an environment (e.g., `prod` gets more replicas, `dev` gets a `NodePort`).

### The `kustomization.yaml` File
This is the entry point for the Kustomize engine. It defines what resources to include and how to transform them.

**Example: `overlays/prod/kustomization.yaml`**
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# Inherit from the base folder
resources:
  - ../../base

# Transformations (Global changes)
namespace: production
namePrefix: prod-
commonLabels:
  variant: production
  app: tadoku

# Specific overrides
images:
  - name: my-app-image
    newName: ghcr.io/user/my-app
    newTag: v1.2.0

patches:
  - path: replica-count.yaml
```

---

### Common Transformations
Transformations are high-level directives that modify all resources defined in the `resources` list simultaneously.

*   **`commonLabels`**: Adds a label to every resource and every selector (ensures Services still find Pods).
*   **`namePrefix` / `nameSuffix`**: Prepends or appends strings to resource names (e.g., `web` becomes `prod-web`).
*   **`namespace`**: Forces all resources into the specified namespace.
*   **`images`**: A specialized transformer that replaces image names or tags without needing a complex regex or patch.

---
### Patching: Strategic Merge vs. JSON RFC 6902
When transformations aren't enough, patches allow for "surgical" edits to specific fields.

#### 1. Strategic Merge Patch
Matches the original manifest's structure. Kustomize "merges" your patch into the base.
*   **To Delete a Key**: Set the value to `null`.
*   **To Delete from a List**: Use the `$patch: delete` directive alongside a `name` identifier.

```yaml
# patch-cpu.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  template:
    spec:
      containers:
        - name: main
          resources:
            limits:
              cpu: "2" # Overrides base value
```

#### 2. JSON Patch (RFC 6902)
Used for precise operations like adding to a list or changing a specific index.
*   **The `-` Syntax**: In a path like `/spec/template/spec/containers/-`, the `-` represents the end of the array (useful for injecting sidecars).

---
### Kustomize Components
Components are reusable pieces of configuration (e.g., "enable-logging" or "add-proxy") that can be mixed and matched into various overlays. Unlike a `base`, a `component` is designed to be optional and composable.

*   **Structure**: Stored in a `/components` directory.
*   **Declaration**: The `kustomization.yaml` inside the component folder uses `kind: Component`.
*   **Usage**: Included in an overlay's `kustomization.yaml` under the `components:` field.

---

### Deployment Workflow
Kustomize is natively integrated into `kubectl`.

*   **Manual Build**: `kustomize build .` (Outputs the final YAML to stdout).
*   **Direct Apply**: `kubectl apply -k ./overlays/prod`
*   **Pipe Workflow**: `kustomize build . | kubectl apply -f -`

### OS Internals: The Merging Engine
On the **OS level**, the Kustomize binary (built in Go) performs an in-memory **Directed Acyclic Graph (DAG)** construction. 
1.  It reads the `kustomization.yaml` and all referenced files into memory buffers.
2.  It parses the YAML into internal tree structures.
3.  **Strategic Merging**: It uses the Kubernetes `apimachinery` libraries to understand the schema of resources (knowing that a `list` of containers should be merged by `name`, while a `list` of finalizers should be replaced).
4.  **Serialization**: Once the tree is fully transformed, it serializes the result back into the YAML stream you see in your terminal. Because it operates entirely in memory until the final output, it is extremely fast and side-effect free.

### Final Technical Note: Multi-Directory Management
To handle deeply nested projects, you can reference other directories in your `resources` list. Kustomize will recursively look for a `kustomization.yaml` in each folder, treating each as a localized "sub-bundle" before merging it into the parent's context.

##### References
