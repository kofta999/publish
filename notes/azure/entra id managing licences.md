2025-12-23 11:54
Tags: #azure
##### Content
### Manage Licenses in Microsoft Entra ID
Licensing in Entra ID is a critical administrative task for AZ-104. You must know how to assign, track, and optimize licenses for users and groups.

### License Assignment Methods
- Individual Assignment: Manually assigning a license to a specific user.
- Group-based Licensing: Assigning a license to a group (Security or M365). Any member added to the group automatically inherits the license. **(Requires Entra ID P1 or P2)**.
- If a user is removed from the group, the license is automatically removed.

### License Requirements for Identity Features
Microsoft tests your knowledge of which "Tier" is required for specific features:
- Entra ID Free: Basic identity, SSO (up to 10 apps), Security Defaults (MFA).
- Entra ID P1: **Conditional Access**, Group-based licensing, Dynamic Groups, Password Protection (custom banned words), Cloud Sync.
- Entra ID P2: **Privileged Identity Management (PIM)**, Identity Protection (Risk-based policies), Access Reviews.

### Key Administrative Rules
- License Overlap: If a user is in multiple groups with different licenses, they receive the total sum of all features.
- Usage Location: A **Usage Location** must be set on the user profile before a license can be assigned (required by local laws).

### Troubleshooting License Errors
If the portal shows an "Assignment error" state for a group, it is usually due to one of the following:
- **Insufficient Quota:** You have run out of available "seats" for that specific license.
- **Conflicting Service Plans:** A user has a license that includes a service (e.g., SharePoint Online) that conflicts with a service in the new license.
- **Missing Usage Location:** Licenses cannot be assigned to users who do not have a "Usage Location" defined in their profile.
- **Proxy Addresses:** Errors can occur if a user's proxy address (email) is already in use by another object.

### Verification
You can view license status and "Assignment paths" (Direct vs. Inherited) in the Licenses blade of the Entra portal.

##### References