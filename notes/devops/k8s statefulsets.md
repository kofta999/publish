2026-03-04 10:25
Tags: #kubernetes 
##### Content
A **StatefulSet** is the workload object used to manage stateful applications. Unlike a Deployment, where Pods are interchangeable and anonymous, a StatefulSet maintains a **sticky identity** for each of its Pods.

### Key Characteristics

* **Stable Network ID:** Pods are named with a predictable index (e.g., `db-0`, `db-1`) rather than random hashes.
* **Ordered Deployment:** Pods are created in order ($0$ to $N-1$) and terminated in reverse order ($N-1$ down to $0$). A Pod must be "Running and Ready" before the next one starts.
* **Stable Storage:** When a Pod is rescheduled, its specific Persistent Volume (PV) follows it. `db-0` will always reconnect to its original disk.

### Headless Service

StatefulSets require a **Headless Service** (a Service with `clusterIP: None`) for network identity.

* **Direct Routing:** Instead of the Service acting as a Load Balancer, the DNS query returns the direct A-records (IPs) of all the underlying Pods.
* **FQDN Format:** `pod-name.service-name.namespace.svc.cluster.local`

### Example StatefulSet Manifest

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql-headless
spec:
  ports:
  - port: 3306
  clusterIP: None # This makes the service "Headless"
  selector:
    app: mysql
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: "mysql-headless" # Links to the headless service
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
  volumeClaimTemplates: # Automatically creates a unique PVC for each Pod
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi

```

---

##### References
