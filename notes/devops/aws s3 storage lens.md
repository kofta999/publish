2026-03-16 16:54
Tags: #cloud/aws/storage 
##### Content
S3 Storage Lens is a cloud-analytics feature that provides organization-wide visibility into object-storage usage and activity. It helps you discover anomalies, identify cost efficiencies, and apply data protection best practices across your entire AWS Organization.

#### 1. Core Capabilities
* **Aggregation:** View data at the organization, account, region, bucket, or prefix level.
* **Dashboards:** Includes a **Default Dashboard** (preconfigured by S3, cannot be deleted) and the ability to create custom dashboards.
* **Data Export:** Metrics can be exported daily to an S3 bucket in **CSV** or **Parquet** format for further analysis (e.g., in Amazon QuickSight).
* **Scope:** Provides 30 days of historical usage and activity metrics.

#### 2. Key Metric Categories
Storage Lens categorizes metrics to help you focus on specific operational goals:

* **Summary Metrics:** General insights like `StorageBytes` and `ObjectCount` to identify fastest-growing or stagnant buckets.
* **Cost-Optimization:** Identifies "waste," such as `IncompleteMultipartUploadStorageBytes` (older than 7 days) or versions that could be transitioned to cheaper storage classes.
* **Data-Protection:** Tracks security best practices, such as the count of buckets with `Versioning`, `MFADelete`, or `SSE-KMS` encryption enabled.
* **Activity & Performance:** Monitors how storage is requested (`GetRequests`, `PutRequests`) and identifies buckets using `Transfer Acceleration`.
* **Status Code Metrics:** Provides insights into HTTP errors (e.g., `403 Forbidden` or `404 Not Found`), which is helpful for troubleshooting application access issues.

#### 3. Free vs. Advanced Tier

| Feature             | Free Metrics       | Advanced Metrics (Paid)                   |
| ------------------- | ------------------ | ----------------------------------------- |
| **Metric Count**    | ~28 usage metrics  | Full suite (Activity, Status Codes, etc.) |
| **Retention**       | 14 days            | **15 months**                             |
| **Granularity**     | Up to Bucket level | **Prefix-level aggregation**              |
| **Recommendations** | Basic              | Advanced actionable insights              |
| **CloudWatch**      | N/A                | Can publish metrics to CloudWatch         |
#### 4. Practical Use Cases
* **SRE/DevOps:** Use **Status Code Metrics** to detect a sudden spike in `403 Forbidden` errors, indicating a potential configuration drift or security issue.
* **Cost Management:** Identify buckets with large amounts of non-current version data to implement more aggressive **Lifecycle Policies**.
* **Compliance:** Quickly audit an entire AWS Organization to ensure every bucket has **Server-Side Encryption** enabled.

##### References
