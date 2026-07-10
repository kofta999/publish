2026-04-14 11:20
Tags: #kubernetes 
##### Content
### Summary/Purpose
The **Gateway API** is the next-generation evolution of Ingress. While the standard Ingress resource is simple, it often led to "annotation bloat" as vendors tried to add complex features (like header matching or traffic splitting) that weren't in the core spec. The Gateway API solves this by providing a **role-oriented**, expressive, and extensible set of resources.

### Core Logic: Role-Oriented Design
The API is split into three distinct resources, each managed by a different persona. This separation of concerns allows for much cleaner management in large-scale environments.

#### 1. GatewayClass (Infrastructure Provider)
* **Persona:** Cloud Provider (AWS, GCP) or Platform Engineer.
* **Purpose:** Defines a specific type of infrastructure (e.g., "Standard Load Balancer" vs. "High-Performance L7 Proxy"). It acts as a template for actual Gateways.

#### 2. Gateway (Cluster Operator)
* **Persona:** Cluster Administrator.
* **Purpose:** Defines *where* traffic comes from. It specifies ports, protocols (HTTP, HTTPS, TCP), and which **GatewayClass** to use. It represents the physical or virtual instantiation of the load balancer.

#### 3. xRoute (Application Developer)
* **Persona:** App Developer.
* **Purpose:** Defines *how* traffic is routed to the backends. Developers create specific route types based on their needs:
    * **HTTPRoute:** For L7 HTTP/HTTPS traffic (path matching, header manipulation).
    * **GRPCRoute:** Specialized for gRPC microservices.
    * **TCPRoute / UDPRoute:** For L4 load balancing.
    * **TLSRoute:** For SNI-based routing without terminating TLS at the Gateway.

---

### Key Advantages over Ingress
* **Shared Gateways:** Multiple teams can attach their `HTTPRoutes` to a single `Gateway` managed by the platform team.
* **Cross-Namespace Routing:** A Route in the `dev` namespace can attach to a Gateway in the `infra` namespace (controlled by **ReferenceGrant** for security).
* **Native Traffic Splitting:** Features like Canary deployments (sending 10% of traffic to v2) are built into the spec, no custom annotations required.

---

### Key Parameters: Route Selection
A Gateway determines which Routes can attach to it using **Listeners** and **AllowedRoutes**. This prevents a developer from accidentally (or maliciously) hijacking a production domain.

| Resource      | Field                       | Note                                                    |
| :------------ | :-------------------------- | :------------------------------------------------------ |
| **Gateway**   | `listeners[].allowedRoutes` | Restricts which namespaces or labels can attach Routes. |
| **HTTPRoute** | `parentRefs`                | Explicitly points to the Gateway it wants to join.      |

---

### Example Manifest: Basic HTTP Routing
```yaml
# 1. The Gateway (The Entry Point)
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: prod-gateway
  namespace: infra
spec:
  gatewayClassName: my-cloud-lb
  listeners:
  - name: http
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: All
---
# 2. The Route (The Application Logic)
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: api-route
  namespace: app-dev
spec:
  parentRefs:
  - name: prod-gateway
    namespace: infra
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /api
    backendRefs:
    - name: api-service
      port: 8080
```

### Technical Note: OS Internals & The Implementation
The Gateway API is "CRD-based." When you apply these resources, a **Gateway Controller** (like Istio, Envoy Gateway, or a Cloud Controller) watches them. On the **OS Internals** level, the controller translates your `HTTPRoute` into configuration for a data-plane proxy (like Envoy or Nginx). For example, a Canary split is translated into specific weighted load-balancing clusters within the proxy's memory.

##### References
