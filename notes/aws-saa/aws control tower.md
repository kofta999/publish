2026-03-24 12:05
Tags: #cloud/aws/iam 
##### Content
AWS Control Tower sits at the highest level of multi-account orchestration. While **AWS Organizations** provides the underlying structure, **Control Tower** provides the "blueprints" and "governance" to set up a landing zone based on AWS best practices in just a few clicks.

#### 1. Core Concepts & Landing Zone
* **Landing Zone:** A well-architected, multi-account environment that is the output of setting up Control Tower. It automatically configures:
    * A **Management Account** for billing and organization management.
    * A **Log Archive Account** to centralize all CloudTrail and Config logs.
    * An **Audit (Security) Account** for security notifications and cross-account read/write access.
* **Account Factory:** A standardized way to "vending machine" new AWS accounts that are pre-configured with the correct VPCs, IAM roles, and guardrails.

#### 2. Guardrails: The Governance Engine
Guardrails are pre-packaged governance rules that you apply to your Organizational Units (OUs). They come in two primary flavors:

| Type           | Technology Used                    | Action                                                                                  | Example                                                     |
| :------------- | :--------------------------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **Preventive** | **Service Control Policies (SCP)** | **Disallows** actions. It prevents the policy violation from ever happening.            | "Disallow changes to log archive settings."                 |
| **Detective**  | **AWS Config Rules**               | **Monitors** and alerts. It identifies resources that have already bypassed a standard. | "Identify if any EBS volumes are unencrypted."              |
| **Proactive**  | **CloudFormation Hooks**           | **Validates** before deployment. It checks resources during the provisioning phase.     | "Check if S3 buckets have logging enabled before creation." |


![[Pasted image 20260324120545.png]]

---

#### 3. Operational Visibility
Control Tower provides a **Dashboard** that gives you a bird's-eye view of your entire organization's compliance. 
* It highlights which accounts are under governance.
* It shows which guardrails are enabled and which resources are currently non-compliant.
* It integrates with **AWS Service Catalog** to allow end-users to provision pre-approved resources.

---

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Feature: |
| :--- | :--- |
| "Quickly set up a multi-account environment following AWS best practices." | **AWS Control Tower (Landing Zone)** |
| "Ensure that no account in the organization can disable CloudTrail." | **Preventive Guardrail (SCP)** |
| "Get a weekly report of all RDS databases that do not have backups enabled." | **Detective Guardrail (AWS Config)** |
| "Standardize how new AWS accounts are created with a VPC and baseline security." | **Account Factory** |
| "Centralize all API logs from 100 accounts for a security audit." | **Log Archive Account (setup by Control Tower)** |

---

### Summary: Control Tower vs. Organizations
* **AWS Organizations:** The underlying service used to group accounts and apply SCPs manually.
* **AWS Control Tower:** A managed "wrapper" that automates the creation of the Organization, OUs, accounts, and policies using a simplified UI and pre-built best practices.


##### References
