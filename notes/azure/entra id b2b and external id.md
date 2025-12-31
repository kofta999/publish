2025-12-22 21:45
Tags: #azure
##### Content
### B2B and External ID
Managing guest access for users outside your organization.

Example:
![[Pasted image 20251222204631.png]]

### Key Principles
- Authentication: Happens at the user's "Home" tenant (where they live).
- Authorization: Happens at "Your" tenant (where the resources are).
- OTP Exception: One-Time Passcodes are authenticated in your tenant if the guest has no home IdP.
- Access Limits: Guests can be restricted from browsing the full tenant directory.

##### References
[[identity]]