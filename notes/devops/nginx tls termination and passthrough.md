2026-04-20 12:44
Tags: #nginx 
##### Content
### TLS Termination (L7)
Nginx acts as the endpoint for the SSL/TLS handshake. It decrypts the traffic, allowing for inspection and manipulation before optionally re-encrypting it for the backend.

* **Logic:**
    * **Offloading:** Nginx handles the CPU-intensive decryption. The backend receives plain HTTP (standard) or newly encrypted HTTPS.
    * **Header Manipulation:** Since Nginx "sees" the traffic, it can inject headers like `X-Forwarded-Proto: https` or `X-Real-IP`, which are critical for application logic.
    * **Connection Sharing:** Nginx can maintain a pool of warm keep-alive connections to the backend, significantly improving performance for high-traffic apps.
* **Re-encryption (End-to-End):**
    * **Shared Certs:** If you share the private key between Nginx and the Backend, you increase the "Blast Radius"—a compromise on Nginx exposes the backend's identity.
    * **Separate Certs:** Nginx has its own cert (public facing), and the backend has a separate cert (internal/private CA). This is the standard for high-security cloud environments.
* **Caching:** Enabled. Nginx can cache the decrypted content to serve other users without hitting the backend.

### TLS Passthrough (L4)
Nginx acts as a "dumb pipe" (using the `stream` module). It routes the encrypted packets directly to the backend without decrypting them.

* **Logic:**
    * **End-to-End Encryption:** Only the backend has the private key. Nginx never sees the plaintext data.
    * **SNI Routing:** Even without decrypting, Nginx can read the **Server Name Indication (SNI)** in the initial TLS "Client Hello" to decide which backend server to route the packets to (via `ssl_preread on`).
* **Trade-offs:**
    * **Visibility:** No header manipulation (cannot add `X-Forwarded-For`).
    * **Performance:** No connection sharing; every client request requires a new TCP/TLS handshake with the backend. No caching possible.
    * **Security:** More secure for compliance (e.g., PCI-DSS, HIPAA) as the proxy is never a "man-in-the-middle."

---

### Comparison & Selection

| Feature                  | TLS Termination               | TLS Passthrough          |
| :----------------------- | :---------------------------- | :----------------------- |
| **Layer**                | Layer 7 (HTTP)                | Layer 4 (Stream)         |
| **Decryption**           | Done at Nginx                 | Done at Backend          |
| **L7 Intelligence**      | High (Routing by URL/Headers) | None (Routing by IP/SNI) |
| **Private Key Location** | On Nginx                      | On Backend Only          |
| **Cert Management**      | Centralized on Nginx          | Distributed on Backends  |

### Technical Note: OS & Kernel Impact
* **Termination:** Nginx uses OpenSSL/BoringSSL libraries in **User Space** to perform the complex math of decryption. This increases CPU usage and memory pressure on the Nginx process.
* **Passthrough:** In many configurations, this can take advantage of the kernel's **`splice(2)`** system call to move data from the inbound socket buffer to the outbound socket buffer without copying it into Nginx's user-space memory, resulting in extremely low latency.

##### References
