2025-12-22 21:29
Tags: #cloud/azure
##### Content
### Securing Registration and SSPR

Self-Service Password Reset (SSPR) allows users to reset their passwords without administrator intervention, reducing help-desk costs and user downtime.

### SSPR Configuration and Scope
- **Scope:** Can be enabled for "None", "Selected" (specific security group), or "All".
- **Registration:** Users are considered "Registered" once they have set up the *minimum* number of methods required by the admin (1 or 2).
- **Exam Trap:** Any user can *change* their password if signed in. SSPR is specifically for when they *cannot* sign in (forgotten or expired passwords).

### Authentication Methods
- **Supported Methods:** Email (external), SMS/Voice, Office Phone, Mobile App Notification, Mobile App Code, and Security Questions.
- **Security Questions:** Exclusive to SSPR; they **cannot** be used for standard MFA.
- **Admin Specifics:** Microsoft enforces a **two-method** authentication policy for Administrator roles regardless of the user settings.
- **Admin Trap:** Administrators **cannot** use Security Questions as a reset method.

### Licensing and Hybrid Requirements
- **Standard SSPR:** Available for cloud-only users with Entra ID P1, P2, or Microsoft 365 Business licenses.
- **Password Writeback:** Required for hybrid environments (Active Directory on-prem). 
    - When a user resets their password in Azure, it must be written back to the on-prem Domain Controller.
    - Requires **Entra ID P1/P2** and can be deployed via Entra Connect or Cloud Sync.
- **Cloud Sync:** Offers higher availability for SSPR writeback as it doesn't rely on a single server instance.

### Bootstrapping with TAP
- **Temporary Access Pass (TAP):** A time-limited passcode used to bootstrap passwordless authentication (like Windows Hello or FIDO2 keys). It allows a user to register strong methods without ever needing a standard password.

### Notifications and Security
- **User Notification:** Notifies the user at their primary/secondary email when their password is reset (security measure).
- **Admin Notification:** Notifies all Global Admins when another administrator resets their own password.

##### References
[[identity]]