## Identity
Entra ID = Azure AD

why identity? to apply principle of least privilege to any service

Classic Identity
Need a central store for identities -> Identity Provider (IdP)
![[Pasted image 20251222183233.png|500]]

Decentralized Identity
Puts the user in the center, instead of IdP
User owns a DID (decentralized ID) issued by a provider that uses it to communicate with a verifier that asks for info

![[Pasted image 20251222183343.png|500]]

### Entra ID
Current identity provider for Microsoft

A company would have a **tenant** that manages identity providing
Azure, M365, SaaS etc can trust it

Entra ID != AD in cloud
differences in structure, AD more-locally comparing to 3rd party services connecting to Entra
No OUs in Entra, flat structure with **capabilities** to each unit / account

Note: SKU = Stock Keeping Unit, refers to a unique, purchasable version of a cloud service or resource, defining specific features like size, capacity, or performance (e.g., a VM series, storage tier, or software license) for tracking, billing, and management

Entra ID SKUs
- ID P1: small / medium businesses
- ID P2: large
- Suite: lots of features
- Free licence (basic)

you get your own tenant by default on domain `<tenant>.onmicrosoft.com`
not recommended to change it as it'll remove all your permission configs
that domain is changeable (custom DNS names)
you can add more than a tenant (dont overcomplex and create too many)

Entra can be managed through Entra Portal, M365 admin portal and azure portal


#### Entra Objects

- Users
	- Do not use User accounts for automation (ex. automation cannot pass MFA)
	- Types: Member / guests
	- Users from on-prem AD can be synced to Entra
- Groups
	- Recommended to give groups for permissions then assign users to them
	- Group Types
		- Microsoft 365: SharePoint, Teams etc
		- Security
	- Membership Types
		- Assigned: Users are manually assigned to the group
		- Dynamic User: All users that match a condition are assigned (job title / hire date)
		- Dynamic Device
- Service Principal
	- Allows apps to auth on their 3rd party IdPs and their IdPs will have access to Azure resources
  - Managed Identities
	  - Special case of Service Principal that occurs between Azure services
- Devices
	- Device States
		- Registered: Client devices, signed in using non-entra accounts
		- Joined: Signing in with entra accounts
		- Hybrid: Registered + Managed through AD


Many companies use both ADDS and Entra, with the source of truth being ADDS getting replicated into Entra

Single ADDS can sync to multiple Entra tenants using 1 sync server
Single ADDS can't sync to an Entra tenant using more than a sync servers
Single ADDS can sync to multiple Entra tenants but only 1 tenant can write back to ADDS

Sync options are
- Connect Sync: on-prem
- Cloud Sync: Cloud solution

#### Entra Auth Options
- Password Hash Sync (PHS), could auth
	- Hashed password on ADDS -> Gets salted + hashed then synced to Entra
	- Fundemental approach (used as fallback in other methods)
- Pass-through Authentication (PTA) (hybrid)
	- User Authes to entra -> Entra checks DCs for authenticity
- Federation (hybrid)
	- Entra redirects user into a 3rd party IdP -> generates a token -> goes back to entra with it (SSO)

Recommendation: Use the above order (federation isn't really recommended)


#### Roles and Administrative Units
Roles:
- Entra has pre-built roles
- You can create custom roles (max is 100)
- given to users / special type of groups (cloud-based groups)
- **Always Think Least Privilege**
- By default roles are applied to the whole tenant, you can change scope using Administrative Units

Administrative Units:
- Limits scope of roles to a subset of users, groups and/or devices
- **Note:** Adding a group to an AU does **NOT** add all the users in that group to the AU
- Restricted Management AUs: a special type of AUs that cannot be controlled even by Tenant Admins. Must enter that AU first

#### Privileged Identity Management
- Enables temp elevation for Entra / ARM roles
- Integrated with Azure Portal IAM
- Can be also used to evevate a group for lmited time
- Roles must be preassigned to be avail for users
- Then users elevate on-demand for a future time
- Azure AD / Entra ID P2 feature

#### Entra Permissions Managment
- Also allows on-demand elevation
- Allows more granular permission control
- Works across clouds
- Can analyze permissions for suggestions
- Separate Licence

Access Reviews
(add basic description here)

#### MFA
Types
Phishing-resistant mfa


#### Securing Registeration and SSPR
- To enable strong auth users need to auth with weak auth first (password)
- Temporary Access Pass (TAP) used to bootstrap passwordless auth without needing password

#### Conditional Access
- Triggered for any auth regardless of method
- Provides rich controls around users, roles, apps, env, etc
- Entra P1+

#### B2B and External ID
- You can invite people from other companies to our tenant as a B2B external identity
- Authentication happens on their tenant, Authorization happens in our tenant
- OTP is an exception, full auth happens in ours
- You can set access limits

![[Pasted image 20251222204631.png]]
