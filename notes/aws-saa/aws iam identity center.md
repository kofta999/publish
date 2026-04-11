2026-03-24 12:02
Tags: #cloud/aws/iam 
##### Content
AWS IAM Identity Center (Successor to AWS SSO) is the modern standard for managing workforce identities. Unlike standard IAM (which is per-account), Identity Center works at the **AWS Organization** level to provide a single login portal for all your accounts and cloud applications.

#### 1. Core Identity Strategy
Identity Center separates the "identity" (who you are) from the "permissions" (what you can do).
* **Identity Source:** You can manage users directly in the **Identity Center Store** or connect an external provider like **Okta, Microsoft Entra ID (Azure AD), or Google Workspace**.
* **AWS Access Portal:** Users get a single, customized URL where they log in once and see a dashboard of all assigned AWS accounts and roles.

#### 2. Multi-Account Permissions (Permission Sets)
In standard IAM, you would have to manually create roles in every account. In Identity Center, you use **Permission Sets**.
* **Definition:** A Permission Set is a template that includes IAM policies (AWS Managed or Custom).
* **Automation:** When you assign a Permission Set to a user for a specific account, Identity Center **automatically creates the corresponding IAM Role** in that target account.
* **Groups:** Best practice is to assign permissions to **Groups** rather than individuals to simplify management as your team grows.

#### 3. Attribute-Based Access Control (ABAC)
ABAC is a powerful scaling strategy that uses user attributes (e.g., `CostCenter`, `Project`, `Title`) to determine access.
* **Mechanism:** You define a single Permission Set that allows access *only if* the user's attribute matches the resource's tag.
* **Benefit:** You don't need to create new roles when a new project starts. If a user is moved to "Project Blue" in your corporate directory, their AWS access automatically shifts to "Project Blue" resources without any policy changes in AWS.

---

### SAA Exam "Scenario" Table

| If the requirement is...                                                 | Use This Identity Center Feature:                     |
| :----------------------------------------------------------------------- | :---------------------------------------------------- |
| "Provide a single login for 50+ AWS accounts."                           | **AWS Access Portal**                                 |
| "Enforce a 'Read Only' policy across all development accounts."          | **Permission Sets (Applied to the 'Development' OU)** |
| "Allow users to log in using their existing corporate Active Directory." | **Active Directory Connector / External IdP**         |
| "Automatically grant access based on a user's department attribute."     | **Attribute-Based Access Control (ABAC)**             |
| "Provide SSO access to 3rd-party apps like Salesforce or Slack."         | **Application Assignments (SAML 2.0)**                |

---

### Comparison: IAM Users vs. Identity Center
* **IAM Users:** Legacy approach. Best for programmatic access keys or small, single-account setups.
* **IAM Identity Center:** Recommended for **human users**. It provides short-lived temporary credentials, central management, and a better user experience.

##### References
