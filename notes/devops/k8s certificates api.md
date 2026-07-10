2026-04-11 19:23
Tags: #kubernetes 
##### Content
### Summary/Purpose
Instead of manually swapping files via SSH or SCP, Kubernetes provides a built-in **Certificates API**. This allows users and components (like a new Kubelet) to submit a **CertificateSigningRequest (CSR)** directly to the cluster. An administrator can then review and approve the request through `kubectl`, after which the signed certificate can be retrieved directly from the API.

---

### Core Logic/Mechanism
The process moves the "CA signing" logic from a manual `openssl` command on a master node to an automated controller within the cluster.

1.  **Generation:** The user creates a Private Key and a standard CSR file locally.
2.  **Submission:** The user creates a Kubernetes `CertificateSigningRequest` object, embedding the base64-encoded CSR file.
3.  **Review:** An admin inspects the object (`kubectl get csr`).
4.  **Approval:** The admin approves the request (`kubectl certificate approve`).
5.  **Signing:** The **kube-controller-manager** notices the approved status, signs the request using the Cluster CA (root keys), and updates the CSR object with the final certificate.
6.  **Retrieval:** The user downloads the signed `.crt` from the CSR object's status field.



---

### Key Parameters: The CSR Object

| Field                  | Description                    | Note                                                     |
| :--------------------- | :----------------------------- | :------------------------------------------------------- |
| **spec.request**       | Base64 encoded CSR file.       | Generated via `cat server.csr \| base64 \| tr -d '\n'`   |
| **spec.signerName**    | Defines who should sign it.    | Usually `kubernetes.io/kube-apiserver-client`.           |
| **spec.usages**        | What the cert can be used for. | e.g., `client auth`, `server auth`, `digital signature`. |
| **status.certificate** | The final signed cert.         | Populated by the controller-manager after approval.      |

---

### Usage Patterns: Component vs. User
* **Kubelet TLS Bootstrapping:** When a new worker node joins, it automatically submits a CSR to get its unique `system:node:<node-name>` certificate.
* **New User Onboarding:** An admin can give a developer a private key and have them submit a CSR. The admin approves it, granting the developer a certificate without ever touching the developer's private key.

### Example Manifest: CSR Object
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: dev-user-access
spec:
  request: <BASE64_ENCODED_CSR_CONTENT>
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
```

### Key CLI Commands
```bash
# View all requests
kubectl get csr

# Inspect a specific request
kubectl describe csr dev-user-access

# Approve or Deny
kubectl certificate approve dev-user-access
kubectl certificate deny dev-user-access

# Export the signed certificate
kubectl get csr dev-user-access -o jsonpath='{.status.certificate}' | base64 --decode > user.crt
```

### Technical Note: Controller-Manager Role
The **kube-controller-manager** includes specific "Signer" and "Approver" loops. It requires access to the cluster's Root CA files (`ca.crt` and `ca.key`) to perform the signing. On the **OS Internals** level, these files are usually passed to the controller-manager via the flags `--cluster-signing-cert-file` and `--cluster-signing-key-file`. If these flags are missing or point to the wrong path, CSRs will stay in a `Pending` state forever, even after approval.

##### References
