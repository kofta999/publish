2026-04-08 16:05
Tags: #kubernetes 
##### Content

### Master Template: Cluster Upgrade Reference
This guide outlines the standard procedure for a `kubeadm` based cluster upgrade.

#### 1. Pre-Flight Checks
* **Backup:** Take a snapshot of [[k8s etcd|etcd]].
* **Release Notes:** Check for deprecated APIs in the target version.
* **Order:** Always upgrade the **Control Plane** before the **Worker Nodes**.

#### 2. Upgrade Control Plane (Master)
Even when the Master is down, your running application Pods on worker nodes continue to function. However, no new Pods can be scheduled, and the API is unreachable.
1.  **Upgrade kubeadm:**
```bash
    apt-mark unhold kubeadm && apt-get update && apt-get install -y
    kubeadm=1.30.0-1.1 && apt-mark hold kubeadm
```
2.  **Plan & Apply:**
```bash
    kubeadm upgrade plan   # Checks compatibility
    kubeadm upgrade apply v1.30.0
```
3.  **Update Kubelet/Kubectl:** Upgrade the binaries on the master node and restart the service.

#### 3. Upgrade Worker Nodes
Worker nodes should be upgraded one by one to maintain application availability.
1.  **Drain the Node:** Evicts pods gracefully to other nodes.
```bash
    kubectl drain node-01 --ignore-daemonsets
```
2.  **Upgrade kubeadm:** Install the new version on the worker node.
3.  **Upgrade Configuration:**
```bash
    kubeadm upgrade node
```
4.  **Update Kubelet:** Install new binary and restart.
5.  **Uncordon:** Mark node as schedulable again.
```bash
    kubectl uncordon node-01
```

---

### Key Parameters: Upgrade Commands

| Command                  | Purpose                                                                    |
| :----------------------- | :------------------------------------------------------------------------- |
| **kubeadm upgrade plan** | Identifies which components need updates and verifies version support.     |
| **kubectl drain**        | Safely evicts pods; essential for preventing downtime during node reboots. |
| **kubectl cordon**       | Marks a node as unschedulable without evicting existing pods.              |
| **apt-mark hold**        | Prevents package managers from accidentally auto-upgrading K8s binaries.   |

### Technical Note: OS Internals & Binary Swapping
When you upgrade the **kubelet**, you are replacing a systemd service binary. The kubelet process is responsible for maintaining the container runtimes via CRI. A restart of the kubelet service does **not** kill running containers on the host (unless the node is rebooted), as the container runtime (containerd/CRI-O) is a separate process. However, the kubelet will briefly stop reporting heartbeats to the API server during the swap.

##### References
