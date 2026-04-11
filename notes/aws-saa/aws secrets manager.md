2026-03-24 13:45
Tags: #cloud/aws/security 
##### Content
AWS Secrets Manager is a modern, purpose-built service for managing, rotating, and retrieving sensitive credentials throughout their lifecycle. While similar to SSM Parameter Store, it is more feature-rich and specifically designed for high-security environments and disaster recovery.

#### 1. Core Features
* **Automatic Rotation:** The "killer feature." It can rotate secrets on a schedule (e.g., every 30 days) without any application downtime.
    * **Native Integration:** Supports **Amazon RDS** (Aurora, MySQL, PostgreSQL), **Redshift**, and **DocumentDB** out of the box.
    * **Custom Rotation:** For other services (like 3rd-party API keys), you can trigger an **AWS Lambda** function to handle the rotation logic.
* **Security:** Secrets are **mandatory encrypted** using AWS KMS. You can use the default `aws/secretsmanager` key or your own Customer Managed Key (CMK).
* **Random Password Generation:** Can automatically generate complex, cryptographically secure passwords during creation or rotation.

#### 2. Multi-Region Secrets
This is a critical capability for **Disaster Recovery (DR)** and global applications.
* **Replication:** You can designate a **Primary Secret** in one region and replicate it to multiple **Secondary Regions**.
* **Syncing:** Secrets Manager automatically keeps all replicas in sync with the primary. If you update or rotate the secret in the primary region, the change propagates globally.
* **Read Replicas:** Applications in secondary regions can read the local replica to reduce latency and avoid cross-region dependencies.
* **Promotion:** In a disaster scenario, you can **promote** a replica secret to become a standalone primary secret.

#### 3. Comparison: Secrets Manager vs. SSM Parameter Store
This is a high-probability "Decision" topic for the SAA-C03 exam.

| Feature              | AWS Secrets Manager                     | SSM Parameter Store               |
| :------------------- | :-------------------------------------- | :-------------------------------- |
| **Primary Use Case** | Sensitive secrets (Passwords, API Keys) | Configuration and simple secrets  |
| **Cost**             | **$0.40 per secret / month**            | **Free** (Standard tier)          |
| **Rotation**         | **Automatic & Native** (for RDS, etc.)  | Manual or custom via Lambda       |
| **Multi-Region**     | **Native Replication**                  | Manual / Custom logic required    |
| **Cross-Account**    | Supported via Resource-based Policies   | Not supported (Standard)          |
| **Max Size**         | 64 KB                                   | 4 KB (Standard) / 8 KB (Advanced) |

### SAA Exam "Scenario" Table

| If the requirement is...                                         | Use This Service:                         |
| :--------------------------------------------------------------- | :---------------------------------------- |
| "Rotate RDS database passwords every 30 days automatically."     | **AWS Secrets Manager**                   |
| "Store a common API key across 3 different AWS regions for DR."  | **AWS Secrets Manager (Multi-Region)**    |
| "Store 5,000 non-sensitive environment variables for free."      | **SSM Parameter Store (Standard)**        |
| "Grant another AWS account access to a specific secret."         | **AWS Secrets Manager (Resource Policy)** |
| "Generate a new random password every time a secret is rotated." | **AWS Secrets Manager**                   |

##### References
