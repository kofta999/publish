2026-03-23 23:10
Tags: #cloud/aws/monitoring 
##### Content
CloudTrail is the "CCTV" of your AWS account. It records every API call made by any user or service, providing the **Who, What, Where, and When** of every action.

#### 1. CloudTrail Event Types
* **Management Events (Control Plane):** Enabled by default. These are operations on resources, such as creating an EC2 instance, attaching an IAM policy, or setting up a VPC subnet.
* **Data Events (Data Plane):** Disabled by default due to high volume. These track actions *within* a resource, such as **S3 object-level activity** (`PutObject`, `DeleteObject`) or **Lambda function executions**.
* **Insights Events:** Detects "unusual" API activity patterns (e.g., a sudden spike in `TerminateInstances` calls) by establishing a baseline of normal behavior and alerting on anomalies.

#### 2. Log Integrity & Security
For the SAA-C03 exam, knowing how to protect and verify your logs is vital:
* **Log File Integrity Validation:** Uses SHA-256 hashing and digital signatures to let you determine if a log file was **modified, deleted, or forged** after CloudTrail delivered it to S3.
* **Encryption:** Logs are encrypted by default using **SSE-S3**, but you can use **SSE-KMS** for more control (e.g., restricting who can decrypt the logs).
* **Multi-Account/Region:** You can create an "Organization Trail" to consolidate logs from all accounts in an AWS Organization into a single S3 bucket in a central "Logging" account.

---

### CloudTrail vs. EventBridge (Automation)
While CloudTrail *records* what happened, **EventBridge** is used to *react* to it in real-time.

| Tool            | Purpose                  | Use Case                                                     |
| :-------------- | :----------------------- | :----------------------------------------------------------- |
| **CloudTrail**  | **Auditing & Forensic**  | "Who deleted this database last Tuesday?"                    |
| **EventBridge** | **Real-Time Automation** | "Trigger a Lambda to re-enable MFA if someone turns it off." |

#### Intercepting API Calls
You can use **EventBridge** to "listen" for specific API calls recorded by CloudTrail.
1. A user calls `DeleteTable` in DynamoDB.
2. CloudTrail records the event.
3. EventBridge matches the event pattern.
4. EventBridge triggers a target (e.g., **SNS** to alert an admin or **Lambda** to stop the action).

---
### CloudTrail Lake
A relatively newer feature for the exam, **CloudTrail Lake** is a managed data store that allows you to run **SQL-based queries** on your activity logs without setting up Athena manually.
* **Retention:** Can store logs for up to **10 years** (immutably).
* **Simplicity:** One-stop shop for storing and querying logs across accounts and regions.

---

### SAA Exam "Scenario" Table

| If the requirement is...                                          | Use This Feature:                        |
| :---------------------------------------------------------------- | :--------------------------------------- |
| "Audit who changed a Security Group rule 2 months ago."           | **CloudTrail Management Events**         |
| "Detect if a user's API usage patterns suddenly become abnormal." | **CloudTrail Insights**                  |
| "Ensure that CloudTrail logs have not been tampered with in S3."  | **Log File Integrity Validation**        |
| "Monitor every time a specific secret is accessed in S3."         | **CloudTrail Data Events**               |
| "Keep audit logs for 7 years for regulatory compliance."          | **CloudTrail Lake** (or S3 with Glacier) |
| "Automatically notify an admin if an IAM user is created."        | **CloudTrail + EventBridge + SNS**       |

**Operational Tip:** Remember that CloudTrail stores the last **90 days** of management events in the console for free. To keep them longer, you **must** create a trail to send them to S3.

##### References
