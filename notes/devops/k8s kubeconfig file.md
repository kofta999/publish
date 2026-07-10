2026-04-12 13:15
Tags: #kubernetes 
##### Content

### Summary/Purpose
A **Kubeconfig** file is a configuration file used to organize information about clusters, users, namespaces, and authentication mechanisms. Instead of passing the API server URL and credentials with every `kubectl` command, you use this file to manage multiple environments and switch between them seamlessly.

---

### Core Logic/Mechanism: The Three Pillars
A Kubeconfig is structured into three main sections that act as building blocks:

1.  **Clusters:** Contains the connection details for the Kubernetes API.
    * `server`: The URL (e.g., `https://192.168.1.10:6443`).
    * `certificate-authority`: Path to the `ca.crt` file (to verify the server).
2.  **Users:** Contains the credentials to identify yourself to the cluster.
    * Can use client certificates (`client-certificate` and `client-key`).
    * Can use tokens or username/password.
3.  **Contexts:** The "glue" that binds a **User** to a **Cluster**.
    * This is what you actually "use" to perform actions.
    * You can also define a **default namespace** for a context, so you don't have to append `-n <name>` to every command.

---

### Key Parameters: Manipulation

| Command                                                 | Action                                                                    |
| :------------------------------------------------------ | :------------------------------------------------------------------------ |
| `kubectl config view`                                   | Shows the current configuration (merges `$HOME/.kube/config` and others). |
| `kubectl config get-contexts`                           | Lists all available user-cluster combinations.                            |
| `kubectl config use-context <name>`                     | Switches your active environment.                                         |
| `kubectl config set-context --current --namespace=<ns>` | Updates the default namespace for your current context.                   |

---

### Usage Patterns: Managing Multiple Files
By default, `kubectl` looks at `~/.kube/config`. However, if you have multiple clusters (e.g., from different cloud providers), you can merge them temporarily using the environment variable:
`export KUBECONFIG=$HOME/.kube/config:$HOME/.kube/work-config:$HOME/.kube/lab-config`

---

### Example Manifest: Multi-Environment Setup
```yaml
apiVersion: v1
kind: Config
preferences: {}

clusters:
- name: prod-cluster
  cluster:
    certificate-authority: /etc/kubernetes/pki/ca.crt
    server: https://10.0.0.1:6443
- name: dev-google
  cluster:
    server: https://35.200.0.1

users:
- name: admin-user
  user:
    client-certificate: /home/kofta/.kube/admin.crt
    client-key: /home/kofta/.kube/admin.key
- name: dev-worker
  user:
    token: eyJhbGciOiJSUzI1...

contexts:
- name: admin@prod
  context:
    cluster: prod-cluster
    user: admin-user
- name: dev@google
  context:
    cluster: dev-google
    user: dev-worker
    namespace: development # Automatic namespace targeting

current-context: admin@prod # The active context
```

### Technical Note: Security & Embedding
Sharing Kubeconfig files can be dangerous because they often contain private keys or tokens. To make a Kubeconfig file "portable" (single file), you can **embed** the certificate data instead of referencing paths.
* **Path Reference:** `certificate-authority: /path/to/ca.crt`
* **Embedded Data:** `certificate-authority-data: <BASE64_ENCODED_CONTENT>`

On the **OS Internals** level, when `kubectl` runs, it reads this file, creates an HTTP client with the specified TLS configuration, and initiates the handshake discussed in the [[tls and public key infrastructure|TLS & PKI]] note.

##### References
