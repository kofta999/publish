2026-04-23 12:53
Tags: #nginx  
##### Content
### Layer 4: Stream Tunneling
At Layer 4, Nginx does not understand that a WebSocket is being established. It treats the entire connection as a generic, long-lived TCP stream.

* **Logic:** Nginx intercepts the initial TCP SYN, completes its own handshake with the client, and immediately opens a corresponding TCP connection to the backend. It then "splices" the two together.
* **The Tunnel:** Any data sent (including the HTTP Upgrade request) is passed transparently as raw bytes. Nginx never inspects the frames.
* **Critical Requirement:** You must aggressively tune **timeouts**. Because L4 has no concept of "active" vs "idle" application data, Nginx will kill the tunnel if no bytes move for a set period.

**L4 Configuration Example (`stream` block):**
```nginx
stream {
    upstream websocket_backend {
        server 10.0.0.5:8080;
    }

    server {
        listen 8000;
        proxy_pass websocket_backend;
        
        # Must be long enough to keep idle sockets alive
        proxy_timeout 1h; 
        proxy_connect_timeout 5s;
    }
}
```

---

### Layer 7: HTTP Upgrade & Interception
At Layer 7, Nginx is fully aware of the WebSocket protocol. It terminates the TLS/SSL connection and parses the initial HTTP request.

* **Handshake logic:**
    1.  Client sends an HTTP `GET` with `Upgrade: websocket` and `Connection: Upgrade` headers.
    2.  Nginx terminates this request.
    3.  Nginx initiates a new request to the backend, passing those specific headers.
    4.  Once the backend returns a `101 Switching Protocols`, Nginx switches the connection state to "Tunnel" mode.
* **Advantage:** You can perform URL routing, apply authentication, and inject headers (like `X-Real-IP`) before the upgrade happens.

**L7 Configuration Example (`http` block):**
```nginx
http {
    server {
        listen 443 ssl;
        
        location /ws {
            proxy_pass http://backend_node;
            
            # Explicitly pass the Upgrade headers
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            
            # Standard L7 timeouts
            proxy_read_timeout 3600s;
            proxy_send_timeout 3600s;
        }
    }
}
```

---

### Key Comparison

| Feature                | Layer 4 (Stream)           | Layer 7 (HTTP)                  |
| :--------------------- | :------------------------- | :------------------------------ |
| **Protocol Awareness** | Opaque (Raw Bytes)         | Aware (HTTP/WS)                 |
| **TLS Termination**    | Pass-through or Stream SSL | Done at Nginx                   |
| **Header Injection**   | Impossible                 | Possible (`X-Forwarded-For`)    |
| **Timeouts**           | Managed by `proxy_timeout` | Managed by `proxy_read_timeout` |
| **Efficiency**         | Lower CPU (no parsing)     | Higher Intelligence (routing)   |

---
### OS Internals: The Socket State
On the **OS level**, WebSockets are just long-lived TCP connections. 
* **File Descriptors (FDs):** Both L4 and L7 consume two FDs per WebSocket (one client-side, one backend-side). On high-concurrency servers, you must increase the `worker_rlimit_nofile` and the OS `ulimit -n` to prevent "Too many open files" errors.
* **TCP Keepalives:** Because WebSockets can stay idle for long periods, it is often better to enable **TCP Keepalives** at the kernel level (`so_keepalive=on`) to detect "half-open" connections where the client has disappeared without sending a `FIN` packet. This prevents Nginx from holding onto thousands of "ghost" connections that have actually timed out on the client's network.

##### References
