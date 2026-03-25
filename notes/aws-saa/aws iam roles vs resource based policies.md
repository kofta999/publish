2026-03-24 12:00
Tags: #cloud/aws/iam 
##### Content
For the SAA-C03 exam, the choice between these two methods for cross-account access depends on whether you need to **switch identities** or **keep existing permissions**.

#### 1. Identity Switch (IAM Role)
When a user in Account A assumes a role in Account B:
* **Permission Swap:** They give up their original Account A permissions and take on the permissions of the role in Account B.
* **Session-Based:** They receive temporary security credentials.
* **Use Case:** Best when you want strict isolation or when a service doesn't support resource-based policies.
* **Limitation:** You cannot access resources in both accounts simultaneously (unless you use role chaining, which is complex).

#### 2. Identity Preservation (Resource-Based Policy)
When Account B attaches a policy directly to a resource (e.g., S3 Bucket Policy) allowing Account A:
* **Permission Add:** The user in Account A stays "themselves." They keep their Account A permissions while gaining access to the specific resource in Account B.
* **Simultaneous Access:** Ideal for tasks like `s3 cp s3://bucket-account-a/file s3://bucket-account-b/` where you need access to both sides at once.
* **Supported Services:** S3, SNS, SQS, Lambda, KMS, and CloudWatch Logs.

##### References
