2025-12-22 21:28
Tags: #azure 
##### Content
### Authentication and MFA
Methods used to verify user identity within Entra ID.

### Hybrid Auth Methods (Ranked by Recommendation)
1. Password Hash Sync (PHS): Hashed passwords from ADDS are salted and hashed again, then synced to Entra. Easiest to implement and used as a fallback.
2. Pass-through Authentication (PTA): Entra validates the password directly against on-premises Domain Controllers via an agent.
3. Federation: Entra redirects users to a 3rd party IdP (like AD FS) for authentication.

### Multi-Factor Authentication (MFA)
Adds layers of security beyond passwords.
- Types: Microsoft Authenticator app, SMS, Voice, Hardware Tokens.
- Phishing-resistant MFA: Uses FIDO2 security keys or Windows Hello for Business to prevent session hijacking.
- Azure standard security defaults enable MFA for all users in new tenants.

##### References
[[identity]]