2026-04-23 12:40
Tags: #nginx 
##### Content
### 1. The SSL/TLS Context
While `ssl` is the directive name used in Nginx, it refers to the modern **TLS (Transport Layer Security)** protocol. **SSL (Secure Sockets Layer)** is considered legacy and cryptographically broken. In modern configurations, they are used interchangeably in syntax but strictly imply TLS in execution.

* **`ssl_certificate`**: Points to the public key (the certificate file, often including the intermediate chain).
* **`ssl_certificate_key`**: Points to the private key.
	 **Security Note:** This file must have restricted OS permissions (e.g., `600`) and should be owned by `root` so Nginx worker processes (running as a non-privileged user) can only access the in-memory representation, not the file itself.

---

### 2. Forcing TLS 1.3
TLS 1.3 is the modern standard, offering a faster "1-RTT" (Round Trip Time) handshake and improved security by removing legacy ciphers.

* **Directive:** `ssl_protocols TLSv1.3;`
* **Logic:** By explicitly setting this, you disable TLS 1.2 and below. This ensures that only the most secure handshake and ciphers are used.
* **OS/Library Requirement:** For TLS 1.3 to work, your Nginx must be linked against **OpenSSL 1.1.1** or higher.

---
### 3. Enabling HTTP/2
HTTP/2 significantly improves performance through multiplexing (multiple requests over a single TCP connection) and header compression (HPACK).

* **Syntax:** `listen 443 ssl http2;`
* **Dependency:** HTTP/2 requires **ALPN (Application-Layer Protocol Negotiation)**, which is part of the TLS handshake. This is why you must enable `ssl` to use `http2` in Nginx.
* **Performance:** It eliminates "Head-of-Line Blocking" at the application level.

---

### 4. Consolidated Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    # Certificate paths
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Protocol & Optimization
    ssl_protocols       TLSv1.3;
    ssl_session_cache   shared:SSL:10m; # Saves SSL sessions in shared memory for faster reconnects
    ssl_session_timeout 1h;

    location / {
        root /var/www/html;
    }
}
```

---

### 5. OS Internals: Cryptography and Memory
On the **OS level**, managing TLS and HTTP/2 increases the workload on the CPU and memory:

* **CPU Overhead:** The initial TLS 1.3 handshake uses asymmetric cryptography (like Elliptic Curve Diffie-Hellman), which is computationally expensive. Once the session key is established, it switches to symmetric encryption (AES), which is hardware-accelerated on most modern CPUs (AES-NI instructions). This is why **Worker Affinity** (pinning workers to cores) is vital—it keeps the cryptographic state in the CPU cache.
* **Shared Memory:** The `ssl_session_cache` directive creates a memory segment shared across all worker processes. When a client reconnects, any worker can retrieve the session state from this memory pool, skipping the expensive "full" handshake.
* **HPACK & HTTP/2:** Nginx must maintain a "Dynamic Table" in memory for every active HTTP/2 connection to handle header compression. This results in a slightly higher memory footprint per connection compared to standard HTTP/1.1.

---

### 6. Technical Note: 0-RTT (Early Data)
TLS 1.3 supports **0-RTT**, which allows a client to send the first request (like a `GET`) simultaneously with the TLS handshake. While this makes the site feel "instant," it is vulnerable to **Replay Attacks**. If you enable `ssl_early_data on;`, ensure your application backend handles idempotent requests safely.

##### References
