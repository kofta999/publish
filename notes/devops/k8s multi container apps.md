2026-04-08 14:36
Tags: #kubernetes 
##### Content
## Multi-Container Pods

### Summary/Purpose
While a Pod typically contains a single container, Kubernetes allows for "Sidecar" or "Init" patterns where multiple containers work together. All containers in a Pod are **tightly coupled**: they are always scheduled on the same Node, share the same network namespace (reachable via `localhost`), and can share storage volumes.

---

### Core Logic/Mechanism
* **Network Sharing:** Containers share the same IP address and port space. If Container A listens on port 8080, Container B can reach it at `http://localhost:8080`.
* **Storage Sharing:** By mounting the same **Volume**, containers can exchange data through the local filesystem (e.g., a log producer and a log forwarder).
* **OS Internals:** Under the hood, the [[k8s cluster components#1. kubelet|kubelet]] ensures these containers share the same Linux **Network Namespace** and **UTS Namespace**. However, they maintain separate **PID Namespaces** unless explicitly configured otherwise.

---

### Design Patterns & Lifecycle

#### 1. Co-located Containers (Sidecar/Helper)
Standard containers that run alongside the main application. They share the same lifecycle (startup/shutdown) and are usually used for logging agents, proxies, or configuration watchers.

#### 2. Init Containers
Specialized containers that run **to completion** before the main application containers even start.
* **Sequential Execution:** If multiple init containers are defined, they run one by one in the order they appear in the manifest.
* **Failure Logic:** If an init container fails, the Pod is restarted repeatedly (subject to the `restartPolicy`) until it succeeds. If the policy is `Never`, the entire Pod is marked as `Failed`.
* **Idempotency:** Because a node reboot or Pod crash forces all init containers to run again from the start, their operations must be **idempotent** (safe to run multiple times).

#### 3. Sidecar Containers (Native Support)
Starting in K8s v1.29+, certain containers can be designated as "Sidecars" within the `initContainers` field using `restartPolicy: Always`. 
* **startup Order:** They start before main containers but do not need to "exit" to allow the next container to start. 
* **Shutdown Order:** They are typically the last to be terminated when a Pod is deleted.

---

### Key Parameters: Manifest Structure

| Container Type | Field | Lifecycle |
| :--- | :--- | :--- |
| **Standard** | `spec.containers` | Runs for the life of the Pod. |
| **Init** | `spec.initContainers` | Must finish before the app starts. |
| **Native Sidecar** | `spec.initContainers[*].restartPolicy: Always` | Starts before the app, stays running. |

---

### Example Manifest: Init & App Container
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-demo
spec:
  # 1. Runs first
  initContainers:
  - name: install-plugin
    image: busybox
    command: ['sh', '-c', 'echo "plugin-data" > /data/plugin.txt']
    volumeMounts:
    - name: shared-data
      mountPath: /data
  
  # 2. Runs only after initContainer finishes
  containers:
  - name: app-container
    image: nginx
    volumeMounts:
    - name: shared-data
      mountPath: /usr/share/nginx/html
  
  volumes:
  - name: shared-data
    emptyDir: {}
```

### Technical Note: Resource Calculation
The scheduler handles multi-container resource requests differently:
* **CPU/Memory Request:** The scheduler uses the **higher** of these two:
    1. The sum of all `containers` requests.
    2. The highest individual `initContainer` request.
* This ensures the Node has enough resources to handle both the "heavy" initialization phase and the steady-state application phase.
##### References
