2026-04-23 12:36
Tags: #nginx 
##### Content
### Summary/Purpose
At Layer 4, Nginx functions as a **Transport Layer** proxy. It does not look at the HTTP content (headers, URLs, or cookies); instead, it operates at the **TCP/UDP** level. This is significantly faster and consumes less CPU than L7 proxying because Nginx simply "shovels" packets between the client and the backend without parsing the application data.

---

### The `stream` Directive
L4 proxying is configured using the `stream` module. This is a top-level context, completely separate from the `http` block.

* **No `location` Context:** Since there are no URLs or paths at Layer 4, the `location` directive is unavailable. Routing is based strictly on the IP and Port defined in the `listen` directive.
* **No `http://` in `proxy_pass`:** You cannot use protocols like `http://` or `https://` in the `proxy_pass` directive inside a stream block. You only provide the upstream name or an IP:Port.

---

### Configuration: TCP/UDP Proxying
```nginx
# Top-level context (outside the 'http' block)
stream {
    upstream my_database_cluster {
        # Standard load balancing algorithms still apply
        server 10.0.0.5:3306;
        server 10.0.0.6:3306;
    }

    server {
        listen 3306; # Listening for incoming TCP traffic on MySQL port
        proxy_pass my_database_cluster;
        
        # L4 specific timeouts
        proxy_connect_timeout 5s;
        proxy_timeout 30s; 
    }
}
```

---

### Connection Handling & Load Balancing Behavior
There is a distinct difference in how Load Balancing appears to function between L4 and L7, particularly when viewed through a browser.

* **L4 (TCP Proxying):** Load balancing happens at the **Connection level**. 
    * Once a TCP connection is established between a client (like a browser) and a backend, all subsequent data for that session flows through that *same* connection.
    * Because modern browsers reuse TCP connections (Keep-Alive), refreshing a page often results in the traffic hitting the same backend server repeatedly.
    * **`curl` vs. Browser:** Every `curl` command typically initiates a new TCP handshake, so `curl` will show perfect Round Robin, while a browser will appear "sticky" to one backend.
* **L7 (HTTP Proxying):** Load balancing happens at the **Request level**.
    * Nginx can parse individual HTTP requests within a single TCP connection and send `Request A` to `Backend 1` and `Request B` to `Backend 2`.

---

### OS Internals: Packet Flow & Performance
On the **OS level**, L4 proxying is a "byte-streaming" operation. 

* **Handshake Termination:** Nginx still terminates the TCP connection. It completes the 3-way handshake with the client, then opens a second 3-way handshake with the backend. 
* **Data Transfer:** Once the pipe is open, Nginx uses the kernel's `read()` and `write()` syscalls to move bytes from one socket buffer to another. 
* **Optimized I/O:** Since there is no protocol parsing, Nginx can often utilize the **`splice(2)`** system call. This allows the kernel to move data directly between the two socket file descriptors in kernel space, avoiding the expensive overhead of copying data into Nginx's user-space memory and back out again. This is why L4 proxying is the preferred method for high-throughput, low-latency requirements like database clustering or mail server fronting.

##### References
