2026-04-11 19:15
Tags: #web 
##### Content
### Summary/Purpose
TLS (Transport Layer Security) provides a way for two parties to communicate over an insecure network by ensuring **Encryption** (privacy), **Integrity** (data isn't tampered with), and **Authentication** (knowing who you are talking to).

### Core Logic/Mechanism: The Handshake
While asymmetric encryption is secure, it is computationally expensive. TLS uses a hybrid approach: **Asymmetric encryption** is used to securely exchange a "session key," and then **Symmetric encryption** is used for the actual data transfer.

1.  **The Hook:** The server sends its **Public Key** (inside a Certificate) to the client.
2.  **The Secret:** The client generates a random **Symmetric Key**, encrypts it with the server's Public Key, and sends it back.
3.  **The Handshake:** Only the server can decrypt this using its **Private Key**. Now, both have the same Symmetric Key.
4.  **The Tunnel:** All further data is encrypted with that Symmetric Key (much faster for bulk data).

---

### Authentication & The CA (Certificate Authority)
The "Man-in-the-Middle" (MITM) attack occurs when a hacker redirects your traffic to their server. Even if they generate a certificate for `google.com`, they fail the **Trust Chain** check.

* **Self-Signed:** The hacker signs the cert themselves. Browsers block this because the "Signer" isn't in their trusted list.
* **CA-Signed:** To get a legit cert, you must prove ownership of the domain to a CA (like Let's Encrypt or DigiCert).
* **Browser Trust:** Browsers and Operating Systems come pre-installed with the **Public Keys** (Root Certificates) of all major CAs. If a cert isn't signed by one of these, it's rejected.

#### The CSR Flow
1.  **Generate Keypair:** You create a Private Key and a **Certificate Signing Request (CSR)** locally.
2.  **Submit CSR:** You send the CSR (which contains your Public Key and identity) to the CA.
3.  **Validation:** The CA verifies you own the domain.
4.  **Issue:** The CA signs your Public Key with their Private Key and sends you the `.crt`.

---

### Client Certificates (mTLS)
In a standard web flow, only the server proves its identity (One-Way TLS). However, in high-security environments, the server may also require the client to provide a certificate. This is called **Mutual TLS (mTLS)**.
* **Identity:** The server maintains a list of trusted CAs. If the client's certificate isn't signed by one of them, the server drops the connection.
* **Use Case:** This is the backbone of internal microservices and Kubernetes component communication.

---

### Key Parameters: File Conventions

| Component             | Common Extensions      | Security Level                             |
| :-------------------- | :--------------------- | :----------------------------------------- |
| **Public Key / Cert** | `.crt`, `.pem`, `.cer` | **Public:** Shared with everyone.          |
| **Private Key**       | `.key`, `.key.pem`     | **Top Secret:** Never leaves the server.   |
| **Request**           | `.csr`                 | **Temporary:** Sent to the CA for signing. |

---

### Technical Note: PKI (Public Key Infrastructure)
The entire ecosystem—the CAs, the digital certificates, the hardware, and the software used to manage and revoke these keys—is known as **PKI**. 

On the **OS Internals** level, when a browser validates a cert, it performs a cryptographic hash check. It takes the server's cert, uses the CA's public key to decrypt the "signature" on that cert, and compares the resulting hash to the actual content of the cert. If they match, the math proves the CA actually signed it.

##### References
