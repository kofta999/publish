2025-12-22 21:20
Tags: #azure
##### Content
### Microsoft Entra ID Overview
Microsoft Entra ID (formerly Azure AD) is the current identity provider for Microsoft services.

### Tenancy
A company has a tenant that manages identity providing. Azure, M365, and SaaS applications trust this tenant. 
- Default domain: `<tenant>.onmicrosoft.com`.
- Custom DNS names can be added.
- Changing the default domain is not recommended as it removes permission configurations.
- You can manage multiple tenants, but avoid over-complexity.

### Entra ID vs. Active Directory (ADDS)
- Entra ID is not just AD in the cloud.
- Structure: AD is hierarchical with OUs; Entra ID is a flat structure.
- Connectivity: AD uses protocols like Kerberos/NTLM; Entra ID uses REST APIs and modern protocols (SAML, OIDC).

### SKUs (Stock Keeping Units)
- Free: Basic features.
- P1: For small/medium businesses (includes Conditional Access).
- P2: For large enterprises (includes PIM and Risk-based policies).
- Suite: Comprehensive feature set.

### Management Tools
Managed via Entra Portal, M365 Admin Portal, and Azure Portal.

##### References
[[identity]]