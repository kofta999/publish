2026-03-24 13:24
Tags: #cloud/aws/security 
##### Content
KMS Multi-Region Keys are a specialized set of keys across different AWS Regions that are **cryptographically interchangeable**. They share the same Key ID and key material, allowing you to encrypt data in one Region and decrypt it in another without re-encrypting or making cross-Region API calls.

#### 1. Core Properties
* **Interchangeable:** Primary and Replica keys share the same Key ID (prefixed with `mrk-`), key material, and automatic rotation.
* **Independent Management:** While the key material is shared, each key is a separate resource. You manage its **Key Policy**, **Aliases**, **Tags**, and **Grants** independently in each Region.
* **Not "Global":** Unlike a Global Table, AWS does not automatically create replicas. You must explicitly create a Primary key and then "replicate" it to your desired Regions.
* **No Conversion:** You cannot convert an existing single-Region key into a Multi-Region key.

#### 2. DynamoDB Global Tables + Client-Side Encryption
When using **DynamoDB Global Tables**, AWS automatically replicates your data at rest. However, if you need to protect sensitive fields (like PII) even from database administrators or AWS, you use **Client-Side Encryption**.

* **The Problem:** Traditionally, client-side encryption used a single-Region key. If data was replicated from `us-east-1` to `ap-southeast-2`, the client in the second region would have to make a high-latency cross-region call back to `us-east-1` to decrypt it.
* **The Solution:** Use **KMS Multi-Region Keys** with the **DynamoDB Encryption Client**.
    1.  **Encrypt:** Client in `us-east-1` encrypts an attribute using the Primary MRK.
    2.  **Replicate:** DynamoDB replicates the encrypted ciphertext to `ap-southeast-2`.
    3.  **Decrypt:** Client in `ap-southeast-2` uses the local **Replica MRK** to decrypt the data.
* **Benefit:** Ultra-low latency decryption in every region and enhanced security (data is never plaintext in the database).


#### 3. Aurora Global Database + Client-Side Encryption
Similar to DynamoDB, **Amazon Aurora Global Databases** can use the **AWS Encryption SDK** and MRKs to protect specific columns.

* **Workflow:**
    1.  The application uses the **AWS Encryption SDK** to encrypt a specific database column (e.g., `credit_card_number`) using a Multi-Region Key.
    2.  The encrypted value is stored in the Aurora primary cluster.
    3.  Aurora replicates the encrypted data to secondary regions via its storage-level replication.
    4.  Applications in the secondary region query the database and decrypt the column using their local **Replica MRK**.
* **Use Case:** Compliance (e.g., PCI-DSS or HIPAA) where you must ensure that even a DBA with full access to the database cluster cannot read sensitive plaintext data.


### SAA Exam "Scenario" Table

| If the requirement is...                                                  | Use This Strategy:                                                     |
| :------------------------------------------------------------------------ | :--------------------------------------------------------------------- |
| "Decrypt data in a secondary region without cross-region API latency."    | **KMS Multi-Region Keys**                                              |
| "Ensure sensitive DynamoDB attributes are encrypted before reaching AWS." | **DynamoDB Encryption Client (Client-Side)**                           |
| "Maintain a single Key ID across regions for global application code."    | **KMS Multi-Region Keys (MRK)**                                        |
| "Replicate encrypted S3 objects to a different region."                   | **KMS Single-Region Keys + S3 Cross-Region Replication (Re-encrypts)** |
| "Protect specific RDS columns from being read by DB Administrators."      | **AWS Encryption SDK + Multi-Region Keys**                             |
##### References
