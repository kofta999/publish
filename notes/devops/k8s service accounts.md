2026-04-12 13:25
Tags: #kubernetes 
##### Content
### Summary/Purpose
While standard Users are for humans accessing the cluster via `kubectl`, **Service Accounts** are for processes running inside Pods. They provide an identity for applications to authenticate against the Kubernetes API, allowing them to do things like list other Pods, trigger Deployments, or manage [[k8s certificates api|Certificates API]] requests.

---

### Core Logic/Mechanism: The Token
Authentication for Service Accounts is handled via **Service Account Tokens** (JSON Web Tokens - JWT).

* **Automated Injection:** By default, the [[k8s cluster components#1. kube-apiserver|kube-apiserver]] and [[k8s cluster components#1. kubelet|kubelet]] automatically mount a Service Account token into every Pod at `/var/run/secrets/kubernetes.io/serviceaccount/`.
* **Projected Volumes:** The token is provided via a **Projected Volume**. This is an OS-level mount that provides a signed JWT, the CA certificate, and the namespace string to the container.
* **Opt-Out:** If a Pod doesn't need to talk to the API, you can disable this injection by setting `automountServiceAccountToken: false` in the PodSpec to reduce the attack surface.

---

### Token Management
Historically, tokens were stored as Secrets, but modern Kubernetes (v1.22+) uses the **TokenRequest API** for better security (short-lived, audience-bound tokens).

* **Manual Token Generation:** If you need a token for an external script or CI/CD pipeline to act as a Service Account, you can generate one manually:
```bash
    kubectl create token <service-account-name>
```
* **Expiration:** Manually created tokens are temporary. You can specify the duration using the `--duration` flag (e.g., `3600s`).

---

### Key Parameters: Manifest Integration

| Field                            | Location         | Description                                                        |
| :------------------------------- | :--------------- | :----------------------------------------------------------------- |
| **serviceAccountName**           | `spec` (Pod)     | Defines which identity the Pod assumes.                            |
| **automountServiceAccountToken** | `spec` (Pod)     | Boolean to toggle token injection.                                 |
| **secrets**                      | `ServiceAccount` | (Legacy) References a static Secret containing a long-lived token. |

---

### Usage Patterns/Strategies
* **Default Account:** Every namespace has a `default` Service Account. If you don't specify one in your Pod, it uses this. By default, it has no permissions beyond basic discovery.
* **Application-Specific SA:** Create a unique Service Account for every application (e.g., `prometheus-sa`, `jenkins-sa`). This allows you to apply **Least Privilege** using [[k8s rbac|RBAC]] specifically for that app's needs.

### Example Manifest: Service Account & Pod
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: build-robot
  namespace: development
---
apiVersion: v1
kind: Pod
metadata:
  name: cicd-runner
spec:
  serviceAccountName: build-robot # Identity assigned here
  containers:
  - name: runner
    image: build-tools:latest
```

### Technical Note: OS Internals & Token Refresh
The token mounted in the container is managed by the kubelet. On the **OS Internals** level, the kubelet periodically refreshes the token file on the host's disk. Because it is a volume mount, the file inside the container stays up-to-date without needing to restart the Pod. The application inside the container should be designed to re-read this token file from `/var/run/secrets/...` periodically to ensure it doesn't use an expired JWT.

##### References
