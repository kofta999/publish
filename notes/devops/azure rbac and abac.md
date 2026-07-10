2025-12-23 20:41
Tags: #cloud/azure
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


Azure uses an **Additive** model for permissions. Your effective permissions are the sum of all roles assigned to you.
### Role Definition Types
1. **Actions:** Operations the role *grants*.
2. **NotActions:** Operations *subtracted* from the wildcard (`*`) in the Actions list.
3. **DataActions:** Permissions for the data plane (e.g., reading a blob, not just the account).
4. **NotDataActions:** Subtractions from the data plane wildcard.

### NotActions vs. Deny Assignments
| Feature       | NotActions                              | Deny Assignments                       |
| :------------ | :-------------------------------------- | :------------------------------------- |
| **Purpose**   | Simplifies role creation (Subtraction). | Enforces strict protection (Blocking). |
| **Evaluated** | Combined with other roles (Additive).   | Evaluated first (Absolute).            |
| **Creator**   | User-defined in Custom Roles.           | System-defined (Blueprints/Stacks).    |

### The "Hierarchy of No"
1. **Deny Assignment:** If this exists, the action is **BLOCKED**.
2. **Role Assignment (Allow):** If an Action exists here, the action is **ALLOWED**.
3. **Implicit Deny:** If no role grants the action, the action is **BLOCKED**.

### Exam-Trap: The "NotAction" Fallacy
- **Question:** A user has Role A (Actions: `*`, NotActions: `*/delete`) and Role B (Actions: `*/delete`). Can they delete?
- **Answer:** **Yes.** NotActions only subtracts from the specific role it is in. It does not block permissions granted by other roles.

### ABAC (Attribute-Based Access Control)
- Extends RBAC using **Conditions**.
- **Use Case:** "Allow a user to contribute to Storage Blobs *only if* the blob has the tag 'Project=X'."
- Primarily used for **Storage Blob** and **Queue** data actions.

##### References
[[governance]]