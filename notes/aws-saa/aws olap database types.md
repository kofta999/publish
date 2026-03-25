2025-02-18 14:40
Tags: #cloud/aws/important
##### Content
### Redshift
- Based on postgres
- Offers 10x better performance than other data warehouses
- Uses columnar storage of data
- Features Massively Parallel Query Execution and is highly available
- Pay as you go model
- Compatible with BI tools
- Has serverless version with auto scaling

### Elastic MapReduce
- Cloud big data platform, supporting many open source tools like Hadoop
- Used for data transformation, processing and analyzing large datasets
- Allows quick setup for clusters of virtual servers

### Athena
- Serverless query service to analyze S3 data
- Supports JSON, CSV, ORC, Avro, Parquet
- 5$ per TB of data scanned
- Uses columnar / compressed data format

## QuickSight
- Serverless, ML powered BI service for creating interactive dashboards
- Fast, automatically scalable, and embeddable, with per-session pricing.
- Integrated with various data sources, RDS, Aurora, Athena, Redshift and S3

### Neptune
- Fully managed Graph database
- 3 AZ, 15 read replicas

### TimeStream
- Time series DB service
- Auto scaling provided
- A lot faster than relational DBs and costs 1/10th less

### Quantum Ledger DB (QLDB)
- For recording financial transactions
- Fully managed, serverless, 3 AZ replication
-  Used to **review the history of all changes made to your application data over time.**
- Immutable
- Offers 2~3x better performance than common ledger blockchain frameworks
- Difference with Amazon Managed Blockchain: QLDB does not have a decentralization component and is designed to comply with financial regulation rules.

### Managed BlockChain
- Allows to
	- Join public blockchain networks
	- Create your own
	- Compat with blockchain frameworks

### AWS Glue
- Managed DB to extract, transform and load (ETL) service
- Fully serverless
##### References
