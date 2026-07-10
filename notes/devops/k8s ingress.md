2026-03-01 11:31
Tags: #kubernetes 
##### Content
An **Ingress** is an API object that manages external access to services within a cluster, typically via HTTP and HTTPS. It acts as a sophisticated routing layer, allowing you to consolidate routing rules into a single resource rather than creating a separate (and expensive) `LoadBalancer` Service for every application.

![[Pasted image 20260228131636.png|367]]

### The Controller vs. The Object
An Ingress resource on its own does nothing; it is merely a set of instructions.
* **Ingress Object:** The "Desired State" (the YAML) that describes your routing rules and TLS settings.
* **Ingress Controller:** The "Worker" (a Pod running in the cluster) that fulfills the Ingress. It watches the API server for Ingress objects and updates its internal configuration (e.g., Nginx config) accordingly.

#### Popular Controllers:
* **nginx-ingress:** The most common, based on the Nginx reverse proxy.
* **Kong:** Acts as both an Ingress controller and an API Gateway.
* **Traefik:** Known for native Service Mesh integration and automatic Let's Encrypt SSL management.
* **HAProxy / Contour (Envoy):** High-performance options often used in complex architectures.
* **Cloud Specific:** (e.g., AWS Load Balancer Controller, GCE Ingress) which provision native cloud LBs like ALBs or GLBs.

---
### Routing Logic
The Ingress `spec` defines how traffic is directed based on the incoming request.
#### 1. Host-Based Routing (Virtual Hosting)
Routes traffic based on the DNS name.
* `api.example.com` $\rightarrow$ `service-api`
* `web.example.com` $\rightarrow$ `service-web`

#### 2. Path-Based Routing (Fanout)
Routes traffic based on the URL path.
* `example.com/login` $\rightarrow$ `service-auth`
* `example.com/search` $\rightarrow$ `service-search`

---
### Path Types (`pathType`)
When defining a path like `/shop`, you must specify how the controller should match it:

| Type                         | Description                                                                                           |
| :--------------------------- | :---------------------------------------------------------------------------------------------------- |
| **`Exact`**                  | Matches the URL path exactly and is case-sensitive. (e.g., `/shop` only).                             |
| **`Prefix`**                 | Matches based on a URL path prefix split by `/`. (e.g., `/shop/checkout` works).                      |
| **`ImplementationSpecific`** | Matching depends on the specific Ingress Controller being used (e.g., Nginx treats this as `Prefix`). |

---

### Key Features
* **TLS Termination:** You can provide a TLS certificate (stored in a **Secret**) directly in the Ingress manifest. The Ingress Controller handles the decryption, passing plain HTTP to your internal services.
* **Annotations:** Since Ingress is highly variable between controllers, **Annotations** are used to pass specific configurations (e.g., `nginx.ingress.kubernetes.io/proxy-body-size: "8m"`).
* **Consolidation:** Reduces costs by allowing one entry point (one IP) to serve dozens of internal services.

### Example Manifest
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  tls:
  - hosts:
      - example.com
    secretName: example-tls-secret
  rules:
  - host: example.com
    http:
      paths:
      - path: /billing
        pathType: Prefix
        backend:
          service:
            name: billing-service
            port:
              number: 80
```

##### References
