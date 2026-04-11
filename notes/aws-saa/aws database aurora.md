2026-03-14 14:47
Tags: #cloud/aws/databases 
##### Content
Amazon Aurora is a cloud-native, relational database engine that is fully compatible with MySQL and PostgreSQL. It is designed to offer the performance and availability of high-end commercial databases at a much lower cost.

#### 1. High Availability & Storage
Aurora’s storage architecture is its "secret sauce," differing significantly from standard RDS.
* **Resilience:** Data is stored in **6 copies across 3 Availability Zones**.
* **Quorum System:**
	* **Writes:** Need 4 out of 6 copies to succeed.
	* **Reads:** Need 3 out of 6 copies to succeed.
* **Self-Healing:** If a block of data is corrupted, Aurora uses peer-to-peer replication to repair it automatically.
* **Auto-Scaling Storage:** Storage grows automatically in **10 GB increments** up to **128 TB** (or 256 TB in some regions).
* **Backtrack:** Allows you to "rewind" the database to a specific point in time to recover from user errors (like a `DELETE` without a `WHERE` clause) without restoring from backups.

#### 2. Aurora Endpoints
Aurora provides specialized DNS endpoints to simplify how applications connect to the cluster.
* **Writer Endpoint:** Always points to the current Master instance.
* **Reader Endpoint:** Provides load balancing across all available Read Replicas.
* **Custom Endpoints:** Allows you to group specific replicas (e.g., higher-capacity instances) for specialized workloads like heavy analytical reporting.

![[Pasted image 20260314150524.png]]

#### 3. Aurora Scaling & Deployment Options
* **Aurora Replicas:** Supports up to **15 replicas** with sub-10ms replication lag. Supports **Auto Scaling** based on CPU or connection metrics.
* **Aurora Serverless:**
	* Automatically starts up, shuts down, and scales capacity based on application demand.
	* **Best For:** Infrequent, intermittent, or unpredictable workloads where you want to pay per second.

* **Aurora Global Database:**
	* **1 Primary Region** (Read/Write) and up to **10 Secondary Regions** (Read-only).
	* Replication lag is usually **less than 1 second**.
	* Disaster Recovery (DR): Promoting a secondary region has an **RTO of < 1 minute**.

#### 4. Specialized Capabilities
* **Aurora Machine Learning:** Allows you to run ML predictions (via **SageMaker** or **Comprehend**) directly inside SQL queries. No ML experience required—ideal for fraud detection or sentiment analysis.
* **Babelfish for Aurora PostgreSQL:** A translation layer that allows Aurora to understand **T-SQL** (Microsoft SQL Server's dialect). This enables migrating from SQL Server to Aurora with minimal code changes.

#### Summary Comparison: RDS vs. Aurora

| Feature         | Amazon RDS          | Amazon Aurora                  |
| --------------- | ------------------- | ------------------------------ |
| **Replicas**    | Up to 15            | Up to 15 (Faster lag)          |
| **Storage**     | Manual / Auto-scale | **Self-healing / Auto-scale**  |
| **Failover**    | 30–60 seconds       | **Instant (< 30 seconds)**     |
| **Cost**        | Baseline            | ~20% more (but more efficient) |
| **Maintenance** | Standard            | Zero-Downtime Patching         |

##### References
