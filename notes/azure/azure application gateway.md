2025-12-28 12:03
Tags: #azure
##### Content
### Azure Application Gateway

The Azure Application Gateway is a specialized **Layer 7 (HTTP/HTTPS)** load balancer that provides advanced traffic management and security features. Unlike the standard Load Balancer (Layer 4), it is "URL-aware."

### Key Features
- **URL-Based Routing:** Route traffic based on the URL path (e.g., `/images/*` goes to one backend pool, `/video/*` to another).
- **Multi-site Hosting:** Host multiple web domains (e.g., `shop.com` and `blog.com`) on a single gateway instance.
- **SSL/TLS Termination:** Decrypt HTTPS traffic at the gateway to reduce the processing load on your backend servers.
- **Cookie-Based Affinity:** Keeps a user session on the same backend server (Sticky Sessions).
- **Web Application Firewall (WAF):** Provides centralized protection from common exploits like SQL injection and cross-site scripting (OWASP rules).

### Components
1. **Frontend IP:** The public or private entry point.
2. **Listeners:** Checks for incoming requests on a specific port, protocol, and host.
3. **Request Routing Rules:** The logic that connects the Listener to a Backend Pool (can be Basic or Path-based).
4. **Backend Pools:** Can contain NICs, Virtual Machine Scale Sets, Public IPs, or FQDNs.
5. **HTTP Settings:** Defines settings like port, protocol, and cookie affinity for the connection between the Gateway and the Backend.

### SKUs and Scaling
- **Standard v2 / WAF v2:** Supports **Autoscaling** and **Static VIPs**.
- **WAF SKU:** Mandatory if you need the security features of the Web Application Firewall.
- **Exam Trap:** Application Gateway requires its own dedicated subnet, usually named `AppGWSubnet`. You **cannot** place other resources like VMs in this subnet.

### Application Gateway vs. [[azure load balancer|Load Balancer]]

| Feature | Load Balancer | Application Gateway |
| :--- | :--- | :--- |
| **OSI Layer** | Layer 4 (TCP/UDP) | Layer 7 (HTTP/HTTPS) |
| **Traffic Type** | Any TCP/UDP | Web traffic only |
| **SSL Offload** | No | Yes |
| **URL Routing** | No | Yes |
| **Health Probe** | TCP/HTTP | HTTP/HTTPS (Custom paths) |

##### References
