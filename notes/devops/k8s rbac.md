2026-03-04 10:20
Tags: #kubernetes 
##### Content
RBAC is the **Authorization** system in Kubernetes. It determines "Who can do What" after they have been authenticated. It operates on a "least privilege" model—by default, no one has any permissions.
### Core Components
The RBAC model consists of three interconnected parts:

1.  **Role / ClusterRole:** The "What" (a list of permissions).
2.  **Subject:** The "Who" (User, Group, or ServiceAccount).
3.  **RoleBinding / ClusterRoleBinding:** The "Link" that connects the Subject to the Role.

---

### Anatomy of a Rule
Permissions are defined in a `rules` block using three main fields:

* **`apiGroups`:** The API category of the resource. Use `[""]` (an empty string) for core resources like Pods, Services, and Nodes. Use `["apps"]` for Deployments and ReplicaSets.
* **`resources`:** The objects you want to access (e.g., `pods`, `deployments`, `secrets`).
* **`verbs`:** The actions allowed (e.g., `get`, `list`, `watch`, `create`, `update`, `patch`, `delete`).
* **`resourceNames`:** To further limit the resource into specific objects only (e.g., `dev-deployment`)

> **Tip:** For better maintainability, try to name your **RoleBinding** the same as your **Role** (e.g., a Role named `pod-reader` should be linked via a RoleBinding named `pod-reader`).

---

### Namespace Scope vs. Cluster Scope

| Component       | Scope            | Use Case                                                                                          |
| :-------------- | :--------------- | :------------------------------------------------------------------------------------------------ |
| **Role**        | **Namespaced**   | Permissions within a specific namespace (e.g., "Allow dev-user to list pods in `dev` namespace"). |
| **ClusterRole** | **Cluster-wide** | Permissions for non-namespaced resources (Nodes, PVs) or permissions across *all* namespaces.     |


---

### Built-in ClusterRoles
Kubernetes provides several "User-facing" roles out of the box:

* **`cluster-admin`:** The "super-user." Complete access to every resource in the cluster.
* **`admin`:** Full access within a specific Namespace. Allows creating most resources, including Roles and RoleBindings within that namespace.
* **`edit`:** Read/Write access within a Namespace. Allows modifying most objects but **cannot** view or modify Roles/RoleBindings.
* **`view`:** Read-only access to most objects in a Namespace. Cannot view Secrets.

---

### Example Manifest (Namespaced Role)
This example allows a user named "Jane" to only read pods in the "default" namespace.

```yaml
# 1. Define the Permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # Core API
  resources: ["pods"]
  verbs: ["get", "watch", "list"]

---

# 2. Link the Permissions to the User
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-reader-binding
  namespace: default
subjects:
- kind: User
  name: jane # Name is case-sensitive
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader # Must match the Role name above
  apiGroup: rbac.authorization.k8s.io
```

##### References
