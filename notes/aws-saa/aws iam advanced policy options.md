2026-03-24 11:57
Tags: #cloud/aws/iam 
##### Content
When designing secure Cloud Architectures, understanding how to transition from basic "Allow/Deny" to identity-based and attribute-based access control (ABAC) is essential.

#### 1. Common IAM Condition Keys
Conditions allow you to add fine-grained logic to your policies, making them active only when specific criteria are met.

* **`aws:SourceIp`**: Restricts the client IP address from which the API call originates. 
    * *Use Case:* Ensure that sensitive administrative actions (like deleting a database) can only be performed from your corporate office's static IP.
* **`aws:RequestedRegion`**: Restricts which AWS Regions the API calls can target.
    * *Use Case:* Compliance requirements that mandate data and infrastructure must stay within a specific geographic boundary (e.g., `eu-central-1`).
* **`aws:MultiFactorAuthPresent`**: A boolean check to verify if the user has authenticated with MFA.
    * *Use Case:* Enforce "MFA-protected API access" for high-privilege actions like `iam:DeactivateMFADevice`.
* **`ec2:ResourceTag`**: Filters access based on tags attached to the resource (ABAC).
    * *Use Case:* Allow a developer to stop an EC2 instance only if the instance has a tag `Project: Alpha`.


#### 2. IAM for Amazon S3: Bucket vs. Object Level
A common point of confusion in the SAA-C03 exam is applying permissions to the wrong Resource ARN.

* **Bucket-Level Permissions:** These apply to the container itself.
    * **Permission:** `s3:ListBucket`, `s3:GetBucketLocation`.
    * **Resource ARN:** `arn:aws:s3:::my-bucket-name` (No trailing slash or wildcard).
* **Object-Level Permissions:** These apply to the files inside the bucket.
    * **Permission:** `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject`.
    * **Resource ARN:** `arn:aws:s3:::my-bucket-name/*` (Requires the wildcard to represent the objects).


#### 3. Scaling Security: `aws:PrincipalOrgID`
As you manage more accounts within **AWS Organizations**, writing Resource Policies (like S3 Bucket Policies or KMS Key Policies) for every individual account ID becomes unscalable.

* **The Solution:** Use the `aws:PrincipalOrgID` condition key in your **Resource-Based Policy**.
* **How it works:** Instead of listing 50 Account IDs in the `Principal` element, you specify your Organization ID in the `Condition` block.
* **Result:** Any user or role from *any* account that is a member of your Organization is automatically granted access, while external accounts are blocked.

### SAA Exam "Scenario" Table

| If the requirement is...                                                  | Use This Condition / Resource Policy:                                             |
| :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| "Only allow S3 uploads if the user is using MFA."                         | `Condition`: `{ "Bool": { "aws:MultiFactorAuthPresent": "true" } }`               |
| "Grant an entire AWS Organization access to a central S3 bucket."         | `Condition`: `{ "StringEquals": { "aws:PrincipalOrgID": "o-xxxxxxxxxx" } }`       |
| "Prevent developers from launching EC2 instances outside of 'us-east-1'." | `Condition`: `{ "StringNotEquals": { "aws:RequestedRegion": "us-east-1" } }`      |
| "Allow users to manage only the EC2 instances they 'own'."                | `Condition`: `{ "StringEquals": { "ec2:ResourceTag/Owner": "${aws:username}" } }` |
| "Restrict access to an API Gateway to a specific corporate CIDR."         | `Condition`: `{ "IpAddress": { "aws:SourceIp": "203.0.113.0/24" } }`              |

##### References
