2026-04-20 12:40
Tags: #nginx
##### Content
### 1. Functional Roles
* **Web Server:** Serves static content (HTML, JS, images) using **`sendfile(2)`**. This system call allows the kernel to copy data directly from the disk cache to the network card buffer, bypassing user space to minimize CPU overhead.
* **Reverse Proxy:** Acts as an intermediary between clients and backends.
    * **Backend Routing:** Routes traffic to specific upstream services.
    * **Load Balancing:** Distributes requests via algorithms like Round Robin, Least Connections, or IP Hash.
    * **Caching Layer:** Stores upstream responses in a shared memory zone for rapid retrieval.
    * **API Gateway:** Manages SSL/TLS termination, rate limiting, and request authentication.

### 2. High-Performance Architecture
Nginx is designed to solve the **C10k (Concurrent 10k connections) problem** using an **asynchronous, non-blocking, event-driven** model.

* **Process Model:**
    * **Master Process:** Reads/validates config and manages worker processes as `root` to bind to privileged ports.
    * **Worker Processes:** Run as unprivileged users (e.g., `nginx`). They handle concurrent connections via the Linux **`epoll`** system call, which allows a single process to monitor thousands of sockets efficiently.
* **Zero-Downtime Reloads:** `nginx -s reload` spawns new workers with the updated config while allowing old workers to finish current requests before gracefully exiting.
* **Worker Affinity:** Utilizing `worker_cpu_affinity` binds workers to specific CPU cores, reducing context switching and improving L1/L2 cache hits.

### 3. Upstream Interface Optimization
The reverse proxy manages two distinct connection pools: **Downstream** (Client ↔ Nginx) and **Upstream** (Nginx ↔ Backend).

* **Response Buffering:** Nginx absorbs backend responses into its memory/disk immediately. This releases the backend process quickly, preventing slow clients from tying up application resources.
* **Connection Pooling:** Using the `keepalive` directive in `upstream` blocks maintains open connections to backends, eliminating the latency of repeated TCP 3-way handshakes.
* **Unix Domain Sockets:** When Nginx and the backend coexist on the same OS, using Unix Sockets (`proxy_pass http://unix:/tmp/b.sock;`) is preferred over TCP loopback to bypass the entire TCP/IP stack overhead.

### 4. Comparison with Traditional Models

| Feature         | Nginx (Event-Driven)                       | Traditional (Process-per-connection)             |
| :-------------- | :----------------------------------------- | :----------------------------------------------- |
| **Concurrency** | Single worker handles 10k+ connections.    | One thread/process per connection.               |
| **RAM Usage**   | Low and stable.                            | Scales linearly with connections; high overhead. |
| **Performance** | Non-blocking; handles slow clients easily. | Blocking; slow clients exhaust thread pools.     |

##### References
