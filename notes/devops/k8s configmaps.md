2026-03-02 13:41
Tags: #kubernetes 
##### Content
A **ConfigMap** is an API object used to store non-confidential data in key-value pairs. Its primary purpose is to **decouple** environment-specific configuration from the application container image, making applications more portable.

### Core Constraints
* **Size Limit:** A ConfigMap cannot exceed **1MB**. If you need to store larger configuration files, consider using a Volume mount from a persistent disk or a specialized configuration service.
* **Data Types:** Designed for UTF-8 text. For binary data, use **Secrets**.
* **Validation:** If you use `envFrom` and a key in the ConfigMap is invalid (e.g., contains characters not allowed in OS environment variables), Kubernetes will **silently skip** that specific key while loading the rest.

---
### Consumption Patterns
There are four primary ways a Pod can consume a ConfigMap:

#### 1. Environment Variables (`envFrom`)
Injects all keys in a ConfigMap as environment variables.
* **Behavior:** If the ConfigMap is updated, the Pod **does not** see the change. Environment variables are injected only at process startup.

#### 2. CLI Arguments (`valueFrom`)
Used to pass specific config values into the container's entrypoint command/args.
* **Mechanism:** You first define an environment variable using `valueFrom`, then reference that variable in the `args` section using `$(VAR_NAME)` syntax.

#### 3. Directory Mount (Volume)
Mounts the entire ConfigMap as a directory where each **key** is a file and the **value** is the file content.
* **Live Updates:** This method **supports live updates**. When the ConfigMap is modified, the Kubelet eventually updates the files inside the Pod (usually within a minute).
* **Caveat:** The application must be programmed to watch for file changes (e.g., inotify) to reload the settings without a restart.

#### 4. File Mount (SubPath)
Used to "drop" a specific key from a ConfigMap into an existing directory in the container without overwriting the entire directory.
* **Limitation:** Unlike directory mounts, files mounted via `subPath` **do not receive live updates**. The Pod must be restarted to see changes.

---

### Lifecycle and Immutability
* **Deletion:** Deleting a ConfigMap does not immediately affect running Pods that consumed it via environment variables (since the data is already in the process memory), but it will cause issues if the Pod restarts or if a volume-mounted file is updated.
* **Immutable ConfigMaps:** You can set `immutable: true` in the manifest. 
    * **Benefit:** Significantly reduces the load on the `kube-apiserver` because the Kubelet stops "watching" for changes to that specific ConfigMap.
    * **Safety:** Prevents accidental configuration changes that could cause a rolling outage. To update an immutable ConfigMap, you must delete it and create a new one with a different name.

### Example Manifest
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
immutable: false
data:
  ui.color: "blue"
  ui.message: "Welcome to Production"
  config.json: |
    {
      "retries": 5,
      "logging": "verbose"
    }
```

##### References
