2026-04-03 17:23
Tags: #kubernetes 
##### Content
## Admission Controllers

### Summary/Purpose
Admission Controllers act as **gatekeepers** for the Kubernetes API. They are pieces of code that intercept requests to the `kube-apiserver` *after* the request is authenticated and authorized, but *before* the object is persisted to [[k8s etcd|etcd]]. They are used to enforce security policies, initialize default values, or prevent resource creation if certain cluster-wide requirements aren't met.

### Core Logic/Mechanism
The admission process happens in two distinct phases:
1.  **Mutating Phase:** Modifies the incoming object (e.g., injecting a sidecar container or setting default [[k8s resource quotas|Resource Quotas]]).
2.  **Validating Phase:** Checks if the object is "legal" according to your business logic. If any validating controller rejects the request, the entire creation fails immediately.

---
### Types of Admission Controllers
While many are built-in, you can extend the API with custom logic using Webhooks.

| Type           | Action                           | Example                                                            |
| :------------- | :------------------------------- | :----------------------------------------------------------------- |
| **Mutating**   | **Changes** the object.          | `DefaultStorageClass` (adds a storage class if missing).           |
| **Validating** | **Approves/Rejects** the object. | `NamespaceExists` (rejects pods sent to a non-existent namespace). |
| **Webhook**    | **Calls an external service.**   | `MutatingAdmissionWebhook` or `ValidatingAdmissionWebhook`.        |

#### Built-in Controllers:
* **NamespaceLifecycle:** Prevents creating objects in a namespace that is being terminated.
* **LimitRanger:** Enforces the constraints defined in a [[k8s limit range|LimitRange]].
* **ResourceQuota:** Ensures the request doesn't exceed the namespace's [[k8s resource quotas|Resource Quotas]].
* **NodeRestriction:** Limits the kubelet's ability to modify only its own Node and Pod objects (security hardening).

---

### Configuration & Management
Admission controllers are compiled into the `kube-apiserver` binary. To manage which ones are active, you must modify the API server start-up arguments.

* **View Enabled Plugins:**
    Since the API server usually runs as a [[k8s static pods|Static Pod]], check its process or help output:
```bash
    kube-apiserver -h | grep enable-admission-plugins
```
* **Enable/Disable Plugins:**
    Add or remove plugins using these flags in the API server manifest (usually `/etc/kubernetes/manifests/kube-apiserver.yaml`):
```bash
    --enable-admission-plugins=NodeRestriction,NamespaceLifecycle,LimitRanger
    --disable-admission-plugins=DefaultStorageClass
```

### Admission Webhooks
If the built-in controllers aren't enough, you can point Kubernetes to your own HTTP server.
1.  **MutatingAdmissionWebhook:** Your server receives the JSON of the object, modifies it (e.g., adding an `env` variable), and sends back a "patch."
2.  **ValidatingAdmissionWebhook:** Your server receives the JSON and returns a simple `allowed: true/false`. This is how policy engines like **OPA Gatekeeper** or **Kyverno** work.

### Technical Note: OS Internals & Consistency
Admission control is the final step in the **"Chain of Trust"** before the state is committed to disk. Because it happens after authorization, it can enforce rules that even a `cluster-admin` must follow. This ensures that the cluster's structural integrity is maintained regardless of the user's permission level.

##### References
