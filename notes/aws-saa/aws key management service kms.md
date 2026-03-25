2026-03-24 13:23
Tags: #cloud/aws/security 
##### Content
AWS KMS is a managed service that makes it easy for you to create and control the cryptographic keys used to protect your data. It uses Hardware Security Modules (HSMs) to protect the security of your keys and is integrated with most AWS services.

#### Core Concepts and Integration
* **Centralized Control:** Manage keys and policies from a single location.
* **Service Integration:** Automatically encrypts data in EBS volumes, S3 buckets (SSE-KMS), RDS databases, and Lambda environment variables.
* **Auditability:** Every use of a key is logged in **AWS CloudTrail**, allowing you to see who used which key, for which resource, and when.
* **Security Principle:** Never store plaintext secrets in your source code; instead, store the encrypted string and decrypt it at runtime via the KMS API.

#### KMS Key Types
KMS keys (formerly Customer Master Keys) come in two main mathematical flavors:

* **Symmetric Keys:**
    * A single 256-bit key used for both encryption and decryption.
    * The unencrypted key never leaves AWS KMS.
    * Used by all AWS services integrated with KMS.
* **Asymmetric Keys:**
    * Consists of a Public key (for encryption/verification) and a Private key (for decryption/signing).
    * You can download the Public key to encrypt data outside of AWS, but the Private key stays in KMS.
    * Commonly used for digital signatures.

#### Key Ownership and Costs
The cost and management overhead depend on who "owns" the key:

| Key Category | Management | Cost | Rotation |
| :--- | :--- | :--- | :--- |
| **AWS Owned Key** | Managed by AWS (used by SSE-S3/DDB) | **Free** | Managed by AWS |
| **AWS Managed Key** | Created for you (e.g., `aws/ebs`) | **Free** | Every 1 year (Automatic) |
| **Customer Managed** | Created by you in KMS | **$1/month** | Every 1 year (Optional) |
| **Imported Key** | Your own key material imported | **$1/month** | **Manual only** |

#### KMS Key Policies
You cannot access a KMS key without a policy. They function similarly to S3 Bucket Policies but are mandatory for KMS.
* **Default Policy:** If not specified, KMS gives the **Root user** (the whole account) full access to the key.
* **Custom Policy:** Used to define specific "Key Users" (who can encrypt/decrypt) and "Key Administrators" (who can schedule deletion or change policies).
* **Cross-Account Access:** You must edit the Key Policy in the source account to allow the target account ID to use the key.

#### Cross-Account and Cross-Region Operations
Copying encrypted data across boundaries requires a "Decrypt-then-Re-encrypt" workflow.

* **Snapshots:** To copy an encrypted EBS snapshot to another region or account:
    1.  Decrypt it using the Source Key.
    2.  Re-encrypt it using a Target Key in the destination.
* **AMI Sharing:** To launch an EC2 from a shared encrypted AMI:
    1.  The source account must grant "Launch Permissions" to the target.
    2.  The source KMS key policy must allow the target account to `Decrypt` and `CreateGrant`.
* **S3 Replication:** By default, KMS-encrypted objects are **not** replicated. You must enable the option, provide a target KMS key, and ensure the IAM Role has `kms:Decrypt` (source) and `kms:Encrypt` (target) permissions.

#### SAA Exam Scenario Table

| Requirement                                                    | Use This Feature/Service:                                 |
| :------------------------------------------------------------- | :-------------------------------------------------------- |
| "Encrypt a 4TB EBS volume with minimal management."            | **AWS Managed Key (`aws/ebs`)**                           |
| "Rotate encryption keys every 3 months for compliance."        | **Customer Managed Key (Manual Rotation)**                |
| "Allow an external user without AWS access to encrypt a file." | **Asymmetric KMS Key (Public Key)**                       |
| "Audit who decrypted a specific file in an S3 bucket."         | **CloudTrail + KMS Logs**                                 |
| "Share an encrypted snapshot with a partner's AWS account."    | **Custom KMS Key Policy (Granting cross-account access)** |
##### References
