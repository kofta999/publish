2026-04-13 11:09
Tags: #kubernetes  
##### Content
### Summary/Purpose
Custom Resource Definitions (CRDs) allow you to extend the Kubernetes API beyond the built-in types (like Pods or Services). By defining a CRD, you teach the **kube-apiserver** how to store and validate a new object type. However, a CRD alone is just data in [[k8s etcd|etcd]]; you need a **Custom Controller** to watch that data and take action.

---

### Core Logic/Mechanism
* **The CRD (Data):** Acts as a blueprint. It defines the schema (using OpenAPI v3 validation) for your custom object. Once applied, you can interact with your new resource using `kubectl`.
* **The Controller (Logic):** A reconciliation loop running in a Pod. It watches the API server for your custom resource and works to drive the **current state** toward the **desired state** defined in the object.
* **The API Path:** Custom resources are always part of a "Named" [[k8s api groups|API Groups]] path: `/apis/<group>/<version>/namespaces/<ns>/<kind>`.

---

### The Operator Pattern
An **Operator** is a specialized controller that encodes domain-specific knowledge about an application (like a database or a monitoring tool).

* **Concept:** While a generic controller manages simple state, an Operator manages complex operational tasks like taking backups, resizing clusters, or performing schema migrations for a specific software.
* **Operator Framework:** A toolkit (SDK) that simplifies the development of Operators. It combines the CRD and the Controller logic and adds "extra goodies" like:
    * **Lifecycle Management:** Handling upgrades of the Operator itself.
    * **Metrics:** Built-in integration with [[k8s monitoring|Monitoring in Kubernetes]] (Prometheus).
    * **Capabilities:** Levels of maturity ranging from basic install to "Auto-pilot" (auto-healing and tuning).

---

### Key Parameters: CRD Structure

| Field          | Description                       | Note                                              |
| :------------- | :-------------------------------- | :------------------------------------------------ |
| **group**      | The unique domain name.           | e.g., `stable.example.com`.                       |
| **names**      | Singular, plural, and kind names. | Defines how you call it in `kubectl`.             |
| **scope**      | `Namespaced` or `Cluster`.        | Determines if the resource lives in a namespace.  |
| **versions**   | The API versions supported.       | e.g., `v1alpha1`, `v1`.                           |
| **validation** | OpenAPI v3 schema.                | Ensures the user provides the correct data types. |

---

### Usage Patterns/Strategies
* **Infrastructure as Code:** Define your databases, SSL certificates, or even external cloud resources (via Crossplane) as K8s objects.
* **Separation of Concerns:** Developers define *what* they want (the CR), and the Operator handles the *how* (the infrastructure logic).

### Example Manifest: A Simple CRD
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: backups.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                destination:
                  type: string
                interval:
                  type: string
  scope: Namespaced
  names:
    plural: backups
    singular: backup
    kind: Backup
    shortNames:
    - bk
```

### Technical Note: OS Internals & The API Discovery
When you apply a CRD, the **kube-apiserver** updates its internal discovery cache. This is why you can immediately run `kubectl get backups` without restarting any components. On the **OS Internals** level, the API server dynamically creates a RESTful endpoint for your new resource. If your controller is written in **Rust** or **Go**, it uses a "Shared Informer" to maintain a local cache of these custom objects, minimizing the load on [[k8s etcd|etcd]] during high-frequency reconciliation.

##### References
