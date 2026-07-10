2026-03-16 15:14
Tags: #cloud/aws/storage 
##### Content
Amazon S3 security follows a "Least Privilege" model using a combination of IAM policies and S3-specific resource policies. Understanding how these intersect is critical for preventing data leaks.

#### 1. The Access Evaluation Logic
An IAM principal (User or Role) can access an S3 object only if:
* **The IAM Policy ALLOWS it** OR **The Bucket Policy ALLOWS it**.
* **AND** there is no **Explicit DENY** in any applicable policy. (An explicit deny always overrides any allow).

#### 2. Resource-Based Policies
* **Bucket Policies:** JSON-based rules defined at the bucket level.
	* **Cross-Account Access:** Unlike IAM policies, bucket policies can grant access to users in *different* AWS accounts.
	* **Enforcement:** Useful for forcing encryption on uploads or restricting access to specific IP ranges or VPC Endpoints.
* **Access Control Lists (ACLs):** A legacy feature for fine-grained object-level access.
	* **Modern Best Practice:** AWS now recommends **disabling ACLs** and using Bucket Policies for 99% of use cases to simplify security management.

#### 3. S3 Bucket Policy Components
Bucket policies are written in JSON and consist of several key elements:
* **Effect:** `Allow` or `Deny`.
* **Principal:** The user, account, or service the policy applies to.
* **Action:** The specific S3 API calls (e.g., `s3:GetObject`, `s3:PutObject`).
* **Resource:** The ARN of the bucket or the objects inside (e.g., `arn:aws:s3:::my-bucket/*`).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}

```

#### 4. Block Public Access
This is a critical "safety switch" designed to prevent accidental data exposure.
* **Function:** It provides a centralized way to override any bucket policy or ACL that would allow public access.
* **Account Level:** Can be enabled for an entire AWS account to ensure no one accidentally creates a public bucket, regardless of the individual bucket settings.
* **Recommendation:** Keep all four Block Public Access settings **ON** unless you are explicitly hosting a public website.

##### References
