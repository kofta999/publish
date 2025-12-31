2025-12-23 20:41
Tags: #azure
##### Content
### Azure RBAC and ABAC

Azure Role-Based Access Control (RBAC) manages "Who" can do "What" at a specific "Scope." Used on the control plane at all levels (though some services even support Data Plane)

### RBAC Components
1. Security Principal: User, Group, Service Principal, or Managed Identity.
2. Role Definition: A collection of permissions (Actions, NotActions).
3. Scope: The level at which access is applied (Management Group, Subscription, Resource Group, or Resource).

### Built-in Roles
- Owner: Full access, including the ability to delegate access to others.
- Contributor: Full access to manage resources, but cannot grant access to others.
- Reader: View resources only.
- User Access Administrator: Manage user access only (cannot create resources).

### Custom Roles
- Limit: 5,000 per tenant.
- Created using JSON.
- **AssignableScopes:** Defines where the role can be used (e.g., specific subscriptions or RGs).

### Exam Traps
- **Inheritance:** Permissions always flow down. You cannot "Deny" a permission at a lower level if it was "Allowed" at a higher level (unless using Blueprints or Deny Assignments, which are rare).
- **NotActions:** This is not a "Deny." If a user is assigned a role with an "Action" that allows something, and a "NotAction" that excludes it, they still might get the permission from a different role assignment.
- **ABAC:** Adds "Conditions" to RBAC (e.g., "Allow user to read blobs only if the blob has the tag Project=Alpha").

##### References
[[governance]]