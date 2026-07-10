2026-02-25 12:10
Tags: #kubernetes 
##### Content
## Pods
- **Basic Building Block:** The smallest deployable unit in Kubernetes; you don't run containers directly, you run Pods.
- **Why? (Abstraction):** Provides **uniformity**; Pods abstract container-specific details (like different runtimes) from the Kubernetes API.
- **Lifecycle:** All containers in a Pod are scheduled together and generally **start/stop together**, making them ideal for tightly coupled helper processes.
- **Shared Resources:**
	- **Network:** Containers share the same IP address and port space (Network Namespace); they can communicate via `localhost`.
    - **Storage:** Can share mounted Volumes (Storage Namespace) to pass data between containers in real-time.
- **Heterogeneous:** A single Pod can run different images (e.g., a "Main" app container and a "Sidecar" logging container).
- **Deployment Methods:**
    - **Imperative:** Using `kubectl run` (similar to `docker run`).
    - **Declarative:** Using YAML manifests (the standard for production).

### The Scheduling Flow
1. **Validation:** The **API Server** receives the request and validates the YAML/command.
2. **Scheduling:** The **Scheduler** filters nodes that meet requirements (CPU/RAM) and "scores" them. It selects the best-fit node (not just the first healthy one, but the one with the highest score).
3. **Execution:** The **kubelet** on the selected node is notified via the API server, pulls the images, and instructs the **Container Runtime** to start the containers.

### Common Statuses
- **Pending:** The Pod is accepted by the cluster, but one or more containers aren't ready. This often means the **Scheduler** cannot find a node with enough resources or the image is still downloading.
- **Running:** The Pod has been bound to a node and all containers have been created.
- **Succeeded:** All containers in the Pod have voluntarily terminated with a `0` exit code (common for Jobs).
- **Failed:** All containers have terminated, and at least one container terminated in failure.
- **CrashLoopBackOff:** A specific state where a container keeps crashing and Kubernetes is waiting before trying to restart it again.

##### References
