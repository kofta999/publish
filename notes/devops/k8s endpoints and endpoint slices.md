2026-02-28 02:35
Tags: #kubernetes 
##### Content
These resources act as the "bridge" between a **Service** and the actual **Pod IPs**. While a Service provides the stable DNS/IP, the Endpoints/EndpointSlices provide the dynamic list of healthy backend targets.

### Endpoints (Legacy)
- **Mechanism:** A single resource that tracks all IP addresses for a Service.
- **Limitation:** In clusters with many Pods, this object becomes massive. Every time one Pod restarts, the entire object is re-sent to every node in the cluster, causing significant network/CPU overhead for `kube-proxy`.

### EndpointSlices (Modern & Scalable)
- **Sharding:** Instead of one giant list, it breaks the IPs into multiple "slices" (default is **100 IPs per slice**).
- **Efficiency:** When a Pod changes, only the affected slice is updated and propagated.
- **Performance:** Significantly reduces the control plane traffic and memory usage of `kube-proxy`.

---

### Manual Configuration: Connecting to External Services
If you have a database or API outside the cluster, you can create a Service without a selector and manually define an `EndpointSlice` to point to the external IP. This allows you to use a stable cluster-internal DNS name for external resources.

#### 1. The Service (No Selector)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  ports:
    - protocol: TCP
      port: 5432
      targetPort: 5432

```

#### 2. The EndpointSlice

```yaml
apiVersion: discovery.k8s.io/v1
kind: EndpointSlice
metadata:
  name: external-db-1 # Must match service name prefix
  labels:
    kubernetes.io/service-name: external-db # Connects it to the service
addressType: IPv4
ports:
  - name: ''
    protocol: TCP
    port: 5432
endpoints:
  - addresses:
      - "192.168.1.50" # The external IP address
    conditions:
      ready: true

```

### Important Notes
* **Readiness Probes:** If a Pod's Readiness Probe fails, the `EndpointSlice` controller automatically removes that Pod's IP from the slice so the Service stops routing traffic to it.
* **Automatic Creation:** For standard Services with a `selector`, Kubernetes manages these resources for you automatically. You only touch them for manual "External" service patterns.
* **Load Balancing:** You can add multiple IP addresses to the `endpoints` list in the `EndpointSlice` to perform basic load balancing for your external services.

##### References
