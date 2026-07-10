2026-03-01 11:50
Tags: #kubernetes 
##### Content
A **DaemonSet** ensures that all (or a specific subset of) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are automatically added to them. As nodes are removed from the cluster, those Pods are garbage collected.

### Core Use Cases
DaemonSets are typically used for "background" infrastructure services that need to run on every node:
* **Log Aggregation:** Running a logging agent (e.g., Fluentd or Logstash) to collect logs from the node's filesystem.
* **Cluster Storage:** Running a storage daemon (e.g., Ceph or Glusterd) on each node to provide a distributed filesystem.
* **Node Monitoring:** Running agents like Prometheus Node Exporter or New Relic agents to gather hardware metrics.
* **Networking:** Running the network plugin itself (like `kube-proxy` or Calico) often utilizes DaemonSets.

---

### Placement Logic
* **Default Behavior:** By default, a Pod will be scheduled on every single node in the cluster.
* **`nodeSelector`:** You can limit the DaemonSet to specific nodes by using labels. For example, if you only want to run a specific monitoring tool on nodes with high-performance SSDs, you can use a selector for `disktype: ssd`.
* **Taints and Tolerations:** DaemonSets are unique because they often need to run on the **Control Plane** or other restricted nodes. They typically include "tolerations" to ensure they aren't blocked by taints that would normally keep application Pods away.

---
### Update Strategies
Like Deployments, DaemonSets support automated updates to their Pod templates:

* **RollingUpdate (Default):** Replaces DaemonSet pods one node at a time. This ensures that the service is always available on most of the cluster during an upgrade.
* **OnDelete:** The controller will not update the Pod automatically. You must manually delete the old Pod on a node, and only then the DaemonSet controller will create the new version.

---
### DaemonSet vs. Deployment
While both manage Pods, the intent is different:
* **Deployment:** Used for **Services** where you care about the total number of replicas (e.g., "I need 5 web servers"). The scheduler decides where they go based on resource availability.
* **DaemonSet:** Used for **Node-Local services** where you care about the *coverage* (e.g., "I need exactly one logger on every machine").

### Example Manifest
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
spec:
  selector:
    matchLabels:
      name: fluentd-logging
  template:
    metadata:
      labels:
        name: fluentd-logging
    spec:
      containers:
      - name: fluentd
        image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2
```

##### References
