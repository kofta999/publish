2026-04-02 10:17
Tags: #kubernetes 
##### Content
## Static Pods

### Summary/Purpose
Static Pods are managed directly by the **kubelet** daemon on a specific node, without the API server observing or controlling them. They are the "bootstrapping" mechanism for Kubernetes itself; since the Control Plane components (like the API server and Scheduler) often run as Pods, Static Pods allow the kubelet to start them before a functional cluster exists.

### Core Logic/Mechanism
* **The Kubelet's Watch:** The kubelet periodically scans a designated directory on the local filesystem for JSON or YAML manifest files.
* **Lifecycle Management:** If a file is added, the kubelet creates the Pod. If it's modified, the kubelet restarts the containers with the new config. If it's deleted, the kubelet kills the Pod.
* **Independence:** Because the kubelet manages them directly, these Pods stay running even if the Control Plane or `etcd` goes down.
* **Restart Policy:** The kubelet automatically restarts crashed containers within a Static Pod, acting as a local supervisor.

### Key Parameters: Configuration
There are two ways to tell the kubelet where to look for Static Pod manifests:

| Method             | Parameter             | Typical Path                              |
| :----------------- | :-------------------- | :---------------------------------------- |
| **CLI Argument**   | `--pod-manifest-path` | `/etc/kubernetes/manifests`               |
| **Kubelet Config** | `staticPodPath`       | Defined in `/var/lib/kubelet/config.yaml` |

### Usage Patterns/Strategies
* **Bootstrapping the Control Plane:** In a `kubeadm` cluster, the API Server, Controller Manager, and Scheduler are all run as Static Pods on the master nodes.
* **Node-Level Agents:** Running essential monitoring or logging agents that must start immediately when the node boots, regardless of cluster health.

---

### Mirror Pods & Cluster Integration
If the node is part of a larger cluster, the kubelet attempts to create a **Mirror Pod** on the `kube-apiserver` for every Static Pod.

* **Visibility:** This allows `kubectl get pods` to show the Static Pod so administrators can see its status and logs.
* **Read-Only:** The Mirror Pod is a "ghost" object. Any attempt to `kubectl delete` or `edit` it will be rejected by the API server or simply ignored by the kubelet, which will recreate the mirror.
* **Naming Convention:** Static Pod names are automatically appended with the node's hostname (e.g., `static-web-node-01`).

### Debugging & Inspection
Since these Pods bypass the standard Kubernetes scheduling logic, you cannot use high-level tools if the kubelet is struggling. You must go directly to the Container Runtime:

```bash
# Check if the kubelet process is running
systemctl status kubelet

# Inspect the actual containers on the host OS
docker ps       # If using Docker
nerdctl -n k8s.io ps  # If using containerd/nerdctl

# View the configuration to find the manifest path
cat /var/lib/kubelet/config.yaml | grep staticPodPath
```

### Technical Note: OS Internals
Static Pods leverage the **kubelet's internal sync loop**. Unlike regular Pods that wait for a `binding` event from the API server, the Static Pod config provider triggers a "New Pod" event internally. The kubelet then uses the **CRI (Container Runtime Interface)** to communicate with the runtime (like `containerd`) to set up the Linux namespaces and cgroups exactly as it would for a normal Pod.

##### References
