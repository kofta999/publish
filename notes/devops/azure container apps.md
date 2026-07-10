2025-12-29 20:53
Tags: #cloud/azure
##### Content
### Azure Container Apps (ACA)

Azure Container Apps is a serverless platform built on Kubernetes, designed for microservices and auto-scaling without the complexity of managing a full cluster.

### The Three Pillars
* **KEDA (Kubernetes Event-driven Autoscaling):** Allows the app to scale based on events (e.g., messages in a queue, HTTP traffic). It can **scale to zero** when there is no load to save costs.
* **Dapr (Distributed Application Runtime):** Provides "sidecars" that simplify microservice tasks like state management, service-to-service invocation, and pub/sub.
* **Envoy:** Acts as the edge proxy. It handles ingress, traffic splitting (for blue/green deployments), and SSL termination.

### Technical Implementation
* **Serverless:** You don't see or manage the underlying AKS nodes.
* **Environments:** Containers are deployed into an "Environment," which acts as a secure boundary and shares the same VNet.
* **Use Case:** Best for microservices that need to scale rapidly or event-driven background jobs.

##### References
[[modern app services]]