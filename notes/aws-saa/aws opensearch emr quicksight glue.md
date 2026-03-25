2026-03-23 14:30
Tags: #cloud/aws/analytics 
##### Content
### Amazon OpenSearch Service
The successor to Amazon Elasticsearch, used for **full-text search**, log analytics, and real-time application monitoring.
* **Search Capabilities:** Unlike DynamoDB (which requires primary keys), OpenSearch can search any field, handle partial matches, and perform complex aggregations.
* **Architecture:** 
	* **Managed Cluster:** You choose the instance types and count.
    * **Serverless:** AWS scales compute and storage automatically.
* **Dashboards:** Includes **OpenSearch Dashboards** (formerly Kibana) for visualizing logs and search data.
* **Ingestion:** Commonly fed data by **Kinesis Data Firehose** or **CloudWatch Logs**.

### Amazon EMR (Elastic MapReduce)
A managed cluster platform that simplifies running **Big Data frameworks** like Apache Spark, Hadoop, and Presto to process vast amounts of data.
#### Node Types & Purchasing
* **Master Node:** Coordinates the cluster. One per cluster (unless Multi-Master for HA).
* **Core Node:** Runs tasks **and** stores data in HDFS (Hadoop Distributed File System).
* **Task Node:** Purely for compute. Does **not** store data. Ideal for **Spot Instances** because their termination won't result in data loss.

| Purchasing Option | Best Use Case |
| :--- | :--- |
| **On-Demand** | Reliable, predictable master and core nodes. |
| **Reserved Instances** | Long-running clusters to save costs. |
| **Spot Instances** | **Task Nodes** to handle temporary bursts at low cost. |

### Amazon QuickSight
A serverless Business Intelligence (BI) service used to create interactive dashboards.
* **SPICE Engine:** (Super-fast, Parallel, In-memory Calculation Engine). Data imported into SPICE is stored in-memory for lightning-fast visualization without hitting your database every time.
* **Direct Query:** QuickSight queries the data source (RDS, Redshift, S3 via Athena) in real-time. Better for data that changes constantly.
* **Security:** 
	* **Standard:** User-based.
    * **Enterprise:** Supports **Active Directory** integration and **Column-Level Security (CLS)** to restrict what specific users can see.

### AWS Glue
A fully managed **ETL (Extract, Transform, Load)** service that prepares data for analytics.
* **Glue Data Catalog:** A central repository (metadata) of where your data lives and its schema. It tells Athena and Redshift Spectrum how to read your S3 files.
* **Glue Crawlers:** Automatically scan your S3 buckets to discover schemas and populate the Data Catalog.
* **Specialized Tools:**
    * **Glue Studio:** A visual interface to create ETL jobs without writing code.
    * **Glue DataBrew:** A "spreadsheet-style" tool for business analysts to clean and normalize data.
    * **Glue Streaming ETL:** Real-time ETL for data coming from Kinesis or Kafka.

### SAA Exam "Scenario" Table

| If the requirement is...                                             | Use This Service:     |
| :------------------------------------------------------------------- | :-------------------- |
| "Provide a search bar for a website that supports partial matches."  | **Amazon OpenSearch** |
| "Run massive Hadoop/Spark jobs to process petabytes of raw data."    | **Amazon EMR**        |
| "Create a dashboard for executives using data from an RDS database." | **Amazon QuickSight** |
| "Convert 1,000s of CSV files in S3 to Parquet format automatically." | **AWS Glue**          |
| "Discover the schema of logs stored in S3 so Athena can query them." | **Glue Crawler**      |

##### References
