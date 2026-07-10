2026-04-08 16:10
Tags: #kubernetes 
##### Content
## Backup and Restore

### Summary/Purpose
Backup and restore strategies in Kubernetes are split into two categories: **Resource Metadata** (the YAML definitions) and **State/Data** (the etcd database and Persistent Volumes). A robust strategy ensures recovery from accidental deletions, cluster-wide failures, or corrupted state.

---

### 1. Resource-Level Backups
This approach focuses on backing up the "declarative" side of Kubernetes—the manifests that describe your workloads.

* **Manual Export:** You can extract all resources using `kubectl`. However, `get all` does not include ConfigMaps, Secrets, or RBAC roles.
```bash
    kubectl get all --all-namespaces -o yaml > cluster-backup.yaml
```
* **Velero (Industry Standard):** An open-source tool that handles both resource metadata and snapshots of Persistent Volumes (PVs).
    * **Mechanism:** Velero runs a controller in your cluster. It backs up objects to Object Storage (like S3) and uses the Cloud Provider's API to snapshot disks.

---

### 2. etcd Backup and Restore
The most critical backup is the **etcd snapshot**. Because etcd is the cluster's "Single Source of Truth," a healthy snapshot allows you to recreate the entire cluster state from scratch.

#### The Backup Process
You must use the `etcdctl` CLI tool. Because etcd is protected by mTLS, you must provide the certificates and the endpoint.

**Required Info:**
* **Endpoint:** Usually `https://127.0.0.1:2379`.
* **Certs:** CA cert, Server cert, and Server key (usually found in `/etc/kubernetes/pki/etcd/`).

**Command:**
```bash
ETCDCTL_API=3 etcdctl \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  snapshot save /tmp/etcd-backup.db
```

#### The Restore Process
To restore, you create a *new* data directory from the snapshot. This prevents the restored instance from trying to join the old (potentially corrupted) cluster.

1.  **Stop API Server:** Prevent new writes during restore.
2.  **Restore Command:**
```bash
    ETCDCTL_API=3 etcdctl snapshot restore /tmp/etcd-backup.db \
      --data-dir=/var/lib/etcd-from-backup
```
3.  **Update Manifest:** Change the `hostPath` for the etcd volume in `/etc/kubernetes/manifests/etcd.yaml` to point to the new directory `/var/lib/etcd-from-backup`.
4.  **Restart Kubelet:** It will pick up the change and restart etcd with the restored data.

---

### Key Parameters: etcdctl

| Argument | Purpose |
| :--- | :--- |
| `--endpoints` | The URL of the etcd member (must be advertised). |
| `--data-dir` | The physical path on the OS where the KV store lives. |
| `--initial-cluster-token` | Unique token to prevent the restored node from joining a different cluster. |
| `--name` | The name of the node in the etcd cluster (e.g., `master-01`). |

---

### Usage Patterns/Strategies
* **Automated CronJobs:** Run etcd snapshots every hour and ship the `.db` file to offsite storage.
* **Disaster Recovery (DR) Testing:** Regularly practice restoring an etcd snapshot to a "dry-run" node to ensure the backup file isn't corrupted.

### Technical Note: OS Internals & Consistency
When you run `snapshot save`, etcd uses a **Point-in-Time** copy mechanism. Under the hood, it utilizes the BoltDB backend's transaction feature to ensure the snapshot represents a consistent state across all keys, even if writes are happening during the backup process. On the OS level, ensure the user running the command has read permissions for the certificates in `/etc/kubernetes/pki/`.

Does this conclude our dive into cluster maintenance, or would you like to explore **Security Contexts and Network Policies** next to harden your backups?

##### References
