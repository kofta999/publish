2026-03-24 22:48
Tags: #cloud/aws/dr 
##### Content

#### AWS Database Migration Service (DMS)
DMS securely and quickly migrates databases to AWS, remaining highly resilient and self-healing. Crucially, the **source database remains available** during the entire migration process.

*   **Migration Types:** Supports both **Homogeneous** (e.g., Oracle to Oracle) and **Heterogeneous** (e.g., Microsoft SQL Server to Amazon Aurora) migrations.
*   **Schema Conversion Tool (SCT):** Must be used alongside DMS when performing heterogeneous migrations to convert the source schema into the target engine's format.
*   **CDC (Change Data Capture):** Supports continuous data replication to keep the target database in sync with the source.
*   **Architecture Requirements:** You must provision an EC2 instance to run the DMS replication tasks. DMS supports Multi-AZ deployments for high availability.
*   **Sources & Targets:** Can migrate from On-Premises, Azure SQL, RDS, S3, or DocumentDB to almost any AWS data store (RDS, Redshift, DynamoDB, S3, OpenSearch, Kinesis, Kafka, etc.).
##### References
