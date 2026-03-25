2026-03-13 21:35
Tags: #cloud/aws/networking 
##### Content
In a hybrid cloud environment, you often need a way for your on-premises servers to resolve AWS-internal domain names (like those in Private Hosted Zones) and for your EC2 instances to resolve domain names for your local data center resources.

**Route 53 Resolver** (formerly known as "AmazonProvidedDNS" or the ".2" address) handles this bridge via **Endpoints**.

#### 1. Inbound Endpoints
An Inbound Endpoint allows your **on-premises DNS resolvers** to "ask" Route 53 to resolve AWS resources.
* **Mechanism:** You create an endpoint in your VPC with dedicated IP addresses (one per Availability Zone for high availability).
* **Flow:** Your on-premises DNS server is configured to forward queries for `*.aws.internal` or your Private Hosted Zone (e.g., `*.corp.internal`) to these Inbound Endpoint IPs.
* **Access:** Works over **AWS Direct Connect** or **Site-to-Site VPN**.

![[Pasted image 20260313213705.png]]

#### 2. Outbound Endpoints
An Outbound Endpoint allows **AWS resources (EC2)** to "ask" your on-premises DNS servers to resolve local domain names.
* **Mechanism:** You create an Outbound Endpoint and define **Forwarding Rules**.
* **Forwarding Rules:** These rules specify which domain names should be sent to your on-premises DNS servers.
* *Example:* "Any query ending in `.onprem.local` should be forwarded to the on-premises DNS IP `10.0.0.50`."
* **Default Behavior:** If a query doesn't match any forwarding rule, the Route 53 Resolver handles it normally (resolving public domains or Private Hosted Zones).

![[Pasted image 20260313213718.png]]

#### 3. Summary Comparison

| Component             | Direction                 | Purpose                                                        |
| --------------------- | ------------------------- | -------------------------------------------------------------- |
| **Inbound Endpoint**  | On-prem $\rightarrow$ AWS | Resolves AWS Private Hosted Zones from your local data center. |
| **Outbound Endpoint** | AWS $\rightarrow$ On-prem | Resolves local data center domains from your EC2 instances.    |
| **Forwarding Rules**  | Logic                     | Defined on the Outbound Endpoint to map domains to IPs.        |

#### Technical Considerations
* **High Availability:** Always provision endpoints in at least **two Availability Zones**.
* **Security:** Use **Security Groups** to restrict who can send DNS queries to your Inbound Endpoints (port 53 UDP/TCP).
* **VPC Peering:** These endpoints also work across Peered VPCs if the network routing (Routing Tables) is correctly configured.

##### References
