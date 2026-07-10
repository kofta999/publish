2026-04-03 17:26
Tags: #kubernetes 
##### Content
## Monitoring in Kubernetes

### Summary/Purpose
Kubernetes does not include a native, long-term metrics storage or visualization solution. Instead, it provides a standardized **Metrics API** that external tools can query to understand the resource utilization of the cluster. Monitoring is essential for horizontal scaling (HPA), cost optimization, and identifying resource-hungry processes before they trigger the **OOM Killer**.


---
### Core Logic/Mechanism: The Data Source
The foundation of all Kubernetes monitoring is **cAdvisor** (Container Advisor).

* **cAdvisor:** An open-source agent integrated into the **kubelet** binary. It auto-discovers all containers running on a node and collects CPU, memory, filesystem, and network usage statistics.
* **Exposition:** These metrics are exposed by the kubelet at the `/metrics` endpoint (typically on port 10250 or 10255).
* **OS Internals:** cAdvisor gathers this data by reading directly from the Linux **cgroups** and `/proc` filesystem on the host OS.

---
### Metrics Server (The Short-Term Solution)
The **Metrics Server** is a cluster-wide aggregator that pulls data from each kubelet's cAdvisor and stores it in **volatile memory**.

* **Purpose:** It provides the data required for core Kubernetes features like the **Horizontal Pod Autoscaler (HPA)** and the `kubectl top` command.
* **Storage:** It is **not** a historical monitoring solution. It only keeps the most recent metrics in RAM; when the Metrics Server pod restarts, the data is lost.
* **Access:** Once installed, you can inspect real-time performance:
    ```bash
    kubectl top nodes  # Shows CPU/Memory per Node
    kubectl top pods   # Shows CPU/Memory per Pod
    ```

---

### Full-Stack Monitoring Solutions
For historical data, alerting, and dashboards, you must deploy a third-party stack.

| Tool                    | Type             | Key Strength                                                               |
| :---------------------- | :--------------- | :------------------------------------------------------------------------- |
| **Prometheus**          | Open Source      | The industry standard; uses a "pull" model and PromQL for complex queries. |
| **Elastic Stack**       | Open Source/Paid | Excellent for log aggregation (ELK: Elasticsearch, Logstash, Kibana).      |
| **Datadog / Dynatrace** | SaaS (Paid)      | Managed solutions with deep tracing and "single pane of glass" visibility. |
| **Grafana**             | Visualization    | Often paired with Prometheus to create high-quality dashboards.            |

---
### Usage Patterns/Strategies
* **HPA Integration:** The Horizontal Pod Autoscaler queries the Metrics API. If the Metrics Server reports that a Deployment's average CPU usage is above 80%, the HPA will trigger the creation of more Pods.
* **Resource Profiling:** By monitoring `kubectl top` during a load test, you can accurately set your [[k8s limit range|LimitRange]] and [[k8s resource quotas|Resource Quotas]] based on actual application behavior rather than guesswork.

### Example: Installing Metrics Server (via Helm)
```bash
# Add the repo
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/

# Install the server
helm upgrade --install metrics-server metrics-server/metrics-server

# Verify the API is working
kubectl get apiservices | grep metrics.k8s.io
```

### Technical Note: The Metrics Pipeline
The pipeline flows as follows: **Linux Kernel (cgroups)** -> **cAdvisor** -> **Kubelet** -> **Metrics Server** -> **Kubectl/HPA**. If `kubectl top` fails, the break is usually in the networking between the Metrics Server and the Kubelet, or the Kubelet is unable to read the cgroup data due to OS-level permission issues.
##### References
