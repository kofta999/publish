2026-02-25 12:11
Tags: #kubernetes 
##### Content
## Health Checks (Probes)
Probes are diagnostic actions performed periodically by the **kubelet** on a container to determine its health.

### Liveness Probe
- **Purpose:** Determines if a container is "alive" from a functional standpoint.
- **Action:** If the probe fails, Kubernetes kills the container, and the pod is subjected to its **restartPolicy**.
- **Use Case:** To catch "deadlocks" where an application is running but unable to make progress.

### Readiness Probe
- **Purpose:** Determines if a container is ready to **accept incoming network traffic**.
- **Action:** If the probe fails, the Pod's IP address is removed from the Endpoints of all Services. Unlike Liveness, it **does not restart** the container.
- **Use Case:** Useful when a container needs to load large datasets or warm up a cache before serving users.

### Startup Probe
- **Purpose:** Specifically handles legacy or slow-starting applications.
- **Behavior:** It **disables** Liveness and Readiness checks until the Startup probe succeeds. 
- **The "Why":** While Liveness probes have an `initialDelaySeconds`, they are periodic. If a container takes longer than the "delay + failure threshold" to start, the Liveness probe would kill it before it ever has a chance. The Startup probe protects the container during this initial boot phase.

---

### Check Methods (Handlers)
The kubelet can use four different mechanisms to check a container:

| Method      | Description                                                                                                            |
| :---------- | :--------------------------------------------------------------------------------------------------------------------- |
| `httpGet`   | Performs an HTTP GET request against the Container's IP. Success is any code $\ge$ 200 and $<$ 400.                    |
| `tcpSocket` | Performs a TCP check against the Container's IP on a specified port. Success if the port is open.                      |
| `exec`      | Executes a specified command inside the container. Success if the command exits with status code `0`.                  |
| `grpc`      | (K8s 1.24+) Performs a remote procedure call using gRPC. The application must implement gRPC Health Checking Protocol. |

### Common Parameters
- **`initialDelaySeconds`:** How long to wait after the container starts before performing the first probe.
- **`periodSeconds`:** How often to perform the probe.
- **`timeoutSeconds`:** Number of seconds after which the probe times out.
- **`failureThreshold`:** How many consecutive failures before giving up (restarting for Liveness, unready for Readiness).

##### References
