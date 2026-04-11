2026-03-23 14:22
Tags: #cloud/aws/analytics 
##### Content
Amazon Athena is an interactive, serverless query service that makes it easy to analyze data in **Amazon S3** using standard **SQL**. There is no infrastructure to manage, and you pay only for the queries you run.
#### 1. Core Concepts
* **Serverless:** No instances to spin up or manage. Athena scales automatically.
* **SQL Driven:** Uses **Presto** under the hood. You can use standard SELECT statements to query CSV, JSON, Parquet, or ORC files.
* **Pricing:** Charged **$5.00 per TB** of data scanned. 
    * *Note:* There is a **10 MB minimum** per query. 
    * *Pro Tip:* Failed or cancelled queries are not charged.
* **Columnar Formats:** Convert data to **Apache Parquet** or **ORC**. 
    * *Why?* These formats allow Athena to read only the specific columns required by your query, rather than the entire file.
* **Compression:** Use **Snappy, GZIP, or Zlib**. Smaller files = less data scanned = lower cost.
* **Partitioning:** Divide your data in S3 into "folders" (e.g., `/year=2026/month=03/`). Athena can skip folders that don't match your `WHERE` clause.
* **Partition Projection:** A high-performance feature where Athena calculates partition locations mathematically instead of looking them up in the Glue Data Catalog. This is ideal for highly partitioned datasets (e.g., logs organized by minute).

#### 3. Athena Federated Query
Athena isn't just for S3 anymore. Using **Data Source Connectors** (which run on **AWS Lambda**), you can query data wherever it lives.
* **Supported Sources:** DynamoDB, RDS (MySQL/Postgres/SQL Server), Redshift, CloudWatch Logs, and even external sources like Snowflake or Google BigQuery.
* **Workflow:** You write one SQL query that joins data from S3 with data from a private RDS database. Athena handles the "federation" via Lambda.

![[Pasted image 20260323142427.png]]

---
### SAA Exam "Scenario" Table

| If the requirement is...                                                   | Use This Strategy/Feature:            |
| :------------------------------------------------------------------------- | :------------------------------------ |
| "Run ad-hoc SQL analytics on 500TB of log files in S3."                    | **Amazon Athena**                     |
| "Minimize the cost of Athena queries on a large dataset."                  | **Convert to Parquet + Partitioning** |
| "Query data from both S3 and a private RDS database in one SQL statement." | **Athena Federated Query**            |
| "Create a visual dashboard based on Athena query results."                 | **Athena + Amazon QuickSight**        |
| "Automatically discover the schema of new S3 files for Athena."            | **AWS Glue Crawler**                  |

### Comparison: Athena vs. Redshift Spectrum
* **Athena:** Best for **ad-hoc** queries and one-off analysis. Truly serverless.
* **Redshift Spectrum:** Use if you already have a **Redshift Cluster** and want to "extend" your SQL queries to data sitting in S3 without loading it.

##### References
