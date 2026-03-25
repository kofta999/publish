2026-03-24 14:51
Tags: #cloud/aws/security 
##### Content
AWS WAF (Web Application Firewall) protects your web applications from common web exploits by inspecting **Layer 7** (HTTP) traffic, rather than Layer 4 (TCP/UDP) traffic.

#### Supported Deployments
You can attach AWS WAF directly to specific AWS resources. Web ACLs are **Regional**, with one major exception:
*   **CloudFront** (Global scope)
*   **Application Load Balancer (ALB)**
*   **API Gateway**
*   **AppSync GraphQL API**
*   **Cognito User Pool**

#### Web ACLs (Access Control Lists) & Rules
A Web ACL consists of rules that define how to inspect web requests. You can also use **Rule Groups**, which are reusable sets of rules that you can easily add to multiple Web ACLs.

*   **IP Sets:** Block or allow based on IP address. Limit is **10,000 IP addresses** per rule (if you have more, you must span them across multiple rules).
*   **String / Header / Body Matching:** Inspect specific parts of the HTTP request to protect against common attacks like **SQL Injection** and **Cross-Site Scripting (XSS)**.
*   **Geo-Match:** Block or allow requests originating from specific countries.
*   **Size Constraints:** Restrict the length of specific parts of an incoming request.
*   **Rate-Based Rules:** Count the occurrences of events from a single IP over a time period. Excellent for **DDoS protection**.

#### Architecture: WAF + Fixed IP Addresses
Because WAF operates at **Layer 7**, it **does not support the Network Load Balancer (NLB)**, which operates at Layer 4. 

*   **The Workaround:** If your application requires a static, fixed IP address (usually a use case for NLB) but *also* needs WAF protection, you must use **AWS Global Accelerator** to get fixed IPv4 addresses, and route that traffic to an **ALB** (which has the WAF attached).

![[Pasted image 20260324145220.png]]

---

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Protect a web application against SQL Injection and Cross-Site Scripting (XSS)." | **AWS WAF (String/Body Matching Rules)** |
| "Block malicious web traffic originating from specific countries." | **WAF with Geo-match rules** |
| "Prevent a sudden flood of HTTP requests from a single IP address (Layer 7 DDoS)." | **WAF with Rate-based rules** |
| "Provide a static, fixed IP address to clients while also protecting the application with a Web Application Firewall." | **Global Accelerator + ALB + WAF** *(Note: Do NOT choose NLB, as WAF does not support it)* |
| "Apply a Web Application Firewall globally at the edge to reduce latency." | **WAF attached to Amazon CloudFront** |

##### References
