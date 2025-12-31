2025-12-22 21:22
Tags: #azure 
##### Content
### Entra ID Objects
Comprehensive management of users, groups, application identities, and devices.

### Users
- Member: Typical internal users.
- Guest: External users (B2B).
- Service Accounts: Do not use standard user accounts for automation because they cannot pass MFA.

### Groups
- Microsoft 365 Groups: Used for collaboration (Teams, SharePoint).
- Security Groups: Used for assigning permissions to resources.
- Membership Types:
    - Assigned: Manual addition.
    - Dynamic User/Device: Automated based on rules (e.g., job title or department). **Requires Entra ID P1/P2 license.**

### App Identities
- Service Principal: An identity created for use with applications, hosted services, and automated tools to access Azure resources.
- Managed Identities: A type of service principal automatically managed by Azure. Eliminates the need for developers to manage credentials.
    - System-assigned: Tied to a single resource.
    - User-assigned: Independent lifecycle, can be assigned to multiple resources.

### Devices
- Registered: Personal devices (BYOD) signed in with non-Entra accounts.
- Joined: Corporate devices signed in with Entra accounts.
- Hybrid Joined: Devices joined to on-premises AD and registered with Entra ID.

##### References
[[identity]]