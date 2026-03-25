2026-03-24 11:53
Tags: #cloud/aws/iam 
##### Content
AWS Organizations allows you to centrally manage and govern a multi-account environment. As a Cloud Architect, your focus should be on how to use **Service Control Policies (SCPs)** and **Tag Policies** to enforce guardrails across your entire fleet.

#### 1\. Service Control Policies (SCP)
SCPs are the "ultimate guardrails." They define the **maximum permissions** that any user or role (including the **Root user**) can have within a member account.

  * **Key Rule:** SCPs **do not grant** permissions. They only **filter** them. A user still needs an IAM policy to perform an action.
  * **Management Account Exception:** SCPs do **not** apply to the Management Account.
  * **Evaluation Logic:**
      * **FullAWSAccess:** By default, every entity has this attached (Allow-list strategy).
      * **Explicit Deny:** Always wins over any Allow.
      * **Implicit Deny:** If an action isn't allowed at *every* level of the hierarchy (Root $\rightarrow$ OU $\rightarrow$ Account), it is denied.

![[Pasted image 20260324115618.png]]

#### 2\. SCP Strategies: Allow-list vs. Block-list
For the SAA-C03 exam, you must know when to use each strategy to restrict account behavior.

| Strategy       | Mechanism                                                                | Best For...                                                                                           |
| :------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Block-list** | Keep `FullAWSAccess` and add `Deny` statements for specific services.    | Standard environments where you only want to block high-risk actions (e.g., "Deny S3 public access"). |
| **Allow-list** | Remove `FullAWSAccess` and explicitly `Allow` only a subset of services. | High-security or "Sandbox" environments where you want to strictly control costs or scope.            |

#### 3\. Tag Policies & Standardization
Tag Policies ensure that resources across your organization follow a consistent tagging schema, which is vital for **Cost Allocation** and **ABAC** (Attribute-Based Access Control).

  * **Enforcement:** You define the required **Tag Key** and allowed **Tag Values** (e.g., `Environment` must be `Prod`, `Dev`, or `Test`).
  * **Non-Compliance:** By default, tag policies only report non-compliance. However, you can enable **Enforcement** to prevent users from creating or modifying resources with non-compliant tags.
  * **Note:** Tag policies do **not** force a tag to exist; they only ensure that *if* a tag is present, it is correct. Use **SCPs** to mandate that a tag *must* be present during resource creation.

![[Pasted image 20260324115554.png|302]]

#### 4\. Practical Multi-Account Advantages

  * **Consolidated Billing:** One bill for all accounts with volume discounts (e.g., S3 storage pricing is calculated based on the *total* data across all accounts).
  * **Discount Sharing:** Reserved Instances (RIs) and Savings Plans purchased in one account can be applied to workloads in any other account within the organization.
  * **Centralized Logging:** Use an SCP to prevent member accounts from disabling CloudTrail and send all logs to a central, hardened "Logging Account."

### SAA Exam "Scenario" Table

| If the requirement is...                                            | Use This Organization Feature:                                       |
| :------------------------------------------------------------------ | :------------------------------------------------------------------- |
| "Prevent all member accounts from using the `us-west-1` region."    | **SCP (Deny with Condition: StringNotEquals `aws:RequestedRegion`)** |
| "Ensure all resources are tagged with a standard 'CostCenter' key." | **Tag Policy + SCP (for mandatory presence)**                        |
| "Combine the usage of 50 accounts to lower the S3 unit cost."       | **Consolidated Billing**                                             |
| "Restrict a member account's Root user from deleting an S3 bucket." | **SCP (Deny `s3:DeleteBucket`)**                                     |
| "Automate the creation of a new AWS account for every new project." | **Organizations API (`CreateAccount`)**                              |
##### References
