2025-12-23 20:45
Tags: #cloud/azure 
##### Content
### Azure Policy
- Purpose: Enforces "What" can be done (e.g., "Only allow 'Small' VM sizes" or "Require a 'Department' tag").
- Evaluation: Every request to create or update a resource passes through Policy via ARM. Existing resources are also evaluated for compliance.
- **Exam Trap:** "Audit then Enforce." The best practice is to set a policy to 'Audit' first to see the impact before changing the effect to 'Deny' or 'Remediate'.

### Policy Resources

![[Pasted image 20251223210557.png|600]]

### 1. Definitions and Initiatives
- **Policy Definitions:** Describe specific resource compliance conditions and the effect (e.g., Deny, Audit).
- **Initiatives (Policy Sets):** A group of policy definitions managed as a single unit. 
- **Built-in vs. Custom:** Built-ins are provided by Azure (e.g., "NIST 800-53"); Custom policies are JSON-based rules written by users to meet unique needs.
- **Exam Trap:** The **Definition Location** (Management Group or Subscription) determines the maximum scope where that policy can be assigned.

### 2. Assignments and Scopes
- **Scope:** Can be applied at Management Group, Subscription, or Resource Group levels.
- **Enforcement Mode:** Can be set to "Disabled." This is used for "What-if" testing—it evaluates compliance and shows results without actually blocking any resource creation (similar to an Audit effect but set at the assignment level).
- **Exclusion:** Specified during assignment to prevent the policy from applying to specific child containers or resources.

### 3. Exemptions vs. Attestations
- **Exemptions:** Used to exempt a specific resource from evaluation *after* a policy has been assigned.
    - **Mitigated:** Intent is met through another method.
    - **Waiver:** Non-compliance is temporarily accepted.
- **Attestations:** Used for **Manual Policies**. Since Azure can't automatically "scan" a manual process (like a physical security check), an admin must "attest" (confirm) the compliance state.

### 4. Remediation Tasks
- **Automatic:** New resources are automatically remediated by `deployIfNotExists` or `modify` policies.
- **Manual Remediation:** For existing resources that were non-compliant *before* the policy was assigned, you must manually trigger a **Remediation Task**.
- **Managed Identity:** To perform remediation, the policy assignment requires a **Managed Identity** (System or User-assigned) with the necessary RBAC permissions to modify the target resources.

### Admin Specifics: Exam Traps
- **Exclusion vs. Exemption:** An **Exclusion** is built into the assignment (preventing evaluation entirely), while an **Exemption** is a child object created on a resource to waive it from an existing assignment.
- **Non-compliance Messages:** You can define custom "user-friendly" messages that appear when a user's deployment is blocked by a policy.

### Policy Effects
- Deny: Blocks the resource creation.
- Audit: Allows creation but flags it as "Non-compliant."
- Append: Adds fields to the resource during creation (e.g., adding a default tag).
- DeployIfNotExist: Deploys a sub-resource (like a monitoring agent) if it is missing.

##### References
[[governance]]