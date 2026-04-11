2026-03-22 17:57
Tags: #cloud/aws/databases 
##### Content
To succeed in the SAA-C03 exam, you must be able to map specific business requirements (keywords) to the correct AWS database service. Use this "Decision Matrix" to identify the right solution.

### 1. The Database Decision Matrix

| Requirement / Keyword | Recommended Service | Why? |
| :--- | :--- | :--- |
| **Complex Joins**, Standard SQL, CRM/ERP | **Amazon RDS** | Relational, ACID compliant, managed. |
| **High Performance SQL**, Auto-scaling storage | **Amazon Aurora** | 5x faster than MySQL, 3x faster than Postgres. |
| **NoSQL**, Key-Value, **Serverless**, Huge Scale | **Amazon DynamoDB** | Single-digit ms latency, infinite scaling. |
| **Microsecond Latency**, Caching, Sessions | **Amazon ElastiCache** | In-memory (Redis/Memcached). |
| **Millisecond Graphs**, Social Networks, Fraud | **Amazon Neptune** | Optimized for highly connected data. |
| **OLAP**, Analytics, **Data Warehouse**, Columnar | **Amazon Redshift** | Petabyte-scale, optimized for complex BI. |
| **JSON Documents**, MongoDB Compatibility | **Amazon DocumentDB** | Managed MongoDB-compatible store. |
| **Time-Series**, IoT, DevOps Metrics | **Amazon Timestream** | Optimized for time-ordered data. |
| **Immutable Ledger**, Cryptographically Verifiable | **Amazon QLDB** | Centralized, trusted transaction log. |

### 2. High-Yield SAA Scenarios

#### Relational: RDS vs. Aurora
* **Multi-AZ vs. Read Replicas:** 
	* **Multi-AZ** is for **Disaster Recovery** (high availability).
	* **Read Replicas** are for **Performance** (scaling reads).
* **Aurora Serverless:** Best for **intermittent or unpredictable** workloads (e.g., a test environment or a site with sudden, rare spikes).
* **Aurora Global Database:** For disaster recovery across regions with **< 1 second** replication.

#### NoSQL: DynamoDB vs. DocumentDB
* **DynamoDB:** Best for **Serverless** architectures and massive, high-speed key-value access.
* **DocumentDB:** Best when the requirement specifically mentions **MongoDB compatibility** or complex JSON indexing.

#### In-Memory: Redis vs. Memcached
* **Redis:** Supports **Multi-AZ, Replication, and Data Persistence**. Most common answer.
* **Memcached:** Only for simple, non-persistent, multi-threaded caching.

### 3. Migrating to AWS Databases
When a scenario mentions moving an on-premises database to AWS:
* **Same Engine (e.g., Oracle to Oracle):** Use **AWS Database Migration Service (DMS)**.
* **Different Engine (e.g., Oracle to Aurora):** Use **AWS Schema Conversion Tool (SCT)** first to convert the schema, then **DMS** to move the data.
* **Massive Offline Migration:** Use the **Snow Family** (Snowball Edge) to physically move the data if network bandwidth is limited.

### Summary Checklist for Exam Questions:
1.  **Is it SQL?** $\rightarrow$ RDS / Aurora.
2.  **Does it need Joins?** $\rightarrow$ RDS / Aurora.
3.  **Is it "Serverless" NoSQL?** $\rightarrow$ DynamoDB.
4.  **Is it for Caching?** $\rightarrow$ ElastiCache (Redis).
5.  **Is it for Analytics/BI?** $\rightarrow$ Redshift.
6.  **Is it for Relationships/Social?** $\rightarrow$ Neptune.

##### References
