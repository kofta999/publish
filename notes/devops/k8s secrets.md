2026-03-02 13:43
Tags: #kubernetes 
##### Content
**Secrets** are used to store and manage sensitive information, such as passwords, OAuth tokens, and ssh keys. While similar to ConfigMaps, they are specifically designed to hold confidential data.

### Core Characteristics
* **Security Note:** By default, Secrets are stored **unencrypted** in `etcd` (encoded as base64). For production, you should enable **Encryption at Rest** in the cluster settings or use external drivers like Azure Key Vault or HashiCorp Vault.
* **Size Limit:** Same as ConfigMaps, limited to **1MB**.
* **Base64 Encoding:** In the manifest, data must be base64 encoded. This is not encryption; it is simply a format to handle binary or special characters in YAML.

---

### Secret Types

| Type                                      | Purpose                                              | Key Requirements                                            |
| :---------------------------------------- | :--------------------------------------------------- | :---------------------------------------------------------- |
| **`Opaque`**                              | Generic secret data.                                 | User-defined keys.                                          |
| **`kubernetes.io/tls`**                   | Stores a certificate and its associated private key. | Must contain `tls.crt` and `tls.key`.                       |
| **`kubernetes.io/dockerconfigjson`**      | Stores credentials for a private Docker registry.    | Used via `imagePullSecrets` in Pod specs.                   |
| **`kubernetes.io/service-account-token`** | Used to identify a service account.                  | Automatically generated when a ServiceAccount is created.   |
| **`kubernetes.io/basic-auth`**            | Standard username/password auth.                     | Must contain `username` and `password`.                     |
| **`kubernetes.io/ssh-auth`**              | SSH private keys.                                    | Must contain `ssh-privatekey`. Usually mounted as a volume. |

---

### Docker Registry Secrets
To pull images from a private registry (like Docker Hub private repos or GitHub Packages), you must provide credentials.

* **The Command Way (Preferred):** Instead of manually writing base64 YAML, use:
  `kubectl create secret docker-registry my-reg-secret --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD`
* **Consumption:** In your Pod/Deployment manifest, reference the secret name in the `imagePullSecrets` field.

```yaml
spec:
  imagePullSecrets:
  - name: my-reg-secret
  containers:
  - name: private-app
    image: my-private-repo/app:latest

```

---

### Usage Patterns

Similar to ConfigMaps, Secrets can be:

1. **Mounted as Volumes:** Files are created in a `tmpfs` (RAM-backed filesystem) inside the container. This is the **most secure** way as the secret never touches the node's physical disk.
2. **Environment Variables:** Accessible to the application as standard variables. Like ConfigMaps, these do not update automatically if the Secret changes.

### Immutability

Like ConfigMaps, Secrets can be marked as `immutable: true`. This prevents accidental changes and improves performance by reducing the number of "watches" the `kube-apiserver` must maintain.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
immutable: true
data:
  username: YWRtaW4= # "admin" in base64
  password: bXlwYXNzd29yZA== # "mypassword" in base64

```

##### References
