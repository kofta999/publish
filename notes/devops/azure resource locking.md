2025-12-23 20:47
Tags: #cloud/azure
##### Content
### Resource Locking
Resource locks provide a way for administrators to lock a subscription, resource group, or resource to prevent accidental deletion or modification.

### Lock Types
- CanNotDelete (Delete): Authorized users can still read and modify a resource, but they cannot delete it.
- ReadOnly (ReadOnly): Authorized users can read a resource, but they cannot delete or update it. This effectively makes the resource "Read-Only."

### Lock Mechanics and Traps
- **Scope:** Locks apply only to the Control Plane (ARM). 
- **Exam Trap:** Data Plane vs. Control Plane. If you put a 'CanNotDelete' lock on a Storage Account, you cannot delete the Storage Account itself (Control Plane), but you *can* still delete a file/blob inside it (Data Plane).
- **Inheritance:** Locks are inherited down the hierarchy. A lock on an RG applies to all resources within it.
- **Admin Specifics:** To remove or modify a lock, you must have the `Microsoft.Authorization/*` or `Microsoft.Authorization/locks/*` permission (typically Owner or User Access Administrator).

##### References
[[governance]]