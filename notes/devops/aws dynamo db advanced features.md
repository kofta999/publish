2026-03-22 13:05
Tags: #cloud/aws/databases 
##### Content
#### 1. Stream Processing (Reacting to Changes)
DynamoDB can capture every time an item is created, updated, or deleted. You can use these streams to trigger downstream processes like sending a welcome email or updating a search index.

| Feature       | **DynamoDB Streams**                 | **Kinesis Data Streams** (Newer)                |
| :------------ | :----------------------------------- | :---------------------------------------------- |
| **Retention** | 24 hours                             | Up to **1 year**                                |
| **Consumers** | Limited (up to 2 simultaneous)       | High (up to 20+ with enhanced fan-out)          |
| **Use Case**  | Simple Lambda triggers, replication. | Massive analytics, long-term storage, Firehose. |

![[Pasted image 20260322130529.png]]

#### 2. DynamoDB Global Tables
Global Tables provide a **fully managed, multi-region, multi-active** database.
* **Mechanism:** Uses **DynamoDB Streams** to replicate data across regions automatically.
* **Latency:** Provides local read/write performance (single-digit ms) for globally distributed users.
* **Active-Active:** Applications can write to the table in *any* participant region, and changes are propagated to all other regions.

#### 3. Time To Live (TTL)
TTL allows you to define a specific timestamp attribute (in **Epoch time**) that tells DynamoDB when an item is no longer needed.
* **Benefit:** Items are deleted automatically at no extra cost and **without consuming Write Capacity Units (WCU)**.
* **Use Cases:** Expiring session tokens, removing old logs, or adhering to data retention regulations (GDPR).

#### 4. Backup & Disaster Recovery
* **Point-in-Time Recovery (PITR):** Provides continuous backups for the last **35 days**. Protects against accidental deletes or writes.
* **On-Demand Backups:** Manual full backups for long-term retention. Integrated with **AWS Backup** for cross-account and cross-region copies.
* **Important:** Restoring from any backup always **creates a new table**.

#### 5. S3 Integration (Import/Export)
This allows you to move data between S3 and DynamoDB without writing custom migration code or impacting table performance.
* **Export to S3:** Requires **PITR** to be enabled. It does not consume Read Capacity (RCU), making it perfect for running heavy analytics with **Amazon Athena** on your DynamoDB data.
* **Import from S3:** Supports CSV, JSON, and ION. **Does not consume Write Capacity (WCU)** but always creates a **new table**.

### SAA Exam "Scenario" Table

| If the requirement is...                                           | Use This Feature:                 |
| :----------------------------------------------------------------- | :-------------------------------- |
| "Automatically delete user sessions after 24 hours of inactivity." | **DynamoDB TTL**                  |
| "Provide low-latency access to users in both the US and Europe."   | **Global Tables**                 |
| "Trigger a Lambda function whenever a new customer signs up."      | **DynamoDB Streams**              |
| "Perform complex SQL analytics on 10TB of DynamoDB data."          | **Export to S3 + Amazon Athena**  |
| "Restore a table to its state exactly 10 minutes ago."             | **Point-in-Time Recovery (PITR)** |
| "Migrate a large CSV file from S3 into a new DynamoDB table."      | **S3 Import (Native)**            |

##### References
