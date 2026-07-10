2026-03-20 10:49
Tags: #cloud/aws/storage 
##### Content
#### 1. S3 Access Logs
Access logs provide detailed records for requests made to a bucket. This is critical for security audits and tracking data usage.

* **Function:** Logs every request (GET, PUT, DELETE, etc.), whether it was **Authorized or Denied**, from any AWS account.
* **Destination:** Logs are saved as objects in a **target S3 bucket**.
* **Regional Requirement:** The target logging bucket **must be in the same AWS Region** as the source bucket.
* **Analysis:** Common SAA scenarios involve using **Amazon Athena** to query these logs directly from S3 using SQL.

> **⚠️ CRITICAL WARNING:** Never set the target logging bucket to be the same as the source bucket. This creates a **logging loop** (the act of writing a log creates a new log entry), causing exponential storage growth and massive costs.


---
#### 2. S3 Pre-Signed URLs
Pre-signed URLs grant temporary access to users who otherwise do not have permissions to access your S3 objects.

* **How it Works:** The URL is "signed" with the credentials of an IAM user or role. Anyone with the link inherits those specific permissions (GET to download, PUT to upload) until the link expires.
* **Expiration Limits:**
    * **S3 Console:** 1 minute up to **12 hours** (720 mins).
    * **AWS CLI/SDK:** Up to **168 hours** (7 days).
* **Use Cases:**
    * **Premium Content:** Letting a logged-in user download a specific video for the next 30 minutes.
    * **Temporary Uploads:** Allowing a user to upload a profile picture directly to a specific S3 path without giving them AWS credentials.


---

#### SAA Exam "Comparison" Table

| Feature             | Best For...                                                       | Key Constraint                                |
| :------------------ | :---------------------------------------------------------------- | :-------------------------------------------- |
| **S3 Access Logs**  | **Auditing** and Compliance.                                      | Target bucket must be in the **same region**. |
| **CloudTrail Logs** | Tracking **API-level** changes (Bucket creation, policy updates). | Logged at the account level.                  |
| **Pre-Signed URLs** | **Temporary access** for unauthenticated users.                   | Inherits permissions of the **signer**.       |

##### References
