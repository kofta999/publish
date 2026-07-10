2025-12-22 21:37
Tags: #cloud/azure 
##### Content
### Authorization: Roles and Administrative Units
Scoping permissions and administrative tasks.

### Roles
- Built-in Roles: Pre-defined (e.g., Global Admin, User Admin).
- Custom Roles: Created for specific needs (max 100 per tenant).
- **Rule:** Always apply the Principle of Least Privilege.

### Administrative Units (AUs)
- Limits the scope of a role to a subset of users, groups, or devices (e.g., "Helpdesk Admin" for just the "Marketing" AU).
- Means that administrative permissions are limited to only the objects (users/groups/devices) inside that AU.
- **Note:** Adding a group to an AU does NOT automatically add the group's members to that AU.
- Restricted Management AUs: Cannot be managed even by Global Admins unless they explicitly enter that specific AU.

##### References
[[identity]]