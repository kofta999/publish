2026-03-24 13:43
Tags: #cloud/aws/security 
##### Content
AWS Systems Manager (SSM) Parameter Store provides secure, hierarchical storage for configuration data management and secrets management. You can store data such as passwords, database strings, and license codes as parameter values.

#### 1. Core Concept & Usage
* **Hierarchical Storage:** Organize parameters in a tree structure (e.g., `/dev/db/password` vs `/prod/db/password`). This allows you to manage permissions at the folder level.
* **Plaintext vs. Secrets:**
    * **String / StringList:** For non-sensitive data like URLs or AMI IDs.
    * **SecureString:** Encrypted using **AWS KMS**. Access requires both `ssm:GetParameter` and `kms:Decrypt` permissions.
* **Integrations:** Reference parameters directly in **CloudFormation**, **ECS Task Definitions**, or **Lambda** code.

#### 2. Standard vs. Advanced Tiers
You can choose a tier based on your scaling and feature needs.

| Feature                | Standard Tier               | Advanced Tier               |
| :--------------------- | :-------------------------- | :-------------------------- |
| **Parameter Limit**    | 10,000 per account/region   | 100,000 per account/region  |
| **Max Size**           | 4 KB                        | 8 KB                        |
| **Parameter Policies** | No                          | **Yes** (Expiration, TTL)   |
| **Cost**               | **Free**                    | $0.05 per parameter / month |
| **API Throughput**     | Standard (can be increased) | Higher throughput available |

#### 3. Parameter Policies (Advanced Tier Only)
These allow you to add "logic" to your parameters to ensure they are updated or audited regularly.
* **Expiration:** Automatically deletes the parameter at a specific date/time (useful for temporary passwords).
* **ExpirationNotification:** Triggers an **EventBridge** event when a parameter is about to expire, so your application can rotate it.
* **NoChangeNotification:** Alerts you if a parameter has *not* been modified for a set period (e.g., "This password hasn't been rotated in 90 days").

#### 4. Parameter Store vs. Secrets Manager
This is a high-probability exam topic for the SAA-C03.

* **Secrets Manager ($0.40/secret):** Best for credentials that need **automatic rotation** (RDS, Redshift) and cross-region replication.
* **Parameter Store (Free/Standard):** Best for simple configuration, feature flags, and secrets that you manage manually. 
* **Pro Tip:** You can reference a **Secrets Manager** secret *through* a Parameter Store path (e.g., `/aws/reference/secretsmanager/secret_ID`).

---

### SAA Exam "Scenario" Table

| If the requirement is...                                    | Use This Feature/Service:                    |
| :---------------------------------------------------------- | :------------------------------------------- |
| "Store application configuration like a DB URL for free."   | **SSM Parameter Store (Standard)**           |
| "Automatically delete a temporary API key after 24 hours."  | **SSM Parameter Policy (Expiration)**        |
| "Store a 6KB license file."                                 | **SSM Parameter Store (Advanced)**           |
| "Reference the latest Amazon Linux 2 AMI ID automatically." | **Public Parameter (`/aws/service/ami...`)** |
| "Rotate an RDS password every 30 days automatically."       | **AWS Secrets Manager**                      |

##### References
