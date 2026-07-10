2026-04-11 19:20
Tags: #kubernetes 
##### Content
### Summary/Purpose
Generating certificates manually is the "Hard Way" of setting up Kubernetes, but it is essential for understanding the **Trust Chain**. While tools like `kubeadm` automate this, a power user must know how to use `openssl`, `cfssl`, or `easyrsa` to create identities for new users, nodes, or custom API servers.

---

### Core Logic: The Generation Workflow
1.  **Private Key:** Generate a unique, secret key (`.key`).
2.  **CSR:** Create a Certificate Signing Request (`.csr`) containing the identity (CN and O).
3.  **Signing:** Use the **Root CA** (Private Key + Cert) to sign the CSR and produce the final Certificate (`.crt`).

> **CRITICAL:** Every single client and server in the cluster **must** have a copy of the `ca.crt` (Public Key) to verify the signatures of others.

---

### Client Certificates (via OpenSSL)
Client certificates are used by users (like admins) and components (like the Scheduler).

#### Step-by-Step: Creating an Admin User
```bash
# 1. Generate the Private Key
openssl genrsa -out admin.key 2048

# 2. Create the CSR
# CN is the username, O is the group (system:masters gives full cluster-admin)
openssl req -new -key admin.key -out admin.csr -subj "/CN=admin/O=system:masters"

# 3. Sign the CSR with the cluster CA
openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out admin.crt -days 365
```

---

### Server Certificates

#### 1. etcd
In an HA (High Availability) setup, etcd requires multiple certificates:
* **Server Cert:** For the API server to connect to etcd.
* **Peer Cert:** For etcd nodes to communicate with each other.
* **Note:** You must include all etcd member IP addresses in the **Subject Alternative Name (SAN)** field of the certificate so they trust each other.

#### 2. kube-apiserver
The API server is accessed by many names. Its certificate **must** include every possible DNS alias and IP it might be reached by, otherwise, clients will throw "TLS Handshake" errors.
* **Aliases:** `kubernetes`, `kubernetes.default`, `kubernetes.default.svc`, `kubernetes.default.svc.cluster.local`, and the Load Balancer IP.

**Must use an OpenSSL Config File (`openssl.cnf`):**
```ini
[alt_names]
DNS.1 = kubernetes
DNS.2 = kubernetes.default
DNS.3 = kubernetes.default.svc
DNS.4 = kubernetes.default.svc.cluster.local
IP.1 = 10.96.0.1
IP.2 = 192.168.1.10 # Master Node IP
```

---

### Kubelets (Node Certificates)
Kubelets use a specific naming convention for their certificates to work with **Node Restriction** admission controllers.
* **CN Format:** `system:node:<node-name>`
* **O (Group):** `system:nodes`

**Deployment:** Once the `node-1.crt` and `node-1.key` are generated, they are referenced in the node's `KubeletConfiguration` file:
```yaml
kind: KubeletConfiguration
authentication:
  x509:
    clientCAFile: "/etc/kubernetes/pki/ca.crt"
tlsCertFile: "/var/lib/kubelet/pki/kubelet.crt"
tlsPrivateKeyFile: "/var/lib/kubelet/pki/kubelet.key"
```

---

### Key Parameters: Common Name (CN) vs Organization (O)

| Role | CN (User) | O (Group) |
| :--- | :--- | :--- |
| **Admin** | `admin` | `system:masters` |
| **Scheduler** | `system:kube-scheduler` | `system:kube-scheduler` |
| **Controller Manager** | `system:kube-controller-manager` | `system:kube-controller-manager` |
| **Kubelet** | `system:node:<node-name>` | `system:nodes` |

### Technical Note: Certificate Expiration
Certificates are not "forever." By default, `kubeadm` generates certs that expire in **1 year**. On the OS level, you can check the expiration date using:
```bash
openssl x509 -in /etc/kubernetes/pki/apiserver.crt -noout -enddate
```
If a certificate expires, the component will stop communicating immediately, and the cluster will effectively "freeze."


##### References
