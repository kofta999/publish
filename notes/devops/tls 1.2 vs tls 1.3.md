2026-04-23 12:46
Tags: #web 
##### Content
Transport Layer Security (TLS) is the cryptographic protocol that secures communication over a network. The fundamental shift between version 1.2 and 1.3 was moving from a "negotiate everything" model to a "secure by default" model.

---

### TLS 1.2: The Traditional Handshake
TLS 1.2 is characterized by a **2-RTT (Round Trip Time)** handshake, meaning the client and server must exchange two sets of messages before data can be sent.

* **Client Hello:** The client sends a list of supported "Cipher Suites" (combinations of algorithms for key exchange, encryption, and hashing).
* **Server Hello & Certificate:** The server picks a cipher suite and sends its **Public Key** via an SSL certificate.
* **Key Exchange:** In most 1.2 configurations, the client generates a "Pre-master Secret," encrypts it with the server's public key, and sends it back. 
* **Change Cipher Spec:** Both parties use that secret to derive a **Symmetric Session Key**. All future data is encrypted with this shared key.
* **Finished:** Both sides signal that the handshake is secure.

#### The Problems with TLS 1.2
* **Latency:** The 2-RTT handshake adds significant "negotiation" time before the first byte of application data (like a GET request) is sent.
* **Vulnerable Ciphers:** It supports legacy, weak algorithms (like MD5 or SHA-1) that are prone to attacks.
* **Static RSA Risk:** If RSA is used for key exchange (encrypting the secret with the public key), anyone who steals the server's **Private Key** in the future can decrypt all *past* recorded traffic. This means it lacks **Forward Secrecy**.

---
### TLS 1.3: The Modern Standard

TLS 1.3 is a radical simplification. It removes legacy features and reduces the handshake to **1-RTT**.

* **Diffie-Hellman (DH) Exclusively:** Unlike 1.2, which allowed RSA key exchange, 1.3 *forces* ephemeral Diffie-Hellman. 
    * **Logic:** Both sides generate temporary, random keys. They exchange "public parts" and mathematically derive a shared secret. Because the keys are temporary, even if the server is compromised later, the past traffic remains encrypted (**Perfect Forward Secrecy**).
* **Combined Hello:** The client "guesses" which DH group the server prefers and sends its part of the key share in the very first **Client Hello**.
* **Zero-RTT (0-RTT):** If a client has visited the server before, it can send encrypted data in the first message, making the connection feel instantaneous.

---

### Technical Note: OS & Kernel Internals
At the **OS level**, the TLS handshake happens in the **Application Layer** (User Space), usually handled by a library like `OpenSSL`.

1.  **TCP Handshake First:** The OS kernel must complete the 3-way handshake (`SYN`, `SYN-ACK`, `ACK`) before the TLS library can even begin sending the "Client Hello."
2.  **Socket Buffers:** During the handshake, the kernel manages the socket buffers. If the TLS certificates are very large, they might exceed the initial TCP **Congestion Window (initcwnd)**, forcing the kernel to wait for an extra ACK from the client before sending the rest of the cert. 
3.  **Encrypted Client Hello (ECH):** A recent advancement in TLS 1.3 is ECH. In standard TLS, the domain name (SNI) is sent in plaintext during the Client Hello. ECH encrypts this initial "hello," preventing ISPs or firewalls from seeing which specific website you are visiting on a shared server.

---
### Comparison Table

| Feature             | TLS 1.2                          | TLS 1.3                          |
| :------------------ | :------------------------------- | :------------------------------- |
| **Handshake Speed** | 2-RTT                            | 1-RTT (or 0-RTT)                 |
| **Key Exchange**    | RSA or Diffie-Hellman            | **Diffie-Hellman Only**          |
| **Forward Secrecy** | Optional                         | **Mandatory**                    |
| **Cipher Suites**   | Dozens (many weak)               | 5 (all strong)                   |
| **Security**        | Susceptible to downgrade attacks | Hardened against legacy exploits |
##### References
