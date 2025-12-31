2025-12-24 18:30
Tags: #azure
##### Content
### Storage Security and Access Control

Azure provides multiple layers of security to protect data at rest and in transit.

### Authorization Methods
1. **Access Keys (512-bit):** Two keys (Primary/Secondary) that grant full control. **Avoid using for apps.**
2. **Shared Access Signature (SAS):** Granular, time-bound tokens. 
    - **Service SAS:** Access to one service (e.g., just Blobs).
    - **Account SAS:** Access to multiple services.
    - **User Delegation SAS:** Signed with Entra ID credentials (most secure).
3. **Entra ID RBAC:** Assigning roles (e.g., "Storage Blob Data Contributor") to users/identities. The best practice for Blobs and Queues.

### Networking Security
- **Firewalls:** Restrict access to specific IP addresses or Virtual Networks.
- **Service Endpoints:** Securely routes traffic over the Azure backbone.
- **Private Endpoints:** Assigns a private IP from your VNet to the Storage Account, removing it from the public internet.

### Encryption
- **At Rest:** Mandatory SSE (Storage Service Encryption) with Microsoft-managed keys. 
- **Customer-Managed Keys (CMK):** You can manage your own keys in Azure Key Vault.
- **In Transit:** "Secure transfer required" (HTTPS) is enabled by default.

##### References
[[storage]]