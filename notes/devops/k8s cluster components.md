2026-02-25 11:53
Tags: #kubernetes 
##### Content
## Cluster Components

### Summary/Purpose
The Kubernetes architecture is divided into the **Control Plane** (the brain) and the **Data Plane** (the muscle). The Control Plane manages the cluster's state, while the Data Plane hosts the actual application containers.

---
### Control Plane: The Brain
The Control Plane is generally restricted to **Linux hosts** and is tainted to prevent running application workloads. For High Availability (HA), it requires an odd number of nodes (1, 3, 5) to maintain **quorum** and prevent "split-brain" scenarios in the underlying storage.

#### 1. kube-apiserver
The "front door" of the cluster. It is the only component that communicates directly with **etcd**.
* **The Request Flow:**
    `Auth -> Validate -> Retrieve -> Update etcd -> Schedule -> Contact kubelet`
* **OS Mechanism:** It acts as a RESTful API server. When it "contacts the kubelet," it often initiates an encrypted connection (mTLS) to the worker node's port 10250.

#### 2. kube-controller-manager
A daemon that embeds the core control loops. It constantly compares the **current state** to the **desired state**.
* **Node Controller:** 
	* Checks node health every **5s**.
    * If no response for **40s**, marks the node as `NotReady`.
    * If no response for **5m**, it initiates pod eviction to move workloads to healthy nodes.
* **Replication Controller:** Ensures the specific number of pod replicas defined in a [[k8s replicaset|ReplicaSet]] are running at all times.

#### 3. kube-scheduler
The matchmaker. It watches for newly created Pods with no `nodeName` assigned and selects the best fit.
* **Scheduling Phases:**
    1.  **Filtering:** Removes nodes that don't meet requirements (e.g., insufficient CPU, port conflicts).
    2.  **Ranking:** Scores the remaining nodes based on resource availability and affinity rules.
* **Customization:** You can write and run your own **Custom Schedulers** alongside the default one.

#### 4. cloud-controller-manager
Offloads cloud-specific logic (LoadBalancers, VPC routes, Storage Volumes) to provider APIs (AWS, Azure, GCP), keeping the core K8s code clean of provider-specific dependencies.

#### 5. Extra Components

| Component              | Role        | Logic Type                           |
| :--------------------- | :---------- | :----------------------------------- |
| **[[k8s etcd\|etcd]]** | Persistence | Distributed KV Store                 |
| **CoreDNS**            | Add-on      | Service Discovery (DNS)              |
| **CNI Plugin**         | Add-on      | Pod-to-Pod Networking (e.g., Calico) |

---

### Data Plane: Worker Nodes
The worker nodes can be **Linux or Windows** and are responsible for the actual execution of containers.

#### 1. kubelet
The primary "node agent." 
* **Mechanism:** It receives **PodSpecs** from the API server and ensures the containers described in those specs are running and healthy. 
* **Heartbeat:** It reports node and pod status back to the API server. If the kubelet stops, the Controller Manager eventually triggers the eviction flow mentioned above.

#### 2. kube-proxy
Handles the networking "magic." 
* **Core Logic:** In Kubernetes, **Services** are not actual processes; they are just entries in memory. `kube-proxy` is the process that translates those virtual IPs into actual network traffic.
* **Implementation:** It typically uses **iptables** or **IPVS** rules on the host's kernel to redirect traffic from a Service IP directly to a Pod IP.

#### 3. Container Runtime
The software that runs containers (e.g., `containerd`, CRI-O). Kubernetes communicates with it via the **CRI (Container Runtime Interface)**.

---

### Example: The "Create Pod" Flow
```bash
# 1. User sends YAML to API Server
kubectl apply -f nginx-pod.yaml

# 2. API Server validates and writes to etcd
# 3. Scheduler sees Pod with no node, filters/ranks, and updates API Server with 'nodeName: worker-1'
# 4. Kubelet on 'worker-1' sees the assignment via the API Server watch
# 5. Kubelet tells Container Runtime to pull image and start container
# 6. kube-proxy updates iptables to allow traffic to the new Pod
```

##### References
