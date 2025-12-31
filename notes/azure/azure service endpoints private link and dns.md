2025-12-26 22:20
Tags: #azure
##### Content
### Private Link and Azure DNS

Securing access to PaaS services and managing name resolution.

### Service Endpoints vs. Private Link
- **Service Endpoints:**
    - **How:** Optimizes the path to a public service (e.g., SQL) over the Azure backbone.
    - **Visibility:** The service still has a Public IP, but only accepts traffic from your specific subnet.
- **Private Link / Private Endpoint:**
    - **How:** Projects a **Private IP** from your VNet onto the PaaS service.
    - **Visibility:** Public access can be completely disabled. The service "lives" on your private network.
    - **Exam Trap:** Private Link is more secure but requires careful DNS management.

### Azure DNS
- **Public DNS:** Hosts your domain records (e.g., `contoso.com`) on Azure's global name servers.
- **Private DNS Zones:** Used for name resolution within VNets without needing to build your own DNS servers.
- **VNet Links:**
    - **Resolution Link:** Allows a VNet to resolve names in a private zone (Limit: 1,000 per zone).
    - **Registration Link:** Automatically creates DNS records when a VM is created in that VNet (Limit: 100 per zone; 1 VNet per zone).

### DNS Resolution for Private Endpoints
- When you use a Private Endpoint, the service's FQDN (e.g., `mydb.database.windows.net`) must resolve to the **Private IP**, not the Public IP.
- **The Solution:** Use **Azure Private DNS Zones** with the specific naming convention (e.g., `privatelink.database.windows.net`) and link them to your VNets.

##### References
[[networking]]
