2026-04-12 13:24
Tags: #kubernetes 
##### Content
### Summary/Purpose
Authorization (AuthZ) determines what a successfully authenticated user or service can actually **do** within the cluster. Kubernetes evaluates every request against a chain of authorization modules. If any module explicitly denies or allows the request, the chain stops; otherwise, it passes to the next.

---

### Core Logic/Mechanism: The Chain
Authorization modules are configured as flags on the **kube-apiserver**. They are evaluated in the specific order they are listed.

* **Order Matters:** If you specify `--authorization-mode=Node,RBAC,Webhook`, the API server first checks if the Node Authorizer handles the request, then RBAC, and finally the Webhook.
* **The Decision:** If all modules in the chain reach the end without a decision, the request is **Denied** by default.



---

### Authorization Modes

#### 1. Node Authorizer
A specialized authorizer used specifically by **kubelets**.
* **Purpose:** It grants kubelets permission to perform actions necessary for their operation (e.g., reading Pods assigned to them, updating their Node status).
* **Security:** It limits a kubelet to accessing only the resources related to its specific node, preventing a compromised node from "reaching" into other nodes' data.

#### 2. ABAC (Attribute-Based Access Control)
Uses local JSON files to define policies.
* **Mechanism:** You define a policy like: "User Alice can read Pods in Namespace X."
* **Downside:** Hard to manage. Any change requires editing the file on the master node and restarting the API server.

#### 3. RBAC (Role-Based Access Control)
The standard for modern Kubernetes clusters.
* **Mechanism:** You group permissions into **Roles** and then assign those Roles to **Users** or **Groups** via **RoleBindings**.
* **Benefit:** Centralized management via the Kubernetes API; no server restarts required for permission changes.

#### 4. Webhook
Offloads authorization decisions to an external REST service.
* **Use Case:** Integrating with 3rd party engines like **Open Policy Agent (OPA)** or custom enterprise authorization logic.

#### 5. AlwaysAllow / AlwaysDeny
* **AlwaysAllow:** Skips all checks. Often used in local development or single-node lab environments (e.g., Minikube).
* **AlwaysDeny:** Rejects every request. Used for testing the auth chain.

---

### Key Parameters: API Server Configuration

| Flag                                  | Value Example           | Note                                |
| :------------------------------------ | :---------------------- | :---------------------------------- |
| `--authorization-mode`                | `Node,RBAC`             | The ordered list of modules to use. |
| `--authorization-policy-file`         | `/etc/k8s/abac.json`    | Required only if using ABAC mode.   |
| `--authorization-webhook-config-file` | `/etc/k8s/webhook.yaml` | Required for Webhook mode.          |

---

### Usage Patterns/Strategies
* **Least Privilege:** Start with `Node,RBAC`. The Node authorizer handles the system components, and RBAC handles your humans and service accounts.
* **Gradual Hardening:** You can add a `Webhook` at the end of the chain to audit or log failed authorization attempts before they are finally rejected.

### Technical Note: OS Internals & The Decision Loop
On the **OS Internals** level, the authorization check is an "In-Memory" operation within the **kube-apiserver** process. It does not hit the disk unless it's an ABAC check. For RBAC, the server maintains a cache of the Roles and Bindings retrieved from [[k8s etcd|etcd]] to ensure that checking permissions for every single HTTP request doesn't introduce massive latency to the API.

##### References
