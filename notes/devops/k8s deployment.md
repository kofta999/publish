2026-03-01 11:42
Tags: #kubernetes 
##### Content
A **Deployment** is a high-level controller that provides declarative updates for [[k8s pods|Pods]] and [[k8s replicaset|ReplicaSets]]. In the Kubernetes hierarchy, you manage the Deployment, the Deployment manages the **ReplicaSet**, and the ReplicaSet manages the **Pods**.

### Core Features
* **Self-Healing:** Automatically replaces pods that fail or are deleted.
* **Scaling:** Adjusting the `replicas` count is handled seamlessly.
* **Rollouts & Rollbacks:** Manages the transition between different versions of your application without downtime.

---

### Update Strategies

#### 1. Rolling Update (Default)
This strategy ensures zero downtime by gradually replacing old Pods with new ones.
* **The Flow:**
    1.  Creates a new, empty ReplicaSet for the new version.
    2.  Scales up the new RS by 1 Pod.
    3.  Scales down the old RS by 1 Pod.
    4.  Repeats until the new RS reaches the desired count and the old RS is empty.
* **Service Connectivity:** Because Services use label selectors, they automatically start sending traffic to the new Pods as soon as they pass their **[[k8s pods health checks probes#Readiness Probe|Readiness Probes.]]**
* **Fine-Tuning:**
    * `maxUnavailable`: The maximum number of Pods that can be unavailable during the update (can be a number or %).
    * `maxSurge`: The maximum number of Pods that can be created over the desired replica count during the update.

#### 2. Recreate
All existing Pods are killed before any new ones are created.
* **Use Case:** Necessary when the application does not support running two different versions simultaneously (e.g., database schema migrations) or for critical security patches (Zero-Day) where you must ensure no old versions remain.
* **Downside:** Causes noticeable downtime during the transition.

---
### Deployment Revisions & History
Kubernetes keeps track of every change you make to a Deployment's pod template (like updating the image).

* **Revision History:** Each change creates a new **Revision**. By default, Kubernetes stores these in the background as old ReplicaSets (scaled to 0).
* **Rollbacks:** If a new update is buggy, you can undo it with `kubectl rollout undo deployment/<name>`. This tells the Deployment to scale the "Revision 2" ReplicaSet back up and the current one down.
* **Revision Limit:** You can control how many old ReplicaSets to keep using `revisionHistoryLimit` in the spec (usually set to 10).

---

### Health Monitoring during Rollouts
Deployments are "smart" and will stop a rollout if something goes wrong.

* **`progressDeadlineSeconds`:** Defines how long the Deployment should wait for the rollout to succeed (e.g., for Pods to become `Ready`). If the deadline is exceeded, the Deployment is marked as "Failed," and the rollout pauses. This prevents a broken image from slowly killing your entire production fleet.

### Example Manifest
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 4
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.1
```
##### References
