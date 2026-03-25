2026-03-24 23:00
Tags: #cloud/aws/dr 
##### Content
AWS Backup is a fully managed service that allows you to centrally manage and automate backups across multiple AWS services, eliminating the need for custom scripts or manual backup processes.

#### Supported Services & Features
AWS Backup integrates with a wide variety of native AWS resources, including Amazon EC2/EBS, Amazon S3, Amazon RDS/Aurora, DynamoDB, DocumentDB, Neptune, EFS, FSx, and Storage Gateway (specifically Volume Gateway).

*   **Cross-Environment:** Supports both **cross-region** and **cross-account** backups.
*   **Tag-Based Policies:** You can automatically apply backup policies to resources based on their assigned tags.
*   **Recovery:** Supports Point-in-Time Recovery (PITR) for supported services.

#### Backup Plans
You define your backup strategy by creating **Backup Plans**. These plans control:
*   **Frequency & Window:** Run backups on-demand or on a schedule (e.g., every 12 hours, daily, weekly, or using cron expressions) within a defined backup window.
*   **Lifecycle Rules:** Automate the transition of backups to **Cold Storage** (after days, weeks, or months) to save costs.
*   **Retention Period:** Define exactly how long backups must be kept before being safely deleted.

#### AWS Backup Vault Lock
Backup Vault Lock adds an essential layer of security by enforcing a **WORM (Write Once Read Many)** state for all backups stored in the vault.
*   **Protection:** Defends against inadvertent deletions, malicious deletions (e.g., ransomware), and unauthorized updates that shorten retention periods.
*   **Immutability:** Once enabled, **even the AWS account root user cannot delete the backups**.

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Centrally automate scheduled backups across EC2, RDS, and EFS without writing custom scripts." | **AWS Backup** |
| "Ensure backup files cannot be altered or deleted by anyone, even a compromised root user account." | **AWS Backup Vault Lock (WORM state)** |
| "Automatically back up any new EC2 instance that is created with a specific tag." | **AWS Backup (Tag-based backup policies)** |
| "Automatically move older backups to cold storage after 30 days to reduce storage costs." | **AWS Backup Plans (Transition to Cold Storage)** |

##### References
