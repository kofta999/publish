2026-04-22 11:22
Tags: #nginx 
##### Content
Timeouts in Nginx are not just "safety timers"; they are critical resource management tools. At the **OS level**, every open connection consumes a **File Descriptor (FD)** and memory in the kernel's TCP stack. Proper timeouts ensure that stalled or malicious clients don't exhaust the system's available FDs.

### Frontend Timeouts (Client ↔ Nginx)

These protect Nginx from "Slowloris" style attacks where a client opens many connections and sends data extremely slowly to keep the worker processes busy.

* **`client_header_timeout`**: The time Nginx waits for the client to send the **entire** header. If the client doesn't finish, Nginx returns a **408 (Request Timeout)**.
* **`client_body_timeout`**: This is measured **between two successive read operations**, not for the whole body. This allows for large file uploads as long as the data is flowing.
* **`send_timeout`**: Measured between two successive write operations to the client. If the client stops acknowledging packets (TCP ACKs), Nginx drops the connection.
* **`keepalive_timeout`**:
    * **Logic**: Standard TCP connections involve a 3-way handshake. Keepalive allows multiple HTTP requests over one TCP connection.
    * **OS Context**: Setting this too high (e.g., 300s) keeps FDs open and memory allocated for idle users. Setting it to `0` forces a new TCP handshake for every request, spiking CPU usage.
* **`lingering_timeout`**:
    * **Logic**: When Nginx closes a connection, it may still receive "on the wire" data from the client.
    * **Mechanism**: Nginx waits for the client to acknowledge the close. After this timeout, Nginx performs a **hard RST** (Reset) to clear the kernel socket buffer.
* **`resolver_timeout`**: Vital when your `proxy_pass` uses a domain name (like an AWS ALB) instead of a static IP.

---
### Backend Timeouts (Nginx ↔ Upstream)

These define how Nginx behaves when your application (NodeJS, Rust, etc.) is struggling or down.

* **`proxy_connect_timeout`**: The time allowed to establish a connection with the backend. This is purely the **TCP Handshake** phase.
* **`proxy_send_timeout`**: The timeout for Nginx to write the request to the backend (between two writes).
* **`proxy_read_timeout`**:
    * **Crucial Note**: This is the time between two read operations from the backend. 
    * **SSE/WebSockets**: For Server-Sent Events or long-polling, this **must** be increased (e.g., 1h), otherwise Nginx will kill the "idle" stream even if it's intentionally waiting for an event.
* **`proxy_next_upstream_timeout`**: Limits the total time Nginx spends trying different backends in an `upstream` block. If this is exceeded, Nginx stops trying and returns the error from the last tried server.
* **`keepalive_timeout` (Upstream)**: Used within an `upstream` block to keep connections to the backend "warm." This is essential for high-performance L7 proxying to avoid constant handshakes between Nginx and the app.

---
### Comparison: Successive vs. Absolute Timeouts

| Timeout Type   | Measurement Logic                       | Purpose                                                                                               |
| :------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Successive** | Timer resets after every packet/chunk.  | Allows long-running tasks (huge uploads/downloads) if progress is being made.                         |
| **Absolute**   | Timer starts at $T=0$ and never resets. | Hard limit to ensure a request finishes within a strict window (e.g., `proxy_next_upstream_timeout`). |

### Missing Pro Info: `reset_timedout_connection`
By default, when a timeout occurs, Nginx goes through the standard TCP "FIN" handshake (Graceful Close). If you are under a massive DDoS attack or have thousands of slow clients, you should enable:
`reset_timedout_connection on;`

**OS Internal logic**: This tells the kernel to immediately send a **TCP RST** and wipe the socket from memory. This bypasses the `TIME_WAIT` state in the Linux kernel, instantly freeing up memory and FDs for legitimate traffic.

##### References
