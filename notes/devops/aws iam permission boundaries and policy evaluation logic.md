2026-03-24 12:01
Tags: #cloud/aws/iam 
##### Content
Permission Boundaries are a "ceiling" for permissions. They do **not grant** access but define the **maximum** permissions an IAM entity can have.

* **Target:** Only for **Users** and **Roles** (not Groups).
* **Evaluation Logic:** An action is only allowed if it is permitted by **both** the Identity-based policy **and** the Permission Boundary.
* **Primary Use Case:** **Delegated Administration.** 
	* *Example:* You want to allow a Developer to create IAM roles for Lambda functions. To prevent them from creating an "Admin" role (Privilege Escalation), you force them to attach a specific Permission Boundary to any role they create.

---
### IAM Policy Evaluation Logic
When an API request is made, AWS follows a strict "Default Deny" workflow to decide the outcome.

1.  **Explicit Deny:** If *any* applicable policy (SCP, Boundary, Identity, or Resource) has a `Deny`, the request is immediately denied. **Deny always wins.**
2.  **Organizations SCP:** If an SCP exists, it must allow the action.
3.  **Resource-Based Policy:** If the resource has a policy allowing the action, it might result in an `Allow` (unless a Boundary or SCP denies it).
4.  **Permission Boundary:** If present, the action must be within the boundary's allowed scope.
5.  **Session Policy:** (Only for assumed roles) Must allow the action.
6.  **Identity-Based Policy:** Finally, the user/role’s own policy must allow the action.
7.  **Implicit Deny:** If no policy explicitly grants an `Allow`, the request is denied by default.

![[Pasted image 20260324120149.png]]
##### References
