2026-04-13 11:13
Tags: #kubernetes 
##### Content
### Summary/Purpose
While PVs and PVCs allow for manual storage management, **StorageClasses (SC)** enable **Dynamic Provisioning**. Instead of an administrator manually creating PVs in advance (Static Provisioning), the cluster automatically "orders" the storage from a provider the moment a user submits a PVC.

---

### Core Logic: The Blueprint
A StorageClass acts as a profile that describes the "type" of storage available. When a PVC references a StorageClass, a **Provisioner** (a background service) intercepts the request, creates the storage asset in the backend (e.g., an AWS EBS volume or GCP Persistent Disk), and then automatically creates a matching **PV** to bind with the PVC.

---

### Key Parameters: The Details

| Parameter                | Description                                                                                                                      |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Provisioner**          | The plugin that determines which volume plugin is used for provisioning PVs (e.g., `kubernetes.io/aws-ebs` or `csi.shared.com`). |
| **Reclaim Policy**       | `Delete` (default) or `Retain`. Defines what happens to the underlying storage when the PVC is deleted.                          |
| **Volume Binding Mode**  | `Immediate` (default) or `WaitForFirstConsumer`.                                                                                 |
| **AllowVolumeExpansion** | Set to `true` to allow users to resize their PVCs without recreating them.                                                       |

#### Volume Binding Modes
1.  **Immediate:** The storage is created as soon as the PVC is created. 
    * *Issue:* In multi-zone clouds, the storage might be created in Zone A, but the Pod gets scheduled in Zone B, leading to a "Node Affinity" error.
2.  **WaitForFirstConsumer:** The storage isn't created until a Pod using the PVC is assigned to a Node. This ensures the disk is created in the same availability zone as the Pod.

**QoS for Storage:** While not a native K8s term, using different StorageClasses (e.g., `gold`, `silver`, `bronze`) allows you to offer different IOPS/Performance tiers to users.

---

### Example Manifest: StorageClass
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: premium-ssd
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: none
reclaimPolicy: Retain
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

### Technical Note: CSI (Container Storage Interface)
Modern Kubernetes uses the **CSI** standard. Previously, storage drivers were "in-tree" (compiled into the Kubernetes binary). With CSI, vendors (NetApp, AWS, Portworx) can write their own drivers as standalone containers. On the **OS Internals** level, the kubelet communicates with the CSI driver via a **Unix Domain Socket** to perform the `mount` and `unmount` operations on the host filesystem.

##### References
