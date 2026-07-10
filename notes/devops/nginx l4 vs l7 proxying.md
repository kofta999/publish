2026-04-20 12:43
Tags: #nginx
##### Content
### 1. Layer 4 (Transport Layer)
At this layer, Nginx acts as a **stream-level** proxy, making decisions based solely on network information without parsing the application data.

* **Capabilities:**
    * **Visibility:** Reads Source/Destination IP and Ports.
    * **Inspection:** Limited to packet headers (e.g., TCP SYN, TLS Client Hello for SNI routing).
    * **Performance:** Faster and uses less CPU because it does not decrypt or inspect the payload.
* **Implementation in Nginx:** Controlled via the `stream` module.
* **Use Cases:** 
	* **Non-HTTP Protocols:** Proxying databases (MySQL, PostgreSQL), Mail servers (SMTP), or custom TCP/UDP binary protocols.
    * **Generic SSL Pass-through:** Passing encrypted traffic directly to the backend without Nginx holding the SSL certificates.

### 2. Layer 7 (Application Layer)
Nginx acts as a **fully-featured intermediary** that understands the specific application protocol (HTTP, gRPC, FastCGI).

* **Capabilities:**
    * **Deep Context:** Reads URLs, Cookies, HTTP Headers, and Form Data.
    * **Smart Routing:** Can route traffic based on the specific page requested (e.g., `/api` goes to one cluster, `/static` to another).
    * **TLS Termination:** Requires decryption for HTTPS. This allows Nginx to modify headers (like `X-Forwarded-For`), perform compression (Gzip), and mitigate application-layer attacks (WAF).
* **Implementation in Nginx:** Controlled via the `http` module.
* **Use Cases:** 
	* **Web Applications:** Load balancing based on session cookies or request paths.
    * **Content Optimization:** Caching responses and serving images with optimized headers.

---

### 3. Comparison & Synergies

| Feature              | Layer 4 (Stream)           | Layer 7 (HTTP)                    |
| :------------------- | :------------------------- | :-------------------------------- |
| **Protocol Support** | Generic TCP/UDP            | Application-specific (HTTP, gRPC) |
| **CPU Usage**        | Minimal (Packet switching) | Higher (Parsing & Decryption)     |
| **Load Balancing**   | Connection-based           | Request-based                     |
| **Visibility**       | Opaque payload             | Full payload visibility           |

**Strategic Implementation:**
* **L4 for Protocol Agnosticism:** Use the `stream` context when Nginx serves as a entry point for services it doesn't "speak" (like a MySQL cluster), where the goal is simple port forwarding and high-speed packet routing.
* **L7 for Intelligence:** Use the `http` context for sharing backend connections (Keepalives) and results caching. Because Nginx understands the request at L7, it can identify that two different users are requesting the same resource and serve it from the **Caching Layer**, significantly reducing backend load.

### 4. Technical Note: OS Internals & Sockets
* **L4:** Nginx opens a TCP socket to the client and a second TCP socket to the backend, simply "shoveling" bytes between the two. The kernel's **TCP stack** handles the bulk of the work.
* **L7:** Nginx must fully terminate the TCP connection, complete the TLS handshake, buffer the entire HTTP header, and then make a routing decision. On the **OS level**, this involves more memory allocation and context-switching as Nginx parses the text-based HTTP protocol into internal C structures before initiating the upstream request.

##### References
