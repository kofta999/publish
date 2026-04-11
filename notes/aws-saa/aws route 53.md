2025-02-22 13:40
Tags: #cloud/aws/networking 
##### Content
### Amazon Route 53

Amazon Route 53 is a highly available, scalable, fully managed, and **Authoritative** DNS service.
* **Authoritative:** You (the customer) have the power to update and manage the DNS records.
* **Registrar:** It can also function as a domain registrar, allowing you to purchase and manage domain names directly.
* **100% SLA:** It is the only AWS service that offers a 100% availability Service Level Agreement.
* **The Name:** "53" refers to the standard TCP/UDP port used for DNS traffic.
#### 1. Hosted Zones
A Hosted Zone is a container that stores the DNS records for a specific domain and its subdomains.
* **Public Hosted Zones:** Used to route traffic from the public internet (e.g., `example.com`).
* **Private Hosted Zones:** Used to route traffic within one or more VPCs (e.g., `api.internal.project`). These are invisible to the public internet.
* **Cost:** $0.50 per month per hosted zone.

#### 2. Record Types
A record defines how you want to route traffic for a specific domain or subdomain.

| Type      | Function                                   | Constraint                                                                 |
| --------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| **A**     | Maps a hostname to **IPv4**.               | Common for web servers.                                                    |
| **AAAA**  | Maps a hostname to **IPv6**.               | Used for modern network stacks.                                            |
| **CNAME** | Maps a hostname to **another hostname**.   | Cannot be used for the **Zone Apex** (the root domain like `example.com`). |
| **NS**    | Defines the **Name Servers** for the zone. | Controls which servers are authoritative for the domain.                   |
* **Advanced Types:** Route 53 also supports MX (mail), TXT (verification), SRV (service discovery), and SPF (email security).

#### 3. Time To Live (TTL)
TTL is the amount of time a DNS resolver caches a record before checking Route 53 again for updates.
* **High TTL (e.g., 24 hours):**
	* **Pros:** Less traffic/cost on Route 53; faster responses for clients (cache hits).
	* **Cons:** Changes to records take longer to propagate; records stay "outdated" for longer.

* **Low TTL (e.g., 60 seconds):**
	* **Pros:** Changes propagate quickly; easier to switch traffic during a migration or failure.
	* **Cons:** Higher query volume to Route 53 (higher costs).

* **Note:** TTL is mandatory for all records **except Alias records**


#### 4. Public vs. Private Hosted Zones
![[Pasted image 20260313192454.png]]

##### References
