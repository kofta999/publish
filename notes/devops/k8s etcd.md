2026-04-01 10:46
Tags: #kubernetes 
##### Content
### Summary/Purpose
**etcd** is a distributed, consistent, and highly available key-value store used as Kubernetes' "source of truth." Every single change to the cluster—from a Pod deployment to a ConfigMap update—is persisted here. Without etcd, the API server becomes stateless and cannot function.

### Core Logic/Mechanism
* **The Raft Consensus Algorithm:** etcd uses Raft to ensure data consistency across a cluster. It requires a **quorum** (majority) to commit any write. This is why etcd clusters should always have an odd number of members (3, 5, etc.) to avoid "split-brain" scenarios.
* **Storage Backend:** While v2 stored data in a simple hierarchy, **v3** uses a b-tree on a disk-backed memory-mapped file for much higher performance and support for larger datasets.
* **Watch Mechanism:** Instead of the API server constantly polling for changes, etcd provides a "watch" feature where the API server subscribes to keys and gets notified of updates instantly.
* **OS Internals (Disk I/O):** etcd is extremely sensitive to disk latency. On the OS level, high **fsync** latency can trigger leader elections, destabilizing the cluster. It is often recommended to give the etcd process a high **ionice** priority.

### Key Parameters

| Field/Argument            | Description                                              | Critical Note                                                                          |
| :------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `--listen-client-urls`    | The address etcd binds to for incoming traffic.          | Usually `http://localhost:2379` or the node IP.                                        |
| `--advertise-client-urls` | The URL the API server and other clients use to connect. | Must be reachable by the [[k8s cluster components#1. kube-apiserver\|kube-apiserver]]. |
| `--initial-cluster`       | List of all members in the etcd cluster.                 | Required for bootstrapping a multi-node cluster.                                       |
| `--data-dir`              | Path where etcd stores its log and snapshots.            | Should be backed by fast SSD storage.                                                  |

### API Evolution (v2 vs. v3)
The shift to v3 wasn't just a version bump; it was a fundamental rewrite of the protocol to move from HTTP/JSON to **gRPC**.

| Feature              | v2 (Legacy)              | v3 (Current)                             |
| :------------------- | :----------------------- | :--------------------------------------- |
| **Protocol**         | HTTP/1.x                 | gRPC / Protobuf                          |
| **Standard Command** | `set`                    | `put`                                    |
| **Removal Command**  | `rm`                     | `del`                                    |
| **Transactions**     | None                     | `txn` (Atomic multi-key updates)         |
| **Efficiency**       | High CPU/Memory overhead | Minimalized through binary serialization |

### Usage Patterns/Strategies
* **Snapshots & Backups:** Always take regular snapshots using `etcdctl snapshot save`. Since it's the "brain," a corrupted etcd means a dead cluster.
* **External vs. Stacked:**
	* *Stacked:* etcd runs on the same nodes as the Control Plane (easier to manage).
    * *External:* etcd runs on a dedicated fleet of nodes (better for large-scale production stability).
* **Defragmentation:** Over time, deleting keys leaves "holes" in the DB file. Regular defragmentation is required to reclaim disk space.

### Example: etcdctl Cheat Sheet
```bash
# Set the API version to 3 (essential for K8s)
export ETCDCTL_API=3

# Put a key (v3 style)
etcdctl --endpoints=127.0.0.1:2379 put /registry/configs/my-key "my-value"

# Take a snapshot for disaster recovery
etcdctl snapshot save snapshot.db \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# Check health of the quorum
etcdctl endpoint health --cluster -w table
```

##### References
