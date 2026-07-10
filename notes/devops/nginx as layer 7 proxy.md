2026-04-23 12:34
Tags: #nginx 
##### Content
### Summary/Purpose
As a Layer 7 proxy, Nginx operates at the **Application Layer**. This allows it to terminate the client connection, inspect the HTTP request (headers, cookies, and URI), and make intelligent routing decisions before initiating a new connection to the upstream backend.

---

### Upstream Groups & Load Balancing
The `upstream` block defines a cluster of backend servers. Nginx can distribute traffic across these servers using various algorithms.

* **Round Robin (Default):** Distributes requests sequentially across the list of servers.
* **`ip_hash`:** Uses the client's IP address as a hashing key to ensure a client is consistently mapped to the same backend server. This is essential for **Sticky Sessions** or stateful applications where local session data is stored on the backend.
* **`least_conn`:** Routes the next request to the server with the lowest number of active connections, ideal for long-running requests.
* **`weight`:** You can assign a higher weight to more powerful servers (e.g., `server backend1.example.com weight=3;`).

---

### Configuration: Proxy & Upstream
To implement L7 proxying, you define an `upstream` block in the `http` context and reference it using `proxy_pass` inside a `location` block.

```nginx
http {
    upstream my_app_cluster {
        ip_hash; # Enable session affinity
        server 10.0.0.1:8080;
        server 10.0.0.2:8080;
        server 10.0.0.3:8080 backup; # Only used if others fail
    }

    server {
        listen 80;

        location / {
            # Core L7 Proxy Directive
            proxy_pass http://my_app_cluster;

            # Essential Header Forwarding
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Buffering & Timeouts
            proxy_buffering on;
            proxy_connect_timeout 60s;
        }
    }
}
```

---

### Advanced L7 Intelligence
Because Nginx parses the HTTP protocol, it can perform several high-level operations that are impossible at Layer 4:

* **Header Manipulation:** Nginx can add, remove, or modify headers (using `proxy_set_header` or `proxy_hide_header`) before the request reaches the backend. This is commonly used to pass the original client's IP address, which would otherwise appear as the Nginx proxy's IP.
* **Content Compression:** Nginx can compress responses using **Gzip** or **Brotli** on the fly, reducing the amount of data transmitted over the wire to the client.
* **Request Buffering:** Nginx reads the entire request body from the client before sending it to the backend. This protects slow backends from being tied up by slow clients (Slowloris protection).
* **URI Rewriting:** You can use the `rewrite` directive to change the request path before it hits the upstream (e.g., changing `/v1/api` to `/internal/api`).

---

### OS Internals: The Proxy Data Plane
On the **OS level**, when Nginx acts as an L7 proxy, it manages two independent TCP connections. This is known as **Connection Termination**.
1.  **Client-to-Nginx:** The kernel completes the handshake and Nginx parses the HTTP text into C structures.
2.  **Nginx-to-Backend:** Nginx opens a new socket to the upstream.

By using the `keepalive` directive inside the `upstream` block, Nginx can maintain a "warm" pool of open file descriptors (FDs) to the backend. This allows Nginx to reuse existing TCP connections for different client requests, bypassing the overhead of the TCP 3-way handshake for every single proxied call. Without this, a high-traffic proxy can quickly exhaust the node's ephemeral port range.

##### References
