2026-04-11 19:17
Tags: #kubernetes 
##### Content
### Summary/Purpose
Kubernetes is secure by default, meaning every communication between its components is encrypted and authenticated via **mTLS (Mutual TLS)**. This ensures that a rogue process on a node cannot masquerade as the Scheduler or the API Server to manipulate the cluster state.

### Core Logic: The Kubernetes CA
Kubernetes requires at least one **Certificate Authority (CA)** to sign all internal certificates. In a `kubeadm` cluster, this is usually a self-hosted CA created during cluster initialization.
* **The Root:** The `ca.crt` and `ca.key` (usually in `/etc/kubernetes/pki/`) are the most sensitive files in your cluster. If compromised, an attacker can sign their own "Admin" certificate and gain full control.
* **Trust:** Every component must have the `ca.crt` to verify the identity of the other components it talks to.

---

### Component Certificates
Kubernetes identifies components based on the **Common Name (CN)** and **Organization (O)** fields within their certificates. For example, a certificate with `CN=system:kube-scheduler` tells the API Server exactly which component is calling.

#### 1. Server Certificates
These allow clients to verify they are talking to the legitimate cluster infrastructure.

| Server             | Certificate Name  | Purpose                                                                       |
| :----------------- | :---------------- | :---------------------------------------------------------------------------- |
| **kube-apiserver** | `apiserver.crt`   | Secured with DNS names (kubernetes, kubernetes.default, etc.) and IPs.        |
| **etcd**           | `etcd/server.crt` | Ensures only the API server (or other etcd members) can talk to the DB.       |
| **kubelet**        | `kubelet.crt`     | Used for the API server to securely "push" logs or exec commands to the node. |

#### 2. Client Certificates
These act as the "credentials" for components to authenticate against the API Server.

| Client                      | Common Name (CN)                 | Organization (O)                    |
| :-------------------------- | :------------------------------- | :---------------------------------- |
| **admin**                   | `kubernetes-admin`               | `system:masters` (Full Root Access) |
| **kube-scheduler**          | `system:kube-scheduler`          | `system:kube-scheduler`             |
| **kube-controller-manager** | `system:kube-controller-manager` | `system:kube-controller-manager`    |
| **kube-proxy**              | `system:node-proxier`            | `system:node-proxier`               |

> **Note:** The `kube-apiserver` acts as both a server and a client. When it speaks to **etcd** or a **kubelet**, it uses a client certificate (often `apiserver-etcd-client.crt` or `apiserver-kubelet-client.crt`) to prove its identity to them.

---

### Usage Patterns: Certificate Management
* **Manual Generation:** You can use `openssl` or `cfssl` to generate these files manually, but it is error-prone.
* **Kubeadm:** Automatically handles the creation and rotation of these certificates during `kubeadm init` and `kubeadm upgrade`.
* **Certificates API:** Kubernetes has a built-in `CertificateSigningRequest` (CSR) API. A new [[k8s cluster components#1. kubelet|kubelet]] can generate a CSR locally, and an admin can approve it via `kubectl certificate approve` to grant the node its identity.

### Example: Inspecting a K8s Certificate
To see the identity encoded in a component's certificate, use `openssl`:
```bash
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -text -noout
```
*Look for **Subject: CN=...** to see the identity and **X509v3 Subject Alternative Name** to see which IPs/DNS names the certificate is valid for.*

### Technical Note: OS Internals (Authn Hook)
When the `kube-apiserver` receives a request, it extracts the client certificate. The **x509 authenticator** inside the binary verifies the signature using the `ca.crt`. If valid, it treats the **Common Name (CN)** as the User and the **Organization (O)** as the Group. This identity is then passed to the **RBAC** authorizer to see if that "User" has permission to perform the requested action.

##### References
