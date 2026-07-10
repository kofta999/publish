2026-04-30 14:27
Tags: #kubernetes #argocd 
##### Content
Managing secrets in a GitOps workflow is a challenge because Git is inherently transparent, while secrets must remain opaque. Two primary paths exist: **Sealed Secrets** (Encrypt and Commit) and **HashiCorp Vault** (External Reference).

### Sealed Secrets (by Bitnami)
Sealed Secrets follows the philosophy that **everything** (even secrets) should be in Git, just encrypted.

*   **Architecture:**
    *   **CRD:** Defines the `SealedSecret` object.
    *   **Controller:** Runs in-cluster; holds the **Private Key** (usually in `kube-system`).
    *   **`kubeseal` CLI:** Encrypts local `Secret` files using the controller’s **Public Key**.
*   **The Workflow:**
    1.  Developer creates a standard `Secret.yaml` locally.
    2.  `kubeseal < Secret.yaml > SealedSecret.yaml` (The resulting file is safe for public Git).
    3.  Push `SealedSecret.yaml` to Git.
    4.  Argo CD applies it to the cluster.
    5.  The **Controller** detects the CRD, decrypts it using its Private Key, and creates a standard Kubernetes `Secret`.
*   **Scopes:**
    *   **Strict (Default):** Bound to the specific name and namespace.
    *   **Namespace-wide:** Can be renamed but stays in the same namespace.
    *   **Cluster-wide:** Can be unsealed in any namespace.

---

### HashiCorp Vault (The External Source)
Vault is a centralized "Source of Truth" for secrets. In GitOps, you don't store secrets in Git at all; you store **references** to them.

*   **The Workflow:**
    1.  Secret is stored directly in the Vault UI/API.
    2.  Git contains a manifest (like an `ExternalSecret`) that says: *"Go to Vault path /db/pass and put it in a K8s Secret."*
    3.  A controller (like **External Secrets Operator**) syncs the value from Vault to Kubernetes.
*   **Key Advantage: Dynamic Secrets:** Vault can generate "Just-in-Time" credentials (e.g., a database password that expires in 1 hour). Sealed Secrets can only handle static data.

---

### Comparison: Which to Choose?

| Feature             | Sealed Secrets                    | HashiCorp Vault               |
| :------------------ | :-------------------------------- | :---------------------------- |
| **Storage**         | Encrypted in Git                  | External Database             |
| **Complexity**      | Low (Simple CLI + Controller)     | High (Requires Vault Infra)   |
| **Rotation**        | **Manual:** Requires re-sealing.  | **Automatic:** Built-in.      |
| **Security**        | Private key in-cluster is a SPOF. | High; centralized audit logs. |
| **Dynamic Secrets** | No                                | Yes                           |

### OS Internals: PKI & Entropy
On the **OS level**, Sealed Secrets uses **Asymmetric Encryption (RSA-4096)**. 
*   **Entropy:** When the controller first starts, it uses the Linux kernel's entropy pool (`/dev/urandom`) to generate its Master Private Key. If the cluster has low entropy, key generation can stall.
*   **Key Rotation:** By default, the controller rotates its sealing keys every **30 days**. 
    *   **Crucial Logic:** Old private keys are **not deleted**. They are kept in a "keyring" (Kubernetes Secrets) so that old `SealedSecrets` in Git can still be decrypted. 
    *   **The Trap:** If you delete the controller or the `kube-system` secrets without a backup, your entire Git history of encrypted secrets becomes **permanent garbage**, as the private key cannot be recovered.

##### References
