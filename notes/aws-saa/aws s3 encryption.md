2026-03-20 10:44
Tags: #cloud/aws/storage
##### Content
#### 1. Server-Side Encryption (SSE)
Data is encrypted *after* it reaches S3 and decrypted *before* it is sent back to you.

| Method      | Key Managed By | Key Owned By | Exam Context / "Keywords"                                                                             |
| :---------- | :------------- | :----------- | :---------------------------------------------------------------------------------------------------- |
| **SSE-S3**  | AWS            | AWS          | **Enabled by default**. Uses AES-256. Header: `"x-amz-server-side-encryption": "AES256"`.             |
| **SSE-KMS** | AWS KMS        | User/AWS     | **Audit trail** (CloudTrail) + **User Control**. Header: `"x-amz-server-side-encryption": "aws:kms"`. |
| **SSE-C**   | **Customer**   | Customer     | Key provided in HTTP header. **S3 does NOT store the key**. HTTPS is mandatory.                       |

> **CRITICAL SAA NOTE: SSE-KMS Throttling**
> When uploading/downloading with SSE-KMS, you hit **KMS API quotas** (`GenerateDataKey` / `Decrypt`). These quotas are region-specific (e.g., 5,500–30,000 req/s). If your S3 throughput is very high, you may need a **KMS Quota Increase**.

---

#### 2. Client-Side Encryption
* **Process:** You encrypt data **locally** before uploading it to S3.
* **Key Management:** Fully managed by you. AWS never sees the unencrypted data or the keys.
* **Tooling:** Typically uses the **Amazon S3 Client-Side Encryption Library**.

---

#### 3. Encryption in Transit (SSL/TLS)
* **Endpoints:** S3 provides both HTTP (insecure) and HTTPS (secure).
* **Requirement:** **HTTPS is mandatory for SSE-C**.
* **Enforcement:** Use a **Bucket Policy** with a condition `"aws:SecureTransport": "false"` and an `Effect: Deny` to block all non-HTTPS traffic.

---

#### 4. Default Encryption vs. Bucket Policies
* **Default Encryption:** Automatically applies SSE-S3 (or SSE-KMS if configured) to objects if no encryption header is provided in the `PUT` request.
* **Bucket Policies:** Used to **Enforce** specific encryption. 
    * *Example:* Reject any `PUT` request that doesn't use SSE-KMS.
* **Precedence:** **Bucket Policies are evaluated BEFORE Default Encryption.** If a policy denies unencrypted uploads, the request fails even if Default Encryption is turned on.

---
#### SAA Summary Table: Choosing the Method

| If the requirement says...                           | Use this:                  |
| :--------------------------------------------------- | :------------------------- |
| "Low overhead, no cost, default security"            | **SSE-S3**                 |
| "Must have audit trail for key usage"                | **SSE-KMS**                |
| "Must manage keys but don't want to encrypt locally" | **SSE-C**                  |
| "AWS must never see the unencrypted data"            | **Client-Side Encryption** |
##### References
