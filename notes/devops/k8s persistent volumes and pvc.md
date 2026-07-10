2026-03-04 10:26
Tags: #kubernetes 
##### Content
Kubernetes separates storage *provisioning* from storage *consumption* to keep applications portable across different environments.

### 1. PersistentVolume (PV)
* **Definition:** A cluster-wide resource representing a piece of storage (e.g., a Cloud Disk or NFS share).
* **Reclaim Policy:**
	* `Retain`: Manual reclamation; data stays even if PVC is deleted.
	* `Delete`: Deletes the physical storage when the PVC is deleted.
	* `Recycle`: (Deprecated) Wipes the data for re-use.

### 2. PersistentVolumeClaim (PVC)
* **Definition:** A request for storage. Once a PVC is created, the control plane looks for a matching PV and "binds" them.
* **Binding Status:** A PVC can be in `Pending` status if no matching PV exists or if the StorageClass is still waiting to provision. Once bound, it moves to `Bound`.
* **Volume Choosing Mechanism:** A PVC uses the first available PV that matches in `accessModes` and capacity requests
* **Selectors:** You can use `selector` in a PVC to match specific `labels` on a PV. This is more precise than relying solely on capacity and access modes.

### PVC Access Modes

| Mode              | Abbreviation | Description                                                           |
| ----------------- | ------------ | --------------------------------------------------------------------- |
| **ReadWriteOnce** | `RWO`        | Mounted as read-write by a **single node**. (Block storage like EBS). |
| **ReadOnlyMany**  | `ROX`        | Mounted as read-only by **many nodes**.                               |
| **ReadWriteMany** | `RWX`        | Mounted as read-write by **many nodes**. (File storage like NFS).     |

### Example PV/PVC Manifests

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: manual-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: "/mnt/data" # Simple example for local labs
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi # K8s will bind this to 'manual-pv'

```

##### References
